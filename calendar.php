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
        #calendar {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            column-gap: 2px;
            grid-template-rows: 50px 50px 50px 50px 50px 50px;
            row-gap: 2px;
            width: 90%;
            margin: auto;
        }
    </style>
    <title>Kalendarz</title>
</head>

<?php require './header.html'; ?>
<div id="calendar"></div>
<script>

    let date = new Date;
    let m   = date.getMonth();      //month
    let y   = date.getFullYear();   //year

    //testowanie:
    
    generateCalendar(
        y, m+1, '#calendar',
        ['','span','<div>'],                 //tags
        ['main-2','day-number','day-tasks','accent', 'error'],    //classes
        [0,0,0,'filter: brightness(1.2);','font-style: italic'], //styles
    );
</script>