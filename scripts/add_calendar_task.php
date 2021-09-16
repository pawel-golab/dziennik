<?php
    session_start();

    require './connection.php';

    try{
        $statement = $pdo -> prepare(
            "INSERT INTO `calendar_task` (`user_id`, `start_date`, `title`, `description`) values (?,?,?,?)"
        );

        $statement -> execute(
            [ $_SESSION['userId'], $_POST['taskDate'].' '.$_POST['taskTime'], $_POST['taskName'], $_POST['taskDesc'] ]
        );
    }
    catch(PDOException){
        $_SESSION['error'] = 'Błąd serwera';
        header('Location: ' . ($_SERVER['HTTP_REFERER'] ?? '/dziennik/dziennik/index.php') );
        exit;
    }
    finally{
        $_SESSION['error'] = 'Krytyczny błąd serwera';
        header('Location: /dziennik/dziennik/index.php');
        exit;
    }
?>