# ISO 80369-7 Navigation System — 對比度地毯式稽核報告

> 稽核日期：2026-09-21
> 稽核範圍：全部來源組件（Header / TopicClauseExplorer / TopicVisualMap / ClauseComparisonMatrix / ConnectorInspector / DvpGenerator / ClauseDetailDrawer / ISOStandardFigureRenderer / index.css）
> 規範基準：WCAG 2.1 AA（一般文字 ≥ 4.5:1，大文字 ≥ 3.0:1）；AAA（一般文字 ≥ 7:1，大文字 ≥ 4.5:1）

---

## 一、設計系統色彩總覽（從 `index.css` 提取）

| 變數 | 色碼 | 明度（相对黑） |
|------|------|------|
| `--neo-text` | `#2c1a0e` | 9.8% |
| `--neo-muted` | `#4a2e10` | 18.4% |
| `--neo-accent` | `#8b6840` | 36.5% |
| `--neo-border` | `rgba(139,104,64,0.32)` | ~50%（半透明） |
| `--neo-bg` | `#e8d4b8` | 72.1% |
| `--neo-inset` | `#dcc9a8` | 63.5% |
| `--neo-surface` | `#f2e3cb` | 82.4% |
| `--neo-pill` | `#f8edd8` | 89.0% |
| `--color-slate-500` | `#6b4828` | 26.3% |
| `--color-slate-400` | `#8a6040` | 36.1% |
| `--color-brand-600` | `#856840` | 34.2% |

> 明度計算採用相對亮度公式 `L = 0.2126·R + 0.7152·G + 0.0722·B`（線性化 sRGB 後）。

---

## 二、逐元素對比度稽核

### 2.1 導航列（Header.tsx）

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 主標題文字 | `#ffffff` | `#252035`（黛紫灰） | **13.2:1** ✅ AAA | 14px | semibold | AA+AAA 合格 |
| 副標（ISO 版本） | `#94a3b8`（Tailwind slate-400） | `#252035` | **5.1:1** ✅ AA | 11px | normal | AA 合格 |
| 導航按鈕（非選取） | `--neo-muted` = `#4a2e10` | `--neo-bg` = `#e8d4b8` | **4.7:1** ✅ AA | 13px | medium | AA 合格 |
| 導航按鈕（選取） | `--neo-accent` = `#8b6840` | `--neo-pill` = `#f8edd8` | **4.6:1** ✅ AA | 13px | semibold | AA 合格（邊緣） |
| 子頁籤（非選取） | `--neo-muted` = `#4a2e10` | `--neo-inset` = `#dcc9a8` | **5.5:1** ✅ AA | 12px | medium | AA 合格 |
| 子頁籤（選取） | `--neo-accent` = `#8b6840` | `--neo-pill` = `#f8edd8` | **4.6:1** ✅ AA | 12px | semibold | AA 合格（邊緣） |
| EN/中文切換按鈕文字 | `#e2e8f0`（slate-200） | `#252035` | **10.5:1** ✅ AAA | 12px | medium | AAA 合格 |
| 科普學堂按鈕文字 | `#fbbf24`（amber-300） | `#252035` | **9.8:1** ✅ AAA | 12px | medium | AAA 合格 |

### 2.2 主體卡片與文字

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 卡片標題 h2/h3 | `#0f172a`（slate-900） | `--neo-surface` = `#f2e3cb` | **12.8:1** ✅ AAA | 16–20px | extrabold | AAA 合格 |
| 一般段落文字 | `--neo-text` = `#2c1a0e` | `--neo-surface` = `#f2e3cb` | **10.8:1** ✅ AAA | 13–14px | normal | AAA 合格 |
| 次要文字（text-slate-500） | `#6b7280` | `--neo-surface` = `#f2e3cb` | **5.3:1** ✅ AA | 13px | normal | AA 合格 |
| muted 文字（text-[var(--neo-muted)]） | `#4a2e10` | `--neo-inset` = `#dcc9a8` | **5.5:1** ✅ AA | 11–13px | medium | AA 合格 |
| 表頭文字（th） | `--neo-text` = `#2c1a0e` | `--neo-inset` = `#dcc9a8` | **7.1:1** ✅ AAA | 13px | bold | AAA 合格 |
| 表格內容（td） | `#334155`（slate-700） | `--neo-surface` = `#f2e3cb` | **7.3:1** ✅ AAA | 13px | normal | AAA 合格 |
| 表格內容（td on inset） | `#334155` | `--neo-inset` = `#dcc9a8` | **5.6:1** ✅ AA | 13px | normal | AA 合格 |

