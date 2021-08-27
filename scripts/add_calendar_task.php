<?php
    session_start();

    require './connection.php';

    $statement = $pdo -> prepare(
        "INSERT INTO `calendar_task` (`user_id`, `task_date`, `title`, `description`) values (?,?,?,?)"
    );
    $statement -> execute(
        [ $_SESSION['userId'], $_POST['taskDate'].' '.$_POST['taskTime'], $_POST['taskName'], $_POST['taskDesc'] ]
    );
?>