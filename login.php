<?php

session_start();

if( @$_SESSION['logged'] === true )
{
    header('location: ./index.php');
    die('Nieoczekiwany błąd. Spróbuj odświeżyć stronę');
}

?>

<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Dziennik - logowanie</title>
    <link rel="stylesheet" href="bootstrap-5/css/bootstrap.min.css"> <!--bootstrap css-->
    <script src="https://kit.fontawesome.com/d5272c5ae6.js" crossorigin="anonymous"></script> <!--fontawesome-->
    <link rel="stylesheet" href="style/main.css">
    <link rel="stylesheet" href="style/login.css">
</head>
<body>
    <div id="login-content" class="col-md-8 mx-auto my-auto text-center">

        <div id="login-logo" class="col-md-12">
            <h1>e<span class="accent">D</span>ziennik</h1>
        </div>

        <div id="login-domain" class="d-inline-block align-top p-5 col-md-6">
            TESTOWA DOMENA DZIENNIKA</br>
            im. Jana Nowaka
        </div>

        <div id="login-inputs" class="d-inline-block col-md-5">

            <div id="login-error" class="row col-md-12 d-block text-right">
                <span class="error"><?php echo @$_SESSION['error']; ?></span>
            </div>  

            <form action="./scripts/login.php" method="post">
                <label for="login">Login:</label>
                <input
                    type="text" name="login"
                    id="login" class="my-1"
                ><br>
                <label for="password">Hasło:</label>
                <input
                    type="password" name="password"
                    id="password" class="my-1"
                ><br>
                <input type="submit" value="zaloguj" class="my-1">
            </form>
        </div>

    </div>

</body>
</html>

