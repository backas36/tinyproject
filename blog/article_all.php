<?php

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  include('./header.php');

  include('./banner.php');


?>
  <main>
     <ol class="breadcrumb">
          <li><a href="index.php">首頁</a></li>
          <li><a href="article_all.php" class="active">全部文章</a></li>
      </ol>
    <div class="wrapper">
    <?php if(!$username){ ?>
      <div class="articles">
        <?php  
          
          
          $sql = 'SELECT A.article_title,A.created_at, A.category_id, A.article_id, A.article_content, C.category_name '.
                 'From yang36_articles AS A '.
                 'LEFT JOIN yang36_categories AS C '.
                 'ON A.category_id = C.category_id '.
                 'WHERE A.is_deleted IS NULL '.
                 'ORDER BY A.article_id DESC ';
                 
          $stmt = $conn->prepare($sql);
          $result = $stmt->execute();

          if(!$result){
            die('SQL Error'.$conn->error);
          }

          $result = $stmt->get_result();
          ?>
        <?php while ($articles = $result->fetch_assoc()){ ?>
          <div class="article">
          <div class="article__header">
            <div class="article__title"><?php  echo escape($articles['article_title']) ; ?></div>
            <div class="article__time">【 <?php echo escape($articles['category_name']) ; ?> 】</div>
            <div class="article__time"><?php echo escape($articles['created_at']) ; ?></div>
          </div>
          <div class="article__body">
            <p><?php echo escape($articles['article_content']);?></p>
          </div>
          <div class="article__footer">
            <a href="article.php?category_id=<?php echo escape($articles['category_id'])?>&article_id=<?php echo escape($articles['article_id'])?>" class="btn btn-link"> More</a>
          </div>
        </div>
        <?php } ?>
      </div>
    <?php } else if ($user && $user['role'] === 'admin') { ?>
      <div class="admin__articles">
        <?php  
          
          
          $sql = 'SELECT A.article_title,A.created_at, A.category_id, A.article_content, A.article_id, C.category_name '.
                 'From yang36_articles AS A '.
                 'LEFT JOIN yang36_categories AS C '.
                 'ON A.category_id = C.category_id '.
                 'WHERE A.is_deleted IS NULL '.
                 'ORDER BY A.article_id DESC';
                 
          $stmt = $conn->prepare($sql);
          $result = $stmt->execute();

          if(!$result){
            die('SQL Error'.$conn->error);
          }

          $result = $stmt->get_result();
          ?>
        <?php while ($articles = $result->fetch_assoc()){ ?>
          <div class="article">
          <div class="article__header">
            <div class="article__title"><?php  echo escape($articles['article_title']) ; ?></div>
            <div class="article__time">【 <?php echo escape($articles['category_name']) ; ?> 】</div>
            <div class="article__time"><?php echo escape($articles['created_at']) ; ?></div>
          </div>
          <div class="article__footer">
            <?php if(!$username){ ?>
             more 按鈕
            <?php }else if($user && $user['role'] === 'admin') {?>
              <a href="update_article.php?category_id=<?php echo escape($articles['category_id'])?>&article_id=<?php echo escape($articles['article_id'])?>" class="btn btn-link"> Edit</a>
              <a href="delete_article.php?category_id=<?php echo escape($articles['category_id'])?>&article_id=<?php echo escape($articles['article_id'])?>" class="btn btn-link"> Delete</a>
            <?php }?>
          </div>
        </div>
        <?php } ?>
      </div>
     <?php } ?>
 
<?php
  include('./sidebar.php') ;
  include('./footer.php');
?>






