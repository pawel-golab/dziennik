<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <link rel="stylesheet" href="bootstrap-5/css/bootstrap.min.css"> <!-- bootstrap css -->
    <script src="https://kit.fontawesome.com/d5272c5ae6.js" crossorigin="anonymous"></script> <!--fontawesome-->
    <link rel="stylesheet" href="./style/jquery-ui.theme.min.css">
    <link rel="stylesheet" href="./style/jquery-ui.structure.min.css">
    <link rel="stylesheet" href="./style/main.css">
    <script src="./external-scripts/jQuery.js"></script>
    <script src="./external-scripts/jquery-ui.min.js"></script>
    <script src="./js-scripts/functions.js"></script>
    <script src="./js-scripts/calendar.js"></script>
    <style>
        #calendar-settings {
            background-color: var(--back-2);
        }
        #calendar {
            display: grid;
            grid-template: repeat( 6, minmax(50px, auto) ) / repeat( 7, 1fr );
            column-gap: 2px;
            row-gap: 2px;
        }

        #calendar div.task {
            background-color: rgba(0,0,0,0.2);
            color: white;
            border-radius: 5px;
            margin: 2px;
            padding: 2px;
        }
        #calendar .today {
            filter: brightness(1.1);
        }
    </style>
    <title>Kalendarz</title>
</head>
<body>
    
    <?php
        session_start();
        require './header.html';
        require './scripts/connection.php';
    ?>
    <div class="row no-gutters">
        <div id="calendar-settings" class="col-sm-2"></div>
        <div id="calendar" class="col-sm-10"></div>
    </div>

    <button id="add-calendar-task" type="button">Dodaj wpis do kalendarza</button>

    <div title="Nowy wpis w kalendarzu" id="dialog" display="none">

    </div>
</body>

<script>

    $('#add-calendar-task').click( function(){
        $('#dialog').load('/dziennik/dziennik/forms/new_calendar_task.html', function() {
            $('#dialog').dialog();
        });
    });

    let date = new Date;
    let m = date.getMonth();      //month
    let y = date.getFullYear();   //year

    //testowanie:
    
    let c = new Calendar(y,m+1,'#calendar');
    c.SetDayClasses('main-2','day-number','day-tasks');
    c.SetPresentDayStyling('today');
    c.SetWeekendStyling(null,'color:red');
    c.GenerateFullCalendar();

    //todo #17 dodać try{}catch(){} w calendar.php
    <?php
        $sql = $pdo -> prepare(
            'SELECT
            *,
            day(`start_date`) as `day`,
            concat(date_format(`start_date`,"%H:%i"),"-",date_format(`end_date`,"%H:%i")) as `time`
            FROM `calendar_task`
            WHERE `user_id` = ?
            AND month(`start_date`) = ?
            ORDER BY `day`'
        );

        $sql -> execute([
            $_SESSION['userId'],
            date('n')
        ]);
        
        for( $i = 0; $task = $sql -> fetch(); $i++ ) {
            echo <<< TASK
                \$('#calendar').find(
                    `[data-day="{$task['day']}"][data-month="\${m+1}"] [data-calendar="content"]`
                ).each( function(){
                    \$(this).append(
                        "<div class='task' title='{$task['time']} - {$task['description']}'>{$task['title']}</div>"
                    );
                });
TASK;
            // $tasks[] = $task;
        }
    ?>

</script>