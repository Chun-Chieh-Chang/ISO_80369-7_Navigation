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
├── package.json                ← v8.36.0
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
npm run build:standalone
# 或直接執行：node scripts/build_standalone.cjs
```
輸出：`public/slides-standalone.html`（圖片全部 base64 內嵌，可離線攜帶）
> ⚠️ 此腳本僅使用 Node.js 內建模組（`fs`、`path`），**無需額外安裝依賴**。

---

## 🌐 線上版本

GitHub Pages 自動部署（每次推送 main 分支後觸發）：

- **React SPA**：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/`
- **靜態投影片**：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/slides/`
- **離線單檔**：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/slides-standalone.html`

---

## 📋 投影片內容大綱（12 頁）

| 頁次 | 主題 | 核心亮點 |
|------|------|----------|
| 1 | 封面導引：ISO 80369 系列概覽 | 開發者「兩本合參」核心概念：-7 規格合格線 ⟷ -20 治具與方法 |
| 2 | 真實痛點：一秒看花眼的代價 | 靜脈輸液（IV）錯接胃管牛奶的致命醫療悲劇 |
| 3 | 歷史原罪：管路大雜燴時代 | 傳統魯爾 6% 錐度太好用導致全院通配的制度性反噬 |
| 4 | 頂層破局：幾何物理防呆哲學 | 專用通道防呆（ENFit、NRFit、Luer 幾何互斥） |
| 5 | 7 號解碼：MECE 接頭圖鑑與圖紙 | 凱益 (Mouldex) D09/D10/C09/SA 實物圖鑑 ＋ ISO 官方圖 B.1~B.6 雙軸解析 |
| 6 | 關係透析：一秒搞懂 -7 與 -20 分工 | 考駕照、NCAP碰撞、研發工程師 DVP 閉環三大接地氣比喻 |
| 7 | 裝配前置：標準裝配程序 SOP | ISO 80369-20 附錄 D/F/G/H 裝配規範（26.5~27.5 N 軸向推力 + 0.08~0.12 N·m 旋緊扭矩） |
| 8 | 密封雙子星：正壓漏液 vs 負壓漏氣 | 300 kPa 水壓防滲漏 vs 88 kPa 抽吸防氣栓 |
| 9 | 機械三大極限：抗拉拔、抗鬆脫、耐滑牙 | 35 N 軸向拉脫、0.02 N·m 自鬆抵抗、0.17 N·m 粗暴抗滑牙 |
| 10 | 時空大考：環境應力龜裂 vs 防呆互斥 | 48h 常溫常濕乾燥靜置 vs 條文 5 三維 CAD 空間干涉分析零互插 |
| 11 | 產業閉環：從圖紙到病房的完整旅程 | 規格制定 ➔ 模具量產 ➔ 機台確效 ➔ 臨床護航全鏈路 |
| 12 | 總結昇華：把安全刻在形狀裡的極致溫柔 | 幾何防呆的本質善意：用微米精準換來病床邊的一秒安心 |

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
