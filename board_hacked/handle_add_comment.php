<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  
  if (empty($_POST['content'])){
    header('Location: index.php?errorCode=1');
    die();
  }
  if(empty($_SESSION['username'])){
    header('Location: index.php?errorCode=2');
  }else{
    $user = getUserFromUsername($_SESSION['username']);
    $nickname = $user['nickname'];
    $content = $_POST['content'];
    
    $sql=sprintf('INSERT INTO yang36_comments(nickname, content) VALUES ("%s","%s")', $nickname, $_POST['content']);
    
    // INSERT INTO yang36_comments(nickname, content) VALUES ("11","")

    //  "),("admin","fake")#
    // "),("admin",(select password from yang36_users limit 1))#
    // "),((select username from yang36_users where id=77),(select password from yang36_users limit 1))#
    
    $result = $conn->query($sql);

    if(!$result){
      die($conn->error);
    }
    
    header('Location: index.php');
  }
  
?>