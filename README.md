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

- **🔍 主題導向條文對照庫 (Topic Explorer)**：橫向整合 ISO 80369-7 規格條文與 ISO 80369-20 實驗室測試方法，支援關鍵字與主題快速篩選，並提供手機端 Segmented Control 視圖切換。
- **Activity 壓差降極限 (ΔPmax) 即時換算計算器**：內建 ISO 80369-20:2024 動態對算工具，預設 Δt=20s, V=8.5mL，自動換算 Pa, kPa, mbar 極限壓降，並完整收錄測試總容積 V 3 大測定法（尺寸計算、系統注水、組合量測）與剛性防呆要求。
- **⚖️ 雙標準對照矩陣 (Comparison Matrix)**：一目瞭然比較 ISO 7 與 ISO 20 之間的定量裝配扭力、加壓/加力數值、持壓時間與指定金屬夾具，支援 CSV 匯出與手機端條文卡片檢視 (Mobile Card Mode)。
- **🔧 規範圖號庫與校驗認證卡 (Connector Inspector & Reference Standards)**：收錄完整 Fig.A.1 ~ K.1 規範圖號，提供高精細向量圖表渲染，並整合 ISO 80369-7:2021 Annex C.1 金屬參考接頭 4 大製造、幾何公差、校驗 (Calibration) 與認證 (Certification) 規範。
- **🕸️ 條文脈絡圖表 (Visual Map)**：視覺化展現條文間的跨領域防錯 (Non-interchangeability) 網絡與試驗依賴關係，在手機端自動適配為垂直引導步驟卡片 (Step 1➔2➔3➔4)。
- **📋 DVP 與報告生成器 (DVP Generator)**：根據產品類別與金屬夾具配置，自動產生合規之設計驗證計畫 (DVP) 建議。

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

