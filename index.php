<?php

session_start();

if( !isset($_SESSION['logged']) )
{
    header('location: ./login.php');
    die('Nieoczekiwany błąd. Spróbuj odświeżyć stronę');
}

?>


<!DOCTYPE html>

<html lang="pl-PL">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <link rel="stylesheet" href="bootstrap-5/css/bootstrap.min.css"> <!--bootstrap css-->
        <script src="https://kit.fontawesome.com/d5272c5ae6.js" crossorigin="anonymous"></script> <!--fontawesome-->
        <link rel="stylesheet" href="style/main.css">
        <title>Dziennik lekcyjny</title>
    </head>
    <body>

        <?php
            include("./includes/header.html");
        ?>
        
        <main>
            <section>
                <div id="main-index-content" class="containerFlex">
                    <div class="row no-gutters index-row" id="current-lesson">
                        <div class="col-sm-3">Aktualna lekcja:</div>
                        <div class="col-sm-9">(info o lekcji)</div>
                    </div>
                    <div class="row no-gutters index-row" id="next-break">
                        <div class="col-sm-3">Najbliższa przerwa:</div>
                        <div class="col-sm-9">(info o przerwie)</div>
                    </div>
                    <div class="row no-gutters index-row" id="next-lessons">
                        <div class="col-sm-3">Następne lekcje: </div>
                        <div class="col-sm-9">-...<br>-...<br>-...</div>
                    </div>
                </div>
            </section>
        </main>


        <script src="./bootstrap-5/js/bootstrap.bundle.min.js"></script>
    </body>
</html>