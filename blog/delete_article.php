<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  if(empty($_GET['article_id'])){
      header('Location: index.php?errorCode=1');
      die('資料不齊全');
    }
  $article_id = $_GET['article_id'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  


  if(isAdmin($user)){
    $sql = 'update yang36_articles SET is_deleted = 1 WHERE article_id  = ? ';
  }
  $stmt = $conn->prepare($sql); 
  $stmt->bind_param('i', $article_id);
  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }

  header('Location:index.php');

?>