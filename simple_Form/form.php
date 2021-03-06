<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新拖延運動表單</title>
  <link rel="stylesheet" href="./css/normalize.css">
  <link rel="stylesheet" href="./css/form.css">
</head>

<body>
  <div class="wrapper">
    <form action="./submit.php" method="post">
      <h1 class="form__title">新拖延運動表單</h1>
      <p class="form__desc">
        活動日期：2020/12/10 ~ 2020/12/11 <br>
        活動地點：台北市大安區新生南路二段1號
      </p>
      <p class="form__notice">* 必填</p>
      <!-- form content -->
      <div class="form__block form__block-required">
        <div class="form__block__title ">暱稱</div>
        <div class="form__block__input">
          <input type="text" name="nickname">
          <div class="input__empty">請輸入暱稱</div>
        </div>
      </div>
      <div class="form__block form__block-required">
        <div class="form__block__title ">電子郵件</div>
        <div class="form__block__input">
          <input type="text" name="email">
          <div class="input__empty">請輸入電子郵件</div>
        </div>
      </div>
      <div class="form__block form__block-required">
        <div class="form__block__title ">手機號碼</div>
        <div class="form__block__input">
          <input type="text" name="phone">
          <div class="input__empty">請輸入手機號碼</div>
        </div>
      </div>
      <div class="form__block form__block-required">
        <div class="form__block__title ">報名類型</div>
        <div class="form__block__input">
          <label>
            <input type="radio" value="1" name="type">
            躺在床上用想像力實作
          </label>
          <label>
            <input type="radio" value="2" name="type">
            趴在地上滑手機找現成的
          </label>
          <div class="input__empty">請選擇報名類型</div>
        </div>
      </div>

      <div class="form__block form__block-required">
        <div class="form__block__title ">怎麼知道這個活動的？</div>
        <div class="form__block__input">
          <input type="text" name="referral">
          <div class="input__empty">請輸入怎麼知道的</div>
        </div>
      </div>
      <div class="form__block">
        <div class="form__block__title">其他</div>
        <div class="form__block__desc">
          對活動的一些建議
        </div>
        <div class="form__block__input">
          <input type="text" name="others">
        </div>
      </div>

      <input type="submit" class="form__submit">
      <p class="form__submit_desc">
        請勿透過表單送出您的密碼。
      </p>
    </form>
  </div>
  <footer>
    © 2020 © Copyright. All rights Reserved.
  </footer>
  <script src="./js/main.js"></script>
</body>

</html>