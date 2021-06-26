<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(empty($_POST['role'])){
    header('Location: admin.php?errorCode=1');
    die('資料不齊全');
  }
?>