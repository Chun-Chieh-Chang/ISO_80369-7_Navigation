# ISO 80369-7 Navigation MECE 原則審計報告

## 審計日期：2026-09-07
## 審計範圍：全站功能模塊

---

## 📋 執行摘要

基於 MECE 原則（Mutually Exclusive, Collectively Exhaustive - 互相獨立、完全窮盡）對整個應用進行了全面審計。

### 審計結果：
- ✅ **已修復問題**：1 項重複功能
- ⚠️ **發現問題**：3 項潛在重複
- ✅ **符合標準**：核心架構符合 MECE 原則

---

## 🎯 核心架構分析（符合 MECE ✅）

### 一級導航（Primary Hubs）
```
應用結構：
├─ 🔍 Explorer（探索器）         ← 獨立功能域
│  ├─ 主題與條文檢索
│  └─ 條文脈絡圖表
│
├─ 📊 Matrix（對照矩陣）          ← 獨立功能域
│  └─ ISO 7 vs ISO 20 橫向對照
│
└─ 🔧 Workbench（工程工作台）     ← 獨立功能域
   ├─ 夾具庫與力學檢驗
   └─ DVP 驗證與報告匯出
```

**MECE 評估**：✅ **符合**
- 三個主要功能域互不重疊
- 涵蓋所有核心使用場景
- 層級清晰，邏輯完整

---

## 🔴 已發現並修復的問題

### 問題 1：DVP Generator 頁面重複匯出按鈕 ✅ **已修復**

**違反 MECE 的表現：**
```
❌ 修復前：
┌────────────────────────┐
│ Tab 切換  📊 Excel 匯出 │ ← 重複位置 1
├────────────────────────┤
│ 表格內容               │
├────────────────────────┤
│ 📊 Excel   📄 CSV      │ ← 重複位置 2
└────────────────────────┘
```

**修復方案：**
- 移除頂部的 Excel 匯出按鈕
- 保留表格上方的操作區（Excel + CSV）
- 按鈕視覺增強以提高可見性

**修復後狀態：**
```
✅ 修復後：
┌────────────────────────┐
│ Tab 切換               │ ← 清爽
├────────────────────────┤
│ 表格內容               │
├────────────────────────┤
│ 📊 Excel   📄 CSV      │ ← 唯一操作區
└────────────────────────┘
```

---

## ⚠️ 發現的潛在問題

### 問題 2：圖表展開功能分散 ⚠️

**位置分佈：**
1. **ClauseComparisonMatrix 組件**：
   - 移動版：每個卡片右上角「查看圖表」按鈕
   - 桌面版：表格最右列「查看圖表」按鈕
   
2. **TopicClauseExplorer 組件**：
   - 主題卡片：「Deep-Dive 深入規格」按鈕
   - 觸發 ClauseDetailDrawer 側邊欄

**MECE 評估**：⚠️ **需要審視**
- 功能目的不同（卡片內嵌 vs 抽屜側邊欄）
- 但用戶可能感到困惑：兩種方式查看同樣的圖表
- **建議**：統一圖表查看體驗，或明確區分兩者用途

**優化建議：**
```
選項 A（統一體驗）：
- 所有圖表查看都通過抽屜側邊欄
- 移除卡片內的內嵌展開

選項 B（明確區分）：
- 內嵌展開：快速預覽（僅圖片）
- 抽屜側邊欄：完整規格（圖片 + 詳細參數）
- 在 UI 上明確標示差異
```

---

### 問題 3：複製功能僅存在於 ClauseDetailDrawer ✅

**當前狀態：**
- ✅ 僅在 ClauseDetailDrawer 中提供「複製規格」功能
- ✅ 沒有在其他地方重複

**MECE 評估**：✅ **符合**
- 功能唯一，沒有重複
- 位置合理（詳情頁才需要複製完整規格）

---

### 問題 4：多處篩選/搜索功能 ⚠️

**位置分佈：**
1. **TopicClauseExplorer**：
   - 分類篩選（6個類別按鈕）
   - 搜索框
   