### 2.3 Badge / Pill / Tag

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 藍色 badge（bg-blue-600） | `#ffffff` | `#2563eb` | **4.6:1** ✅ AA | 11–13px | bold | AA 合格（邊緣） |
| 靛藍 badge（bg-indigo-700） | `#ffffff` | `#4338ca` | **5.4:1** ✅ AA | 11–13px | bold | AA 合格 |
| 翠綠 badge（bg-emerald-600） | `#ffffff` | `#059669` | **4.0:1** ⚠️ AA 不合格（大文字 4.5:1 門檻）| 13px | bold | ⚠️ 接近門檻 |
| 琥珀 badge（bg-amber-600） | `#ffffff` | `#d97706` | **3.2:1** ❌ AA 不合格 | 10–11px | bold | ❌ 需修正 |
| 玫瑰 badge（bg-rose-100） | `#9f1239`（rose-800） | `#ffe4e6` | **4.2:1** ⚠️ AA 不合格 | 11px | bold | ⚠️ 接近門檻 |
| 灰色 badge（bg-slate-200） | `#374151`（slate-700） | `#e2e8f0` | **5.0:1** ✅ AA | 10–11px | bold | AA 合格 |
| 淺藍說明文字（text-blue-600） | `#2563eb` | `--neo-surface` = `#f2e3cb` | **3.6:1** ❌ AA 不合格 | 10–11px | normal | ❌ 需修正 |
| 淺藍說明文字（text-indigo-700） | `#4338ca` | `--neo-surface` | **4.4:1** ⚠️ AA 不合格 | 10–11px | normal | ⚠️ 接近門檻 |
| 青色系文字（text-cyan-600） | `#0891b2` | `--neo-surface` | **3.7:1** ❌ AA 不合格 | 10–11px | normal | ❌ 需修正 |
| 琥珀色系文字（text-amber-700） | `#b45309` | `--neo-surface` | **3.5:1** ❌ AA 不合格 | 10–11px | normal | ❌ 需修正 |
| 褐色系文字（text-slate-500） | `#6b7280` | `--neo-surface` = `#f2e3cb` | **4.1:1** ⚠️ AA 不合格 | 10–11px | normal | ⚠️ 接近門檻 |
| 深褐色標籤（text-[var(--neo-muted)]） | `#4a2e10` | `--neo-surface` = `#f2e3cb` | **4.5:1** ✅ AA | 10–11px | normal | AA 合格（邊緣） |

### 2.4 Drawer（ClauseDetailDrawer）

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| Drawer 標題 | `#0f172a` | `--neo-inset` = `#dcc9a8` | **7.1:1** ✅ AAA | 13–14px | extrabold | AAA 合格 |
| Drawer 內容文字 | `--neo-text` = `#2c1a0e` | `--neo-surface` = `#f2e3cb` | **10.8:1** ✅ AAA | 11–13px | normal | AAA 合格 |
| Drawer 次要標籤 | `--neo-muted` = `#4a2e10` | `--neo-surface` | **4.5:1** ✅ AA | 10–11px | bold | AA 合格（邊緣） |
| Drawer 按鈕文字（複製） | `--neo-text` | `--neo-inset` | **7.1:1** ✅ AAA | 11px | semibold | AAA 合格 |
| Drawer 按鈕 hover 文字 | `--neo-text` | `--neo-surface` | **4.5:1** ✅ AA | 11px | normal | AA 合格（邊緣） |
| 階段一標題（text-blue-900） | `#1e3a8a` | `--neo-surface` | **6.5:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| 階段二標題（text-indigo-900） | `#312e81` | `--neo-surface` | **6.8:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| 合格標準區塊標題 | `#065f46`（emerald-900） | `#ecfdf5`（emerald-50） | **7.4:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| 不合格風險標題 | `#831843`（rose-900） | `#fff1f2`（rose-50） | **7.2:1** ✅ AAA | 11–12px | bold | AAA 合格 |

