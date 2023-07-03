
# URL Shortener

這是一個短網址產生器

## 專案畫面
![MyImage](https://github.com/mmm999xp/Url-Shortener/blob/master/url-shortener-image.png)

## 專案功能
* 使用者可以在表單輸入原始網址，如 https://www.google.com，送出表單
* 畫面會回傳格式化後的短網址，如 http://localhost:3000/shorturl/VYD9j
* 在**伺服器啟動期間**，使用者可以在瀏覽器的網址列，輸入提供的短網址（如 http://localhost:3000/shorturl/VYD9j）
* 瀏覽器就會根據短網址導向原本的網站（如 https://www.google.com）
* 在回應頁面，使用者可以點擊連結直接前往原始網站
* 在回應頁面，使用者可以點擊Copy按鈕來快速複製

## 使用限制
* 網址最後後面的斜線為可選的，系統會自動判斷 如 https://www.google.com 與 https://www.google.com/ 皆不會出錯
* 網址需要是ftp或http或https其中一種，否則將無法正常運行

## 環境建置
* node.js
* mongoDB
  

## 專案安裝流程
0.請先到mongoDB註冊登入並取得資料庫金鑰(key)

1.確保您的電腦安裝node.js之後開啟終端機輸入以下指令下載專案
```
git clone https://github.com/mmm999xp/Url-Shortener
```
2.進入專案資料夾，並建立.env檔案，並在其中輸入以下內容(<>中的內容請依取得的金鑰做替換)
```
MONGODB_URI = mongodb+srv://<user_name>:<password>@cluster0.z4m2yov.mongodb.net/URLshortener?retryWrites=true&w=majority
```
3.終端機輸入以下指令安裝npm
```
npm install
```
4.終端機輸入以下指令開啟伺服器
```
npm run dev
```
5.開啟任意瀏覽器輸入網址就可以進入畫面囉
```
http://localhost:3000
```