2. **ClauseComparisonMatrix**：
   - 測試類型篩選（L1/L2 切換）
   - 類別篩選（7個類別按鈕）
   - 搜索框
   
3. **DvpGenerator**：
   - Tab 切換（Matrix / Checklist）

**MECE 評估**：✅ **符合**
- 每個頁面的篩選對象不同
- TopicClauseExplorer：篩選「主題」
- ClauseComparisonMatrix：篩選「條文」
- DvpGenerator：切換「報告類型」
- 功能雖相似但作用域互不重疊

---

## 📊 功能矩陣總覽（MECE 驗證）

| 功能類別 | TopicClauseExplorer | TopicVisualMap | ClauseComparisonMatrix | ConnectorInspector | DvpGenerator |
|---------|---------------------|----------------|------------------------|-------------------|--------------|
| **查看主題** | ✅ 主功能 | ✅ 視覺化 | ❌ | ❌ | ❌ |
| **查看條文** | ✅ 次要 | ❌ | ✅ 主功能 | ❌ | ❌ |
| **圖表展示** | ✅ 抽屜 | ✅ 節點 | ✅ 內嵌 | ✅ 3D模型 | ✅ 表格 |
| **夾具查看** | ❌ | ❌ | ⚠️ 提及 | ✅ 主功能 | ⚠️ 引用 |
| **匯出功能** | ❌ | ❌ | ✅ CSV | ❌ | ✅ Excel+CSV |
| **篩選功能** | ✅ 分類 | ✅ 主題 | ✅ 類別 | ✅ 參數 | ✅ Tab |
| **搜索功能** | ✅ 文字 | ❌ | ✅ 文字 | ❌ | ❌ |
| **複製功能** | ✅ 抽屜內 | ❌ | ❌ | ❌ | ❌ |

**結論**：✅ 功能分佈合理，無明顯重複

---

## 🎨 圖表展示功能深度分析

### 圖表展示的 5 種形式：

1. **TopicClauseExplorer → ClauseDetailDrawer**
   - 觸發方式：點擊主題卡片「Deep-Dive」
   - 展示形式：全屏抽屜側邊欄
   - 內容深度：★★★★★ 最完整（規格 + 圖表 + 參數 + 步驟）
   - 用途：深度學習、規格查詢

2. **ClauseComparisonMatrix（移動版內嵌）**
   - 觸發方式：點擊卡片「查看圖表」
   - 展示形式：卡片內展開
   - 內容深度：★★★☆☆ 中等（僅圖表 + 標題）
   - 用途：快速對照查看

3. **ClauseComparisonMatrix（桌面版展開行）**
   - 觸發方式：點擊表格行「查看圖表」
   - 展示形式：表格行展開
   - 內容深度：★★★★☆ 較完整（圖表 + 說明 + 風險）
   - 用途：表格內對照查看

4. **TopicVisualMap**
   - 觸發方式：點擊節點
   - 展示形式：右側面板
   - 內容深度：★★★☆☆ 中等（圖表 + 基本說明）
   - 用途：網絡關係探索

5. **ConnectorInspector**
   - 觸發方式：選擇夾具
   - 展示形式：3D 圖片輪播
   - 內容深度：★★☆☆☆ 基礎（實物照片）
   - 用途：夾具識別

**MECE 評估**：✅ **符合但需優化**
- 每種形式服務不同的使用場景
- 但用戶可能不清楚差異
- **建議**：在 UI 上添加標籤區分深度級別

---

## ✅ 符合 MECE 的優秀設計

### 1. 三層架構清晰分離
```
Layer 1: 主導航（Hub）
├─ Explorer
├─ Matrix
└─ Workbench

Layer 2: 子導航（Sub-tabs）
├─ Explorer → [主題檢索, 關係圖譜]
└─ Workbench → [夾具庫, DVP報告]

Layer 3: 內容視圖（Views）
各頁面內部內容
```

### 2. 數據匯出功能明確分工
- ClauseComparisonMatrix → CSV 對照表
- DvpGenerator → Excel 完整報告 + CSV 檢核表
- 無重疊，功能清晰

