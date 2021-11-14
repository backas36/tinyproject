# Lidemy 程式導師實驗計畫第五期
## week12作業 
## project 說明
todo list 有全部刪除，刪除已完成，還有分類已完成 跟 未完成功能！
可以將狀態儲存的後端，下次登入可以帶 url params 就可以恢復狀態！

# 心得
- todo的 i 該怎麼解決呢 pointer-events: none; -->
- remove empty detach https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/268357/

- 選了 show Completed Tasks 之後，再去 add todo 會沒辦法保持狀態 URL.serachParams
https://pjchender.blogspot.com/2018/08/js-javascript-url-parameters.html

- 超方便的 jquery getJSON

- 在php每次都忘記轉換 todosId 為數字

- 原本狀態點在 Show Completed Tasks 下，然後再去新增 todo task後，狀態還是顯示 show completed tasks ，但是底下的 task 是 show all，所以去查了一下怎麼設定 radio checked，邏輯部分一開始有點打結，後來打開了，就是要從新增todo的那個區塊去重新設定哪個 radio 要 checked ，並帶入 render function

- 清除已完成功能的困難，查了一下怎麼找出所有 isCompleted 的 index ，之後更是卡關，因為要用 splice 刪除不連續的 todo
在 todo 編輯 input focus 一直沒辦法用成功，後來發現放的順序錯了！ 之後寫程式需要注意程式 flow 順序

- 這個做法是以資料為基礎去顯示 UI，但這比較適合小專案，因為每次都會先清空 DOM 再重新加入，如果有上百個上千個上萬個 todo 那就會耗時間！另一個做法是以操作 UI 為基礎去實現！一開始看到作業題目直覺是想到以資料為基礎去做，後來老師說有這兩種做法，但我反而比較不能理解 操作 UI 的做法，改天再來練習看看！
