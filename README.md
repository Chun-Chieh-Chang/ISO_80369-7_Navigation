# ISO 80369-7 & ISO 80369-20 醫療接頭導航系統

> 雙模式架構：互動式 React SPA（條款檢索、DVP 生成、接頭檢視）＋ 靜態投影片（科普教育）。

---

## 🏗️ 專案架構

```
ISO_80369-7_Navigation/
├── src/                        ← React SPA 主程式（Clause Explorer, DVP Generator …）
│   ├── components/             ← 8 個互動組件
│   ├── data/                   ← ISO 標準條款資料（單一事實來源 SSOT）
│   ├── i18n/                   ← 中英雙語翻譯字典
│   └── utils/                  ← Excel 匯出、i18n 輔助、單元測試
├── public/
│   ├── slides/
│   │   ├── index.html          ← ✏️ 靜態投影片（SSOT，直接編輯）
│   │   └── assets/             ← 投影片圖片資源
│   ├── assets/                 ← React App 共用圖片資源
│   └── slides-standalone.html  ← 📦 離線單檔（base64 內嵌，27 MB）
├── scripts/
│   ├── build_standalone.cjs    ← 靜態投影片離線打包工具（零 npm 依賴）
│   └── generate_icons.cjs      ← PWA 圖示生成工具
├── .github/workflows/deploy.yml ← GitHub Pages 自動部署（Vite + PWA）
├── package.json                ← v8.29.0
├── CHANGELOG.md                ← 完整版本歷程
└── DEV_LOG.md                  ← 技術決策日誌
```

---

## 🚀 使用方式

### 開發環境（React SPA）

```bash
npm install
npm run dev          # localhost:3000
npm run build        # production dist/
npm run test         # vitest — 17 tests passing ✅
npm run lint         # tsc --noEmit
```

### 靜態投影片（無框架依賴）

直接用瀏覽器開啟：
```
public/slides/index.html
```

### 重建離線單檔

```bash
node scripts/build_standalone.cjs
```
輸出：`public/slides-standalone.html`（圖片全部 base64 內嵌，可離線攜帶）
> ⚠️ 此腳本僅使用 Node.js 內建模組（`fs`、`path`），**無需 npm install**。

---

## 🌐 線上版本

GitHub Pages 自動部署（每次推送 main 分支後觸發）：

- **React SPA**：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/`
- **靜態投影片**：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/slides/`
- **離線單檔**：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/slides-standalone.html`

---

## 📋 投影片內容大綱（12 頁）

| 頁次 | 主題 |
|------|------|
| 1 | 封面：ISO 80369 系列概覽 |
| 2 | 真實事故：一秒看花眼的代價 |
| 3 | 歷史原罪：管路大雜燴時代 |
| 4 | 解法：6% 錐度的幾何防呆 |
| 5 | 真實接頭圖鑑與 CAD 藍圖 |
| 6 | 三大核心規格（尺寸、扭矩、材料）|
| 7 | 第一道大關：標準裝配 SOP |
| 8 | 核心測試（一）：正壓漏液 vs 負壓漏氣 |
| 9 | 核心測試（二）：抗拉拔與耐應力龜裂 |
| 10 | 防呆互斥：不同系統插不進去的設計 |
| 11 | 從圖紙到病房的完整旅程 |
| 12 | 總結：把安全刻在形狀裡的極致溫柔 |

---

## 🔒 敏感資料說明

| 路徑 | 狀態 | 說明 |
|------|------|------|
| `isodoc/` | 🚫 .gitignore | ISO 原廠標準 PDF，不入库（版權限制） |
| `.env*` | 🚫 .gitignore | 環境變數範本（`.env.example` 除外） |
| `.agnes/` | 🚫 .gitignore | AI 助手快取檔案 |

---

## 🧪 單元測試覆蓋

```bash
npm run test
```

- **17/17 tests passing** ✅
- 涵蓋：Clause 6.1–6.6 數據校驗、i18n 字典完整性、Excel 匯出（zh/en）、ISO 80369-20 預條件規格

---

*Created by Wesley Chang, QC Dept. @Mouldex · v8.29.0 · 2026-09-05*
