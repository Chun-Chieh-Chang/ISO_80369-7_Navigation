import { ISOTopic, StandardClauseDetail, PreAssemblyCondition } from '../types';

export const ISO_TOPICS: ISOTopic[] = [
  {
    id: 'fluid-leakage',
    titleZh: '1. 正壓流體洩漏測試 (Fluid Leakage)',
    titleEn: 'Liquid Leakage by Pressure',
    category: 'leakage',
    categoryZh: '洩漏與氣密',
    iconName: 'Droplets',
    shortSummaryZh: '評估 6% 魯爾錐面與螺紋在 300~330 kPa 加壓下的密封防漏能力 (水滴法無水滴 / 壓降法漏率 ≤ 0.005 Pa·m³/s)。',
    detailedDescriptionZh: '正壓流體洩漏測試為醫療級魯爾接頭最基礎且核心的驗證項目。接頭在以規定之裝配扭矩（0.08~0.12 N·m）旋合於標準參考金屬夾具後，於 300 kPa 至 330 kPa 下驗證防漏安全性。若採用【氣壓壓降法 (Annex B)】，持壓 15~20 秒且極限洩漏率必須遵循 ≤ 0.005 Pa·m³/s 規定。根據 ISO 80369-20:2024 最新修訂，已取消洩漏率 Q 的計算公式，改為直接記錄測試期間的壓力變化值（壓降 ΔP），透過理想氣體狀態方程 ΔP_max = (Q_max × Δt) / V 進行物理換算；若採用【水壓滴落法 (Annex C)】，持壓 30~35 秒且目視不得有水滴形成或滴落。',
    keyParameters: [
      { label: '裝配扭矩 Assembly Torque', value: '0.08 - 0.12', unit: 'N·m' },
      { label: '測試壓力 Test Pressure', value: '300 - 330', unit: 'kPa' },
      { label: '氣壓壓降極限 Max Leak Rate', value: '≤ 0.005', unit: 'Pa·m³/s' },
      { label: '水滴法持壓 Hold Time', value: '30 - 35', unit: '秒' },
      { label: '壓降法持壓 Hold Time', value: '15 - 20', unit: '秒' },
      { label: '預處理環境 Preconditioning (ISO 80369-20)', value: '(20 ± 5)°C, (50 ± 10)% RH, ≥24h' },
      { label: '測試執行環境 Test Environment', value: '15°C – 30°C, 10% – 70% RH' }
    ],
    relatedISO7Clauses: ['6.1'],
    relatedISO20Annexes: ['Annex B', 'Annex C'],
    relatedRefConnectors: ['C.1', 'C.4', 'C.2', 'C.5'],
    engineeringRiskZh: '塑膠模具毛邊、錐度不均（非 6% 圓錐）、射出縮水造成圓度不良，均會直接導致加壓時流體自錐面隙縫滲漏。測試管路使用易膨脹軟管會造成體積 V 變大，致使壓降判定失真。',
    auditFocusZh: '確認測試設備壓力感測器精度（±0.3%），夾具是否有定期更換，乾燥拭紙檢驗是否有水痕擴散。若採用 Annex J 統計量化驗證（J.2.1），需直接記錄壓降實測值 ΔP 並計算單側公差上限（UTL）。',
    tags: ['300kPa', '正壓', '水壓', '6.1', 'Annex B', 'Annex C', '漏水滴落'],
    figures: [
      {
        id: 'ISO20-FIG-B1',
        titleZh: '壓降法正壓流體洩漏測試裝置圖',
        titleEn: 'Pressure Decay Positive Pressure Leakage Apparatus',
        standard: 'ISO 80369-20:2024 Annex B',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '本圖展示 ISO 80369-20 Annex B 氣壓衰減洩漏試驗架構，包含加壓源、精密調壓閥 (±0.3% 精度感測器)、截止閥 S1、金屬參考夾具 (Fig.C.1/C.4) 與受測魯爾接頭。加壓至 300~330 kPa 保持 15~20 秒量測壓力衰減量 ΔP。',
        descriptionEn: 'Illustrates the ISO 80369-20 Annex B pneumatic pressure decay leakage test apparatus, including the pressure source, precision pressure regulator (±0.3% accuracy sensor), stop valve S1, metal reference fixture (Fig.C.1/C.4), and the Luer connector under test. Pressurized to 300–330 kPa and held for 15–20 s to measure pressure drop ΔP.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖] 入選原因：本圖為 ISO 80369-20 Annex B 氣壓衰減洩漏測試之實體儀器與管路架構圖。正壓流體洩漏 (6.1) 可採用此方法進行高精度自動化定量判定，故納入作為試驗設備與閥門控制指引。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint] Rationale: This is the physical instrument and piping schematic for ISO 80369-20 Annex B pneumatic pressure decay leakage testing. Positive-pressure fluid leakage (Clause 6.1) can be quantitatively verified with high precision using this method, making it the definitive reference for test equipment and valve control.',
        svgKey: 'ISO20-FIG-B1',
        keyCallouts: [
          { id: 'p_test', labelZh: '測試壓力範圍', labelEn: 'Test Pressure Range', valueZh: '300 ~ 330 kPa', valueEn: '300 ~ 330 kPa' },
          { id: 'gauge_acc', labelZh: '感測器精度', labelEn: 'Sensor Accuracy', valueZh: '±0.3%', valueEn: '±0.3%' },
          { id: 'hold_time', labelZh: '氣壓持壓時間', labelEn: 'Pneumatic Hold Time', valueZh: '15 ~ 20 秒', valueEn: '15 ~ 20 s' },
          { id: 'pass_criteria', labelZh: '判定基準', labelEn: 'Pass Criterion', valueZh: '洩漏率 ≤ 0.005 Pa·m³/s', valueEn: 'Leak rate ≤ 0.005 Pa·m³/s' }
        ]
      },
      {
        id: 'ISO20-FIG-B2',
        titleZh: '儀器如何執行標準？解構壓力衰減測試的四個階段',
        titleEn: 'Four Stages of Pressure Decay Test Execution (Annex B.4)',
        standard: 'ISO 80369-20:2024 Annex B.4',
        figureType: 'analysis',
        figureTypeZh: '測試曲線分析圖',
        descriptionZh: '本附圖精確對照 ISO 80369-20 Annex B.4 條文，解構正壓氣壓衰減測試儀器執行的四個關鍵階段：充氣 (Fill 0~5s, 對應 B.4 c)、穩定 (Stabilize 5~15s, 熱平衡與材料蠕變隔離)、測試持壓 (Test 15~35s, 對應 B.4 d/e 量測 ΔP) 與排氣 (Exhaust 35s+)，並標示出 300~330 kPa 目標壓力視窗。',
        descriptionEn: 'Cross-referenced with ISO 80369-20 Annex B.4, this diagram deconstructs the four key phases of the pneumatic pressure decay test: Fill (0–5 s, per B.4 c), Stabilize (5–15 s, thermal equilibration and creep isolation), Test (15–35 s, per B.4 d/e measuring ΔP), and Exhaust (35 s+), with the 300–330 kPa target pressure window indicated.',
        selectionReasonZh: '📈 [數據曲線分析圖] 入選原因：本圖為 Annex B.4 測試執行的 4 階段時間-壓力動態響應曲線 (Fill-Stabilize-Test-Exhaust)，提供控制充氣持壓 15~20s 與評估 ΔP 壓降 (極限洩漏率 ≤ 0.005 Pa·m³/s) 之物理數據判讀依據。',
        selectionReasonEn: '📈 [Data Curve Analysis] Rationale: This diagram shows the 4-phase time-pressure dynamic response curve (Fill-Stabilize-Test-Exhaust) for Annex B.4 test execution, providing the physical data interpretation basis for controlling the 15–20 s hold time and evaluating ΔP pressure drop (limiting leak rate ≤ 0.005 Pa·m³/s).',
        svgKey: 'ISO20-FIG-B2',
        keyCallouts: [
          { id: 'fill', labelZh: '1. 充氣 (Fill)', labelEn: '1. Fill', valueZh: '0~5s (對應 Annex B.4 c 施加壓力)', valueEn: '0–5 s (per Annex B.4 c — apply pressure)' },
          { id: 'stabilize', labelZh: '2. 穩定 (Stabilize)', labelEn: '2. Stabilize', valueZh: '5~15s (隔離氣源、熱平衡與蠕變穩定)', valueEn: '5–15 s (isolate pressure source; thermal & creep equilibrium)' },
          { id: 'test', labelZh: '3. 測試 (Test)', labelEn: '3. Test', valueZh: '15~35s (對應 Annex B.4 d/e 測量 ΔP)', valueEn: '15–35 s (per Annex B.4 d/e — measure ΔP)' },
          { id: 'exhaust', labelZh: '4. 排氣 (Exhaust)', labelEn: '4. Exhaust', valueZh: '35s 後 (測試結束釋放壓力)', valueEn: 'After 35 s (release pressure, end of test)' }
        ]
      },
      {
        id: 'ISO20-FIG-C1',
        titleZh: '水滴法正壓液體洩漏測試裝置圖',
        titleEn: 'Falling Drop Liquid Leakage Test Apparatus',
        standard: 'ISO 80369-20:2024 Annex C',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '展示 ISO 80369-20 Annex C 水壓滴落測試裝置。使用去離子水填充水槽，經由 300~330 kPa 空氣加壓，水平固定夾具與受測接頭，下方鋪設乾燥無塵紙，在 30~35 秒持壓過程中目視檢驗錐面配合處是否有水滴形成或落於紙上。',
        descriptionEn: 'Illustrates the ISO 80369-20 Annex C falling-drop liquid leakage test apparatus. De-aerated water fills the reservoir, pressurized to 300–330 kPa via air. The fixture and DUT connector are clamped horizontally, with dry absorbent paper placed underneath. During the 30–35 s hold period, the taper interface is visually inspected for water drop formation or dripping onto the paper.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖] 入選原因：本圖為 ISO 80369-20 Annex C 水壓滴落測試之裝置示意圖。正壓流體洩漏 (6.1) 可採用此目視法於 300~330 kPa 下持壓 30~35s，提供水槽加壓與無塵紙水痕檢驗設定指引。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint] Rationale: This depicts the ISO 80369-20 Annex C water-pressure falling-drop test apparatus. For positive-pressure fluid leakage (Clause 6.1), this visual method applies 300–330 kPa for 30–35 s, providing setup guidance for the pressurized reservoir and dry-paper drip inspection.',
        svgKey: 'ISO20-FIG-C1',
        keyCallouts: [
          { id: 'media', labelZh: '測試介質', labelEn: 'Test Medium', valueZh: '去離子水 De-aerated Water', valueEn: 'De-aerated Water' },
          { id: 'press', labelZh: '施加水壓', labelEn: 'Applied Pressure', valueZh: '300 ~ 330 kPa', valueEn: '300 ~ 330 kPa' },
          { id: 'hold', labelZh: '水壓保持時間', labelEn: 'Hydraulic Hold Time', valueZh: '30 ~ 35 秒', valueEn: '30 ~ 35 s' },
          { id: 'paper', labelZh: '水滴檢測方式', labelEn: 'Drip Detection Method', valueZh: '乾燥拭紙無水痕擴散', valueEn: 'Dry absorbent paper — no water stain spread' }
        ]
      },
      {
        id: 'ISO7-FIG-B1',
        titleZh: '6% 公魯爾錐面 3.97mm CAD 幾何圖',
        titleEn: '6% Male Luer Slip Cone Geometry (Fig.B.1)',
        standard: 'ISO 80369-7:2021 Fig.B.1',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: '詳細呈現 6% 魯爾公錐體與母錐座配合處之 CAD 斷面圖。標記公錐小端直徑 (Ød 3.970~4.035 mm)、母錐大端內徑 (ØD 4.225~4.270 mm) 及 1:16.667 (雙邊 3.436°) 錐度角，證明防漏取決於微觀錐面靜摩擦緊密過盈配合。',
        descriptionEn: 'Detailed CAD cross-section of the 6% Luer male cone and female socket mating interface. Labels the male cone minor diameter (Ød 3.970–4.035 mm), female socket major bore (ØD 4.225–4.270 mm), and 1:16.667 taper angle (bilateral 3.436°), demonstrating that leak-tightness relies on microscopic taper static-friction interference fit.',
        selectionReasonZh: '🎯 [受測實體幾何規範] 入選原因：本圖為 ISO 80369-7 Fig.B.1 (6% 公魯爾錐體)，屬於 6.1 流體洩漏測試實施時的實體受測對象。6.1 液體防漏完全取決於 6% 微觀錐面靜摩擦過盈配合（Ød 3.970~4.035 mm），故納入作為產品端幾何驗證基準。',
        selectionReasonEn: '🎯 [Physical Connector Geometry Specification] Rationale: This is ISO 80369-7 Fig.B.1 (6% male Luer cone), the physical DUT geometry during Clause 6.1 fluid leakage testing. Liquid sealing depends entirely on the 6% micro-taper static-friction interference fit (Ød 3.970–4.035 mm), making it the baseline for product geometric verification.',
        svgKey: 'ISO7-FIG-B1',
        keyCallouts: [
          { id: 'taper', labelZh: '圓錐斜率', labelEn: 'Taper Ratio', valueZh: '6% (1 : 16.667)', valueEn: '6% (1 : 16.667)' },
          { id: 'length', labelZh: '配合長度', labelEn: 'Engagement Length', valueZh: '≥ 7.5 mm', valueEn: '≥ 7.5 mm' },
          { id: 'angle', labelZh: '半錐角度 α', labelEn: 'Half-cone Angle α', valueZh: '1.718°', valueEn: '1.718°' }
        ]
      }
    ]
  },
  {
    id: 'sub-atmospheric-air-leakage',
    titleZh: '2. 負壓空氣與抽吸洩漏測試 (Sub-atmospheric Air Leakage & Aspiration)',
    titleEn: 'Air Leakage under Vacuum',
    category: 'leakage',
    categoryZh: '洩漏與氣密',
    iconName: 'Wind',
    shortSummaryZh: '在 80~88 kPa 真空負壓下保持 15~20 秒，驗證無空氣吸入管路（防氣栓危害）。',
    detailedDescriptionZh: '負壓空氣洩漏測試模擬抽吸藥液、體液引流或泵浦抽吸時管路內產生的負壓環境。若魯爾接頭氣密性不足，外部空氣會經由錐面縫隙被吸入輸液系統，可能引發靜脈空氣栓塞（Air Embolism）等重大醫療風險。ISO 80369-20:2024 最新新增 Annex K（抽吸過程水下氣泡目視檢驗法）。',
    keyParameters: [
      { label: '裝配扭矩 Assembly Torque', value: '0.08 - 0.12', unit: 'N·m' },
      { label: '真空負壓 Test Vacuum', value: '80.0 - 88.0', unit: 'kPa' },
      { label: '保持時間 Hold Time', value: '15 - 20', unit: '秒' },
      { label: '洩漏極限 Max Leak Rate', value: '≤ 0.005', unit: 'Pa·m³/s' }
    ],
    relatedISO7Clauses: ['6.2'],
    relatedISO20Annexes: ['Annex D', 'Annex K'],
    relatedRefConnectors: ['C.1', 'C.4', 'C.2', 'C.5'],
    engineeringRiskZh: '軟質塑膠在負壓下發生錐面向內微幅收縮變形，導致配合面局部脫離產生微氣孔吸氣。',
    auditFocusZh: '負壓量測衰減法（Vacuum Decay, Annex D）中的儀器容積校正與溫度穩定度。注意：真空衰減法與正壓衰減法（Annex B.4）在儀器動作控制上皆具備「充/抽氣-穩定-測試-排/復壓」四階段邏輯，但 Annex D 施加條件為 80~88 kPa 負壓真空，以避免外界空氣吸入。',
    tags: ['80kPa', '負壓', '真空', '氣栓', '6.2', 'Annex D', 'Annex K'],
    figures: [
      {
        id: 'ISO20-FIG-D1',
        titleZh: '負壓空氣洩漏測試裝置圖 (Figure D.1 — 乾式定量真空衰減法原圖)',
        titleEn: 'Sub-atmospheric Vacuum Decay Leakage Test Apparatus (ISO 80369-20 Figure D.1)',
        standard: 'ISO 80369-20:2024 Annex D',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '忠實還原 ISO 80369-20 Figure D.1 官方線圖。管路與組件於【乾燥狀態】下運作。標示：1. 密封端件、2. 受測接頭、3. 金屬參考件 (C.2/C.4)、4. 隔離閥 (stop-valve)、5. 真空源 (-88.0 kPa)、6. 壓力計 (manometer)、7. 測試體積、8. 體積達成裝置。透由壓力計數值衰減進行定量驗證 (≤ 0.005 Pa·m³/s)。',
        descriptionEn: 'Faithfully reproduces the official ISO 80369-20 Figure D.1 line drawing. System operates in a dry state. Labeled components: 1. End cap, 2. Connector under test, 3. Metal reference connector (C.2/C.4), 4. Stop valve, 5. Vacuum source (−88.0 kPa), 6. Manometer, 7. Test volume, 8. Volume-setting device. Quantitative leakage verification (≤ 0.005 Pa·m³/s) is performed by monitoring the manometer reading decay.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖 - 乾式定量壓力計] 入選原因：本圖為 ISO 80369-20 Annex D Figure D.1 官方原圖。測試介質為純空氣（乾燥狀態），透由壓力計 (標示 6) 精密記錄負壓絕對變化量，屬於定量驗證 (Variable Test)。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint — Dry Quantitative Manometer] Rationale: This is the official Figure D.1 from ISO 80369-20 Annex D. The test medium is pure air (dry state); the manometer (item 6) precisely records the absolute negative-pressure change as a quantitative (variable) verification.',
        svgKey: 'ISO20-FIG-D1',
        keyCallouts: [
          { id: 'key_1_2', labelZh: '1-2. 受測接頭與密封', labelEn: 'Items 1–2: End Cap & DUT', valueZh: 'Key 1 (Sealing) & Key 2 (Connector Under Test)', valueEn: 'Key 1 (Sealing) & Key 2 (Connector Under Test)' },
          { id: 'key_3', labelZh: '3. 參考金屬件', labelEn: 'Item 3: Reference Connector', valueZh: 'Key 3 (Reference Connector C.2 / C.4)', valueEn: 'Key 3 (Reference Connector C.2 / C.4)' },
          { id: 'key_4_5', labelZh: '4-5. 隔離閥與真空源', labelEn: 'Items 4–5: Stop Valve & Vacuum', valueZh: 'Key 4 (Stop-valve) & Key 5 (Vacuum Source)', valueEn: 'Key 4 (Stop-valve) & Key 5 (Vacuum Source)' },
          { id: 'key_6_8', labelZh: '6-8. 壓力計與測試體積', labelEn: 'Items 6–8: Manometer & Volume', valueZh: 'Key 6 (Manometer) & Key 7/8 (Test Volume Device)', valueEn: 'Key 6 (Manometer) & Key 7/8 (Test Volume Device)' }
        ]
      },
      {
        id: 'ISO20-FIG-K1',
        titleZh: '抽吸過程水下氣泡法氣密測試裝置圖 (Figure K.1 — 濕式定性目視氣泡流原圖)',
        titleEn: 'Air Leakage During Aspiration Test Apparatus (ISO 80369-20 Figure K.1)',
        standard: 'ISO 80369-20:2024 Annex K',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '忠實還原 ISO 80369-20 Figure K.1 官方線圖。受測件內部【注滿水】。標示：1. 密封端件、2. 注水受測接头、3. 注水參考接頭、4. 透明圓筒水槽容器 (填充 1/3 水)、5. 壓力計、6. 快速閥門、7. 真空幫浦。抽真空 20 秒目視水槽內是否有連續氣泡流 (定性驗證)。',
        descriptionEn: 'Faithfully reproduces the official ISO 80369-20 Figure K.1 line drawing. Connectors under test are filled with water. Labeled components: 1. End cap, 2. Water-filled DUT connector, 3. Water-filled reference connector, 4. Transparent cylindrical water vessel (filled to 1/3), 5. Manometer, 6. Quick-acting valve, 7. Vacuum pump. Vacuum is applied for 20 s while visually inspecting for continuous bubble streams inside the vessel (qualitative pass/fail).',
        selectionReasonZh: '🛠️ [物理測試架設藍圖 - 濕式水下目視氣泡] 入選原因：本圖為 ISO 80369-20 Annex K Figure K.1 官方原圖。核心特徵為接頭內部注滿水 (Key 2/3)，並垂直連接上方透明圓筒水槽 (Key 4)，以目視氣泡流判定 Pass/Fail (定性測試)，貼合臨床液體抽吸情境。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint — Wet Visual Bubble Inspection] Rationale: This is the official Figure K.1 from ISO 80369-20 Annex K. The key feature is that both connectors are water-filled (items 2/3) and vertically connected to the overhead transparent cylindrical vessel (item 4), with pass/fail determined by visible bubble flow — a qualitative test closely mirroring clinical fluid aspiration scenarios.',
        svgKey: 'ISO20-FIG-K1',
        keyCallouts: [
          { id: 'key_1_3', labelZh: '1-3. 注水接頭組裝', labelEn: 'Items 1–3: Water-filled Assembly', valueZh: 'Key 1 (Sealing) & Key 2/3 (Connectors Filled with Water)', valueEn: 'Key 1 (Sealing) & Key 2/3 (Connectors Filled with Water)' },
          { id: 'key_4', labelZh: '4. 透明圓筒水槽', labelEn: 'Item 4: Transparent Vessel', valueZh: 'Key 4 (Cylindrical Vessel Filled 1/3 Capacity with Water)', valueEn: 'Key 4 (Cylindrical Vessel Filled 1/3 with Water)' },
          { id: 'key_5_6', labelZh: '5-6. 壓力計與快速閥', labelEn: 'Items 5–6: Manometer & Quick Valve', valueZh: 'Key 5 (Manometer) & Key 6 (Stop Valve)', valueEn: 'Key 5 (Manometer) & Key 6 (Stop Valve)' },
          { id: 'key_7', labelZh: '7. 真空幫浦源', labelEn: 'Item 7: Vacuum Pump', valueZh: 'Key 7 (Vacuum Pump Source — -88.0 kPa)', valueEn: 'Key 7 (Vacuum Pump Source — −88.0 kPa)' }
        ]
      }
    ]
  },
  {
    id: 'overriding-torque',
    titleZh: '3. 抗過載滑牙測試 (Resistance to Overriding)',
    titleEn: 'Overriding Torque Resistance',
    category: 'mechanical',
    categoryZh: '機械強度',
    iconName: 'Zap',
    shortSummaryZh: '施加 0.15~0.17 N·m 破壞性高扭矩，配合 C.3 最壞情況 2.71mm 窄耳翼考驗套環抗膨脹強度。',
    detailedDescriptionZh: '醫護人員在臨床護理時常因緊張或習慣過度旋緊魯爾接頭。抗過載測試要求接頭在承受 0.15~0.17 N·m（相當於標準旋緊扭力 1.5 倍）的過載扭力下維持 5~10 秒，螺紋或套環不得發生滑牙、跳牙或結構裂解。此項目嚴格搭配 C.3（2.71mm 窄耳翼）或 C.6 金屬最壞情況夾具。',
    keyParameters: [
      { label: '測試扭矩 Test Torque', value: '0.15 - 0.17', unit: 'N·m' },
      { label: '保持時間 Hold Time', value: '5 - 10', unit: '秒' },
      { label: '極限夾具 Critical Fixture', value: 'Fig.C.3 (2.71mm 耳翼)' },
      { label: '失敗模式 Failure Mode', value: '環向應力膨脹 (Hoop Expansion) 滑脫' }
    ],
    relatedISO7Clauses: ['6.6'],
    relatedISO20Annexes: ['Annex H'],
    relatedRefConnectors: ['C.3', 'C.6'],
    engineeringRiskZh: '材料剛性不足（如標準 PP 彈性模數 < 1200 MPa）會因斜面分力產生高額環向應力使套環膨脹，導致 2.71mm 耳翼瞬間跳牙。',
    auditFocusZh: '扭矩感測器轉速限制（扭矩施加速率控制）、C.3 金屬夾具耳翼磨損狀態校正。',
    tags: ['0.17Nm', '滑牙', 'C.3', '環向應力', '6.6', 'Annex H'],
    figures: [
      {
        id: 'ISO20-FIG-H1',
        titleZh: '抗過載滑牙測試機台與環向應力膨脹機構圖',
        titleEn: 'Resistance to Overriding Test Rig & Hoop Stress Expansion',
        standard: 'ISO 80369-20:2024 Annex H',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '展示 ISO 80369-20 Annex H 過載扭矩測試機台與受測公鎖定接頭在 0.15~0.17 N·m 高扭矩下的力學受力圖。受測公套環在對接 C.3 (2.71mm 窄耳翼) 時，斜面分力產生強烈環向應力 (Hoop Stress)，若剛性不足將致套環膨脹而跳牙。',
        descriptionEn: 'Shows the ISO 80369-20 Annex H overriding torque test rig and the mechanical force diagram of the male lock connector under 0.15–0.17 N·m high torque. When the male collar engages C.3 (2.71 mm narrow lugs), inclined-plane force components generate intense hoop stress, which will cause the collar to expand and strip the thread if material stiffness is insufficient.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖] 入選原因：本圖為 ISO 80369-20 Annex H 抗過載扭矩測試機台。6.6 過載滑牙測試施加 0.15~0.17 N·m 破壞性扭矩，本圖解構環向張應力 (Hoop Stress) 致使套環膨脹跳牙之受力機構。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint] Rationale: This is the ISO 80369-20 Annex H overriding torque test rig. Clause 6.6 applies a destructive torque of 0.15–0.17 N·m; this diagram deconstructs the hoop tensile stress (σθ) mechanism that causes collar expansion and thread stripping.',
        svgKey: 'ISO20-FIG-H1',
        keyCallouts: [
          { id: 'torque', labelZh: '過載破壞扭矩', labelEn: 'Overriding Destructive Torque', valueZh: '0.15 ~ 0.17 N·m', valueEn: '0.15 ~ 0.17 N·m' },
          { id: 'rpm', labelZh: '伺服馬達轉速', labelEn: 'Servo Motor Speed', valueZh: '3.0 rpm ± 0.5 rpm', valueEn: '3.0 rpm ± 0.5 rpm' },
          { id: 'fixture', labelZh: '最壞情況夾具', labelEn: 'Worst-case Fixture', valueZh: 'Fig.C.3 (2.71mm 耳翼)', valueEn: 'Fig.C.3 (2.71 mm lugs)' },
          { id: 'mechanic', labelZh: '應力失效模式', labelEn: 'Stress Failure Mode', valueZh: '環向張應力 σθ > 材料屈服極限', valueEn: 'Hoop tensile stress σθ > material yield limit' }
        ]
      },
      {
        id: 'ISO7-FIG-B3',
        titleZh: '公鎖定套環螺紋 CAD 幾何剖面圖 (Fig.B.3)',
        titleEn: 'Male Luer Lock Fixed Collar Thread Geometry (Fig.B.3)',
        standard: 'ISO 80369-7:2021 Fig.B.3',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: 'CAD 幾何剖面圖說明 ISO 80369-7 雙頭內螺紋 (Pitch 2.5mm，角度 25°~30°) 旋合咬合時之接觸面與頂部投影量 c (2.1mm)。',
        descriptionEn: 'CAD cross-section illustrating the contact surface and cone projection c (2.1 mm) when the ISO 80369-7 double-start internal thread (Pitch 2.5 mm, angle 25°–30°) engages.',
        selectionReasonZh: '🎯 [受測實體幾何規範] 入選原因：本圖為 ISO 80369-7 Fig.B.3 (公鎖定固定環螺紋)，屬於 6.6 過載滑牙測試的受測實體對象，提供螺紋節距 (2.5mm) 與錐體投影量 (c ≥ 2.1mm) 咬合幾何依據。',
        selectionReasonEn: '🎯 [Physical Connector Geometry Specification] Rationale: This is ISO 80369-7 Fig.B.3 (male lock fixed collar thread), the physical DUT geometry for Clause 6.6 overriding torque testing, providing the thread pitch (2.5 mm) and cone projection (c ≥ 2.1 mm) engagement geometry basis.',
        svgKey: 'ISO7-FIG-B3',
        keyCallouts: [
          { id: 'pitch', labelZh: '螺紋節距 Pitch', labelEn: 'Thread Pitch', valueZh: '2.5 mm', valueEn: '2.5 mm' },
          { id: 'proj', labelZh: '錐體投影量 c', labelEn: 'Cone Projection c', valueZh: '≥ 2.1 mm', valueEn: '≥ 2.1 mm' }
        ]
      }
    ]
  },
  {
    id: 'axial-separation',
    titleZh: '4. 抗軸向負載分離測試 (Resistance to Separation from Axial Load)',
    titleEn: 'Axial Load Pull-Off Resistance',
    category: 'mechanical',
    categoryZh: '機械強度',
    iconName: 'ArrowDownUp',
    shortSummaryZh: '施加 32~35 N（Lock）或 23~25 N（Slip）軸向強拉力，驗證螺紋與錐面抗拉脫分離能力。',
    detailedDescriptionZh: '測試醫用接頭在遭遇患者意外拉扯管路、病床移動或幫浦高壓推注產生的軸向拉拔力時，是否會突然脫開導致輸液中斷或藥物外噴。鎖定型（Lock）接頭需承受 32~35 N 軸向拉力，滑動型（Slip）需承受 23~25 N 拔動力，維持 10~15 秒不得脫離。',
    keyParameters: [
      { label: '鎖定型軸向力 Lock Force', value: '32 - 35', unit: 'N' },
      { label: '滑動型軸向力 Slip Force', value: '23 - 25', unit: 'N' },
      { label: '保持時間 Hold Time', value: '10 - 15', unit: '秒' },
      { label: '預旋扭矩 Pre-Torque', value: '0.08 - 0.12', unit: 'N·m' }
    ],
    relatedISO7Clauses: ['6.4'],
    relatedISO20Annexes: ['Annex F'],
    relatedRefConnectors: ['C.3', 'C.6', 'C.2', 'C.5'],
    engineeringRiskZh: '公鎖定套環螺紋咬合深度不夠、螺牙倒角過大或耳翼剪切強度不足導致螺牙被直接拉平。',
    auditFocusZh: '拉力機對心精度（避免偏心拉扯），夾具同軸度與同心度偏差。',
    tags: ['35N', '軸向拉力', '脫離', '6.4', 'Annex F'],
    figures: [
      {
        id: 'ISO20-FIG-F1',
        titleZh: '萬能拉力試驗機軸向拉拔分離測試裝置圖',
        titleEn: 'Universal Testing Machine Axial Separation Apparatus',
        standard: 'ISO 80369-20:2024 Annex F',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '展現 ISO 80369-20 Annex F 軸向拉力分離測試。定速 10 N/s 垂直施力至 35 N (Lock) 或 25 N (Slip)，持壓 10~15 秒，驗證受測接頭螺紋或錐面抗強拉拔能力，防止輸液管路拉扯斷開。',
        descriptionEn: 'Demonstrates the ISO 80369-20 Annex F axial separation pull-off test. Force is applied at a constant rate of 10 N/s vertically up to 35 N (Lock) or 25 N (Slip) and held for 10–15 s to verify the DUT connector\'s thread or taper resistance to strong pull-out forces, preventing IV line disconnection.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖] 入選原因：本圖為 ISO 80369-20 Annex F 萬能拉力機軸向分離測試架構。6.4 軸向負載分離測試需定速 10 N/s 施加 35 N (Lock) 或 25 N (Slip) 拉力持壓 10~15s，本圖提供抗拉脫測試裝置指引。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint] Rationale: This is the ISO 80369-20 Annex F universal testing machine axial separation apparatus. Clause 6.4 axial load separation testing requires applying 35 N (Lock) or 25 N (Slip) at 10 N/s and holding for 10–15 s; this diagram provides pull-out test setup guidance.',
        svgKey: 'ISO20-FIG-F1',
        keyCallouts: [
          { id: 'f_lock', labelZh: '鎖定型軸向拉力', labelEn: 'Lock Axial Pull Force', valueZh: '35 N (10~15秒)', valueEn: '35 N (10–15 s)' },
          { id: 'f_slip', labelZh: '滑動型軸向拉力', labelEn: 'Slip Axial Pull Force', valueZh: '25 N (10~15秒)', valueEn: '25 N (10–15 s)' },
          { id: 'rate', labelZh: '拉力加載速率', labelEn: 'Force Loading Rate', valueZh: '10 N/s', valueEn: '10 N/s' }
        ]
      }
    ]
  },
  {
    id: 'unscrewing-separation',
    titleZh: '5. 抗旋鬆分離測試 (Resistance to Separation from Unscrewing)',
    titleEn: 'Unscrewing Torque Self-Locking',
    category: 'mechanical',
    categoryZh: '機械強度',
    iconName: 'RotateCw',
    shortSummaryZh: '施加 0.018~0.02 N·m 反向旋鬆力，確認 6% 錐面摩擦自鎖能力，防止管路因震動自行解鎖。',
    detailedDescriptionZh: '驗證魯爾鎖定接頭在旋緊裝配後，其錐面間的靜摩擦力與螺紋自鎖角是否足以抵禦管路微幅擺動、患者活動產生的微小反向扭矩。在裝配後施加 0.018~0.020 N·m 的反向解開扭矩維持 10~15 秒，接頭不得自行鬆脫分離。',
    keyParameters: [
      { label: '反向扭矩 Reverse Torque', value: '0.018 - 0.020', unit: 'N·m' },
      { label: '保持時間 Hold Time', value: '10 - 15', unit: '秒' },
      { label: '物理機制 Physics', value: '6% 錐面摩擦自鎖力 (Self-locking taper)' }
    ],
    relatedISO7Clauses: ['6.5'],
    relatedISO20Annexes: ['Annex G', 'Annex I'],
    relatedRefConnectors: ['C.1', 'C.4'],
    engineeringRiskZh: '塑膠材料表面太滑（過度添加潤滑劑或脫模劑），造成靜摩擦係數過低而容易旋鬆。',
    auditFocusZh: '反向扭矩計微量程精度（0.001 N·m 分辨率），裝配後靜置時間控制。',
    tags: ['0.02Nm', '旋鬆', '自鎖', '6.5', 'Annex G', 'Annex I'],
    figures: [
      {
        id: 'ISO20-FIG-G1',
        titleZh: '反向旋鬆扭矩與拆卸力雙軌測試示意圖',
        titleEn: 'Unscrewing Torque & Disconnection Torque Apparatus',
        standard: 'ISO 80369-20:2024 Annex G & Annex I',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '對比 ISO 80369-20 Annex G (反向旋鬆 0.02 N·m 防振動解鎖) 與 Annex I (拆卸扭矩峰值量測) 雙軌規範。解析 6% 錐度摩擦自鎖力學與臨床人因易拆性之平衡。',
        descriptionEn: 'Compares the dual-track normative requirements of ISO 80369-20 Annex G (reverse unscrewing at 0.02 N·m — vibration-induced self-loosening prevention) and Annex I (peak disconnection torque measurement). Analyzes the balance between 6% taper friction self-locking mechanics and clinical ergonomic ease of disconnection.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖] 入選原因：本圖對比 ISO 80369-20 Annex G (反向旋鬆 0.02 N·m 防振動解鎖) 與 Annex I (拆卸扭矩峰值) 雙軌試驗架構。6.5 抗旋鬆測試評估 6% 圓錐靜摩擦自鎖力，本圖提供試驗指引。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint] Rationale: This diagram compares the ISO 80369-20 Annex G (reverse unscrewing at 0.02 N·m — vibration-induced self-loosening prevention) and Annex I (peak disconnection torque) dual-track test apparatus. Clause 6.5 unscrewing resistance evaluates 6% taper static-friction self-locking, and this diagram provides the test setup reference.',
        svgKey: 'ISO20-FIG-G1',
        keyCallouts: [
          { id: 'annex_g', labelZh: 'Annex G 反旋扭矩', labelEn: 'Annex G Reverse Torque', valueZh: '0.018 ~ 0.020 N·m', valueEn: '0.018 ~ 0.020 N·m' },
          { id: 'annex_i', labelZh: 'Annex I 拆卸靜置', labelEn: 'Annex I Disconnection Dwell', valueZh: '10 ~ 15 分鐘後量測峰值', valueEn: 'Measure peak torque after 10–15 min dwell' }
        ]
      }
    ]
  },
  {
    id: 'stress-cracking',
    titleZh: '6. 應力龜裂測試 (Stress Cracking & Annex E)',
    titleEn: 'Environmental Stress Cracking (ESCR)',
    category: 'durability',
    categoryZh: '耐久性與環境',
    iconName: 'ShieldAlert',
    shortSummaryZh: '裝配於參考接頭於 23°C 空氣中靜置 48 小時 (Annex E)，驗證無應力龜裂與洩漏。',
    detailedDescriptionZh: 'ISO 80369-7 6.3 與 ISO 80369-20 Annex E 規範：將接頭裝配於金屬參考接頭上，於 23°C 空氣中靜置 48 小時後評估洩漏與結構無應力龜裂狀況。',
    keyParameters: [
      { label: '測試靜置時間 Duration', value: '48', unit: '小時' },
      { label: '試驗環境 Ambient Environment', value: '23°C 空氣靜置 48h (ISO標準)' },
      { label: '環境溫度 Temperature', value: '20 - 30', unit: '°C' }
    ],
    relatedISO7Clauses: ['6.3'],
    relatedISO20Annexes: ['Annex E'],
    relatedRefConnectors: ['C.1', 'C.4'],
    engineeringRiskZh: 'PC 或 Polycarbonate 材料對過盈應力較為敏感，若射出成型分子內應力過高，極易在 24 小時內發生龜裂爆裂。',
    auditFocusZh: '顯微鏡觀察倍率（≥ 10x），殘留應力檢驗（偏光應力分析）。',
    tags: ['48小時', '23°C空氣', 'ESCR', '應力龜裂', '6.3', 'Annex E'],
    figures: [
      {
        id: 'ISO20-FIG-E1',
        titleZh: 'ISO 80369-20 Annex E 48小時應力龜裂試驗圖',
        titleEn: 'ISO 80369-20 Annex E 48h Stress Cracking Test Setup',
        standard: 'ISO 80369-20:2024 Annex E',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '說明 ISO 80369-20 Annex E 試驗。組裝件裝配於金屬參考接頭於 23°C 空氣環境中靜置 48 小時，驗證環向應力下無龜裂破裂，並需通過 Annex B/C 洩漏測試。',
        descriptionEn: 'Describes the ISO 80369-20 Annex E test procedure. Assembled connectors are mounted on metal reference connectors and held in 23°C ambient air for 48 hours to verify absence of cracking or fracture under hoop stress, followed by the Annex B/C leakage test.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖] 入選原因：本圖為 ISO 80369-20 Annex E 48小時應力龜裂試驗架構。6.3 應力龜裂測試將裝配件於 23°C 空氣中靜置 48 小時，本圖提供環境靜置與試驗檢驗設定指引。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint] Rationale: This depicts the ISO 80369-20 Annex E 48-hour stress cracking test setup. Clause 6.3 stress cracking testing holds assemblies in 23°C ambient air for 48 h; this diagram provides the environmental conditioning and inspection setup guidance.',
        svgKey: 'ISO20-FIG-E1',
        keyCallouts: [
          { id: 'media', labelZh: '試驗條件', labelEn: 'Test Conditions', valueZh: '23°C 空氣環境 48h (ISO標準)', valueEn: '23°C ambient air, 48 h (ISO standard)' },
          { id: 'time', labelZh: '浸泡靜置時間', labelEn: 'Conditioning Duration', valueZh: '≥ 48 小時', valueEn: '≥ 48 hours' },
          { id: 'temp', labelZh: '環境溫度', labelEn: 'Ambient Temperature', valueZh: '20°C ~ 30°C', valueEn: '20°C ~ 30°C' }
        ]
      }
    ]
  },
  {
    id: 'dimensional-taper',
    titleZh: '7. 6% 魯爾錐面與幾何尺寸 (Dimensional Requirements & 6% Taper)',
    titleEn: '6% Taper Dimensions & Gauging',
    category: 'dimensional',
    categoryZh: '幾何尺寸',
    iconName: 'Ruler',
    shortSummaryZh: '規範 6% 圓錐度（1:16.667）、錐面長度、螺紋距與耳翼厚度，保障物理介面全球相容性。',
    detailedDescriptionZh: 'ISO 80369-7 第 5 章精確規定了公魯爾（Male / Cone）與母魯爾（Female / Socket）鎖定與滑動接頭的所有關鍵幾何尺寸。包括 6% 錐度斜率（每毫米直徑遞減 0.06mm）、最小錐面接觸長度（7.5mm）、公套環內徑、螺紋 pitch（2.5mm）、耳翼角度等，確保全球不同廠商之醫療器材能無縫互換。',
    keyParameters: [
      { label: '圓錐斜率 Taper Ratio', value: '6% (1 : 16.667)', unit: '' },
      { label: '公錐小端直徑 Ød', value: '3.970 - 4.035', unit: 'mm' },
      { label: '最小配合長度 Min Length', value: '7.5', unit: 'mm' },
      { label: '標準耳翼寬度 Tab Width', value: '3.50 (C.1 標稱)', unit: 'mm' }
    ],
    relatedISO7Clauses: ['Clause 5.1', 'Clause 5.2', 'Clause 5.3'],
    relatedISO20Annexes: ['Annex A'],
    relatedRefConnectors: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'C.6'],
    engineeringRiskZh: '模具公差控管不當導致錐度偏離 6%，會造成配合時產生單點環狀接觸，引發氣密洩漏或應力過度集中。',
    auditFocusZh: '三次元三維量測儀（CMM）或光學影像投影儀光學量測報告，極限環規塞規驗證。',
    tags: ['6%錐度', '尺寸', '5.1', '5.2', 'Annex A', 'CMM'],
    figures: [
      {
        id: 'ISO7-FIG-B1-B2',
        titleZh: '6% 魯爾公/母錐體斜率與關鍵尺寸 CAD 圖',
        titleEn: '6% Luer Cone & Socket Slope CAD Drawing',
        standard: 'ISO 80369-7:2021 Fig.B.1 & B.2',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: '展現 6% 圓錐 (1:16.667，單邊 α=1.718°) 幾何尺寸圖。標記小端直徑 (Ød 3.970~4.035mm)、最小配合長度 7.5mm 與倒角規格。',
        descriptionEn: 'Shows the 6% taper (1:16.667, half-angle α = 1.718°) geometry diagram. Labels the minor-end diameter (Ød 3.970–4.035 mm), minimum engagement length 7.5 mm, and chamfer specifications.',
        selectionReasonZh: '🎯 [受測實體幾何規範] 入選原因：本圖合併 6% 魯爾公錐 (Fig.B.1) 與母錐 (Fig.B.2) 幾何 CAD 尺寸，屬於 ISO 80369-7 第 5 章幾何尺寸與圓錐斜率 (1:16.667) 之核心產品檢驗基準。',
        selectionReasonEn: '🎯 [Physical Connector Geometry Specification] Rationale: This diagram combines the 6% male Luer cone (Fig.B.1) and female socket (Fig.B.2) CAD geometry, serving as the core product inspection reference for ISO 80369-7 Clause 5 dimensional requirements and taper ratio (1:16.667).',
        svgKey: 'ISO7-FIG-B1-B2',
        keyCallouts: [
          { id: 'ratio', labelZh: '錐度斜率', labelEn: 'Taper Ratio', valueZh: '1 : 16.667 (6%)', valueEn: '1 : 16.667 (6%)' },
          { id: 'min_l', labelZh: '最小長度 e', labelEn: 'Minimum Length e', valueZh: '≥ 7.5 mm', valueEn: '≥ 7.5 mm' }
        ]
      },
      {
        id: 'ISO7-FIG-B3-B6',
        titleZh: '魯爾鎖定螺紋距、投影量與耳翼 CAD 幾何圖 (Fig.B.3 & Fig.B.6)',
        titleEn: 'Luer Lock Thread Pitch & Projection Distance CAD',
        standard: 'ISO 80369-7:2021 Fig.B.3 & Fig.B.6',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: 'CAD 圖面標註公鎖定雙頭螺紋 (Pitch 2.5mm) 與母耳翼 (標稱 3.50mm) 配合，標註核心參數 c ≥ 2.1mm 及 t ≤ 3.2mm。',
        descriptionEn: 'CAD drawing annotating the male lock double-start thread (Pitch 2.5 mm) and female lug (nominal 3.50 mm) engagement, with key parameters c ≥ 2.1 mm and t ≤ 3.2 mm labeled.',
        selectionReasonZh: '🎯 [受測實體幾何規範] 入選原因：本圖合併公鎖定雙頭螺紋 (Fig.B.3) 與母耳翼 (Fig.B.6) 幾何 CAD 尺寸，屬於 ISO 80369-7 第 5 章雙頭螺紋 (Pitch 2.5mm) 與咬合幾何 (c ≥ 2.1mm) 之驗證依據。',
        selectionReasonEn: '🎯 [Physical Connector Geometry Specification] Rationale: This combines the male lock double-start thread (Fig.B.3) and female lug (Fig.B.6) CAD geometry, providing the ISO 80369-7 Clause 5 verification basis for thread pitch (2.5 mm) and engagement geometry (c ≥ 2.1 mm).',
        svgKey: 'ISO7-FIG-B3-B6',
        keyCallouts: [
          { id: 'p', labelZh: '雙頭螺紋 pitch', labelEn: 'Double-start Thread Pitch', valueZh: '2.5 mm', valueEn: '2.5 mm' },
          { id: 'c', labelZh: '錐體投影量 c', labelEn: 'Cone Projection c', valueZh: '≥ 2.1 mm', valueEn: '≥ 2.1 mm' }
        ]
      },
      {
        id: 'ISO7-FIG-B7',
        titleZh: '具直角凸耳母 Luer Lock 接頭 CAD 幾何圖 (Fig.B.7 — 變體 B)',
        titleEn: 'Female Luer Lock Connector Lugs CAD Geometry (ISO 80369-7 Fig.B.7 Variant B)',
        standard: 'ISO 80369-7:2021 Fig.B.7',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: '呈現 ISO 80369-7 Figure B.7 母魯爾鎖定接頭【直角凸耳變體 B】之 CAD 幾何尺寸與切向圓角公差。規範耳翼外徑 (ØD 7.70~7.90mm)、耳翼厚度 (t 1.40~1.70mm) 與 360° 圓角細節。',
        descriptionEn: 'Presents the CAD geometry and tangential radius tolerances of ISO 80369-7 Figure B.7 female Luer lock connector Variant B (right-angle lugs). Specifies lug OD (ØD 7.70–7.90 mm), lug thickness (t 1.40–1.70 mm), and 360° radius details.',
        selectionReasonZh: '🎯 [受測實體幾何規範] 入選原因：本圖為 ISO 80369-7 Fig.B.7 (母鎖定凸耳變體 B)，規範常見於射出成型藥液輸送管路接頭的倒角/圓角耳翼尺寸，提供 5.2 母鎖定接頭幾何檢驗依據。',
        selectionReasonEn: '🎯 [Physical Connector Geometry Specification] Rationale: This is ISO 80369-7 Fig.B.7 (female lock lug Variant B), specifying the chamfered/radiused lug dimensions common in injection-molded IV line connectors, providing the Clause 5.2 female lock connector geometry inspection basis.',
        svgKey: 'ISO7-FIG-B7',
        keyCallouts: [
          { id: 'dia', labelZh: '耳翼外徑 ØD', labelEn: 'Lug OD ØD', valueZh: '7.70 ~ 7.90 mm', valueEn: '7.70 ~ 7.90 mm' },
          { id: 'thick', labelZh: '耳翼厚度 t', labelEn: 'Lug Thickness t', valueZh: '1.40 ~ 1.70 mm', valueEn: '1.40 ~ 1.70 mm' },
          { id: 'variant', labelZh: '幾何特徵', labelEn: 'Geometry Feature', valueZh: '變體 B (Variant B 圓角凸耳)', valueEn: 'Variant B (radiused right-angle lugs)' }
        ]
      },
      {
        id: 'ISO7-FIG-B8',
        titleZh: '具直角凸耳母 Luer Lock 接頭 CAD 幾何圖 (Fig.B.8 — 變體 C)',
        titleEn: 'Female Luer Lock Connector Lugs CAD Geometry (ISO 80369-7 Fig.B.8 Variant C)',
        standard: 'ISO 80369-7:2021 Fig.B.8',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: '呈現 ISO 80369-7 Figure B.8 母魯爾鎖定接頭【直角凸耳變體 C】之 CAD 幾何尺寸與雙翼/外展圓弧公差。規範耳翼翼寬 (ØH 11.50~12.50mm) 與結構幾何加強區。',
        descriptionEn: 'Presents the CAD geometry and bilateral wing-arc tolerances of ISO 80369-7 Figure B.8 female Luer lock connector Variant C (right-angle lugs). Specifies wing span OD (ØH 11.50–12.50 mm) and structural reinforcement geometry.',
        selectionReasonZh: '🎯 [受測實體幾何規範] 入選原因：本圖為 ISO 80369-7 Fig.B.8 (母鎖定凸耳變體 C)，規範翅膀翼型 (Winged) 便於臨床人員旋緊手握之大尺寸耳翼幾何，提供 5.2 母鎖定接頭幾何檢驗依據。',
        selectionReasonEn: '🎯 [Physical Connector Geometry Specification] Rationale: This is ISO 80369-7 Fig.B.8 (female lock lug Variant C), specifying the winged lug geometry for clinical ease of grip during tightening, providing the Clause 5.2 female lock connector geometry inspection basis.',
        svgKey: 'ISO7-FIG-B8',
        keyCallouts: [
          { id: 'wing_width', labelZh: '雙翼外徑 ØH', labelEn: 'Wing Span OD ØH', valueZh: '11.50 ~ 12.50 mm', valueEn: '11.50 ~ 12.50 mm' },
          { id: 'thick', labelZh: '耳翼厚度 t', labelEn: 'Lug Thickness t', valueZh: '1.40 ~ 1.70 mm', valueEn: '1.40 ~ 1.70 mm' },
          { id: 'variant', labelZh: '幾何特徵', labelEn: 'Geometry Feature', valueZh: '變體 C (Variant C 翅膀雙翼)', valueEn: 'Variant C (winged bilateral lugs)' }
        ]
      }
    ]
  },
  {
    id: 'reference-connectors',
    titleZh: '8. 金屬參考接頭與夾具 (Reference Connectors C.1 ~ C.6)',
    titleEn: 'Reference Steel Connector Fixtures',
    category: 'assembly',
    categoryZh: '夾具與金屬件',
    iconName: 'Wrench',
    shortSummaryZh: '定義 ISO 80369-7 附錄 C 的 6 種標準鋼製金屬參考接頭（C.1~C.6），標準化法規測試檢驗條件。',
    detailedDescriptionZh: '為了排除測試受測物時對手件材質變形的干擾，ISO 80369-7 附錄 C 定義了硬化不鏽鋼等高剛性金屬製作的參考接頭（Fig.C.1 至 C.6，彈性模數 > 3433 MPa；ISO 要求硬化抗磨損，一般未處理 316 因基材過軟 <20HRC 且易咬死而無法單獨達標，實務須用熱處理 17-4PH/440C ≥45 HRC 或 316 經表面低溫氮化改質硬化）。其中 C.1/C.4 用於標準氣密性測試，而 C.3（母耳翼縮窄至 2.71mm）及 C.6 則為專門測試機械極限的最壞情況（Worst-case）夾具。',
    keyParameters: [
      { label: '材質要求 Material', value: 'ISO: 硬化不鏽鋼(抗磨損) / 17-4PH(≥45HRC)或316(須表面氮化)' },
      { label: '標稱母耳翼 C.1 Tab Width', value: '3.50', unit: 'mm' },
      { label: '極限母耳翼 C.3 Tab Width', value: '2.71 (縮窄 22%)', unit: 'mm' },
      { label: '表面粗糙度 Surface Finish', value: 'Ra ≤ 0.8', unit: 'μm' }
    ],
    relatedISO7Clauses: ['Annex C'],
    relatedISO20Annexes: ['General Apparatus Section 4'],
    relatedRefConnectors: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'C.6'],
    engineeringRiskZh: '誤用非標準的 360° 全螺紋 SML 連接器進行法規測試，雖然極易 Pass，但申報時會被 FDA / TFDA 認定無效並退件！',
    auditFocusZh: '參考金屬夾具的 ISO 17025 外部校正報告、幾何特徵磨損與表面咬合損壞檢查記錄。',
    tags: ['C.1', 'C.3', 'C.4', 'C.6', '參考夾具', 'Annex C'],
    figures: [
      {
        id: 'ISO7-FIG-C1-C3',
        titleZh: 'Annex C 金屬標準參考連接器 CAD 圖鑑 (Fig.C.1 ~ C.6)',
        titleEn: 'Annex C Stainless Steel Reference Fixture Schematics',
        standard: 'ISO 80369-7:2021 Annex C',
        figureType: 'fixture',
        figureTypeZh: '參考金屬件',
        descriptionZh: '硬化不鏽鋼高精密度法規測試專用金屬參考件 (Fig.C.1~C.6，一般 316 須經表面氮化防磨損咬死；鋼規常選 17-4PH/440C ≥45 HRC)。詳細解析 C.1 標稱件與 C.3 Worst-case 最壞情況件之幾何差異。',
        descriptionEn: 'High-precision hardened stainless steel reference gauges for regulatory testing (Fig.C.1–C.6; standard 316 SS requires surface nitriding to prevent galling; 17-4PH/440C at ≥45 HRC are preferred). Detailed analysis of geometric differences between the C.1 nominal fixture and the C.3 worst-case fixture.',
        selectionReasonZh: '📐 [標準參考金屬夾具] 入選原因：本圖展現 ISO 80369-7 附錄 C 硬化不鏽鋼測試專用金屬參考件 (C.1~C.6)，對比 C.1 標稱件與 C.3 Worst-case (2.71mm 耳翼) 最壞情況件，提供法規測試夾具依據。',
        selectionReasonEn: '📐 [Standard Reference Metal Fixture] Rationale: This diagram presents the ISO 80369-7 Annex C hardened stainless steel test reference gauges (C.1–C.6), contrasting the C.1 nominal piece with the C.3 worst-case (2.71 mm lug) piece, providing the normative test fixture basis.',
        svgKey: 'ISO7-FIG-C3',
        keyCallouts: [
          { id: 'material', labelZh: '夾具材質', labelEn: 'Fixture Material', valueZh: 'ISO: Hardened SS / 17-4PH(≥45HRC) 或 316(須氮化)', valueEn: 'ISO: Hardened SS / 17-4PH (≥45 HRC) or 316 (nitriding required)' },
          { id: 'roughness', labelZh: '表面粗糙度', labelEn: 'Surface Roughness', valueZh: 'Ra ≤ 0.8 μm', valueEn: 'Ra ≤ 0.8 μm' }
        ]
      }
    ]
  },
  {
    id: 'pre-assembly',
    titleZh: '9. 預裝配程序與旋緊扭矩 (Pre-assembly Procedure & Assembly Torque)',
    titleEn: 'Standard Pre-assembly Method',
    category: 'assembly',
    categoryZh: '夾具與金屬件',
    iconName: 'Sparkles',
    shortSummaryZh: '規範所有性能測試前之標準預裝配程序：0.08~0.12 N·m 旋緊扭矩與 26.5~27.5 N 軸向推力結合。',
    detailedDescriptionZh: 'ISO 80369-20 各附錄（B~I）統一規範了進行物理性能測試前的標準預裝配程序：鎖定型接頭須同時施加 26.5~27.5 N 軸向推力與 0.08~0.12 N·m 旋緊扭矩保持 5~6 秒。在業界與國際標竿實驗室中（如 Enersol S15A 裝置），採用了非常優雅聰明的「雙軸懸浮線性導軌與校正重錘/槓桿機構 (Dead-weight & Biaxial Spindle Mechanism)」，使 27.5 N 垂直軸向力經由低摩擦線性滑軌垂直壓下，同時透過高精度定扭矩盤旋轉，達成 100% 無偏心、零傾角且完全同時作用的極致裝配精確度。',
    keyParameters: [
      { label: '標準裝配扭矩 Assembly Torque', value: '0.08 - 0.12', unit: 'N·m' },
      { label: '裝配軸向推力 Axial Force', value: '26.5 - 27.5', unit: 'N' },
      { label: '裝配保持時間 Hold Time', value: '5 - 6', unit: '秒' },
      { label: '機構系統 Mechanism', value: '雙軸線性導軌重錘與定扭矩盤 (S15A 原理)' }
    ],
    relatedISO7Clauses: ['6.1', '6.2', '6.3', '6.4', '6.5'],
    relatedISO20Annexes: ['General Test Procedure'],
    relatedRefConnectors: ['C.1', 'C.2', 'C.4', 'C.5'],
    engineeringRiskZh: '人工裝配無法精確同時施加軸向力與扭矩，易產生歪斜傾角（Cocked Assembly）導致密封面受力不均產生假洩漏或螺紋滑牙。',
    auditFocusZh: '檢視實驗室裝配裝置是否具備 27.5N 垂直重錘/線性滑軌與 0.12N·m 扭矩雙軸獨立運作結構，防範手持夾具之偏心誤差。',
    tags: ['0.12Nm', '裝配扭矩', '預裝配', '27.5N', 'S15A', '同時施加軸推力與扭力'],
    figures: [
      {
        id: 'ISO20-FIG-J1',
        titleZh: '軸向力 (27.5N) 與扭矩 (0.12N·m) 同時施加預裝配裝置原理圖 (Enersol S15A Concept)',
        titleEn: 'Simultaneous Axial Force & Assembly Torque Biaxial Device Schematic',
        standard: 'ISO 80369-20 General Procedure',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '示範國際標竿 ISO 80369-20 雙軸同時裝配裝置（如 Enersol S15A 原理）。利用垂直低摩擦線性導軌掛載 27.5 N 校正重錘垂直下壓，同時搭配頂部高精度 0.12 N·m 定扭矩輪旋轉，完全消除手持裝配的歪斜與傾角誤差。',
        descriptionEn: 'Demonstrates the ISO 80369-20 biaxial simultaneous assembly device (e.g., Enersol S15A concept). A 27.5 N calibrated dead-weight is suspended on a vertical low-friction linear rail to provide the downward axial force, while a precision 0.12 N·m torque wheel rotates simultaneously, completely eliminating the cocking and off-axis error of hand-tightening.',
        selectionReasonZh: '🛠️ [物理測試架設藍圖] 入選原因：本圖為 ISO 80369-20 通用預裝配程序雙軸同時加載裝置 (如 Enersol S15A 原理)。所有性能測試前均需以 27.5 N 軸向力與 0.12 N·m 扭矩預裝配 5~6s，本圖提供機構指引。',
        selectionReasonEn: '🛠️ [Physical Test Apparatus Blueprint] Rationale: This is the ISO 80369-20 general pre-assembly procedure biaxial simultaneous loading device (e.g., Enersol S15A concept). All performance tests require pre-assembly at 27.5 N axial force and 0.12 N·m torque for 5–6 s; this diagram provides the mechanism guidance.',
        svgKey: 'ISO20-FIG-J1',
        keyCallouts: [
          { id: 'pre_t', labelZh: '預裝配扭矩 (Assembly Torque)', labelEn: 'Assembly Torque', valueZh: '0.08 ~ 0.12 N·m', valueEn: '0.08 ~ 0.12 N·m' },
          { id: 'pre_f', labelZh: '預裝配軸向推力 (Axial Force)', labelEn: 'Axial Assembly Force', valueZh: '26.5 ~ 27.5 N', valueEn: '26.5 ~ 27.5 N' },
          { id: 'pre_hold', labelZh: '持壓穩定時間 (Hold Time)', labelEn: 'Hold Time', valueZh: '5 ~ 6 秒', valueEn: '5 ~ 6 s' },
          { id: 'pre_mech', labelZh: '機構設計 (Biaxial Mechanism)', labelEn: 'Biaxial Mechanism', valueZh: '無摩擦線性導軌 + 校正重錘', valueEn: 'Frictionless linear rail + calibrated dead-weight' }
        ]
      }
    ]
  },
  {
    id: 'non-interchangeability',
    titleZh: '10. 防錯對接與不相容性規範 (Non-Interchangeability & Misconnection Safety)',
    titleEn: 'Cross-Application Non-Interchangeability',
    category: 'general',
    categoryZh: '通用法規與安全',
    iconName: 'Layers3',
    shortSummaryZh: '防止血管魯爾接頭（ISO 80369-7）誤接到神經軸麻醉（-6）、腸胃餵食（-3）或呼吸管路（-2）。',
    detailedDescriptionZh: 'ISO 80369 系列標準的核心初衷是避免醫療事故中的「管路誤接（Misconnection）」。ISO 80369-7（血管及皮下應用）透過專屬的幾何形狀與尺寸限制，確保其絕不可能與 ISO 80369-3（腸胃道）、ISO 80369-6（神經軸/脊椎麻醉）等其他醫療領域的接頭發生實質物理連接。',
    keyParameters: [
      { label: '適用標準 Target Standard', value: 'ISO 80369-7:2021 Clause 4' },
      { label: '防錯設計 Misconnection Proof', value: '3D CAD 碰撞分析 & 實體強制互接測試' },
      { label: '風險管制 Safety Risk', value: '預防靜脈藥物誤注入脊髓或腸胃道' }
    ],
    relatedISO7Clauses: ['Clause 4'],
    relatedISO20Annexes: ['ISO 80369-1 General Requirements'],
    relatedRefConnectors: ['C.1', 'C.4'],
    engineeringRiskZh: '設計衍生自魯爾接頭的非標零件時，外型尺寸無意中符合了腸胃道（-3）接頭，通過法規審查時會被要求補測 cross-misconnection。',
    auditFocusZh: 'ISO 14971 醫療器材風險管理文件中對於 Misconnection 的危害分析與 3D 幾何碰撞模擬紀錄。',
    tags: ['防錯對接', 'Misconnection', 'Clause 4', 'ISO 80369-1', '患者安全'],
    figures: [
      {
        id: 'ISO7-FIG-A1',
        titleZh: 'ISO 80369 跨領域小口徑連接器防誤插幾何矩陣',
        titleEn: 'ISO 80369 Non-Interchangeability Family Architecture Matrix',
        standard: 'ISO 80369 Series (ISO 80369-7 / -3 / -6 / -2)',
        figureType: 'mechanism',
        figureTypeZh: '物理機構/失效原理圖',
        descriptionZh: '解析 ISO 80369 家族化尺寸互斥矩陣：血管 (Luer -7)、腸餵 (ENFit -3)、神經軸麻醉 (NRFit -6) 與呼吸 (-2) 之幾何隔絕防呆原理。',
        descriptionEn: 'Analyzes the ISO 80369 family dimensional exclusion matrix: vascular (Luer -7), enteral (ENFit -3), neuraxial anesthesia (NRFit -6), and respiratory (-2) — geometric isolation and non-interchangeability principles.',
        selectionReasonZh: '📈 [防錯對接幾何矩陣] 入選原因：本圖展示 ISO 80369 家族化小口徑連接器防誤插矩陣 (血管-7、腸餵-3、神經軸-6、呼吸-2)，屬於 ISO 80369-7 Clause 4 跨領域防錯安全邏輯圖解。',
        selectionReasonEn: '📈 [Non-interchangeability Geometric Matrix] Rationale: This diagram presents the ISO 80369 family small-bore connector non-interchangeability matrix (vascular -7, enteral -3, neuraxial -6, respiratory -2), serving as the graphic illustration for ISO 80369-7 Clause 4 cross-application anti-misconnection safety logic.',
        svgKey: 'ISO7-FIG-A1',
        keyCallouts: [
          { id: 'luer', labelZh: 'ISO 80369-7', labelEn: 'ISO 80369-7', valueZh: '血管/皮下注射 (6% Luer)', valueEn: 'Vascular / Subcutaneous (6% Luer)' },
          { id: 'enfit', labelZh: 'ISO 80369-3', labelEn: 'ISO 80369-3', valueZh: '腸道餵食 (ENFit 反向鎖定)', valueEn: 'Enteral Feeding (ENFit reverse-lock)' },
          { id: 'nrfit', labelZh: 'ISO 80369-6', labelEn: 'ISO 80369-6', valueZh: '神經軸麻醉 (20% 大錐度 NRFit)', valueEn: 'Neuraxial Anesthesia (20% large-taper NRFit)' }
        ]
      }
    ]
  },
  {
    id: 'scope-normative-terms',
    titleZh: '11. 適用範圍、引用標準與術語定義 (Scope, References & Terms)',
    titleEn: 'Scope, Normative References & Definitions',
    category: 'general',
    categoryZh: '通用法規與安全',
    iconName: 'BookOpen',
    shortSummaryZh: '明確界定 ISO 80369-7 血管與皮下注射小口徑魯爾連接器之適用領域，引用 ISO 80369-1 及 ISO 80369-20，並規範核心術語。',
    detailedDescriptionZh: 'ISO 80369-7 Clause 1~3 奠定了血管應用小口徑連接器的法規基石。Clause 1 規定標準適用於血管（Intravascular）或皮下（Subcutaneous）輸液與注射設備之連接器；Clause 2 列出規範性引用文件（包含 ISO 80369-1 跨領域防錯與 ISO 80369-20 通用測試方法）；Clause 3 定義 Luer connector、Luer slip、Luer lock、reference connector 等法律與技術專有名詞。',
    keyParameters: [
      { label: '適用標準 Target Standard', value: 'ISO 80369-7 Clause 1~3 / ISO 80369-20 Clause 1~3' },
      { label: '引用規範 References', value: 'ISO 80369-1, ISO 80369-20' },
      { label: '核心術語 Core Terms', value: 'Luer connector, Luer lock, Luer slip, Reference connector' }
    ],
    relatedISO7Clauses: ['Clause 1', 'Clause 2', 'Clause 3'],
    relatedISO20Annexes: ['Clause 1', 'Clause 2', 'Clause 3'],
    relatedRefConnectors: ['C.1', 'C.4'],
    engineeringRiskZh: '產品範疇誤劃分（如將腸胃道餵食接頭誤申報為 ISO 80369-7 血管魯爾），致使法規審查全盤退件。',
    auditFocusZh: '確認醫療器材標籤（Labeling）與使用說明書（IFU）聲稱之預期用途（Intended Use）符合 Clause 1 範疇。',
    tags: ['Clause 1', 'Clause 2', 'Clause 3', 'Scope', '引用標準', '術語定義']
  },
  {
    id: 'statistical-analysis-annex-j',
    titleZh: '12. 變量數據統計分析 (Statistical Analysis of Variable Data — Annex J)',
    titleEn: 'Statistical Analysis of Variable Test Data',
    category: 'general',
    categoryZh: '通用法規與安全',
    iconName: 'BarChart2',
    shortSummaryZh: '將通過/失敗屬性測試轉化為可統計的連續變量數據，計算 UTL/LTL 容許限與 k 係數，提供量化合規證據（ISO 80369-20:2024 Annex J）。',
    detailedDescriptionZh: 'ISO 80369-20:2024 Annex J 提供了一種將傳統「Pass/Fail 屬性測試」升級為「測量至失效點（Variable Data）」的先進統計驗證方法。透過測量每個樣品的實際失效值（如最大耐受壓力、最大分離拉力、最大抗旋鬆扭矩），可以計算母體分佈的平均值（Mean）與標準差（SD），進而用統計容許限（Tolerance Limit）係數 k 計算單側上/下公差限（UTL/LTL）。此方法數據遠比傳統 Pass/Fail 判定更具說服力，可大幅減少所需樣本數，並提供更嚴謹的統計合規證明。測試至失效時需特別注意：金屬參考接頭（如 Fig.C.1/C.3）不建議重複使用於破壞性測試，以免損壞法規校正夾具。',
    keyParameters: [
      { label: '統計方法 Method', value: '容許限分析 (Tolerance Limit Analysis)' },
      { label: '常態性測試 Normality Test', value: '必須先驗證數據符合常態分佈（如 Shapiro-Wilk）' },
      { label: '容許限 UTL/LTL', value: '單側公差上限 (Upper Tolerance Limit)' },
      { label: 'k 係數 k-Factor', value: '依樣本數 n 與信心水準 (95%/99%) 查表決定' },
      { label: '最小樣本數 Min n', value: '建議 n ≥ 30（提供足夠統計功效）' }
    ],
    relatedISO7Clauses: ['6.1', '6.2', '6.4', '6.5', '6.6'],
    relatedISO20Annexes: ['Annex J'],
    relatedRefConnectors: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'C.6'],
    engineeringRiskZh: '【重要】測試至失效時，金屬夾具承受超規格負載可能導致磨損甚至損壞。ISO 標準明確建議：若金屬參考接頭（如 C.1/C.3）採用高強度鋼製作，通常不建議對金屬件進行破壞性測試；反之，應對受測塑膠件施加漸增負載直至分離，確保夾具安全。',
    auditFocusZh: '(1) 常態性驗證報告（Normality test p-value）；(2) k 係數查表來源與信賴水準設定；(3) 計算 UTL = Mean + k × SD 之數學推導記錄；(4) 若採用 Annex J 統計分析，測試報告需完整附上原始數據、分佈圖與容許限計算書。',
    tags: ['Annex J', '統計分析', 'UTL', 'LTL', 'k係數', '容許限', '常態性', '變量數據'],
    figures: []
  },
  {
    id: 'annexes-rationale-summary',
    titleZh: '13. 標準原理背景、非互換性評估與測試修訂彙整 (Rationale, Assessment & Modifications)',
    titleEn: 'Rationale, Non-interchangeability & Modifications',
    category: 'general',
    categoryZh: '通用法規與安全',
    iconName: 'FileText',
    shortSummaryZh: '彙整 ISO 80369-7 Annex A 原理技術背景、Annex D 跨領域非互換性評估、Annex E 測試要求矩陣及 ISO 80369-20 Annex J 修訂說明。',
    detailedDescriptionZh: '本單元彙整兩份 ISO 規範之附錄說明性章節：ISO 80369-7 Annex A 提供各項性能測試參數（如 300 kPa 水壓、35N 軸向拉力、0.17 N·m 扭矩）之科學原理與臨床設計背景；Annex D 詳細規範防誤接物理試驗與 CAD 包絡面評估流程；Annex E 提供完整的測試矩陣彙總；ISO 80369-20 Annex J 則記載通用試驗方法之歷年修訂說明。',
    keyParameters: [
      { label: '原理附錄 Rationale Annex', value: 'ISO 80369-7 Annex A' },
      { label: '評估附錄 Assessment Annex', value: 'ISO 80369-7 Annex D' },
      { label: '測試矩陣 Summary Matrix', value: 'ISO 80369-7 Annex E / ISO 80369-20 Annex J' }
    ],
    relatedISO7Clauses: ['Annex A', 'Annex D', 'Annex E'],
    relatedISO20Annexes: ['Annex J'],
    relatedRefConnectors: ['C.1', 'C.3', 'C.4', 'C.6'],
    engineeringRiskZh: '進行醫療器材風險管理時未引用 Annex A 原理說明，無法向認證機構（NB）證明測試參數之充足合理性。',
    auditFocusZh: '確認法規檢驗報告中的測試項目覆蓋率符合 Annex E 彙整矩陣要求。',
    tags: ['Annex A', 'Annex D', 'Annex E', 'Annex J', '原理說明', '測試矩陣']
  }
];

