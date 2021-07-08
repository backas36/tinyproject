<?php
  require_once('./conn.php');
  header('Content-Type:application/json;charset=utf8mb4');
  header('Access-Control-Allow-Origin: *');

  if(empty($_POST['content']) ||
     empty($_POST['nickname']) ||
     empty($_POST['site_key'])){
      $json = array(
        'ok' => false,
        'message' => 'Please enter missing fileds.'
      );
      $response = json_encode($json);
      echo $response;
      die();
    }
  
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $site_key= $_POST['site_key'];

  $sql = 'INSERT INTO yang36_discussions (nickname, content, site_key) VALUES (?,?,?)';
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('sss', $nickname, $content, $site_key);
  $result = $stmt -> execute();

  if(!$result){
    $json = array(
      'ok' => false,
      'message' => $conn -> error
    );
    $reponse = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    'ok' => true,
    'message' => 'success'
  );
  $response = json_encode($json);
  echo $response;

?>