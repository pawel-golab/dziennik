<?php

session_start();
session_unset();

header('location: ../login.php');
die('Nieoczekiwany błąd. Spróbuj odświeżyć stronę');

?>