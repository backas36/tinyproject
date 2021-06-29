<?php
  require_once('./conn.php');

  function get_all_articles() {
      Global $conn;
      $sql = 'SELECT * From yang36_articles WHERE is_deleted IS NULL ORDER BY article_id DESC';
      $stmt = $conn -> prepare($sql);
      $result = $stmt->execute();
      if(!$result){
        die($conn->error);
      }
      $result = $stmt-> get_result();
      $row = $result->fetch_assoc();
      return $row;
  }

?>