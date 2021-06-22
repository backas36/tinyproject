<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新拖延運動</title>
  <link rel="stylesheet" href="./css/normalize.css">
  <link rel="stylesheet" href="./css/index.css">
</head>

<body>
  <img src="./images/bg-header.png" class="banner">
  <main class="main">
    <div class="main__title">
      <div>你知道嗎？拖延...可以拯救世界喔</div>
      <img src="./images/travel.png" alt="">
    </div>
    <div class="main__description">
      <p>有拖延症的人很奇怪，不是所有的事都拖，只有<span class="highlight">重要的事才拖</span>
        。並不是動作慢，反而大部分時間手腳還挺快的。偏偏就是那些最需要慢條斯理、按部就班的大計畫，才會拖泥帶水。這是為什麼？</p>
      <p>
        我們都<span
          class="highlight">不需要戰勝拖延症，而是與之好好相處</span>，就如同我們的恐懼與黑暗面也是。只要理解背後對你的意義，與其「空性」，所有一切本身都是無害的。而且有時候（是有時候喔……）適時的小拖延，也不外乎是激發創造力與醞釀靈感的方法。願各位與拖延症有更好的相處。
      </p>
    </div>
  </main>
  <section class="cta">
    <div class="cta__wrapper">
      <div class="cta__title">我要報名</div>
      <div class="cta__desc">還沒試過拖延救世界的快感嗎？<br>快來一起參與吧，點以下連結拯救人生</div>
      <a class="cta__btn" href="form.php">線上報名</a>
    </div>
  </section>
  <footer>
    © 2020 © Copyright. All rights Reserved.
  </footer>
</body>

</html>

<?php
  if(isset($_GET['code']) && $_GET['code'] == 1){
    echo '<script>alert("YES! 你已經報名成功")</script>';
  }
?>
