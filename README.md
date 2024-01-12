# Drive Uploader

Drive Uploader 是一個可以將檔案上傳到 Google Drive 的小工具


## 設定 Google 服務帳戶驗證

### 創建服務帳戶：

1. 打開 [GCP 服務帳戶頁面](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?hl=zh-tw&supportedpurview=project)
2. 選取您的專案
3. 點選建立服務帳戶
4. 輸入服務帳戶名稱，然後點選建立並繼續
5. 點選完成

### 創建服務帳戶密鑰：

1. 在服務帳戶列表中，點選您創建的服務帳戶
2. 點選金鑰分頁
3. 點選新增金鑰，然後選取建立新的金鑰
4. 金鑰類型選擇 JSON，然後點選建立
5. 瀏覽器將會自動下載金鑰 JSON 檔案，請將其儲存到專案根目錄下，並命名為 `credentials.json`


### 分享 Google Drive 資料夾：

1. 打開您希望分享的 Google Drive 資料夾
2. 新增服務帳戶的信箱到分享名單中，角色選擇編輯者


## 使用方法

1. 執行 `npm run start`
2. 如果是第一次執行，需要進行幾項設定：
   1. 登入 Google 帳號：跳出 Google 登入頁面，請登入您的 Google 帳號
   2. 填入上傳目的地的資料夾 ID：請填入 Google Drive 上傳目的地的資料夾 ID
   3. 填入上傳資料夾的路徑
3. Drive Uploader 會將資料夾下的所有檔案上傳到 Google Drive 上傳目的地的資料夾下
