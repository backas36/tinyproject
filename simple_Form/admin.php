<?php
  require_once('conn.php');

  $result = $conn -> query('SELECT * FROM form_response ORDER BY id ASC');

  if(!$result){
    die($conn -> error);
  }

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新拖延運動表單 - 管理後台</title>
  <link rel="stylesheet" href="./css/normalize.css">
  <link rel="stylesheet" href="./css/admin.css">
</head>

<body>
  <div class="wrapper">
    <h1>新拖延運動報名結果一覽</h1>
    <table>
      <tr>
        <th>#</th>
        <th>暱稱</th>
        <th>電子郵件</th>
        <th>手機號碼</th>
        <th>報名類型</th>
        <th>怎麼知道這個活動的？</th>
        <th>其他</th>
      </tr>
      <?php
        while ($row = $result -> fetch_assoc()) {
      ?>
        <tr>
        <td><?= $row['id']?></td>
        <td><?= $row['nickname']?></td>
        <td><?= $row['email']?></td>
        <td><?= $row['phone']?></td>
        <td><?= $row['type'] == 1 ? '躺在床上用想像力實作':'趴在地上滑手機找現成的' ?></td>
        <td><?= $row['referral']?></td>
        <td><?= $row['others']?></td>
      </tr>
      <?php
        }
      ?>
    
    </table>
  </div>
  <footer>
    © 2020 © Copyright. All rights Reserved.
  </footer>
</body>

</html>