### 3. 語言切換唯一入口
- 僅在 Header 提供語言切換
- 全局生效
- 無重複按鈕

---

## 📝 優化建議清單

### 高優先級 🔴

1. **統一圖表查看體驗**
   - [ ] 決策：保留「內嵌展開」+ 「抽屜詳情」雙模式 OR 統一為單一模式
   - [ ] 如保留雙模式，在 UI 上明確標示：「快速預覽」vs「完整規格」

### 中優先級 🟡

2. **圖表展示層級標示**
   - [ ] 為不同深度的圖表查看添加視覺標籤
   - [ ] 例如：⚡ 快速預覽 / 📖 標準視圖 / 🔬 深度規格

3. **夾具引用一致性**
   - [ ] 檢查 ClauseComparisonMatrix 和 DvpGenerator 中的夾具引用
   - [ ] 確保都指向 ConnectorInspector 作為唯一資料來源

### 低優先級 🟢

4. **文檔補充**
   - [ ] 在用戶手冊中說明不同圖表查看方式的差異
   - [ ] 添加「使用場景推薦」指南

---

## 🎯 MECE 合規評分

| 評估維度 | 評分 | 說明 |
|---------|------|------|
| **功能獨立性** | 90/100 | 少數圖表展示功能重疊 |
| **功能完整性** | 95/100 | 涵蓋所有核心使用場景 |
| **架構清晰度** | 95/100 | 三層架構邏輯清晰 |
| **用戶體驗** | 85/100 | 部分功能入口需要更明確標示 |
| **維護性** | 90/100 | 代碼組織良好，易於維護 |

**總體評分：91/100** ⭐⭐⭐⭐⭐

---

## 📌 結論

整體應用的架構設計**高度符合 MECE 原則**，核心功能模塊劃分清晰，沒有重大的功能重複問題。

已修復的 DVP 匯出按鈕重複問題進一步提升了符合度。建議重點關注「圖表查看體驗的統一性」，以達到更完美的 MECE 實踐。

---

## 📅 後續追蹤

- [ ] 與產品團隊討論圖表查看的雙模式策略
- [ ] 進行用戶測試，驗證當前區分是否清晰
- [ ] 3個月後重新審計，確保新功能也符合 MECE

---

**審計人員：Kiro AI Assistant**  
**審計日期：2026年9月7日**  
**文檔版本：v1.0**


---

# 附錄 A：圖表查看體驗統一 — 實作紀錄 (2026-09-07)

針對「高優先級 🔴 統一圖表查看體驗」，採用 **選項 B（明確區分雙模式）** 並已落地。

## A.1 決策：兩層 MECE 圖表深度，而非五層

原報告列出 5 種「圖表展示形式」，但經第一性原理檢視，其中 3 種並非同一件事的重複入口：

| 界面 | 實際工作 | 是否為圖表深度層級 |
|------|----------|-------------------|
| TopicVisualMap | 條文關聯**導覽**（節點/邊） | ❌ 不是圖表檢視器 |
| ConnectorInspector | 夾具**型錄**與選型 | ❌ 不是圖表檢視器 |
| DvpGenerator | 驗證**報告**產出 | ❌ 不是圖表檢視器 |
| ClauseComparisonMatrix 內嵌展開 | 看同一張規範圖 | ✅ Tier 1 |
| ClauseDetailDrawer | 看同一張規範圖 + 完整參數 | ✅ Tier 2 |

真正互相競爭的只有後兩者。因此**只在這兩處**做層級標示；替前三者加註記只會增加噪音，不會減少困惑。

## A.2 Tier 詞彙表（Single Source of Truth）

新增 `TRANSLATIONS.{zh,en}.figureTier`（`src/i18n/translations.ts`），為唯一定義來源：

| Tier | 標記 | 中文 | English | 位置 | 內容 |
|------|------|------|---------|------|------|
| 1 | 🖼️ | 快速預覽 | Quick Preview | Matrix 內嵌展開 | 僅規範圖解 |
| 2 | 📖 | 完整規格 | Full Spec | ClauseDetailDrawer | 圖解 + 參數 + 步驟 + 允收標準 |

