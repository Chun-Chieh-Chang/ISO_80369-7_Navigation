<div align="center">
  <h1>ISO 80369-7 & ISO 80369-20 Clause Retrieval & Visual Navigation System</h1>
</div>

## 專案簡介 (Introduction)

本系統為專為醫療器材研發、品保 (QA)、法規 (RA) 與測試實驗室工程師設計的 **ISO 80369-7:2021** 與 **ISO 80369-20:2015/2024** 醫療小口徑連接器條文檢索與視覺化導航系統。提供互動式條文探索、測試參數配置、以及高對比度的視覺化介面。

## 系統特色 (Features)

- **條文關聯地圖**：視覺化展示 ISO 80369-7 與 ISO 80369-20 各測試方法之間的依賴關係。
- **條文對比矩陣**：提供測試條件與判定基準的快速檢索。
- **連接器檢視器**：依據法規嚴格把關參考接頭 (Reference Connectors) 的選用標準。
- **測試參數配置**：即時驗證裝配扭矩、測試扭力、拉力與保持時間是否符合法規要求。
- **DVP 報告產出**：依據配置生成設計驗證計畫 (Design Verification Plan) 的合規建議。

## 開發環境與執行 (Run Locally)

**Prerequisites:** Node.js (v18+)

1. 安裝依賴套件:
   ```bash
   npm install
   ```
2. 啟動開發伺服器:
   ```bash
   npm run dev
   ```
3. 生產環境打包:
   ```bash
   npm run build
   ```

## 技術棧 (Tech Stack)
- React 19 (Vite)
- Tailwind CSS v4
- TypeScript
- Lucide React (Icons)