export const PRE_ASSEMBLY_LOCK: PreAssemblyCondition = {
  status: 'standard_lock',
  labelZh: '標準鎖定預裝配',
  assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
  assemblyAxialForceN: '26.5 N - 27.5 N',
  holdTimeSec: '5 - 6 秒',
  descriptionZh: '旋合時須同時施加 26.5~27.5 N 軸向推力與 0.08~0.12 N·m 扭矩，維持 5~6 秒後完全釋放 (Release)，確立 6% 錐面標準貼合。',
  apparatusZh: 'S15A 雙軸加載機構（扭矩+推力同動控制）'
};

export const PRE_ASSEMBLY_SLIP: PreAssemblyCondition = {
  status: 'slip',
  labelZh: '滑動推入預裝配',
  assemblyTorqueNm: '≤ 0.10 N·m (微旋)',
  assemblyAxialForceN: '26.5 N - 27.5 N',
  holdTimeSec: '5 - 6 秒',
  descriptionZh: '軸向施加 26.5~27.5 N 推力同時微旋（不超過 90°），維持 5~6 秒後完全釋放 (Release)，確立錐度自鎖。',
  apparatusZh: '定軸推力加載裝置'
};

export const PRE_ASSEMBLY_NOT_APPLICABLE: PreAssemblyCondition = {
  status: 'not_applicable',
  labelZh: '不適用預裝配',
  descriptionZh: '此為標準導引、尺寸規範或金屬夾具定義，無需執行前置預裝配。'
};

