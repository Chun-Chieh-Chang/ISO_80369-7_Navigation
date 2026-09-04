<div align="center">
  <h1>ISO 80369-7 & ISO 80369-20 條文檢索與視覺化導航系統</h1>
  <p><strong>Medical Device Small-Bore Connectors Clause Retrieval & Visual Navigation System</strong></p>
</div>

---

## 專案簡介 (Introduction)

本系統為專為醫療器材研發 (R&D)、品質保證 (QA)、法規審查 (RA) 與第三方認證測試實驗室工程師設計的 **ISO 80369-7:2021** (血管/皮下魯爾接頭規格) 與 **ISO 80369-20:2015/2024** (通用測試方法) 專業條文檢索與視覺化導航系統。

系統提供主題導向的條文檢索、雙向標準對照矩陣、向量級 SVG 裝置圖表渲染、最壞情況參考夾具導航以及自動化 DVP 驗證計畫生成。

---

## 系統核心特色 (Key Features)

- **🌐 國際雙語即時切換 (Bilingual i18n System)**：原生輕量化 React Context 字典架構（零肥大依賴），頂部一鍵無縫切換繁體中文 ⇄ English，支援 `localStorage` 狀態記憶與 URL 參數自動偵測（如 `?lang=en`），外國客戶可直接開啟全英文視圖。
- **📋 設計驗證矩陣表與報告要件 (DVP Generator & Section .5 Checklist)**：
  - 完整收錄 ISO 80369-7:2021 Clause 6.1~6.6 物理性能測試規範矩陣，支援公/母接頭與 L1 (Slip) / L2 (Lock) 即時動態切換。
  - ISO 80369-20:2024 Section .5 測試報告 14 大法定必填項目 (a~n) 中英文雙軌檢核清單，支援多語系 CSV 匯出。
- **📊 專業醫療級 Excel (.xlsx) 雙語工作簿匯出**：採用原生 ExcelJS 生成符合 A4 橫向單頁列印規格之高質感工作簿，依語系切換輸出全中文或全英文 3 大工作表：
  1. `ISO20 Report 14 Items`（14 大法定報告欄位檢核）
  2. `DVP Test Matrix`（DVP 完整設計驗證矩陣）
  3. `Preconditioning Specs`（ISO 80369-20:2024 Clause 4 / Section .2 標準大氣環境預處理規格）
- **🔍 主題導向條文對照庫 (Topic Explorer)**：橫向整合 ISO 80369-7 規格條文與 ISO 80369-20 實驗室測試方法，採用「階段一：前置預裝配」與「階段二：實測考驗負載」雙工況展開卡片。
- **⚡ 壓差降極限 (ΔPmax) 即時換算計算器**：內建 ISO 80369-20:2024 動態對算工具，預設 $\Delta t=20\text{s}, V=8.5\text{mL}$，自動換算 Pa, kPa, mbar 極限壓降，並完整收錄測試總容積 V 3 大測定法與剛性防呆要求。
- **⚖️ 雙標準對照矩陣 (Comparison Matrix)**：一目瞭然比較 ISO 7 與 ISO 20 之間的定量裝配扭力、加壓/加力數值、持壓時間與指定金屬夾具，支援 CSV 匯出與手機端條文卡片檢視 (Mobile Card Mode)。
- **🔧 規範圖號庫與校驗認證卡 (Connector Inspector & Reference Standards)**：收錄完整 Fig.A.1 ~ K.1 規範圖號，提供高精細向量圖表渲染，並整合 ISO 80369-7:2021 Annex C 金屬參考接頭（含最壞情況 C.3/C.6）4 大製造、幾何公差、校驗與認證規範。
- **🕸️ 條文脈絡圖表 (Visual Map)**：視覺化展現條文間的跨領域防錯 (Non-interchangeability) 網絡與試驗依賴關係，在手機端自動適配為垂直引導步驟卡片。
- **📽️ ISO 80369 通俗全解互動投影片 (Interactive Slides & Standalone Bundle)**：
  - 收錄共 12 頁深度科普投影片（`public/slides/index.html`），以平易近人的生活化語言解析 6% 錐度密封、防呆互斥、高壓防漏與力學極限試驗。
  - 支援無依賴單檔版（`public/slides-standalone.html`），將所有真實產品照片與規範 CAD 圖紙以 Base64 內聯，可單檔攜帶至任何無網路環境開啟。
  - 頂部導航列常駐「🏭 凱益 Mouldex 接頭專區 ↗」傳送門，並署名 `Created by Wesley Chang, QC Dept. @Mouldex, Sept-2026`。
- **📲 醫療級 PWA 離線應用程式 (Progressive Web App)**：支援 Android / iOS 手機一鍵「新增至主畫面」獨立全屏運行，內建 Workbox 自動預快取，支援實驗室斷網環境 100% 離線檢視。

---

## UI/UX 設計規範與視覺系統 (Design System)

- **📱 手機端與寬螢幕雙模響應 (Mobile & Widescreen Responsive Layout)**：桌上型電腦支援 `max-w-[1920px] w-[96%]` 寬螢幕全景檢視；手機端 (375px~768px) 支援 Tab 列與 Chip 橫向順暢滾動 (`overflow-x-auto, no-scrollbar`)，且全站按鈕觸控區皆符合至少 `44px x 44px` 觸控防誤觸標準。
- **13px 最低字級防禦 (Min Font Size ≥ 13px)**：全站 UI 文字與 SVG 向量圖表文字嚴格維持最少 13px (`0.8125rem`)，確保法規細節清晰易讀。
- **莫蘭迪高級灰調色體系 (Morandi Color System)**：Morandi 低飽和色彩配搭玻璃質感面板 (`glass-panel`) 與層次卡片 (`premium-card`)，符合醫材軟體「可親近的高級感」。

---

## 開發環境與執行 (Run Locally)

**Prerequisites:** Node.js (v18+) / npm / bun

1. 安裝依賴套件:
   ```bash
   npm install
   ```
2. 啟動本地開發伺服器:
   ```bash
   npm run dev
   ```
3. 執行 TypeScript 靜態型別確效:
   ```bash
   npx tsc --noEmit
   ```
4. 生產環境打包:
   ```bash
   npm run build
   ```

---

## 技術棧 (Tech Stack)
- **Core**: React 19 (Vite 6)
- **Styling**: Tailwind CSS v4 (Morandi Color System + Glassmorphism)
- **Language**: TypeScript 5.7+
- **Icons**: Lucide React