Tier 1 另附提示句 `quickHint`，明確指向 Tier 2，使雙模式成為**階梯**而非兩扇並排的門。

## A.3 為何不用 ⚡ 與 🔬（重要）

第一版實作曾採用 ⚡（快速）與 🔬（深度）。經全站 emoji 詞彙盤點後推翻——這兩個字符在本應用中**已有既定且不同的語意**：

- **⚡ = 機械強度**（`catMechanical`）。該分類篩選鈕與新的「⚡ 快速預覽」按鈕**位於同一個對照矩陣畫面**，直接衝突。
- **🔬 = ISO 80369-20**（`TopicClauseExplorer` ISO 80369-20 圖表樹根節點、`connectors.filterIso20`）。「🔬 完整規格」會被讀成「ISO 80369-20 規格」，但抽屜同時涵蓋兩份標準，語意錯誤。

改用全站未使用且語意貼切的 **🖼️**（圖面本身）與 **📖**（讀完整規格）。

> 教訓：新增視覺標記前必須先盤點既有詞彙，否則「統一體驗」的動作本身就會製造新的 MECE 違規。

## A.4 一併修正的既有缺陷

| # | 缺陷 | 修正 |
|---|------|------|
| 1 | `🔒 {t.filterLock}` 而 `filterLock` 本身已含 🔒 → 畫面顯示「🔒 🔒 鎖定式」（4 處） | 移除 JSX 端重複字符 |
| 2 | UI 字串硬編碼 `language === 'en' ? ... : ...`（7 處），繞過 i18n SSOT | 全部改走 `t.figureTier.*` |
| 3 | `viewDiagram` / `collapseDiagram` / `filterTypeLabel` 成為死鍵 | 刪除；`filterTypeLabel` 名實不符（它從不篩選列，只切換 6.4 的顯示值）→ 更名 `testTypeToggleLabel` |
| 4 | `(clause as any).isClause64` 型別逃逸（2 處） | 新增 `MatrixClauseRow` 介面並標註 `useMemo<MatrixClauseRow[]>` |
| 5 | TopicVisualMap 標頭出現**兩個** 📊；ConnectorInspector 加 📐 與導覽列 🔧 及 Annex B 篩選 📐 衝突 | 還原（此二者非圖表深度層級） |
| 6 | 抽屜改為置中 `max-w-[1600px]` 後，<1600px 視窗下背景遮罩被面板完全覆蓋，點擊關閉失效 | 補 `role="dialog"` / `aria-modal` / `aria-label`；ESC + 標頭 X + 頁尾關閉鈕為明確出口 |
| 7 | 6.4 L1/L2 切換鈕無按鈕狀態語意 | 補 `aria-pressed` |
| 8 | 抽屜新增 wrapper 後內層縮排未跟進 | 標頭區與條文頁籤區重新縮排（主體 390 行維持原樣以免淹沒實質差異） |

## A.5 驗證

- `npx tsc --noEmit` — 通過
- `npm run build` — 通過
- `npm test` — 20/20 通過
- 瀏覽器實測（zh + en）：Tier 標籤、6.4 切換值（32–35 N ⇄ 23–25 N）、`aria-pressed`、ESC 關閉、⚡/🖼️ 不再衝突 — 皆正確

## A.6 明確**未**實作的項目

**Matrix → Drawer 直達橋接**（在快速預覽內直接跳到完整規格）。

`ClauseDetailDrawer` 需要 `ISOTopic` + `relatedClauses`，而解析邏輯（約 40 行）目前是 `TopicClauseExplorer` 的區域狀態；Matrix 是**條文導向**、抽屜是**主題導向**，缺少反向 clause→topic 索引。要做需把解析邏輯抽成共用 hook 並新增反向索引——屬獨立重構，不在本次範圍。目前以 `quickHint` 文字指引替代。

原報告 A.2 節「中優先級 🟡 夾具引用一致性」與「低優先級 🟢 文檔補充」亦未處理。


---