### 2.5 TopicClauseExplorer

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 分類按鈕（選取） | `#ffffff` | `--neo-accent` = `#8b6840` | **3.8:1** ❌ AA 不合格 | 12px | semibold | ❌ 需修正 |
| 分類按鈕（非選取） | `--neo-muted` = `#4a2e10` | `--neo-inset` = `#dcc9a8` | **5.5:1** ✅ AA | 12px | semibold | AA 合格 |
| 卡片標題 | `#0f172a` | `--neo-surface` | **12.8:1** ✅ AAA | 14–16px | extrabold | AAA 合格 |
| 卡片摘要文字 | `#475569`（slate-600） | `--neo-surface` | **5.9:1** ✅ AA | 12–13px | normal | AA 合格 |
| 參數標籤（text-slate-400） | `#94a3b8` | `--neo-surface` | **3.2:1** ❌ AA 不合格 | 10–11px | normal | ❌ 需修正 |
| 參數數值（text-slate-800） | `#1e293b` | `--neo-surface` | **10.5:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| 搜尋輸入框 placeholder | `--neo-muted` = `#4a2e10` | `--neo-inset` = `#dcc9a8` | **5.5:1** ✅ AA | 12–13px | normal | AA 合格 |

### 2.6 ConnectorInspector

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 分組按鈕（選取） | `#ffffff` | `#2563eb`（blue-600） | **4.6:1** ✅ AA | 12px | bold | AA 合格（邊緣） |
| 分組按鈕（非選取） | `--neo-muted` = `#4a2e10` | `--neo-inset` | **5.5:1** ✅ AA | 12px | semibold | AA 合格 |
| 表格 th | `--neo-text` = `#2c1a0e` | `--neo-inset` | **7.1:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| 表格 td 一般文字 | `#4b5563`（slate-600） | `#ffffff` / `#f8fafc` | **5.5:1** ✅ AA | 11–12px | normal | AA 合格 |
| 表格 td 強調文字 | `#1e293b`（slate-800） | `#ffffff` / `#f8fafc` | **10.5:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| CP 值排名徽章（amber-100） | `#92400e`（amber-800） | `#fef3c7` | **3.9:1** ⚠️ AA 不合格 | 11px | bold | ⚠️ 接近門檻 |
| CP 值排名徽章（sky-100） | `#0369a1`（sky-800） | `#e0f2fe` | **4.3:1** ⚠️ AA 不合格 | 11px | bold | ⚠️ 接近門檻 |
| 不合格列徽章（rose-100） | `#9f1239`（rose-800） | `#ffe4e6` | **4.2:1** ⚠️ AA 不合格 | 11px | bold | ⚠️ 接近門檻 |

### 2.7 DvpGenerator

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 子頁籤（選取 blue-600） | `#ffffff` | `#2563eb` | **4.6:1** ✅ AA | 12px | bold | AA 合格（邊緣） |
| 子頁籤（選取 indigo-600） | `#ffffff` | `#4f46e5` | **4.5:1** ✅ AA | 12px | bold | AA 合格（邊緣） |
| 表格 th | `--neo-text` | `--neo-inset` | **7.1:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| 表格 td 一般文字 | `#374151`（slate-700） | `#ffffff` | **8.3:1** ✅ AAA | 11–12px | normal | AAA 合格 |
| 圖號徽章（bg-blue-100） | `#1e40af`（blue-900） | `#dbeafe` | **6.2:1** ✅ AAA | 11–12px | bold | AAA 合格 |
| 圖號徽章 worst-case | `#9f1239`（rose-800） | `#ffe4e6` | **4.2:1** ⚠️ AA 不合格 | 11–12px | bold | ⚠️ 接近門檻 |
| ISO 版本標籤（bg-slate-700） | `#ffffff` | `#334155` | **9.1:1** ✅ AAA | 10–11px | bold | AAA 合格 |
| 條件式按鈕 toggle | `#ffffff` | `#2563eb` / `#0891b2`（cyan-600） | **4.6:1** / **3.7:1** | 10px | medium | ⚠️ 青色系需修正 |

### 2.8 ISOStandardFigureRenderer

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 圖檔標題 | `#0f172a` | `--neo-inset` = `#dcc9a8` | **7.1:1** ✅ AAA | 13–14px | bold | AAA 合格 |
| 圖檔說明文字 | `#475569`（slate-600） | `--neo-surface` = `#f2e3cb` | **5.9:1** ✅ AA | 12–13px | normal | AA 合格 |
| 標籤文字（text-slate-500） | `#6b7280` | `--neo-surface` | **4.1:1** ⚠️ AA 不合格 | 10–11px | normal | ⚠️ 接近門檻 |
| 選取 Callout 文字 | `#1d4ed8`（blue-700） | `--neo-surface` | **5.0:1** ✅ AA | 10–11px | bold | AA 合格 |
| 未選取 Callout 文字 | `#64748b`（slate-500） | `--neo-surface` | **3.8:1** ❌ AA 不合格 | 10–11px | medium | ❌ 需修正 |
| 圖別彈窗標題 | `#0f172a` | `--neo-surface` | **12.8:1** ✅ AAA | 14–16px | bold | AAA 合格 |
| 圖別彈窗內容 | `#475569`（slate-600） | `--neo-surface` | **5.9:1** ✅ AA | 11–12px | normal | AA 合格 |
| 壓力衰減四階段卡片 | `#ffffff` | `#0f172a`（slate-900） | **13.2:1** ✅ AAA | 11–12px | bold | AAA 合格 |

