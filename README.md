# ISO 80369-7 醫療接頭救命科普堂

> 一份通俗易懂的科普投影片，把 ISO 80369-7 與 ISO 80369-20 兩本醫療器材標準講成每個人都能聽懂的生命工程故事。

---

## 📂 專案結構

```
ISO_80369-7_Navigation/
├── public/
│   ├── slides/
│   │   ├── index.html              ← ✏️ 唯一編輯來源（SSOT）
│   │   └── assets/ → (symlink)
│   ├── assets/                     ← 圖片資源（實體）
│   └── slides-standalone.html      ← 📦 自攜帶單檔（27 MB，含圖 base64）
├── scripts/
│   └── build_standalone.cjs        ← 建置工具
├── .github/
│   └── workflows/deploy.yml        ← GitHub Pages 自動部署
└── DEV_LOG.md
```

---

## 🚀 使用方式

### 本地預覽

直接用瀏覽器開啟：

```
D:\...\public\slides\index.html
```

或使用任意靜態伺服器（如 VS Code Live Server）。

### 重建獨立單檔

編輯完 `public/slides/index.html` 後，執行：

```bash
node scripts/build_standalone.cjs
```

輸出：`public/slides-standalone.html`（圖片全部 base64 內嵌，可離線攜帶）

**注意**：此腳本僅使用 Node.js 內建模組（`fs`、`path`），**無需 npm install**。

---

## 🌐 線上版本

GitHub Pages 自動部署（每次推送 main 分支後觸發）：

- 投影片：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/slides/`
- 離線單檔：`https://Chun-Chieh-Chang.github.io/ISO_80369-7_Navigation/slides-standalone.html`

---

## 📋 投影片內容大綱

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

*本專案為純靜態 HTML，無需任何前端框架或建置工具即可預覽。*