# 附錄 B：ISO 規範原文全盤比對稽核 (2026-09-07)

比對來源：`isodoc/ISO_80369-7_2021_en.pdf`、`isodoc/ISO_80369-20_2024_en.pdf`（含 Annex C 圖面以 300 dpi 算繪後逐一判讀尺寸標註）。

## B.1 比對結果為「正確」的項目

| 項目 | 結論 |
|---|---|
| Clause 6.1~6.6 全部定量參數（壓力／拉力／扭矩／持壓時間／洩漏率） | ✅ 與 ISO 80369-7:2021 完全一致 |
| `ANNEX_C_FIGURES` 六張參考接頭之性別／鎖滑型式／適用條文／最壞情況旗標 | ✅ 與 Annex C 各圖標題逐字一致 |
| Fig.C.1 耳翼 3,5 mm (0/−0,025)、Fig.C.3 耳翼 2,71 mm (+0,025/0)、30° 背角、Ø7,73 | ✅ 與圖面標註一致 |
| Fig.C.4「槽底 Ø7.9 / 牙頂 Ø7.0」 | ✅ 圖面為 Ø7,9 +0,05/0 與 Ø7 +0,005/0；內螺紋命名正確 |
| Fig.C.6「淺牙最壞」 | ✅ 成立。C.6 為 Ø8±0,025 / Ø7,2 → 牙深 0,40 mm；C.4 為 Ø7,9 / Ø7,0 → 0,45 mm，C.6 確實較淺 |
| DVP 夾具配對邏輯（六條文 × 公母 × 鎖滑） | ✅ 全部符合標準允許集合 |
| Fig.B.1 尺寸（Ød 3,970~4,035；Øg 4,375~4,440；e ≥ 7,5） | ✅ 與 Table B.1 剛性材料欄一致 |
| 預處理數值 (20±5)°C / (50±10)% RH / ≥24 h、測試環境 15~30°C / 10~70% RH | ✅ 數值正確 |
| Annex 對應（6.1→B/C、6.2→D、6.3→E、6.4→F、6.5→G、6.6→H） | ✅ 與 ISO 80369-20:2024 Clause 4 Table 1 一致 |

## B.2 發現並已修正的偏差

| # | 偏差 | 標準原文 | 處置 |
|---|---|---|---|
| **F1** | 檢核表標示為「Annex B.5 ~ G.5 共通 14 大必填項目」 | 各附錄項數**不同**：B=14(a~n)、C=12、D=13、E=12、F=10、G=11、H=12、I=11、K=13。k) 測試容積與 m) 壓力變化量**僅 Annex B** 要求 | 更名為「Annex B.5 測試報告必填項目」，並在畫面新增各附錄項數對照表 |
| **F2** | 項目 a) 範例寫 `Annex B (正壓液體洩漏 / Positive pressure liquid leakage)` | Annex B 是 **Leakage by pressure decay**（氣壓）；正壓液體落滴是 **Annex C** | 修正中英文範例；項目 g) 範例由「測試水壓」改為「測試氣壓（Annex B 以空氣為介質）」 |
| **F3** | `relatedISO7Clauses: ['Clause 5.1','Clause 5.2','Clause 5.3']` | ISO 80369-7:2021 **Clause 5 無子條文** | 改為 `['Clause 5']`。此偏差同時是功能缺陷：`Clause 5.1` 正規化後為 `iso7-clause-5.1`，不存在於 `STANDARD_CLAUSE_DETAILS`，導致該主題的深度規格抽屜**開啟後沒有任何條文頁籤** |
| **F4** | 全站標示 ISO 80369-20:**2024** | ISO 80369-7:2021 Clause 2 以**定版引用** ISO 80369-20:**2015**；且 2024 版 Annex B~K 標示為 *informative* | 未大規模改名（Annex B~H 與所有定量值兩版一致）。新增 `ISO20_EDITION_NOTE` 並在 DVP 檢核頁顯示定版引用說明與附錄性質說明 |
| **F6** | 預裝配一律呈現「0.08–0.12 N·m + 26.5–27.5 N」 | ISO 80369-20:2024 X.4 b) **鎖滑序列不同**：滑動型為「先軸向推力 26,5–27,5 N → 再以 **≤0,10 N·m** 扭矩旋轉 **≤90°**」，順序相反且為限扭矩／限角度 | 新增 `getPreAssemblySpec()` / `formatPreAssembly()`；對照矩陣依條文適用型式同時列出兩種序列，Excel 匯出依使用者選定型式輸出正確序列 |
| **F8** | `ISO20_ANNEX_A_PRECONDITIONING`，`standard: 'ISO 80369-20:2024 Clause 4'` | 預處理規定在**各附錄 X.2.1 / X.2.2**；Clause 4 僅有 Table 1，Annex A 僅為 rationale | 更名 `ISO20_PRECONDITIONING`，引用改為 `X.2.1 / X.2.2 (each test-method annex)` |

