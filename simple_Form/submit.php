<?php
  require_once('conn.php');
  
  $nickname = $_POST['nickname'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $type = $_POST['type'];
  $referral = $_POST['referral'];
  $others = $_POST['others'];

  $sql = sprintf('INSERT INTO form_response (nickname, email, phone, type, referral, others) VALUES ("%s", "%s", "%s", "%d", "%s", "%s")', $nickname, $email, $phone, $type, $referral, $others);

  $result = $conn -> query($sql);
  if(!$result) {
    die($conn->error);
  }

  header('Location: index.php?code=1');
?>