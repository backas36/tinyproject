<?php   
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');


   if(empty($_POST['article_title']) || empty($_POST['article_content']) || empty($_POST['category_id'])){
   
    header('Location:update_article.php?category_id='.$_POST['category_id'].'&article_id='.$_POST['article_id'].'&errorCode=1');
    die('資料不齊全');
  }

  $article_title = $_POST['article_title'];
  $article_content = $_POST['article_content'];
  $category_id = $_POST['category_id'];
  $article_id = $_POST['article_id'];

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  if(isAdmin($user)){
     $sql = 'UPDATE yang36_articles SET category_id = ?, '.
            'article_title = ?, '.
            'article_content = ? '.
            'WHERE yang36_articles.article_id = ? '.
            'AND username = ?';
  }  

  $stmt = $conn->prepare($sql);

  if(isAdmin($user)){
    $stmt->bind_param('issis', $category_id, $article_title, $article_content, $article_id, $username);
  } else {
    header('Location:index.php');
    exit;
  }

  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }
  header('Location:index.php');

?>