## B.3 夾具引用一致性（原報告 🟡）— 已修正

同一條規則原本有**四份表述**，彼此可能各自漂移：

1. `ISO_CLAUSES.requiredMaleRef / requiredFemaleRef` — **無人讀取的死資料**，且不完整（只有鎖定路徑，缺 C.2/C.5 滑動路徑）
2. `DvpGenerator.tsx` 硬編碼 if/else
3. `excelExporter.ts` 硬編碼 if/else（與 2 重複）
4. `ClauseComparisonMatrix.tsx` 六段自由文字 `fixture:` 字串

**處置**：以 `ANNEX_C_FIGURES`（經逐字比對驗證正確）為唯一來源，新增 `getRequiredReferenceConnector()`；2、3、4 全部改為呼叫它，1 連同型別定義一併刪除。配對規則：受測件配**相反性別、相同鎖滑型式**的參考接頭；鎖定專用條文（6.5/6.6）遇滑動型回傳 `undefined`，讓畫面顯示「不適用」而非一個看似合理的錯誤圖號。

## B.4 一併修正的顯示缺陷

- 6.6 允收標準尾端重複串接「，且接頭無歪斜 (No cocking)（Annex H.4 d）」兩次
- 6.5 反向扭矩顯示為 `0.018–0.02 N·m`（JS 去尾零）→ 修正為 `0.018–0.020 N·m`
- 滑動型預裝配扭矩上限顯示 `≤ 0.1 N·m` → 修正為 `≤ 0.10 N·m`

## B.5 對照矩陣 → 深度規格抽屜橋接（原報告 A.6 未實作項）— 已實作

- 新增 `src/hooks/useClauseDetailDrawer.ts`：抽出原本鎖在 `TopicClauseExplorer` 內的 topic→clause 解析邏輯，並新增反向索引 `findTopicForClause()`（專屬主題優先於跨切主題，避免 `pre-assembly` 搶走 6.1）
- `TopicClauseExplorer` 改用此 hook（移除約 85 行區域狀態與解析邏輯）
- 對照矩陣每一列（手機卡片與桌面表格）新增 **📖 完整規格** 按鈕，就地開啟同一抽屜並直接定位到該條文頁籤
- Tier 1 提示文字改為指向同列的 📖 按鈕

## B.6 一致性防護

新增 `src/utils/isoConformance.test.ts`（28 項測試），將上述標準事實固化為測試：條文定量值、Annex C 六圖屬性逐字比對、夾具配對不得越出標準允許集合、受測件與參考接頭必為相反性別、鎖定專用條文遇滑動型須回傳 undefined、預裝配雙序列、各附錄報告項數、Clause 5 不得出現子條文、對照矩陣每列皆能開啟並定位抽屜頁籤。

`npm test`：**48/48 通過**（原 20 + 新增 28）。

## B.7 文檔補充（原報告 🟢）— 已完成

新增 [`docs/USER_GUIDE.md`](docs/USER_GUIDE.md)，涵蓋：三功能域分工、兩層圖表檢視模式與標記選用理由、七項使用場景推薦路徑、SSOT 資料來源對照表、夾具配對規則表，以及第 5 節「引用與版本注意事項」（定版引用、附錄 informative 性質、報告項數差異表、預裝配鎖滑差異、預處理條件出處）。README 已連結。