export const STANDARD_CLAUSE_DETAILS: Record<string, StandardClauseDetail> = {
  'iso7-clause-1': {
    id: 'iso7-clause-1',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Clause 1',
    titleEn: 'Scope of ISO 80369-7',
    titleZh: 'Clause 1 適用範圍規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '明確規定 ISO 80369-7 標準適用於血管（Intravascular）或皮下（Subcutaneous）應用之小口徑魯爾連接器。',
    appliesToZh: '所有血管輸液管路、注射器、留置針、三通閥、套管針等醫療器材連接器',
    quantitativeConditions: {},
    fixtureRequiredZh: '法規適用性審查表',
    testProcedureStepsZh: [
      '核對醫療器材之預期用途（Intended Use）是否屬於血管或皮下輸液領域。',
      '確認產品連接介面是否採用 6% 魯爾錐度幾何結構。'
    ],
    acceptanceCriteriaZh: [
      '預期用途與結構界定符合 ISO 80369-7 範疇。'
    ],
    commonNonConformancesZh: [
      '將腸胃道餵食或神經軸麻醉管路誤劃分為 ISO 80369-7。'
    ],
    regulatoryTipZh: '上市前申報（510k/CE）首要步驟：確定法規分類與標準適用範圍。'
  },
  'iso7-clause-2': {
    id: 'iso7-clause-2',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Clause 2',
    titleEn: 'Normative References',
    titleZh: 'Clause 2 規範性引用文件條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '列出執行 ISO 80369-7 檢測時不可或缺的基礎引用規範。',
    appliesToZh: 'ISO 80369-1 (通用防錯要求) 與 ISO 80369-20 (通用測試方法)',
    quantitativeConditions: {},
    fixtureRequiredZh: '標準文本追溯紀錄',
    testProcedureStepsZh: [
      '確認引用之 ISO 80369-1 與 ISO 80369-20 為最新有效版本。'
    ],
    acceptanceCriteriaZh: [
      '檢測報告明確引用有效標準版本。'
    ],
    commonNonConformancesZh: [
      '引用已被廢止之舊版 ISO 594-1 / ISO 594-2 標準。'
    ],
    regulatoryTipZh: 'FDA 與歐盟 MDR 已全面強制要求過渡至 ISO 80369 系列。'
  },
  'iso7-clause-3': {
    id: 'iso7-clause-3',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Clause 3',
    titleEn: 'Terms and Definitions',
    titleZh: 'Clause 3 術語與定義條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '精確界定 Luer connector、Luer slip、Luer lock、reference connector 等核心術語。',
    appliesToZh: '所有魯爾連接器技術文件與圖面說明',
    quantitativeConditions: {},
    fixtureRequiredZh: '規格書審查',
    testProcedureStepsZh: [
      '對照工程圖面標註之專有名詞與 Clause 3 定義一致。'
    ],
    acceptanceCriteriaZh: [
      '名詞定義精確符合國際標準。'
    ],
    commonNonConformancesZh: [
      '工程圖面上混用商業俗稱而導致法規審查誤解。'
    ],
    regulatoryTipZh: '建議於 DHF (Design History File) 專有名詞表統一對齊 Clause 3。'
  },
  'iso7-annex-a': {
    id: 'iso7-annex-a',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Annex A',
    titleEn: 'Rationale and Guidance',
    titleZh: '附錄 A 標準條文原理與技術背景說明',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '詳細闡述 300 kPa 測試壓力、35 N 拉力及 0.17 N·m 扭矩等參數之臨床科學依據。',
    appliesToZh: '研發設計驗證與風險管理報告',
    quantitativeConditions: {},
    fixtureRequiredZh: '技術背景說明書',
    testProcedureStepsZh: [
      '研發團隊研讀 Annex A 以了解法規臨界參數之物理力學背景。'
    ],
    acceptanceCriteriaZh: [
      '設計管制文件符合 Annex A 原理邏輯。'
    ],
    commonNonConformancesZh: [
      '未能向公告機構證明安全邊限之合理性。'
    ],
    regulatoryTipZh: '編寫 ISO 14971 風險分析報告時最佳的技術佐證依據。'
  },
  'iso7-annex-b': {
    id: 'iso7-annex-b',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Annex B',
    titleEn: 'Dimensional Drawings for Luer Connectors',
    titleZh: '附錄 B 魯爾連接器幾何尺寸圖面規範 (Fig.B.1 ~ B.6)',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '提供 Fig.B.1 至 B.6 公母魯爾鎖定與滑動接頭之完整 CAD 尺寸與公差矩陣。',
    appliesToZh: '模具設計與生產品管全尺寸檢驗',
    quantitativeConditions: {
      temperatureC: '20°C - 30°C'
    },
    fixtureRequiredZh: '三次元 CMM 與光學投影儀',
    testProcedureStepsZh: [
      '按 Fig.B.1~B.6 標註量測錐度、螺紋 Pitch、耳翼寬度與投影量。'
    ],
    acceptanceCriteriaZh: [
      '尺寸數據 100% 落在 Annex B 公差範圍內。'
    ],
    commonNonConformancesZh: [
      '射出保壓不足致錐度偏離 6%。'
    ],
    regulatoryTipZh: '需檢附完整 2D 尺寸標註與 3D 包核圖作為 510(k) 附件。'
  },
  'iso7-annex-d': {
    id: 'iso7-annex-d',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Annex D',
    titleEn: 'Assessment of Non-interchangeability',
    titleZh: '附錄 D 跨領域非互換性評估實施細則',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '規範使用 3D CAD 包絡面軟體模擬與物理強制對接驗證不相容性。',
    appliesToZh: '新型與衍生型小口徑連接器',
    quantitativeConditions: {
      testForceN: '50 N (對撞推力)'
    },
    fixtureRequiredZh: 'CAD 碰撞分析軟體與物理卡入試驗機',
    testProcedureStepsZh: [
      '執行 CAD 3D 空間干涉分析。',
      '使用 50 N 推力執行對接試驗，驗證無流體通路建立。'
    ],
    acceptanceCriteriaZh: [
      '無法與 ISO 80369 其他子集接頭建立密合通路。'
    ],
    commonNonConformancesZh: [
      '未考量軟質材料彈性變形之物理干涉。'
    ],
    regulatoryTipZh: '防錯對接報告為 FDA / TFDA 審查必查重點。'
  },
  'iso7-annex-e': {
    id: 'iso7-annex-e',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Annex E',
    titleEn: 'Summary of Testing Requirements',
    titleZh: '附錄 E 性能測試要求總覽彙整表',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '提供公母鎖定與滑動魯爾接頭所需執行之測試項目總覽矩陣。',
    appliesToZh: '測試計畫書 (DVP&R) 設計',
    quantitativeConditions: {},
    fixtureRequiredZh: '測試計畫矩陣表',
    testProcedureStepsZh: [
      '對照 Annex E 確認受測樣品種類（如 Male Lock）需執行的所有測試條文。'
    ],
    acceptanceCriteriaZh: [
      '測試計畫完全覆蓋 Annex E 矩陣要求。'
    ],
    commonNonConformancesZh: [
      '漏測部分條文（如公鎖定漏測 6.6 抗過載）。'
    ],
    regulatoryTipZh: '撰寫 DVP&R 測試計畫時之核心對照表。'
  },
  'iso20-clause-1': {
    id: 'iso20-clause-1',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Clause 1',
    titleEn: 'Scope of Common Test Methods',
    titleZh: 'Clause 1 通用測試方法適用範圍',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '規定 ISO 80369 系列所有小口徑連接器通用實驗室測試方法之執行範疇。',
    appliesToZh: 'ISO 80369-2, -3, -5, -6, -7 所有應用領域',
    quantitativeConditions: {},
    fixtureRequiredZh: '實驗室品質系統',
    testProcedureStepsZh: [
      '確認試驗方法符合 ISO 80369-20 標準規範。'
    ],
    acceptanceCriteriaZh: [
      '試驗完全遵循通用測試方法執行。'
    ],
    commonNonConformancesZh: [
      '自訂非標準實驗程序導致數據不具比較性。'
    ],
    regulatoryTipZh: '實驗室需通過 ISO 17025 認證。'
  },
  'iso20-clause-2': {
    id: 'iso20-clause-2',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Clause 2',
    titleEn: 'Normative References',
    titleZh: 'Clause 2 規範性引用文件條文',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '列出實驗室執行測試時需引用之基礎量測與計量標準。',
    appliesToZh: '實驗室儀器校正與環境控制',
    quantitativeConditions: {},
    fixtureRequiredZh: '儀器校正證書',
    testProcedureStepsZh: [
      '核對壓力計、扭矩計與拉力機追溯認證。'
    ],
    acceptanceCriteriaZh: [
      '儀校具備國家標準追溯性。'
    ],
    commonNonConformancesZh: [
      '儀器逾期未校正。'
    ],
    regulatoryTipZh: '審查時需附儀校報告。'
  },
  'iso20-clause-3': {
    id: 'iso20-clause-3',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Clause 3',
    titleEn: 'Terms and Definitions',
    titleZh: 'Clause 3 通用測試術語與定義',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '定義 Test sample, Assembly, Leak rate, Pre-assembly 等測試專有名詞。',
    appliesToZh: '實驗室測試報告與數據紀錄',
    quantitativeConditions: {},
    fixtureRequiredZh: '報告專有名詞審查',
    testProcedureStepsZh: [
      '確保測試報告中名詞精確對齊。'
    ],
    acceptanceCriteriaZh: [
      '術語無歧義。'
    ],
    commonNonConformancesZh: [
      '混淆預裝配與測試加載狀態。'
    ],
    regulatoryTipZh: '報告品質合規基礎。'
  },
  'iso20-clause-4': {
    id: 'iso20-clause-4',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Clause 4',
    titleEn: 'General Requirements & Test Conditions',
    titleZh: 'Clause 4 通用測試要求與預處理條件',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '規範測試環境溫濕度預處理（20±5°C, 50±10% RH ≥24h，依 ISO 80369-20:2024 原文 Clause 4）與夾具要求。',
    appliesToZh: '所有 ISO 80369-20 附錄試驗',
    quantitativeConditions: {
      temperatureC: '預處理: (20 ± 5)°C / 測試執行: 15°C – 30°C (ISO 80369-20:2024 Clause 4)',
      holdTimeHours: '≥ 24 小時 (溫濕度預處理)',
      media: '相對濕度 RH: 預處理 (50 ± 10)% / 測試執行 10% – 70%'
    },
    fixtureRequiredZh: '恆溫恆濕預處理箱',
    testProcedureStepsZh: [
      '試驗品置於恆溫恆濕箱預處理 24 小時。',
      '在標準室溫環境下執行後續測試。'
    ],
    acceptanceCriteriaZh: [
      '預處理環境紀錄符合 Clause 4 要求。'
    ],
    commonNonConformancesZh: [
      '未經預處理直接進行吸濕塑膠測試。'
    ],
    regulatoryTipZh: '吸濕材料（如尼龍 PA）預處理為必查項目。'
  },
  'iso20-annex-j': {
    id: 'iso20-annex-j',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex J',
    titleEn: 'Modifications to Test Methods',
    titleZh: '附錄 J 試驗方法修訂歷史與背景說明',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '記載從 2015 版升級至 2024 版之試驗方法增修內容（如新增 Annex K 抽吸水下氣泡法）。',
    appliesToZh: '新舊版本標準數據比對與轉版驗證',
    quantitativeConditions: {},
    fixtureRequiredZh: '標準修訂對照表',
    testProcedureStepsZh: [
      '對比 2015 與 2024 版差異，評估報告更新需求。'
    ],
    acceptanceCriteriaZh: [
      '轉版驗證數據符合最新版要求。'
    ],
    commonNonConformancesZh: [
      '未補測最新版新增之 Annex K 條文。'
    ],
    regulatoryTipZh: 'ISO 80369-20:2024 轉版過渡期必備參考。'
  },
  'iso7-6.1': {
    id: 'iso7-6.1',
    standard: 'ISO 80369-7:2021',
    clauseNumber: '6.1',
    titleEn: 'Fluid Leakage Requirement',
    titleZh: '6.1 流體洩漏規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '驗證公母魯爾接頭在承受標準內部液壓時，配合錐面不應有水滴滲漏現象。',
    appliesToZh: '公鎖定（Male Lock）、母鎖定（Female Lock）、公滑動（Male Slip）、母滑動（Female Slip）',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      testPressureKpa: '300 kPa - 330 kPa',
      holdTimeSec: '30 - 35 秒 (水滴法) / 15 - 20 秒 (壓降法)',
      temperatureC: '15°C - 30°C',
      media: '水或空氣'
    },
    fixtureRequiredZh: 'Fig.C.1 (母標稱) 或 Fig.C.4 (公標稱)',
    testProcedureStepsZh: [
      '使用 0.08–0.12 N·m 扭矩與 26.5–27.5 N 軸向推力將受測物與鋼製參考夾具旋合。',
      '向系統內注滿測試水，排出內部所有氣泡（水滴法）。',
      '平穩加壓至 300–330 kPa。',
      '維持壓力 30–35 秒，目視檢查是否有水滴形成或滴落。'
    ],
    acceptanceCriteriaZh: [
      '【正壓水壓滴落法 (Annex C)】於 300 kPa–330 kPa 水壓持壓 30–35 秒，目視配合錐面與表面無水滴形成或滴落。',
      '【正壓氣壓壓降法 (Annex B)】於 300 kPa–330 kPa 氣壓持壓 15–20 秒，壓力衰減量換算之極限洩漏率必須 ≤ 0.005 Pa·m³/s。'
    ],
    commonNonConformancesZh: [
      '塑膠模具分模線毛邊（Parting Line Flash）導致錐面環狀密封點被切斷。',
      '射出成型保壓不足造成 6% 錐度縮水變形（Ovality/Sink marks）。'
    ],
    regulatoryTipZh: 'FDA 510(k) 審查重點：須明確列出預裝配扭矩（0.08-0.12 N·m）與測試壓力數據，且測試樣本數一般要求 n ≥ 30。'
  },
  'iso20-annex-b': {
    id: 'iso20-annex-b',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex B',
    titleEn: 'Leakage by Pressure Decay Test Method',
    titleZh: '附錄 B 壓降法流體洩漏測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '提供使用空氣介質測量加壓系統壓力衰減（Pressure Decay）的量化標準實驗步驟。',
    appliesToZh: '所有符合 ISO 80369 及 ISO 18250 系列之小口徑連接器',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      testPressureKpa: '300 - 330 kPa',
      holdTimeSec: '15 - 20 秒',
      temperatureC: '15°C - 30°C (溫濕度預處理: 20±5°C, 50±10% RH ≥24小時)'
    },
    fixtureRequiredZh: '符合 ISO 80369-7 附錄 C 的高硬度不鏽鋼鋼規夾具',
    testProcedureStepsZh: [
      '受測物於 20±5°C、相對濕度 50±10% 環境下預處理至少 24 小時（吸濕性材料）。',
      '依標準程序施加 0.08~0.12 N·m 扭矩與 26.5~27.5 N 軸向推力旋合，保持 5~6 秒。',
      '注入空氣並加壓至 300~330 kPa，關閉閥門。',
      '記錄起始壓力，於 15~20 秒測試期結束時記錄終點壓力並計算壓降值 ΔP。'
    ],
    acceptanceCriteriaZh: [
      '絕對壓力衰減值不得超過各應用標準規定的臨界門檻（對應 ≤ 0.005 Pa·m³/s）。'
    ],
    commonNonConformancesZh: [
      '測試系統內部氣體熱脹冷縮造成假性壓力上升或驟降。',
      '自動化測試機台閥門微洩漏干擾數據。'
    ],
    regulatoryTipZh: 'ISO 80369-20:2024 版已將「壓力衰減 ΔP」直接作為合格判定基準，取代舊版繁瑣的公式換算。'
  },
  'iso20-annex-c': {
    id: 'iso20-annex-c',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex C',
    titleEn: 'Falling Drop Positive-Pressure Liquid Leakage Test Method',
    titleZh: '附錄 C 水滴法正壓液體洩漏測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '提供使用水介質目視觀察水滴滴落的標準流體洩漏實驗步驟。',
    appliesToZh: '所有小口徑連接器',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      testPressureKpa: '300 - 330 kPa',
      holdTimeSec: '30 - 35 秒',
      media: '蒸餾水/飲用水 (可添加亞甲藍色素)'
    },
    fixtureRequiredZh: 'Fig.C.1 (母) 或 Fig.C.4 (公)',
    testProcedureStepsZh: [
      '以 0.08~0.12 N·m 扭矩與 26.5~27.5 N 推力將受測物與參考夾具旋合。',
      '向系統內注滿水並徹底排出氣泡，保持組裝件軸線水平。',
      '加壓至 300~330 kPa，維持水平狀態 30~35 秒。',
      '目視檢查接頭縫隙是否有水滴形成或脫落。'
    ],
    acceptanceCriteriaZh: [
      '測試期間無足形成或滴落之水滴。'
    ],
    commonNonConformancesZh: [
      '接頭外表未擦乾，前次測試殘留水痕誤判為洩漏。'
    ],
    regulatoryTipZh: '水滴法適合直觀品質抽檢，亞甲藍染色可大幅提升目視檢出率。'
  },
  'iso7-6.2': {
    id: 'iso7-6.2',
    standard: 'ISO 80369-7:2021',
    clauseNumber: '6.2',
    titleEn: 'Sub-atmospheric Pressure Air Leakage Requirement',
    titleZh: '6.2 負壓空氣洩漏規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '驗證魯爾接頭在抽真空負壓下，外界空氣不致滲入管路內，防止氣栓事故。',
    appliesToZh: '所有血管與皮下注射用魯爾接頭',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      testPressureKpa: '80.0 kPa - 88.0 kPa (真空負壓)',
      holdTimeSec: '15 秒 - 20 秒'
    },
    fixtureRequiredZh: 'Fig.C.1 或 Fig.C.4',
    testProcedureStepsZh: [
      '依 Annex J 旋緊裝配受測物與金屬夾具。',
      '連接真空抽氣系統，抽出內部空氣至 80.0~88.0 kPa 負壓。',
      '關閉閥門，持壓 15~20 秒，紀錄負壓衰減值。'
    ],
    acceptanceCriteriaZh: [
      '洩漏率不超過 0.005 Pa·m³/s。'
    ],
    commonNonConformancesZh: [
      '軟質塑膠錐面在負壓吸力下內塌微幅脫離。'
    ],
    regulatoryTipZh: '高海拔地區高程影響大氣壓，測試時須對環境大氣壓進行校正補償。'
  },
  'iso20-annex-d': {
    id: 'iso20-annex-d',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex D',
    titleEn: 'Subatmospheric-Pressure Air Leakage Test Method',
    titleZh: '附錄 D 負壓空氣洩漏測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '規範使用真空衰減法（Vacuum Decay）量測負壓漏氣量的實驗流程。',
    appliesToZh: '所有小口徑連接器',
    quantitativeConditions: {
      testPressureKpa: '80.0 - 88.0 kPa (真空負壓)',
      holdTimeSec: '15 - 20 秒'
    },
    fixtureRequiredZh: '符合 ISO 80369-7 附錄 C 金屬參考件',
    testProcedureStepsZh: [
      '乾式旋合裝配後封閉端點。',
      '施加 80~88 kPa 負壓真空並關閥。',
      '紀錄 15~20 秒內之壓差變化。'
    ],
    acceptanceCriteriaZh: [
      '負壓衰減換算之洩漏率 ≤ 0.005 Pa·m³/s。'
    ],
    commonNonConformancesZh: [
      '真空幫浦管路接頭自身洩漏。'
    ],
    regulatoryTipZh: '若傳輸液體產品，亦可選用 2024 版新增之 Annex K（水下氣泡法）評估。'
  },
  'iso20-annex-k': {
    id: 'iso20-annex-k',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex K',
    titleEn: 'Air Leakage During Aspiration Test Method',
    titleZh: '附錄 K 抽吸過程氣密測試方法實施細則 (2024最新新增)',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '透過將接頭浸入透明水容器中並抽真空，目視檢查是否有連續氣泡冒出。',
    appliesToZh: '用於抽吸藥液與體液之小口徑連接器',
    quantitativeConditions: {
      testPressureKpa: '80.0 - 88.0 kPa (負壓)',
      holdTimeSec: '指定測試時間',
      media: '透明水容器 (填充約 1/3 容量)'
    },
    fixtureRequiredZh: '透明圓柱形水容器與真空幫浦系統',
    testProcedureStepsZh: [
      '接頭充水裝配後連接至水容器下方。',
      '施加 80~88 kPa 負壓真空。',
      '等待最多 20 秒待初始氣泡停止，隨後開始計時觀察水容器內是否有持續氣泡產生。'
    ],
    acceptanceCriteriaZh: [
      '測試期間無連續產生的氣泡流。'
    ],
    commonNonConformancesZh: [
      '水中溶解氣體在負壓下釋放產生微小氣泡干擾判讀。'
    ],
    regulatoryTipZh: '2024 年版新增之目視水下氣泡法，非常適合輸液管路與抽吸針筒之直觀驗證。'
  },
  'iso7-6.6': {
    id: 'iso7-6.6',
    standard: 'ISO 80369-7:2021',
    clauseNumber: '6.6',
    titleEn: 'Resistance to Overriding Requirement',
    titleZh: '6.6 抗過載（抗滑牙）規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '考核公魯爾鎖定套環在承受 0.15~0.17 N·m 破壞性高扭矩時，能否抵抗環向應力膨脹與耳翼剪切，防止滑牙脫開。',
    appliesToZh: '公魯爾鎖定（Male Luer Lock）及具備旋合螺紋之組件',
    quantitativeConditions: {
      testTorqueNm: '0.15 N·m - 0.17 N·m',
      holdTimeSec: '5 秒 - 10 秒',
      temperatureC: '20°C - 30°C'
    },
    fixtureRequiredZh: 'Fig.C.3 母參考接頭（2.71 mm 窄耳翼最壞情況夾具）',
    testProcedureStepsZh: [
      '將受測公鎖定接頭對準 Fig.C.3 金屬參考夾具。',
      '以不超過 10 rpm 轉速連續旋緊，直至扭矩達到 0.15–0.17 N·m。',
      '在 0.15–0.17 N·m 扭矩下保持 5 至 10 秒。',
      '檢視螺紋是否發生滑脫（Overriding）、耳翼跳牙或套環破裂。'
    ],
    acceptanceCriteriaZh: [
      '在 0.15–0.17 N·m 下維持 5–10 秒，螺紋不得跳牙、滑脫或斷裂。',
      '受測物套環不得產生肉眼可見之塑性裂痕。'
    ],
    commonNonConformancesZh: [
      '選用 PP（標準聚丙烯）等低剛性材料，高扭力下套環受斜面分力影響膨脹（Hoop Expansion），2.71mm 窄耳翼瞬間脫開。',
      'T-Port 或 Stopcock 分叉結構剛性不均勻產生橢圓化（Ovalization）。'
    ],
    regulatoryTipZh: '此條文為法規退件率最高項目！建議優先選用 PC、Tritan 或加厚公套環壁厚（≥ 1.2mm）。'
  },
  'iso20-annex-h': {
    id: 'iso20-annex-h',
    preAssembly: PRE_ASSEMBLY_LOCK,
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex H',
    titleEn: 'Test Method for Resistance to Overriding',
    titleZh: '附錄 H 抗過載測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '詳細規範使用扭矩試驗機施加 0.15~0.17 N·m 扭矩的控制速率與數據擷取頻率。',
    appliesToZh: '具螺紋鎖定功能之小口徑連接器',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      testTorqueNm: '0.15 - 0.17 N·m (目標 0.16 N·m)',
      holdTimeSec: '5 - 10 秒',
      temperatureC: '15°C - 30°C'
    },
    fixtureRequiredZh: 'ISO 80369-7 Fig.C.3 (母鎖定最壞情況金屬件) 或 C.6',
    testProcedureStepsZh: [
      '【預裝配階段】依 Annex H.4 a) 1)，將受測接頭與金屬夾具旋合至 0.08~0.12 N·m，並同時施加 26.5~27.5 N 軸推力持壓 5~6 秒後釋放，確立過盈定位。',
      '【過載加載階段】將 C.3 金屬夾具固定於自動扭矩測試儀之伺服馬達夾頭，設定旋轉轉速為 3.0 rpm ± 0.5 rpm（或 ≤ 10 rpm）。',
      '【定扭矩保持】啟動馬達旋緊至扭矩達 0.15~0.17 N·m（目標 0.16 N·m），觸發定扭矩保持模式維持 5~10 秒（不得施加額外輔助外力）。',
      '【數據監測與判定】持續監測 5~10 秒內扭矩衰減曲線，若扭矩驟降 > 30% 判定為滑牙失敗；卸載後檢查金屬夾具耳翼無塑膠刮屑沾黏。'
    ],
    acceptanceCriteriaZh: [
      '保持 5~10 秒期間扭矩曲線平穩無斷崖式下降。',
      '卸載後檢查金屬夾具耳翼無塑膠刮屑沾黏。'
    ],
    commonNonConformancesZh: [
      '手動旋緊速率不穩定，瞬間衝擊扭矩超過 0.20 N·m 導致誤判。',
      '未執行前置預裝配導致初始錐面未就位，偏心旋轉致螺牙早發性剪切。',
      'C.3 金屬夾具耳翼經多次測試後磨損變圓，未定期驗收直角特徵。'
    ],
    regulatoryTipZh: '【法規防雷指引】DVP 測試計畫書必須明確載明 Step a) 1) 之預裝配作業，切勿因簡化機台操作而誤報為「免裝配直接過載」，否則將遭審查官判定為方法偏離 (Method Deviation)。'
  },
  'iso7-6.4': {
    id: 'iso7-6.4',
    standard: 'ISO 80369-7:2021',
    clauseNumber: '6.4',
    titleEn: 'Resistance to Separation from Axial Load Requirement',
    titleZh: '6.4 抗軸向負載分離規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '確保魯爾接頭在承受強大軸向拉力時不被拉拔分離，保障輸液安全性。',
    appliesToZh: '鎖定型（L2, 32-35N）及滑動型（L1, 23-25N）接頭',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      testForceN: '32 N - 35 N (Lock) / 23 N - 25 N (Slip)',
      holdTimeSec: '10 秒 - 15 秒'
    },
    fixtureRequiredZh: 'Fig.C.3 (公受測物) 或 Fig.C.6 (母受測物)',
    testProcedureStepsZh: [
      '依標準程序以 0.08–0.12 N·m 裝配受測物與參考夾具。',
      '將組裝件安裝至拉力試驗機上，確保同軸度。',
      '以 10 N/s 速率施加軸向拉力至 35 N（或 Slip 25 N）。',
      '維持指定拉力 10 至 15 秒。'
    ],
    acceptanceCriteriaZh: [
      '在 35 N 拉力下保持 10–15 秒，接頭不得脫開分離或從錐面拔出。'
    ],
    commonNonConformancesZh: [
      '公套環螺紋牙深不足，在軸向強拉下發生剪切失效。'
    ],
    regulatoryTipZh: '測試時拉力軸心同軸度要求高，偏心拉扯會產生額外彎矩導致早發性脫離。'
  },
  'iso20-annex-f': {
    id: 'iso20-annex-f',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex F',
    titleEn: 'Test Method for Resistance to Separation from Axial Load',
    titleZh: '附錄 F 抗軸向負載分離測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '詳細定義萬能拉力機加載速率（約 10 N/s）與軸向夾持規範。',
    appliesToZh: '所有小口徑連接器',
    quantitativeConditions: {
      testForceN: '35 N (Lock) / 25 N (Slip)',
      holdTimeSec: '10 - 15 秒',
      temperatureC: '15°C - 30°C'
    },
    fixtureRequiredZh: '符合 Annex C 規範的不鏽鋼金屬測試夾具',
    testProcedureStepsZh: [
      '裝配接頭並安裝於拉力機特製氣動夾具。',
      '校正載荷單元（Load Cell）零點。',
      '以 10 N/s 加載至 35 N 並維持 10~15 秒。',
      '記錄拉力-位移（Force vs Displacement）曲線。'
    ],
    acceptanceCriteriaZh: [
      '密封介面未發生完全分離脫落現象。'
    ],
    commonNonConformancesZh: [
      '氣動夾頭夾持力過大導致受測物本體變形。'
    ],
    regulatoryTipZh: '建議於報告中同時檢附斷裂拉拔極限（Ultimate Separation Force）數據供 R&D 參考。'
  },
  'iso7-6.5': {
    id: 'iso7-6.5',
    standard: 'ISO 80369-7:2021',
    clauseNumber: '6.5',
    titleEn: 'Resistance to Separation from Unscrewing Requirement',
    titleZh: '6.5 抗旋鬆分離規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '驗證魯爾鎖定接頭在旋緊後，能否抵禦 0.018~0.020 N·m 之反向旋鬆力，維持 6% 錐面自鎖不鬆脫。',
    appliesToZh: '魯爾鎖定型接頭（Luer Lock Connectors）',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      testTorqueNm: '0.018 N·m - 0.020 N·m (反向)',
      holdTimeSec: '10 秒 - 15 秒'
    },
    fixtureRequiredZh: 'Fig.C.1 (母) 或 Fig.C.4 (公)',
    testProcedureStepsZh: [
      '依規定以 0.08~0.12 N·m 裝配接頭與金屬件。',
      '施加 0.018~0.020 N·m 的反向旋鬆扭矩。',
      '維持反向扭矩 10~15 秒，檢查接頭是否分離。'
    ],
    acceptanceCriteriaZh: [
      '在 0.02 N·m 反向扭矩下保持 10~15 秒，接頭未完全脫開分離。'
    ],
    commonNonConformancesZh: [
      '塑膠材料加入過量脫模劑致錐面摩擦力不足。'
    ],
    regulatoryTipZh: '微扭矩感測器需具有 0.001 N·m 以下之解析度。'
  },
  'iso20-annex-g': {
    id: 'iso20-annex-g',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex G',
    titleEn: 'Test Method for Resistance to Separation from Unscrewing',
    titleZh: '附錄 G 抗旋鬆分離測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '規範抗旋鬆扭矩（Unscrewing Torque）測試之設備與操作。',
    appliesToZh: '鎖定型連接器',
    quantitativeConditions: {
      testTorqueNm: '0.018 - 0.020 N·m',
      holdTimeSec: '10 - 15 秒'
    },
    fixtureRequiredZh: 'Fig.C.1 或 Fig.C.4',
    testProcedureStepsZh: [
      '按標準裝配後，施加指定反向扭矩並維持 10~15 秒。',
      '檢查接頭是否分離。'
    ],
    acceptanceCriteriaZh: [
      '接頭未完全解鎖分離。'
    ],
    commonNonConformancesZh: [
      '測試時夾持施力不勻產生側面彎矩。'
    ],
    regulatoryTipZh: '與 Annex I（旋鬆拆卸力測試）互為對照。'
  },
  'iso20-annex-i': {
    id: 'iso20-annex-i',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex I',
    titleEn: 'Disconnection by Unscrewing Test Method',
    titleZh: '附錄 I 旋鬆拆卸力測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '評估使用者將接頭旋鬆拆卸時的最大峰值扭矩（Peak Torque），確保臨床易用性。',
    appliesToZh: '需要頻繁旋開拆卸之魯爾鎖定接頭',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      restTimeMin: '10 - 15 分鐘 (靜置貼合)',
      maxAllowedUnscrewingTorque: '按產品規格上限 (例: ≤ 0.24 N·m)'
    },
    fixtureRequiredZh: 'Fig.C.1 或 Fig.C.4',
    testProcedureStepsZh: [
      '依 0.08~0.12 N·m 裝配接頭，靜置 10~15 分鐘使塑膠應力鬆弛穩定。',
      '以連續漸增扭矩旋鬆接頭，直至錐面分離脫開。',
      '記錄克服靜摩擦力之最大峰值扭矩（Peak Torque）。'
    ],
    acceptanceCriteriaZh: [
      '峰值拆卸扭矩未超過規定之上限值（確保醫護人員能順利以手拆卸）。'
    ],
    commonNonConformancesZh: [
      '錐面過度緊咬造成卡死，拆卸扭矩過大（> 0.35 N·m）致護理人員無法徒手旋開。'
    ],
    regulatoryTipZh: '人因工程（Usability Engineering IEC 62366）評估的重要指標。'
  },
  'iso20-annex-e': {
    id: 'iso20-annex-e',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex E',
    titleEn: 'Stress Cracking Test Method',
    titleZh: '附錄 E 應力龜裂測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '評估接頭在裝配應力下靜置 48 小時後，是否因化學介質引發微龜裂並通過隨後之氣密性測試。',
    appliesToZh: '所有塑膠成型小口徑連接器',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      assemblyAxialForceN: '26.5 N - 27.5 N',
      holdTimeHours: '≥ 48 小時',
      temperatureC: '15°C - 30°C'
    },
    fixtureRequiredZh: 'Fig.C.1 或 Fig.C.4',
    testProcedureStepsZh: [
      '依規範將接頭裝配於參考金屬接頭上。',
      '在 23°C 室溫空氣環境下靜置保持至少 48 小時。',
      '進行 Annex B 或 Annex C 流體洩漏測試驗證密封性。'
    ],
    acceptanceCriteriaZh: [
      '靜置 48 小時後進行洩漏測試 Pass，且視覺無裂紋。'
    ],
    commonNonConformancesZh: [
      'PC 材質殘留內應力高，於 48 小時靜置期間發生應力龜裂破裂。'
    ],
    regulatoryTipZh: '常與 ISO 10993 生物相容性及耐化學性測試整合執行。'
  },
  'iso7-annex-c': {
    id: 'iso7-annex-c',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Annex C',
    titleEn: 'Reference Connectors (Fig.C.1 to C.6)',
    titleZh: '附錄 C 金屬參考接頭規格總覽',
    type: 'reference_fixture',
    typeZh: '參考金屬件規範',
    objectiveZh: '提供 6 種標準化金屬參考接頭之精確三維幾何尺寸與材質規範，作為全球統一測試基準。',
    appliesToZh: '所有 ISO 80369-7 物理與機械性能測試',
    quantitativeConditions: {
      temperatureC: '20°C - 30°C'
    },
    fixtureRequiredZh: 'C.1 (母標稱), C.2 (公滑動), C.3 (母最壞情況), C.4 (公標稱), C.5 (母滑動), C.6 (公最壞情況)',
    testProcedureStepsZh: [
      '檢驗金屬件校正證書，確認錐度 6% 及耳翼寬度（C.1: 3.50mm / C.3: 2.71mm）。',
      '每次測試前以無塵布清潔金屬表面。',
      '搭配扭矩起子進一步旋合裝配。'
    ],
    acceptanceCriteriaZh: [
      '金屬件符合 ISO 粗糙度 Ra ≤ 0.8 μm，無鏽蝕刮痕 (實務常用 17-4PH ≥45 HRC 或 316 表面氮化)。',
      '關鍵尺寸符合 Annex C 容許公差（如 ± 0.005 mm）。'
    ],
    commonNonConformancesZh: [
      '誤用第三方未經 ISO 17025 認證之廉價加工夾具，耳翼尺寸不精確。',
      '金屬件長期使用未校正，耳翼倒角磨損變圓。'
    ],
    regulatoryTipZh: 'FDA 510(k) 審查常要求隨附參考金屬件之量測校正報告與圖號追溯。'
  },
  'iso7-6.3': {
    id: 'iso7-6.3',
    standard: 'ISO 80369-7:2021',
    clauseNumber: '6.3',
    titleEn: 'Resistance to Environmental Stress Cracking Requirement',
    titleZh: '6.3 耐環境應力龜裂規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '驗證塑膠魯爾接頭在維持預裝配過盈應力下，於 23°C 空氣環境靜置 48 小時後無結構破裂與洩漏。',
    appliesToZh: '所有塑膠成型魯爾接頭 (PC, PP, Tritan, ABS 等)',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      holdTimeHours: '≥ 48 小時',
      temperatureC: '20°C - 30°C',
      media: '23°C 溫濕度控制之空氣環境 (ISO 80369-20 Annex E)'
    },
    fixtureRequiredZh: 'Fig.C.1 (母) 或 Fig.C.4 (公)',
    testProcedureStepsZh: [
      '以 0.08–0.12 N·m 裝配受測物與參考金屬夾具。',
      '於 23°C 溫濕度控制之空氣環境中靜置。',
      '在 20–30°C 室溫環境下靜置保持至少 48 小時。',
      '進行 6.1 (正壓流體洩漏) 或 6.2 (負壓空氣洩漏) 驗證密封性。'
    ],
    acceptanceCriteriaZh: [
      '靜置 48 小時後，目視表面無微裂紋、龜裂或爆裂現象。',
      '隨後執行的流體洩漏測試須完全 Pass。'
    ],
    commonNonConformancesZh: [
      'Polycarbonate (PC) 射出殘留內應力高，靜置期間發生應力爆裂。'
    ],
    regulatoryTipZh: '建議於模具設計階段即執行偏光應力檢驗，必要時進行 退火 (Annealing) 消除殘留應力。'
  },
  'iso7-clause-5': {
    id: 'iso7-clause-5',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Clause 5',
    titleEn: 'Dimensional Requirements for Luer Connectors',
    titleZh: 'Clause 5 幾何尺寸與 6% 圓錐度規範條文',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '精確規範公母魯爾接頭之 6% 錐度 (1:16.667)、配合長度 (≥7.5mm) 與螺紋節距，保障全球產品互換性。',
    appliesToZh: '所有 ISO 80369-7 魯爾鎖定 (Lock) 與滑動 (Slip) 連接器',
    quantitativeConditions: {
      temperatureC: '20°C - 30°C'
    },
    fixtureRequiredZh: 'CMM 三次元量測儀、投影儀與標準環規塞規',
    testProcedureStepsZh: [
      '使用 3D CMM 或高精度光學投影儀量測公錐體小端直徑與斜率。',
      '測量母錐座開口直徑、最大與最小配合長度。',
      '檢測鎖定螺紋牙深、Pitch (2.5mm) 及耳翼厚度。'
    ],
    acceptanceCriteriaZh: [
      '所有幾何尺寸需 100% 落在 ISO 80369-7 Fig.B.1~B.6 公差範圍內。'
    ],
    commonNonConformancesZh: [
      '射出成型保壓不足致 6% 錐度角度偏離，產生局部過盈與單點洩漏。'
    ],
    regulatoryTipZh: 'FDA 510(k) 審查需提供全尺寸量測報告 (Full Dimensional Inspection Report)。'
  },
  'iso7-clause-4': {
    id: 'iso7-clause-4',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Clause 4',
    titleEn: 'Non-interchangeability Requirements',
    titleZh: 'Clause 4 跨領域小口徑連接器非互換性防呆要求',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '確保血管用魯爾接頭絕不可能與腸餵 (-3)、神經軸麻醉 (-6) 等其他醫療管路接頭發生實質物理連接。',
    appliesToZh: '所有小口徑醫療連接器',
    quantitativeConditions: {},
    fixtureRequiredZh: '3D CAD 碰撞防呆模型與物理互接試驗機',
    testProcedureStepsZh: [
      '建立 ISO 80369 家族接頭之 3D CAD 空間包絡面。',
      '執行軟體虛擬對接與碰撞干涉分析。',
      '使用 50 N 物理對力進行強制卡入測試。'
    ],
    acceptanceCriteriaZh: [
      '不同領域接頭間無法建立可傳輸流體的密合通路。'
    ],
    commonNonConformancesZh: [
      '自訂衍生結構無意中落入 ISO 80369-3 (ENFit) 之包絡線公差。'
    ],
    regulatoryTipZh: '需於 ISO 14971 風險管理報告中檢附跨領域 Misconnection 危害分析紀錄。'
  },
  'iso20-annex-a': {
    id: 'iso20-annex-a',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex A',
    titleEn: 'Test Methods for Dimensional Attributes',
    titleZh: '附錄 A 幾何尺寸量規驗證實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '規範使用量規 (Gauges) 與三次元精密量測設備驗證幾何尺寸之標準量測條件。',
    appliesToZh: '所有 ISO 80369 系列連接器',
    quantitativeConditions: {
      temperatureC: '20°C ± 2°C (標準計量室溫)'
    },
    fixtureRequiredZh: 'ISO 80369-7 標準環規、塞規與三次元 CMM',
    testProcedureStepsZh: [
      '將試驗品於 20°C 計量室靜置恒溫平衡。',
      '使用光學探針量測錐度 6% 斜率與軸向深度。',
      '使用螺紋環規進行通止規 (Go/No-Go) 檢驗。'
    ],
    acceptanceCriteriaZh: [
      '量測數據精確符合 ISO 80369-7 尺寸公差矩陣。'
    ],
    commonNonConformancesZh: [
      '環境溫差過大造成塑膠熱脹冷縮偏離尺寸。'
    ],
    regulatoryTipZh: '建議量測儀器儀校系統隨附 ISO 17025 追溯證明。'
  },
  'iso20-general-procedure': {
    id: 'iso20-general-procedure',
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'General Procedure',
    titleEn: 'Standard Pre-assembly Method Across All Annexes',
    titleZh: '通用標準預裝配程序實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '統一規範 Annex B~I 所有性能測試前之標準旋緊扭矩與軸向推力裝配步驟。',
    appliesToZh: '所有 ISO 80369-20 性能測試試驗',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 - 0.12 N·m',
      testForceN: '26.5 - 27.5 N (軸向推力)',
      holdTimeSec: '5 - 6 秒'
    },
    fixtureRequiredZh: '校正自動裝配扭矩起子與彈簧推力機構',
    testProcedureStepsZh: [
      '清潔受測物與金屬參考夾具錐面。',
      '以 0.08–0.12 N·m 扭矩與 26.5–27.5 N 軸向推力結合。',
      '保持推力與扭矩 5–6 秒後鎖定測試狀態。'
    ],
    acceptanceCriteriaZh: [
      '每次測試前之基準裝配應力高精度一致。'
    ],
    commonNonConformancesZh: [
      '手動裝配扭矩不勻導致洩漏測試數據離散度過高。'
    ],
    regulatoryTipZh: '自動化扭矩測試機台需隨附裝配力學實時曲線紀錄。'
  }
};

