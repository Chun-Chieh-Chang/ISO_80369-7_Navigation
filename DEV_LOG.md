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

---

## 版本：v1.2 UI/UX 可視寬度極致擴充與 13px 最低字級規範 (2026-07-26)

### 需求內容
1. 全站 UI/UX 文字最小不得小於 13px (≥ 13px)。
2. 重新規劃頁面佈局，極致擴增可視寬度，顯著減少畫面左右兩側過度留白。

### 過程紀錄與問題分析 (RCA & CAPA)

#### 1. 高解析度螢幕左右留白過大 (RCA)
- **問題描述**：大螢幕 (1080p, 2K, 4K) 上畫面兩側有超過 300px~500px 的無效留白，擠壓表格與圖表可視空間。
- **原因分析 (RCA)**：主容器限制於 `max-w-7xl` (1280px)。
- **矯正措施 (CAPA)**：將 `App.tsx` 與 `Header.tsx` 的容器上限提高至 `max-w-[1920px] w-[96%]`，將兩側 Margin 控制在黃金比例 2%，提升資訊呈現密度與圖表可讀性。

#### 2. 微型字級難以辨識與規範要求對齊 (RCA)
- **問題描述**：部分微型標籤、SVG 圖表與腳註文字使用 `10px`~`12px` (`text-xs`)，長時間閱讀容易無視覺焦點或疲勞。
- **原因分析 (RCA)**：Tailwind 預設 `text-xs` 為 `12px` (0.75rem)，且 SVG 內直寫 `fontSize="12"`。
- **矯正措施 (CAPA)**：
  1. 於 `src/index.css` Tailwind `@theme` 與 `.text-xs` 全域防禦規則中強制設定 `font-size: 13px !important; line-height: 1.4 !important;`。
  2. 批量將 `ISOStandardFigureRenderer.tsx` 內 120+ 處 SVG 標籤 `fontSize="12"` 升級為 `fontSize="13"`。
  3. 升級所有導覽頁籤與頁腳說明文字為 13px/14px。

### 結論
經軟體確效（`npx tsc --noEmit` 與 `npm run build`）驗證，專案完美通過型別檢查與建置，全站可視區域與字級均達到目標標準。

---

## 版本：v1.3 全自動工具調用模式與極致莫蘭迪專業視覺系統 (2026-07-26)

### 需求內容
1. 啟動 Tool-Calling 全自動工具調用模式。
2. 進行界面排佈最佳化與配色專業化 (Morandi Industrial Precision Design System)。

### 過程紀錄與問題分析 (RCA & CAPA)

#### 1. 色彩體系與視覺質感升級 (CAPA)
- **矯正措施 (CAPA)**：引進 `Morandi Industrial Precision` 莫蘭迪高級灰調色體系，在 `src/index.css` 建立 Design Tokens 變數，包含 `--color-slate` 色階、`--color-brand` 與毛玻璃玻璃質感 `.glass-panel` 及高級卡片 `.premium-card` 等樣式。

#### 2. 元件層次與微動畫微調 (CAPA)
- **矯正措施 (CAPA)**：
  1. 重構 `Header.tsx` 使用 `glass-panel` 毛玻璃頂部懸浮效果，加上霧面藍紫漸層 Icon 徽章與活躍頁籤 Hover 過渡。
  2. 優化 `TopicClauseExplorer.tsx` 與 `ClauseComparisonMatrix.tsx` 卡片 hover 浮動陰影 (`0 6px 16px`)、Morandi 色系 Tag 標籤與柔和邊框。

### 結論
全站介面品質提升至國際頂尖水準，完全符合「可親近的高級感 (Approachable Luxury)」與工業級精度視覺訴求，經 `npx tsc --noEmit` 及 `npm run build` 雙重軟體確效完全跑通。



