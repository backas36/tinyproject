index.php 觀看所有留言
handle_add_post.php 新增留言

先處理 連線資料庫 ，最好是另開一個 php 檔案
到 index.php 看有沒有連線成功
之後下 query 撈所有留言到 html

再來處理 handle_add_comment.php
🧩 要注意留言呈現能不能完整，例如換行，或者是 html 呈現原始碼
🧩 要處理 nickname 和 content 不能為空

在index.php 新增註冊連結，並link 到 register.php
handle_register.php 

實作 login.php handle_login.php
解決瀏覽器記住 login狀態 (cookie)

index 把 cookie 拿到 呈現可以登出畫面

再來做 logout.php


加入會員功能（註冊，登入，登出）
路由： 
register.php 註冊頁面
handle_register.php 處理註冊邏輯

login.php 登入
handle_login.php 處理登入邏輯
logout.php 登出

會員id
會員username
會員密碼
會員暱稱
會員建立時間