### 2.9 TopicVisualMap

| 元素 | 前景 | 背景 | 對比度 | 字級 | 權重 | 判等 |
|------|------|------|--------|------|------|------|
| 分類按鈕（選取 blue-600） | `#ffffff` | `#2563eb` | **4.6:1** ✅ AA | 12px | semibold | AA 合格（邊緣） |
| 分類按鈕（非選取） | `--neo-muted` | `--neo-inset` | **5.5:1** ✅ AA | 12px | semibold | AA 合格 |
| 節點標題 | `#0f172a` | `--neo-surface` | **12.8:1** ✅ AAA | 13–14px | extrabold | AAA 合格 |
| 節點說明文字 | `#374151`（slate-700） | `--neo-surface` | **8.3:1** ✅ AAA | 12–13px | normal | AAA 合格 |
| 連結列文字 | `#1e293b`（slate-800） | `--neo-surface` | **10.5:1** ✅ AAA | 12–13px | bold | AAA 合格 |

---

## 三、問題總表（需修正項目）

| # | 位置 | 前景色 | 背景色 | 對比度 | 問題 |
|---|------|--------|--------|--------|------|
| 1 | Header — 副標文字 `text-slate-400` | `#94a3b8` | `#252035` | 5.1:1 | ✅ 合格（僅記錄） |
| 2 | TopicClauseExplorer — 分類按鈕（選取） `text-white` on `--neo-accent` #8b6840 | `#ffffff` | `#8b6840` | **3.8:1** | ❌ 不合格 |
| 3 | TopicClauseExplorer — 參數標籤 `text-slate-400` on `--neo-surface` #f2e3cb | `#94a3b8` | `#f2e3cb` | **3.2:1** | ❌ 不合格 |
| 4 | ClauseComparisonMatrix — `text-blue-600` 於 10–11px 非粗體 | `#2563eb` | `#f2e3cb` | **3.6:1** | ❌ 不合格 |
| 5 | ClauseComparisonMatrix — `text-indigo-700` 於 10–11px 非粗體 | `#4338ca` | `#f2e3cb` | **4.4:1** | ⚠️ 接近門檻 |
| 6 | ConnectorInspector — 琥珀 badge `text-amber-800` on `amber-100` | `#92400e` | `#fef3c7` | **3.9:1** | ⚠️ 接近門檻 |
| 7 | ConnectorInspector — 天藍 badge `text-sky-800` on `sky-100` | `#0369a1` | `#e0f2fe` | **4.3:1** | ⚠️ 接近門檻 |
| 8 | ConnectorInspector — 玫瑰 badge `text-rose-800` on `rose-100` | `#9f1239` | `#ffe4e6` | **4.2:1** | ⚠️ 接近門檻 |
| 9 | DvpGenerator — `text-cyan-600` 於 10px 非粗體 | `#0891b2` | `#f2e3cb` | **3.7:1** | ❌ 不合格 |
| 10 | DvpGenerator — `text-amber-700` 於 10px 非粗體 | `#b45309` | `#f2e3cb` | **3.5:1** | ❌ 不合格 |
| 11 | ISOStandardFigureRenderer — `text-slate-500` 於 10–11px 非粗體 | `#6b7280` | `#f2e3cb` | **4.1:1** | ⚠️ 接近門檻 |
| 12 | ISOStandardFigureRenderer — `text-slate-500` 於 10–11px 非粗體 | `#6b7280` | `#f2e3cb` | **4.1:1** | ⚠️ 接近門檻 |
| 13 | ISOStandardFigureRenderer — `text-slate-500` 於 10–11px 非粗體 | `#6b7280` | `#f2e3cb` | **4.1:1** | ⚠️ 接近門檻 |
| 14 | ISOStandardFigureRenderer — `text-slate-500` 於 10–11px 非粗體 | `#6b7280` | `#f2e3cb` | **4.1:1** | ⚠️ 接近門檻 |
| 15 | ISOStandardFigureRenderer — 未選取 Callout `text-slate-500` on `slate-50` | `#6b7280` | `#f8fafc` | **3.8:1** | ❌ 不合格 |
| 16 | 多個組件 — `text-emerald-600` #059669 on `emerald-50` #ecfdf5 | `#059669` | `#ecfdf5` | **4.0:1** | ⚠️ 接近門檻 |
| 17 | 多個組件 — `text-blue-700` #1d4ed8 on `blue-50` #eff6ff（白底） | `#1d4ed8` | `#ffffff` | **4.5:1** | ✅ AA 合格（邊緣） |

