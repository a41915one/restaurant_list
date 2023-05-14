

## Tables

| 環境建置與需求 (prerequisites) | Description |
| ------ | ----------- |
| node.js | v14.16.0 | 
| express | 4.16.4 |
| express-handlebars | 3.0.0 |
| bootstrap | 5.1.3 |


安裝與執行步驟 (installation and execution)

1. 安裝node.js 與npm
2. 開啟終端機，clone此專案到本地 git clone https://github.com/a41915one/restaurant_list.git
3. 終端機上安裝express npm i express@4.16.4 
4. 在終端機上安裝express-handlebars npm i express-handlebars@3.0.0 
5. 終端機上啟動伺服器 nodemon app.js
6. 若成功啟動，終端機會顯示以下文字 Express is listening on localhost:3000


## Lists

功能描述

+ 首頁呈現所有餐廳簡單資訊，包括照片、店名、分類、評分
+ 點擊餐廳會出現餐廳詳細資料
+ 搜尋功能可以依照店名或分類找到符合關鍵字的餐廳