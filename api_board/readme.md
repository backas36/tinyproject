# Lidemy 程式導師實驗計畫第五期
## week12作業
載入更多的按鈕需要多按一次才可以消失，這樣不直覺！應該要按一次就消失！
本來想到的辦法是，用邏輯判斷如果回傳留言筆數小於5就不會顯示按鈕，但是如果留言比數剛好是5筆，一樣會出現按鈕！

所以，應該要從後端那邊下手修改，但是目前擠破頭還是沒想到什麼方法可以修改....
另外，分頁可以使用sql 的 offset 或者 before (「cursor based pagination」) 來做，這邊是為了學習「cursor based pagination」所以使用 before 來做。

改天應該要為這兩種概念來好好研究與整理心得。