---

# 附錄 C：F6 補正 — 預裝配鎖／滑分支的全站清查 (2026-09-08)

使用者指出 DVP 畫面（公接頭 + 滑動式）仍顯示鎖定型序列。查核屬實：附錄 B 的 F6 **只改到對照矩陣與 Excel 匯出，漏掉 DVP 畫面本身**（`formatPreAssembly` 有 import 進 `DvpGenerator` 但未接上），且資料層還有大量同類殘留。

## C.1 先補正的事實基礎

程式化掃描 ISO 80369-20:2024 全文各附錄的裝配分支：

| Annex | B | C | D | E | F | G | H | I | K |
|---|---|---|---|---|---|---|---|---|---|
| 滑動分支 | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| 鎖定分支 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**只有 Annex G（抗旋鬆）與 Annex H（抗過旋）是鎖定專用。** 附錄 B 曾把 `iso20-annex-i` 誤標為鎖定專用，此處更正——Annex I 有雙分支。

## C.2 修正清單

| 位置 | 問題 |
|---|---|
| `DvpGenerator.tsx` `renderPreAssembly()` | **主要漏網**：直接讀 `clause.assemblyTorqueNm`（鎖定值），不隨使用者選的鎖／滑改變。改為依 `getPreAssemblySpec(selectedType)` 以編號步驟呈現，滑動型另加順序提示 |
| `isoTopicsData.ts` × 9 筆 `preAssembly.assemblyTorqueNm` | 雙型式條文（annex-b/c/e/i、iso7-6.2/6.3/6.4、general-procedure）只列鎖定值 → 改為 `0.08–0.12 (Lock) / ≤0.10 (Slip 微旋 ≤90°)`；lock-only 的 6.5/6.6/annex-g/annex-h 維持原樣 |
| `isoTopicsData.ts` × 7 段測試步驟 | 只描述鎖定序列 → 補上雙序列 |
| `isoTopicsData.ts` `iso7-6.2` 步驟 | 寫「依 **Annex J** 旋緊裝配」；Annex J 是統計分析修改法，6.2 的裝配在 **Annex D.4 b)** → 更正 |
| `isoTopicsData.ts` 主題文案 × 6 | fluid-leakage 詳述、三處 keyParameters、pre-assembly 主題 shortSummary／detailedDescription、`iso7-6.1` FDA 提示 |
| `PRE_ASSEMBLY_LOCK` / `PRE_ASSEMBLY_SLIP` | 兩者皆寫「同時施加」；標準是**先後序列**（"Then, while continuing to apply..."）。滑動型原文亦漏列 ≤0.10 N·m 扭矩上限 → 改為序列敘述 |
| `i18nHelpers.ts` 英文鏡像 × 5 | 6.1／6.2／6.3 測試步驟、pre-assembly 主題 shortSummary／detailedDescription／engineeringRisk |
| `i18nHelpers.ts` pre-assembly 詳述 | 引用「Annex H.4 a) **and Clause 5**」；ISO 80369-20:2024 只有 Clause 1~4，無 Clause 5 → 改引 X.4 b) |
| `i18nHelpers.ts` 6.1 預處理步驟 | 引用 `Clause 4` → 改為 `X.2.1`（同附錄 B 的 F8） |
| `ClauseComparisonMatrix.tsx` Clause 4 列 | `assemblyTorque` 只列鎖定序列 → 改用 `formatPreAssemblyBothTypes()`；`criteria` 的「**統一**標準預裝配」措辭與夾具欄（只寫定扭矩起子）一併更正為 X.3.3 的加載機構要求 |
| `ClauseDetailDrawer.tsx` | `preAssembly` 缺值時的中英 fallback 文字為鎖定專用 → 改為雙序列 |
| `isoData.ts` `ISO20-J.1` 預裝配裝置圖 | `description`／`descriptionZh`／`svgHighlights` 皆只列鎖定值，但 `intendedClauses` 含 6.1~6.5（雙型式）→ 補雙序列 |

