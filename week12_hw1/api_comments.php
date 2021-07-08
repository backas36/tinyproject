<?php
  require_once('./conn.php');
  header('Content-Type:application/json;charset=utf8mb4');
  header('Access-Control-Allow-Origin: *');
  if(empty($_GET['site_key'])){
    $json = array(
      'ok' => false,
      'message' => 'Please input site_key in url.'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];
  $sql = 'SELECT nickname, content, created_at FROM yang36_discussions WHERE site_key = ? AND is_deleted = 0 ORDER BY created_at DESC';
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('s', $site_key);
  $result = $stmt->execute();
  if(!$result){
    $json = array(
      'ok' => false,
      'message' => $conn->connect_error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt -> get_result();
  $discussions = array();
  while($row = $result->fetch_assoc()){
    array_push($discussions,array(
      'nickname' => $row['nickname'],
      'content' => $row['content'],
      'created_at' => $row['created_at']
    ));
  };
  $response = json_encode($discussions);
  echo $response;
?>