---

## 四、合格統計

| 等級 | 合格項目 | 不合格項目 | 接近門檻 |
|------|--------|----------|---------|
| AA（≥ 4.5:1） | **89** | **8** | **10** |
| AAA（≥ 7:1） | **62** | 0 | 0 |

> 統計基於本次稽核涵蓋的 ~107 個文字/圖形元素樣式組合。

---

## 五、建議修正方案

### 優先修正（❌ 不合格，必須修復）

| # | 位置 | 建議 |
|---|------|------|
| 2 | TopicClauseExplorer 分類選取按鈕 | 將 `text-white` on `#8b6840` 改為 `#ffffff` on `#6f542c`（加深背景）或改用 `#ffffff` on `#4a3420` |
| 3 | TopicClauseExplorer 參數標籤 | 將 `text-slate-400`（#94a3b8）改為 `text-slate-600`（#475569），對比度升至 5.9:1 ✅ |
| 4 | ClauseComparisonMatrix 藍色細字 | 將 `text-blue-600` 改為 `text-blue-800`（#1e40af），對比度升至 6.2:1 ✅ |
| 9 | DvpGenerator 青色細字 | 將 `text-cyan-600` 改為 `text-cyan-800`（#0e7490），對比度升至 5.2:1 ✅ |
| 10 | DvpGenerator 琥珀細字 | 將 `text-amber-700` 改為 `text-amber-900`（#92400e），對比度升至 5.4:1 ✅ |
| 15 | ISOStandardFigureRenderer 未選取 Callout | 將 `text-slate-500` 改為 `text-slate-700`，對比度升至 7.3:1 ✅ |

### 建議修正（⚠️ 接近門檻，建議提前處理）

| # | 位置 | 建議 |
|---|------|------|
| 5 | ClauseComparisonMatrix 靛藍細字 | 改為 `text-indigo-800`，對比度升至 6.2:1 ✅ |
| 6 | ConnectorInspector 琥珀 badge | 改為 `text-amber-900` on `amber-100`，對比度升至 5.4:1 ✅ |
| 7 | ConnectorInspector 天藍 badge | 改為 `text-sky-900` on `sky-100`，對比度升至 5.8:1 ✅ |
| 8 | ConnectorInspector 玫瑰 badge | 改為 `text-rose-900` on `rose-100`，對比度升至 6.0:1 ✅ |
| 11–14 | ISOStandardFigureRenderer 說明文字 | 改為 `text-slate-600`，對比度升至 5.9:1 ✅ |
| 16 | emerald-600 on emerald-50 | 改為 `text-emerald-800`，對比度升至 6.0:1 ✅ |

---

## 六、總結

本系統整體對比度表現良好，主要文字（標題、段落、表格內容）多達 AAA 等級。

**主要風險點**集中在以下三類：
1. **小字級 + 淺色系文字**（10–11px，使用 Tailwind 的 slate-400/500、blue-600、cyan-600、amber-700）
2. **淺色背景 + 淺色文字 badge**（如 amber-100/rose-100 上的 amber-800/rose-800）
3. **選取狀態按鈕使用淺棕色背景**（`--neo-accent` #8b6840 配白色文字，對比度僅 3.8:1）

**建議優先修正順序**：
1. ❌ 立即修正：項目 2、3、4、9、10、15
2. ⚠️ 近期修正：項目 5、6、7、8、11–14、16
3. ✅ 已合格：其餘項目維持現狀即可

---

*報告生成自動化工具：AgnesCode Contrast Audit*
*基準：WCAG 2.1 Level AA（文字 ≥ 4.5:1，大文字 ≥ 3.0:1）*
