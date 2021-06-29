


<?php
  require_once('./conn.php');
  require_once('./utils.php');
  require_once('./query.php');



  include('./header.php');
?>
<ul class="menu">
      <?php  
          $sql = 'SELECT category_name From yang36_categories Where is_deleted IS NULL';
          $stmt = $conn->prepare($sql);
          $result = $stmt->execute();

          if(!$result){
            die('SQL Error'.$conn->error);
          }

          $result = $stmt->get_result();
        ?>
        <?php while ($category = $result->fetch_assoc()){?>
          <li><a href="" class=""><?php echo escape($category['category_name'])?></a></li>
        <?php } ?>
     
      <li><a href="">登入</a></li>
    </ul>
  </nav>

</div>
</header>
<?php
  include('./banner.php');

?>
  <main>
    <div class="wrapper">
      <div class="articles">
        <?php  
          $sql = 'SELECT * From yang36_articles WHERE is_deleted IS NULL ORDER BY article_id DESC';
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
            <div class="article__time"><?php echo escape($articles['created_at']) ; ?></div>
          </div>
          <div class="article__body">
            <p><?php echo escape($articles['article_content']);?></p>
          </div>
          <div class="article__footer">
            <a href="" class="btn btn-link"> More</a>
          </div>
        </div>
        <?php } ?>
      </div>
      <aside>
        <div class="about">
          <div class="about__title">
            <h2>關於我</h2>
          </div>
          <div class="about__avata">
            <img src="https://picsum.photos/200/200/?random=1">
          </div>
          <div class="about__info">
            <p>切版花了我好久的時間，但是我沒辦法丟下他不管！對不起，Huli，雖然你說先不用管切版！功能做出來比較重要 😖</p>
          </div>

        </div>
        <div class="about newest__articles">
          <div class="about__title">
            <h2>最新文章</h2>
          </div>
          <?php 
            $top_articles_amount = 5;
            $sql = 'SELECT * From yang36_articles WHERE is_deleted IS NULL ORDER BY article_id DESC LIMIT ?';

            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $top_articles_amount);
            $result = $stmt->execute();

            if(!$result){
              die('SQL Error'.$conn->error);
            }

            $result = $stmt->get_result();
          ?>
          <?php while($articles_top = $result->fetch_assoc()){ ?>
            <a href="" class="btn btn-article"><?php echo escape($articles_top['article_title']) ?></a>
          <?php } ?>
        </div>
        <div class="about newest__comments">
          <div class="about__title ">
            <h2>最新留言</h2>
          </div>
          <?php 
            $top_comments_amount = 5;
            $sql = 'SELECT C.content , A.article_title, C.created_at '.
                   'FROM yang36_blog_comments AS C '.
                   'LEFT JOIN yang36_articles AS A '.
                   'ON C.article_id = A.article_id '.
                   'WHERE C.is_deleted IS NULL '.
                   'ORDER BY C.comment_id DESC '.
                   'Limit ?';

            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $top_comments_amount);
            $result = $stmt->execute();

            if(!$result){
              die('SQL Error'.$conn->error);
            }

            $result = $stmt->get_result();
          ?>
          <?php while($commets_top = $result->fetch_assoc()){ ?>
              <div class="about__info comment">
                <a href="" class="btn btn-article">
                  <sapn class="comment__title"><?php echo escape($commets_top['article_title']) ;?> ...</sapn>
                  <?php echo escape($commets_top['content']) ;?>
                
                </a>
                <p class="comment__time"><?php echo escape($commets_top['created_at']) ;?></p>
              </div>
            <?php } ?>
        </div>
      </aside>
    </div>
  </main>
<?php
  include('./footer.php');
?>