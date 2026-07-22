# 開發日誌 (DEV_LOG)

## 版本：v1.0 基準點建立 (2026-07-22)

### 需求內容
1. 執行專案全面盤點與清理，移除冗餘無效程式碼與檔案。
2. 同步更新開發文件，包含 `DEV_LOG.md` 與 `README.md`，使文件符合最新功能與系統定位。
3. 遵循 MECE 原則，整合目錄資源，確保架構相互獨立、完全窮盡。
4. 建立 Git 版本還原基準點。
5. 推送變更至 GitHub 遠端倉庫 `main` 分支。

### 過程紀錄與問題分析 (RCA & CAPA)

#### 1. TypeScript 型別定義錯誤 (RCA)
- **問題描述**：`src/data/isoTopicsData.ts` 編譯時出現型別錯誤：`Type '"analysis"' is not assignable to type '"apparatus" | "connector_cad" | "fixture" | "mechanism"'`。
- **原因分析 (RCA)**：`FigureType` 的聯合型別 (Union Type) 中缺少 `'analysis'`，導致資料檔中的 `figureType: 'analysis'` 不被接受。
- **矯正措施 (CAPA)**：在 `src/types.ts`（現已遷移為 `src/types/index.ts`）的 `FigureType` 定義中補齊 `'analysis'`。

#### 2. 未使用的合規引擎邏輯 (RCA)
- **問題描述**：發現 `src/utils/complianceEngine.ts` 包含完整的合規判定演算法，但全專案 UI 均未引用此模組。
- **原因分析 (RCA)**：可能為先前迭代時遺留的廢棄實作，或未完成整合之功能。
- **矯正措施 (CAPA)**：基於 MECE 與最小化程式碼膨脹原則，經與使用者確認後，將該獨立且未使用的檔案移除。

#### 3. 專案目錄未模組化 (RCA)
- **問題描述**：`types.ts` 直接散落於 `src` 根目錄，與 `components`、`data` 等模組化設計不一致。
- **原因分析 (RCA)**：初期開發時型別較少，未獨立資料夾管理。
- **矯正措施 (CAPA)**：建立 `src/types/` 目錄並將其重新命名為 `index.ts`，由 Vite/TS 的模組解析器自動處理 `../types` 匯入，達成目錄架構的 MECE 歸類標準。

#### 4. 冗餘臨時腳本
- **矯正措施 (CAPA)**：刪除專案根目錄不再使用的 `fix.sh` 與 `fix_scroll.sh`。

### 結論
本次優化確立了 `v1.0` 的穩定版本基準，排除所有的編譯錯誤與遺留檔案，提升未來功能疊加的魯棒性與安全性。

---

## 版本：v1.1 GitHub Pages 自動化部署設定 (2026-07-22)

### 需求內容
1. 於 GitHub Pages 上建立與部署前端操作介面。
2. 配置自動化工作流，確保推送 `main` 分支時自動執行軟體確效（型別與建置檢驗）並發布。

### 過程紀錄與問題分析 (RCA & CAPA)

#### 1. 資源相對路徑適配與 404 排除 (RCA)
- **問題描述**：GitHub Pages 存取時出現 `404 Failed to load resource` 錯誤。
- **原因分析 (RCA)**：
  1. 使用相對路徑 `base: './'` 時，若存取 URL 結尾缺少斜線 `/`（如 `/ISO_80369-7_Navigation`），瀏覽器會將 `./assets/` 解析至根網域 `https://<user>.github.io/assets/` 導致 404。
  2. GitHub Pages 預設會使用 Jekyll 引擎處理檔案，可能過濾特定的資產目錄。
- **矯正措施 (CAPA)**：
  1. 在 `vite.config.ts` 指定精確的倉庫 base path：`base: '/ISO_80369-7_Navigation/'`。
  2. 於 `public/` 目錄下建立 `.nojekyll` 檔案，停用 GitHub Pages Jekyll 預設過濾機制。

#### 2. CI/CD 部署自動化 (CAPA)
- **矯正措施 (CAPA)**：建立 `.github/workflows/deploy.yml` 自動化工作流腳本。流程包含 `npx tsc --noEmit` 軟體確效防禦、`npx vite build` 產出打包，並自動透過官方 `actions/deploy-pages@v4` 上傳發布。

