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
