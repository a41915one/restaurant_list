## Restaurant List

![image](https://raw.githubusercontent.com/a41915one/restaurant_list/main/restaurant_list_ReadMepicture_v2.PNG)

功能描述(features)

+ 註冊、登入、登出功能
  - Email及密碼即可註冊
  + 登出及註冊失敗時顯示相關訊息於網頁上
  + 帳號各自擁有自己的餐廳資料
  + 支援Facebook註冊功能
+ 官網顯示出所有餐廳的簡單資料，包含圖片、名稱、評分、類別等
+ 點擊餐廳可以看到各餐廳詳細資訊
  - 大圖片
  + 類別
  + 地址
  + 電話
  + 描述
+ 搜尋功能，依照餐廳名稱或分類關鍵字搜尋，呈現有相同字的餐廳
+ 刪除功能，刪除選定餐廳
+ 編輯功能，編輯選定餐廳的資訊
+ 新增功能，新增一間餐廳


## 環境建置與需求 (prerequisites)

| Option | Description |
| ------ | ----------- |
| Node.js   | @14.16.0 |
| express | @4.18.2 |
| express-handlebars | @3.0.0 |
| bootstrap | @5.1.3 |
| method-override| @3.0.0 
| mongoose | @5.9.7 |
| body-parser | @1.20.2 |


安裝與執行步驟(installation and execution)

1. 請先確認有安裝node.js 與 npm
2. 將此專案clone到本地
3. 在終端機上安裝express
```
npm install express@4.18.2
```
4. 在終端機上安裝express-handlebars，輸入 
```
npm i express-handlebars@3.0.0
```
5. 在終端機上啟動伺服器，輸入
```
nodemon app.js
```

6. 終端機顯示以下字樣，表示成功啟動
```
Express is listening on localhost:3000
```
