# Drive Uploader

Drive Uploader 是一個可以將檔案上傳 CSV 檔案到 Google Drive 的小工具


## 設定 Google OAuth 驗證

依照 [Google Drive API 文件](https://developers.google.com/drive/api/quickstart/nodejs#set_up_your_environment) 設定環境，包括以下步驟：

1. [啟用API](https://console.cloud.google.com/flows/enableapi?apiid=drive.googleapis.com&hl=zh-tw)
2. [設定 OAuth 同意畫面](https://console.cloud.google.com/apis/credentials/consent?hl=zh-tw)
3. [建立憑證](https://console.cloud.google.com/apis/credentials?hl=zh-tw)
4. 下載憑證檔案，並將憑證檔案放到專案根目錄下，並命名為 `credentials.json`


## 使用方法

1. 在 `settings.json` 中設定 Google Drive 的目標資料夾 ID，請確認您有權限上傳檔案到該資料夾
2. 將待上傳的檔案放到 `to-upload` 資料夾中
3. 執行 `npm run start`
4. 如果是第一次執行，會跳出 Google 登入頁面，請登入您的 Google 帳號


## OAuth 設定

在登入 Google 帳號後，會產生一個 `token.json` 檔案，裡面包含了 OAuth 的資訊，如果您想要更換 Google 帳號，請刪除 `token.json` 重新登入

或是您也可以在其他地方產生 `token.json`，並將其放到專案根目錄下，這樣就可以跳過登入的步驟