<?php
    
    session_start();

    function wrongLoginData()
    {
        $_SESSION['error'] = 'Błędny login lub hasło';
        header('location: ../login.php');
        die('Nieoczekiwany błąd. Spróbuj odświeżyć stronę');
    }

    //----- JUŻ ZALOGOWANY

    if( @$_SESSION['logged'] )
    {
        header('location: ../login.php');
        die('Nieoczekiwany błąd. Spróbuj odświeżyć stronę');
    }

    //----- PUSTE DANE LOGOWANIA

    $login = htmlentities($_POST['login']);
    $password = htmlentities($_POST['password']);

    if( empty($login) || empty($password) )
    {
        wrongLoginData();
    }

    //----- DANE LOGOWANIA Z NIELEGALNYMI ZNAKAMI

    if( $_POST['login'] != $login || $_POST['password'] != $password )
    {
        wrongLoginData();
    }

    //----- SPRAWDZENIE DANYCH W BAZIE
    
    require('./connection.php');

    $options = [
        'memory_cost'   => 4096,
        'time_cost'     => 4,
        'threads'       => 2
    ];

    //------ WYSŁANIE ZAPYTANIA

    $statement = $pdo -> prepare(
        "SELECT *,u.id
        FROM `user` u
        LEFT JOIN `teacher` t ON t.id = u.teacher_id
        LEFT JOIN `student` s ON s.id = u.student_id
        WHERE u.login = ?"
    );
    $statement -> execute( [$login] );
    $fetched = $statement -> fetch();

    if( $statement->rowCount() == 1 )
    {
        if( password_verify($password, $fetched['password']) ) {
            $_SESSION['logged'] = true;
            $_SESSION['userId'] = $fetched['id'];
            header('location: ../index.php');
            die('Nieoczekiwany błąd. Spróbuj odświeżyć stronę');
        }

        else wrongLoginData();
    }

    else wrongLoginData();
    
?>
