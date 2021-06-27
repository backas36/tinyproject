<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(empty($_POST['role'])){
    header('Location: admin.php?errorCode=1');
    die('資料不齊全');
  }

  $role = $_POST['role'];
  $id = $_POST['id'];
  
  $sql = 'UPDATE yang36_users SET role = ? WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $role, $id);
  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }

  header('Location: admin.php');
?>