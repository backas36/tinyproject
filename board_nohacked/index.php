<!-- 網址在這 http://mentor-program.co/mtr04group5/yang36/week9_hw1/index.php -->
<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);

  }

  $sql = 'SELECT * FROM yang36_comments ORDER BY id DESC';

  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if(!$result){
    die('Error:' . $conn->error);
  }
  $result = $stmt -> get_result();
?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="./reset.css">
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <header class="header__warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
    <div class="board__header">
      <h1 class="board_title">Comments</h1>
      <div class="board_statu">
        <?php if(!$username){ ?>
          <a href="register.php" class="board__btn">註冊</a>
          <a href="login.php" class="board__btn">登入</a>
        <?php } else { ?>
          <form action="update_user.php" method="post">
            <span class="board__edit">編輯暱稱</span><span  class="input__field input__field-hide">
              <input type="text" name="nickname"  />
              <input type="submit" class="board__btn" value="更改"/>
             </span>
              <a href="handle_logout.php" class="board__btn">登出</a>  
          </form>
        <?php } ?>
      </div>

    </div>
    <?php 
      if(!empty($_GET['errorCode'])){
        $errorCode = $_GET['errorCode'];
        $msg = 'error';
        if($errorCode === '1'){
          $msg = '請填入完整的資料';
        }else if($errorCode === '2'){
          $msg = '請先登入再留言';
        }
        echo '<div class="comment__warning">'. $msg .'</div>';
      }
    ?>
    
    <form action="handle_add_comment.php" method="POST" class="board__form-edit">
      <textarea name="content" rows="5" placeholder="<?php 
        if(!$username){ 
          echo '你好，';
        } else { 
          echo $user['nickname'].'，';
        }
      ?>在想些什麼呢？"></textarea>
      <div class="board__submit">
        <input type="submit" class="board__btn-submit" value="送出">
      </div>
    </form>

    <div class="board__hr"></div>

    <section class="board_comments">
      <?php while($row = $result->fetch_assoc()){ ?>
      <div class="board__comment">
        <div class="comment__avatar"></div>
        <div class="comment__body">
          <div class="comment__info">
            <span class="comment__author"><?php echo escape($row['nickname']); ?></span>
            <span class="comment__time"><?php echo escape($row['created_at']); ?></span>
          </div>
          <div class="comment__content"><?php echo escape($row['content']); ?></div>
        </div>
      </div>
      <?php } ?>
    </section>
  </main>

  <script>
    const btn = document.querySelector('.board__edit')
    btn.addEventListener('click',(e)=>{
      const form = document.querySelector('.input__field')
      form.classList.toggle('input__field-hide')
    })
  </script>
</body>

</html>