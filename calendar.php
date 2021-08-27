<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <link rel="stylesheet" href="bootstrap-5/css/bootstrap.min.css"> <!-- bootstrap css -->
    <script src="https://kit.fontawesome.com/d5272c5ae6.js" crossorigin="anonymous"></script> <!--fontawesome-->
    <link rel="stylesheet" href="style/main.css">
    <script src="./js-scripts/jQuery.js"></script>
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
            border-radius: 5px;
            margin: 2px;
            padding: 2px;
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

    <button type="button">Dodaj wpis do kalendarza</button>
</body>

<script>

    let date = new Date;
    let m = date.getMonth();      //month
    let y = date.getFullYear();   //year

    //testowanie:
    
    let c = new Calendar(y,m+1);
    c.SetPlaceholder('#calendar');
    c.SetDayClasses('main-2','day-number','day-tasks')
    c.GenerateFullCalendar();

    <?php
        $sql = $pdo -> prepare(
            'SELECT
            *,
            day(`task_date_start`) as `day`,
            concat(date_format(`task_date_start`,"%H:%i"),"-",date_format(`task_date_end`,"%H:%i")) as `time`
            FROM `calendar_task`
            WHERE `user_id` = ?
            AND month(`task_date_start`) = ?
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
                        "<div class='task' title='{$task['time']}'>{$task['title']}</div>"
                    );
                });
TASK;
            // $tasks[] = $task;
        }
    ?>

</script>