## C.3 尚未處理（需你決定）

`isoData.ts` 的 `ISO20-J.1` 圖號標示為 `Fig.J.1 (ISO 20)`，但 **ISO 80369-20:2024 Annex J 是「Modification of the test methods to generate variable data for statistical analysis」，並無預裝配裝置圖**。此圖號屬自訂命名。改名會牽動 `svgKey`／`ISOStandardFigureRenderer`／既有圖檔對應（v8.40.6 才剛做過該圖的對應修正），故未自行更動，僅提出。

## C.4 防護

`isoConformance.test.ts` 新增 4 項守門測試：雙型式條文必須同時陳述兩分支、lock-only 條文不得混入滑動敘述、滑動序列必須含 0.10 N·m 與 90° 上限且不得出現 0.08、鎖定序列扭矩必須排在推力之前（滑動型相反）。

`npm test`：**52/52 通過**。瀏覽器實測：公接頭+滑動式 → 4 列（6.1~6.4）全部顯示「1.軸向推力 26.5–27.5 N → 2.旋轉 ≤90°（扭矩 ≤0.10 N·m）」；切回鎖定式 → 6 列（6.1~6.6）顯示「1.套環扭矩 0.08–0.12 N·m → 2.軸向推力 26.5–27.5 N」。


---

# 附錄 D：C.6 缺漏疑慮追查與矩陣加載欄修正 (2026-09-08)

## D.1 追查結論：修正存在且已推送，線上站也正常

| 查核項 | 結果 |
|---|---|
| `origin/main` vs 本機 `main` | **完全相同**（同為 `2c0170f`），無未同步提交 |
| C.6 修正是否存在 | **是** — `9eb7f45` *fix(matrix): restore Fig. C.6 worst-case fixture for Clause 6.6 female lock testing (v8.40.1)*，2026-09-07 |
| 該提交是否已在遠端 | `git merge-base --is-ancestor 9eb7f45 origin/main` → **是** |
| GitHub Pages 實測 | 對照矩陣 6.6 顯示 `公鎖配 Fig.C.3 (2.71mm 窄耳翼最壞) / 母鎖配 Fig.C.6 (淺牙螺紋最壞) (僅限鎖定型)` — **有 C.6** |
| 部署是否落後 | 否。線上 bundle 字串與 HEAD 原始碼逐字吻合 |

**截圖為 `9eb7f45` 之前的畫面**，故為瀏覽器端快取（本站為 PWA，`vite-plugin-pwa` + workbox precache，`registerType: 'autoUpdate'`）。

### 原始缺陷的根因（供記錄）

修正前該格為 `c66Detail?.fixtureRequiredZh || 'Fig.C.3 (2.71mm 窄耳翼最壞情況) / Fig.C.6'`。**fallback 字串含 C.6，但主資料來源 `STANDARD_CLAUSE_DETAILS['iso7-6.6'].fixtureRequiredZh` 當時只有 C.3** — 主來源為真值，fallback 永遠不會執行。這正是附錄 B.3 指出的「同一規則多份表述」問題的具體案例；本次已改為由 `ANNEX_C_FIGURES` 推導（`formatClauseFixtureMatrix()`），結構上不可能再發生。

## D.2 本次順帶發現並修正：對照矩陣「定量加載條件」欄空白

桌面表格該欄以三個 `&&` 條件渲染且**無 fallback**，當 `testPressure` / `testForce` / `testTorque` 皆為 `'-'` 時渲染成**空白**（手機卡片版有 `: '-'` fallback，桌面版漏了）。受影響：6.3 及 Clause 1/2/3/4/5、Annex C、Annex A/D/E 共 8 列。

6.3 尤其誤導 — 該條文本就不施加自身負載（靜置 ≥48 h 後依 6.1.1 測試），空白會被讀成「資料缺失」。已新增 `testLoadNote` 欄位，6.3 顯示「N/A — 靜置 ≥ 48 小時後依 6.1.1 測試」，其餘顯示「—」。實測 13 列**零空白**。
