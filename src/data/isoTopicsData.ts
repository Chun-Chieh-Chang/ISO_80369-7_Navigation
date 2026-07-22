import { ISOTopic, StandardClauseDetail } from '../types';

export const ISO_TOPICS: ISOTopic[] = [
  {
    id: 'fluid-leakage',
    titleZh: '1. 正壓流體洩漏測試 (Fluid Leakage)',
    titleEn: 'Liquid Leakage by Pressure',
    category: 'leakage',
    categoryZh: '洩漏與氣密',
    iconName: 'Droplets',
    shortSummaryZh: '評估 6% 魯爾錐面與螺紋在 300~330 kPa 水壓下的密封防漏能力，確保藥液不外漏。',
    detailedDescriptionZh: '正壓流體洩漏測試為醫療級魯爾接頭最基礎且核心的驗證項目。接頭在以規定之裝配扭矩（0.08~0.12 N·m）旋合於標準參考金屬夾具後，施加 300 kPa 至 330 kPa 之水壓並保持 30~35 秒（水滴法）或 15~20 秒（壓降法），觀察錐面配合處是否有水滴形成或滴落。此測試模擬靜脈輸液、推注藥物時管路內高壓環境下的防漏安全性。',
    keyParameters: [
      { label: '裝配扭矩 Assembly Torque', value: '0.08 - 0.12', unit: 'N·m' },
      { label: '測試壓力 Test Pressure', value: '300 - 330', unit: 'kPa' },
      { label: '水滴法保持時間 Hold Time', value: '30 - 35', unit: '秒' },
      { label: '壓降法保持時間 Hold Time', value: '15 - 20', unit: '秒' },
      { label: '測試介質 Test Medium', value: '去離子水 / 蒸餾水或空氣' }
    ],
    relatedISO7Clauses: ['6.1'],
    relatedISO20Annexes: ['Annex B', 'Annex C'],
    relatedRefConnectors: ['C.1', 'C.4', 'C.2', 'C.5'],
    engineeringRiskZh: '塑膠模具毛邊、錐度不均（非 6% 圓錐）、射出縮水造成圓度不良，均會直接導致加壓時流體自錐面隙縫滲漏。',
    auditFocusZh: '確認測試設備壓力感測器精度（±0.3%），夾具是否有定期更換，乾燥拭紙檢驗是否有水痕擴散。',
    tags: ['300kPa', '正壓', '水壓', '6.1', 'Annex B', 'Annex C', '漏水滴落'],
    figures: [
      {
        id: 'ISO20-FIG-B1',
        titleZh: '壓降法正壓流體洩漏測試裝置圖',
        titleEn: 'Pressure Decay Positive Pressure Leakage Apparatus',
        standard: 'ISO 80369-20:2024 Annex B',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '本圖展示 ISO 80369-20 Annex B 氣壓衰減洩漏試驗架構，包含加壓源、精密調壓閥 (±0.3% 精度感測器)、截止閥 S1、金屬參考夾具 (Figure C.1/C.4) 與受測魯爾接頭。加壓至 300~330 kPa 保持 15~20 秒量測壓力衰減量 ΔP。',
        svgKey: 'ISO20-FIG-B1',
        keyCallouts: [
          { id: 'p_test', labelZh: '測試壓力範圍', valueZh: '300 ~ 330 kPa' },
          { id: 'gauge_acc', labelZh: '感測器精度', valueZh: '±0.3%' },
          { id: 'hold_time', labelZh: '氣壓持壓時間', valueZh: '15 ~ 20 秒' },
          { id: 'pass_criteria', labelZh: '判定基準', valueZh: '洩漏率 ≤ 0.005 Pa·m³/s' }
        ]
      },
      {
        id: 'ISO20-FIG-B2',
        titleZh: '儀器如何執行標準？解構壓力衰減測試的四個階段',
        titleEn: 'Four Stages of Pressure Decay Test Execution',
        standard: 'ISO 80369-20:2024 Annex B',
        figureType: 'analysis',
        figureTypeZh: '測試曲線分析圖',
        descriptionZh: '本附圖詳細解構儀器執行壓力衰減測試的四個關鍵階段：充氣 (Fill)、穩定 (Stabilize)、測試 (Test) 與排氣 (Exhaust)，並標示出 ΔP 的計算區間。',
        svgKey: 'ISO20-FIG-B2',
        keyCallouts: [
          { id: 'fill', labelZh: '充氣階段', valueZh: '0~5s' },
          { id: 'stabilize', labelZh: '穩定階段', valueZh: '5~15s' },
          { id: 'test', labelZh: '測試階段', valueZh: '15~35s' },
          { id: 'exhaust', labelZh: '排氣階段', valueZh: '35s 後' }
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
        svgKey: 'ISO20-FIG-C1',
        keyCallouts: [
          { id: 'media', labelZh: '測試介質', valueZh: '去離子水 De-aerated Water' },
          { id: 'press', labelZh: '施加水壓', valueZh: '300 ~ 330 kPa' },
          { id: 'hold', labelZh: '水壓保持時間', valueZh: '30 ~ 35 秒' },
          { id: 'paper', labelZh: '水滴檢測方式', valueZh: '乾燥拭紙無水痕擴散' }
        ]
      },
      {
        id: 'ISO7-FIG-B1-B2',
        titleZh: '6% 魯爾錐面貼合密封 CAD 幾何圖',
        titleEn: '6% Luer Slip Cone & Socket Mating Geometry',
        standard: 'ISO 80369-7:2021 Figure B.1 & B.2',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: '詳細呈現 6% 魯爾公錐體與母錐座配合處之 CAD 斷面圖。標記公錐小端直徑 (Ø3.970~4.072 mm)、母錐開口直徑 (Ø4.198~4.298 mm) 及 1:16.667 (雙邊 3.436°) 錐度角，證明防漏取決於微觀錐面靜摩擦緊密過盈配合。',
        svgKey: 'ISO7-FIG-B1-B2',
        keyCallouts: [
          { id: 'taper', labelZh: '圓錐斜率', valueZh: '6% (1 : 16.667)' },
          { id: 'length', labelZh: '配合長度', valueZh: '≥ 7.5 mm' },
          { id: 'angle', labelZh: '半錐角度 α', valueZh: '1.718°' }
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
    relatedRefConnectors: ['C.1', 'C.4'],
    engineeringRiskZh: '軟質塑膠在負壓下發生錐面向內微幅收縮變形，導致配合面局部脫離產生微氣孔吸氣。',
    auditFocusZh: '負壓量測衰減法（Pressure Decay）中的儀器容積校正與溫度穩定度，避免環境熱脹冷縮干擾。',
    tags: ['80kPa', '負壓', '真空', '氣栓', '6.2', 'Annex D', 'Annex K'],
    figures: [
      {
        id: 'ISO20-FIG-D1',
        titleZh: '負壓空氣洩漏 (真空衰減法) 測試裝置圖',
        titleEn: 'Sub-atmospheric Vacuum Decay Leakage Test Apparatus',
        standard: 'ISO 80369-20:2024 Annex D',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '展示 ISO 80369-20 Annex D 真空洩漏試驗架構。真空幫浦抽氣至 80.0~88.0 kPa 負壓，隔離閥門後進行 15~20 秒負壓衰減量測，極限洩漏率要求 ≤ 0.005 Pa·m³/s，確保避免外界空氣被吸入管路導致致死性氣栓。',
        svgKey: 'ISO20-FIG-D1',
        keyCallouts: [
          { id: 'vac_press', labelZh: '負壓測試範圍', valueZh: '80.0 ~ 88.0 kPa' },
          { id: 'hold_t', labelZh: '負壓持壓時間', valueZh: '15 ~ 20 秒' },
          { id: 'max_leak', labelZh: '極限洩漏率', valueZh: '≤ 0.005 Pa·m³/s' },
          { id: 'risk', labelZh: '臨床防範危害', valueZh: '靜脈空氣栓塞 (Air Embolism)' }
        ]
      },
      {
        id: 'ISO20-FIG-K1',
        titleZh: '抽吸過程水下氣泡法氣密測試裝置圖 (2024最新)',
        titleEn: 'Air Leakage During Aspiration Submerged Test Apparatus',
        standard: 'ISO 80369-20:2024 Annex K',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: 'ISO 80369-20:2024 最新新增之 Annex K 抽吸氣密試驗。受測魯爾組件浸沒於透明水容器底層 (填充 1/3 去離子水)，上方管路抽真空至 80~88 kPa，靜置 20 秒初始氣泡排盡後，觀察水體內是否有連續產生的微氣泡流。',
        svgKey: 'ISO20-FIG-K1',
        keyCallouts: [
          { id: 'method', labelZh: '方法特色', valueZh: '水下沉浸目視氣泡法' },
          { id: 'water_level', labelZh: '水面高度', valueZh: '容器填充 1/3 高度' },
          { id: 'pass_rule', labelZh: '合格標準', valueZh: '無連續產生之氣泡流 (Bubble Stream)' }
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
      { label: '極限夾具 Critical Fixture', value: 'Figure C.3 (2.71mm 耳翼)' },
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
        svgKey: 'ISO20-FIG-H1',
        keyCallouts: [
          { id: 'torque', labelZh: '過載破壞扭矩', valueZh: '0.15 ~ 0.17 N·m' },
          { id: 'rpm', labelZh: '伺服馬達轉速', valueZh: '3.0 rpm ± 0.5 rpm' },
          { id: 'fixture', labelZh: '最壞情況夾具', valueZh: 'Figure C.3 (2.71mm 耳翼)' },
          { id: 'mechanic', labelZh: '應力失效模式', valueZh: '環向張應力 σθ > 材料屈服極限' }
        ]
      },
      {
        id: 'ISO7-FIG-B3-B6',
        titleZh: '公鎖定套環螺紋與 2.71mm 最壞情況耳翼幾何圖',
        titleEn: 'Luer Lock Thread Profile & 2.71mm Narrow Lug Geometry',
        standard: 'ISO 80369-7:2021 Figure B.3 & Figure C.3',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: 'CAD 幾何剖面圖說明 ISO 80369-7 雙頭內螺紋 (Pitch 2.5mm，角度 25°~30°) 與 Figure C.3 縮窄耳翼 (2.71mm) 旋合咬合時之接觸面。解析耳翼寬度縮小 22% 如何極端考驗塑膠套環之幾何公差與剛性。',
        svgKey: 'ISO7-FIG-B3-B6',
        keyCallouts: [
          { id: 'pitch', labelZh: '螺紋節距 Pitch', valueZh: '2.5 mm' },
          { id: 'tab_w', labelZh: 'C.3 耳翼寬度', valueZh: '2.71 mm (縮窄 22%)' },
          { id: 'proj', labelZh: '錐體投影量 c', valueZh: '≥ 2.1 mm' }
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
        svgKey: 'ISO20-FIG-F1',
        keyCallouts: [
          { id: 'f_lock', labelZh: '鎖定型軸向拉力', valueZh: '35 N (10~15秒)' },
          { id: 'f_slip', labelZh: '滑動型軸向拉力', valueZh: '25 N (10~15秒)' },
          { id: 'rate', labelZh: '拉力加載速率', valueZh: '10 N/s' }
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
        svgKey: 'ISO20-FIG-G1',
        keyCallouts: [
          { id: 'annex_g', labelZh: 'Annex G 反旋扭矩', valueZh: '0.018 ~ 0.020 N·m' },
          { id: 'annex_i', labelZh: 'Annex I 拆卸靜置', valueZh: '10 ~ 15 分鐘後量測峰值' }
        ]
      }
    ]
  },
  {
    id: 'stress-cracking',
    titleZh: '6. 應力龜裂與耐化學測試 (Stress Cracking & ESCR)',
    titleEn: 'Environmental Stress Cracking (ESCR)',
    category: 'durability',
    categoryZh: '耐久性與環境',
    iconName: 'ShieldAlert',
    shortSummaryZh: '裝配後浸泡於化學介質（如 70% 異丙醇酒精）48 小時，驗證無應力龜裂或結構裂解。',
    detailedDescriptionZh: '醫療環境中接頭常接觸消毒酒精（70% IPA）、脂質乳劑（Lipids）或化學藥品。內部殘留的裝配環向應力與化學介質共同作用，容易引發「環境應力龜裂（ESCR）」。測試將旋合裝配後的接頭浸泡或塗佈藥劑靜置 48 小時，檢視是否有微裂紋、破損或氣密失效。',
    keyParameters: [
      { label: '測試浸泡時間 Duration', value: '48', unit: '小時' },
      { label: '化學介質 Chemical Media', value: '70% IPA 異丙醇 / 脂質溶液' },
      { label: '環境溫度 Temperature', value: '20 - 30', unit: '°C' }
    ],
    relatedISO7Clauses: ['6.3'],
    relatedISO20Annexes: ['Annex E'],
    relatedRefConnectors: ['C.1', 'C.4'],
    engineeringRiskZh: 'PC 或 Polycarbonate 材料對酒精非常敏感，若射出成型分子內應力過高，極易在 24 小時內發生爆裂。',
    auditFocusZh: '顯微鏡觀察倍率（≥ 10x），殘留應力檢驗（偏光應力分析）。',
    tags: ['48小時', '酒精', 'ESCR', '應力龜裂', '6.3', 'Annex E'],
    figures: [
      {
        id: 'ISO20-FIG-E1',
        titleZh: '70% 異丙醇化學劑浸泡與 48h 應力龜裂試驗圖',
        titleEn: '70% IPA Chemical Solvent Exposure & ESCR Test Setup',
        standard: 'ISO 80369-20:2024 Annex E',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '說明 ISO 80369-20 Annex E 試驗。裝配組裝件浸泡於 70% IPA 消毒酒精中靜置 48 小時，分子高應力區受溶劑侵蝕引發高分子鏈斷裂 (Polymer chain scission)，隨後需通過 Annex B/C 洩漏測試。',
        svgKey: 'ISO20-FIG-E1',
        keyCallouts: [
          { id: 'media', labelZh: '浸泡介質', valueZh: '70% IPA 異丙醇溶劑' },
          { id: 'time', labelZh: '浸泡靜置時間', valueZh: '≥ 48 小時' },
          { id: 'temp', labelZh: '環境溫度', valueZh: '20°C ~ 30°C' }
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
      { label: '小端直徑 Base Diameter', value: '3.970 - 4.072', unit: 'mm' },
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
        standard: 'ISO 80369-7:2021 Figure B.1 & B.2',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: '展現 6% 圓錐 (1:16.667，單邊 α=1.718°) 幾何尺寸圖。標記 Base 直徑 (3.970~4.072mm)、最小配合長度 7.5mm 與倒角規格。',
        svgKey: 'ISO7-FIG-B1-B2',
        keyCallouts: [
          { id: 'ratio', labelZh: '錐度斜率', valueZh: '1 : 16.667 (6%)' },
          { id: 'min_l', labelZh: '最小長度 e', valueZh: '≥ 7.5 mm' }
        ]
      },
      {
        id: 'ISO7-FIG-B3-B6',
        titleZh: '魯爾鎖定螺紋距、投影量與耳翼 CAD 幾何圖',
        titleEn: 'Luer Lock Thread Pitch & Projection Distance CAD',
        standard: 'ISO 80369-7:2021 Figure B.3 & Figure B.6',
        figureType: 'connector_cad',
        figureTypeZh: '接頭幾何 CAD 圖',
        descriptionZh: 'CAD 圖面標註公鎖定雙頭螺紋 (Pitch 2.5mm) 與母耳翼 (標稱 3.50mm) 配合，標註核心參數 c ≥ 2.1mm 及 t ≤ 3.2mm。',
        svgKey: 'ISO7-FIG-B3-B6',
        keyCallouts: [
          { id: 'p', labelZh: '雙頭螺紋 pitch', valueZh: '2.5 mm' },
          { id: 'c', labelZh: '錐體投影量 c', valueZh: '≥ 2.1 mm' }
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
    detailedDescriptionZh: '為了排除測試受測物時對手件材質變形的干擾，ISO 80369-7 附錄 C 精確指定了使用不鏽鋼高硬度金屬製作的參考接頭（Figure C.1 至 C.6）。其中 C.1/C.4 用於標準氣密性測試，而 C.3（母耳翼縮窄至 2.71mm）及 C.6 則為專門測試機械極限的最壞情況（Worst-case）夾具。',
    keyParameters: [
      { label: '材質要求 Material', value: '不鏽鋼 (Stainless Steel) 硬度 ≥ 45 HRC' },
      { label: '標稱母耳翼 C.1 Tab Width', value: '3.50', unit: 'mm' },
      { label: '極限母耳翼 C.3 Tab Width', value: '2.71 (縮窄 22%)', unit: 'mm' },
      { label: '表面粗糙度 Surface Finish', value: 'Ra ≤ 0.8', unit: 'μm' }
    ],
    relatedISO7Clauses: ['Annex C'],
    relatedISO20Annexes: ['General Apparatus Section 4'],
    relatedRefConnectors: ['C.1', 'C.2', 'C.3', 'C.4', 'C.5', 'C.6'],
    engineeringRiskZh: '誤用非標準的 360° 全螺紋 SML 連接器進行法規測試，雖然極易 Pass，但申報時會被 FDA / TFDA 認定無效並退件！',
    auditFocusZh: '參考金屬夾具的 ISO 17025 外部校正報告、幾何特徵磨損定期檢查記錄。',
    tags: ['C.1', 'C.3', 'C.4', 'C.6', '參考夾具', 'Annex C'],
    figures: [
      {
        id: 'ISO7-FIG-B3-B6',
        titleZh: 'Annex C 金屬標準參考連接器 CAD 圖鑑',
        titleEn: 'Annex C Stainless Steel Reference Fixture Schematics',
        standard: 'ISO 80369-7:2021 Annex C',
        figureType: 'fixture',
        figureTypeZh: '參考金屬件',
        descriptionZh: '不鏽鋼 (≥45 HRC) 高精密度法規測試專用金屬參考件 (Figure C.1~C.6)。詳細解析 C.1 標稱件與 C.3 Worst-case 最壞情況件之幾何差異。',
        svgKey: 'ISO7-FIG-B3-B6',
        keyCallouts: [
          { id: 'material', labelZh: '夾具材質', valueZh: 'Stainless Steel (≥ 45 HRC)' },
          { id: 'roughness', labelZh: '表面粗糙度', valueZh: 'Ra ≤ 0.8 μm' }
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
    detailedDescriptionZh: 'ISO 80369-20 各附錄（B~I）統一規範了進行各項性能測試前的裝配標準方法。鎖定型（Lock）接頭須先施加 0.08~0.12 N·m 的指定旋緊扭矩（Assembly Torque），同時施加 26.5~27.5 N 的軸向推力，維持 5~6 秒，確保每次測試的基準貼合應力一致。',
    keyParameters: [
      { label: '標準裝配扭矩 Assembly Torque', value: '0.08 - 0.12', unit: 'N·m' },
      { label: '裝配軸向推力 Axial Force', value: '26.5 - 27.5', unit: 'N' },
      { label: '裝配保持時間 Hold Time', value: '5 - 6', unit: '秒' }
    ],
    relatedISO7Clauses: ['6.1', '6.2', '6.3', '6.4', '6.5'],
    relatedISO20Annexes: ['General Test Procedure'],
    relatedRefConnectors: ['C.1', 'C.2', 'C.4', 'C.5'],
    engineeringRiskZh: '裝配扭矩不足（< 0.08 N·m）導致錐面未完全貼合產生假洩漏；裝配扭矩過大（> 0.12 N·m）預先破壞塑膠螺紋結構。',
    auditFocusZh: '自動化裝配扭矩儀之轉速控制與扭矩截止（Torque Shut-off）精度。',
    tags: ['0.12Nm', '裝配扭矩', '預裝配', '27.5N'],
    figures: [
      {
        id: 'ISO20-FIG-J1',
        titleZh: '標準預裝配定扭矩起子與軸向推力機構圖',
        titleEn: 'Standard Pre-assembly Torque Driver & Axial Thrust Rig',
        standard: 'ISO 80369-20 General Procedure',
        figureType: 'apparatus',
        figureTypeZh: '測試裝置示意圖',
        descriptionZh: '展示 ISO 80369-20 所有 Annex 試驗前之標準預裝配作業。結合 0.08~0.12 N·m 校正扭矩起子與 26.5~27.5 N 彈簧軸向推力，持壓 5~6 秒，確保基準接觸力學一致。',
        svgKey: 'ISO20-FIG-J1',
        keyCallouts: [
          { id: 'pre_t', labelZh: '預裝配扭矩', valueZh: '0.08 ~ 0.12 N·m' },
          { id: 'pre_f', labelZh: '預裝配軸推力', valueZh: '26.5 ~ 27.5 N' },
          { id: 'pre_hold', labelZh: '預裝配保持時間', valueZh: '5 ~ 6 秒' }
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
        svgKey: 'ISO7-FIG-A1',
        keyCallouts: [
          { id: 'luer', labelZh: 'ISO 80369-7', valueZh: '血管/皮下注射 (6% Luer)' },
          { id: 'enfit', labelZh: 'ISO 80369-3', valueZh: '腸道餵食 (ENFit 反向鎖定)' },
          { id: 'nrfit', labelZh: 'ISO 80369-6', valueZh: '神經軸麻醉 (20% 大錐度 NRFit)' }
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
    tags: ['Clause 1', 'Clause 2', 'Clause 3', 'Scope', '引用標準', '術語定義'],
    figures: [
      {
        id: 'ISO7-FIG-A1',
        titleZh: 'ISO 80369 跨領域小口徑連接器防誤插幾何矩陣',
        titleEn: 'ISO 80369 Non-Interchangeability Family Architecture Matrix',
        standard: 'ISO 80369 Series (ISO 80369-7 / -3 / -6 / -2)',
        figureType: 'mechanism',
        figureTypeZh: '物理機構/失效原理圖',
        descriptionZh: '解析 ISO 80369 家族化尺寸互斥矩陣：血管 (Luer -7)、腸餵 (ENFit -3)、神經軸麻醉 (NRFit -6) 與呼吸 (-2) 之幾何隔絕防呆原理。',
        svgKey: 'ISO7-FIG-A1',
        keyCallouts: [
          { id: 'luer', labelZh: 'ISO 80369-7', valueZh: '血管/皮下注射 (6% Luer)' },
          { id: 'enfit', labelZh: 'ISO 80369-3', valueZh: '腸道餵食 (ENFit 反向鎖定)' },
          { id: 'nrfit', labelZh: 'ISO 80369-6', valueZh: '神經軸麻醉 (20% 大錐度 NRFit)' }
        ]
      }
    ]
  },
  {
    id: 'annexes-rationale-summary',
    titleZh: '12. 標準原理背景、非互換性評估與測試修訂彙整 (Rationale, Assessment & Modifications)',
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
    tags: ['Annex A', 'Annex D', 'Annex E', 'Annex J', '原理說明', '測試矩陣'],
    figures: [
      {
        id: 'ISO7-FIG-A1',
        titleZh: 'ISO 80369 跨領域小口徑連接器防誤插幾何矩陣',
        titleEn: 'ISO 80369 Non-Interchangeability Family Architecture Matrix',
        standard: 'ISO 80369 Series (ISO 80369-7 / -3 / -6 / -2)',
        figureType: 'mechanism',
        figureTypeZh: '物理機構/失效原理圖',
        descriptionZh: '解析 ISO 80369 家族化尺寸互斥矩陣：血管 (Luer -7)、腸餵 (ENFit -3)、神經軸麻醉 (NRFit -6) 與呼吸 (-2) 之幾何隔絕防呆原理。',
        svgKey: 'ISO7-FIG-A1',
        keyCallouts: [
          { id: 'luer', labelZh: 'ISO 80369-7', valueZh: '血管/皮下注射 (6% Luer)' },
          { id: 'enfit', labelZh: 'ISO 80369-3', valueZh: '腸道餵食 (ENFit 反向鎖定)' },
          { id: 'nrfit', labelZh: 'ISO 80369-6', valueZh: '神經軸麻醉 (20% 大錐度 NRFit)' }
        ]
      }
    ]
  }
];

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
    titleZh: '附錄 B 魯爾連接器幾何尺寸圖面規範 (Figure B.1 ~ B.6)',
    type: 'requirement',
    typeZh: '法規要求條文',
    objectiveZh: '提供 Figure B.1 至 B.6 公母魯爾鎖定與滑動接頭之完整 CAD 尺寸與公差矩陣。',
    appliesToZh: '模具設計與生產品管全尺寸檢驗',
    quantitativeConditions: {
      temperatureC: '20°C - 30°C'
    },
    fixtureRequiredZh: '三次元 CMM 與光學投影儀',
    testProcedureStepsZh: [
      '按 Figure B.1~B.6 標註量測錐度、螺紋 Pitch、耳翼寬度與投影量。'
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
    objectiveZh: '規範測試環境溫濕度預處理（20±5°C, 50±10% RH ≥24h）與夾具要求。',
    appliesToZh: '所有 ISO 80369-20 附錄試驗',
    quantitativeConditions: {
      temperatureC: '20°C ± 5°C',
      holdTimeHours: '≥ 24 小時 (溫濕度預處理)'
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
      testPressureKpa: '300 kPa - 330 kPa',
      holdTimeSec: '30 - 35 秒 (水滴法) / 15 - 20 秒 (壓降法)',
      temperatureC: '15°C - 30°C',
      media: '水或空氣'
    },
    fixtureRequiredZh: 'Figure C.1 (母標稱) 或 Figure C.4 (公標稱)',
    testProcedureStepsZh: [
      '使用 0.08–0.12 N·m 扭矩與 26.5–27.5 N 軸向推力將受測物與鋼製參考夾具旋合。',
      '向系統內注滿測試水，排出內部所有氣泡（水滴法）。',
      '平穩加壓至 300–330 kPa。',
      '維持壓力 30–35 秒，目視檢查是否有水滴形成或滴落。'
    ],
    acceptanceCriteriaZh: [
      '在 300 kPa–330 kPa 下維持 30–35 秒，無水滴形成滴落。',
      '如使用壓降法（Pressure Decay），壓降對應洩漏率不得超過 0.005 Pa·m³/s。'
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
      assemblyTorqueNm: '0.08 - 0.12 N·m',
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
      assemblyTorqueNm: '0.08 - 0.12 N·m',
      testPressureKpa: '300 - 330 kPa',
      holdTimeSec: '30 - 35 秒',
      media: '蒸餾水/飲用水 (可添加亞甲藍色素)'
    },
    fixtureRequiredZh: 'Figure C.1 (母) 或 Figure C.4 (公)',
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
      testPressureKpa: '80.0 kPa - 88.0 kPa (真空負壓)',
      holdTimeSec: '15 秒 - 20 秒'
    },
    fixtureRequiredZh: 'Figure C.1 或 Figure C.4',
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
    fixtureRequiredZh: 'Figure C.3 母參考接頭（2.71 mm 窄耳翼最壞情況夾具）',
    testProcedureStepsZh: [
      '將受測公鎖定接頭對準 Figure C.3 金屬參考夾具。',
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
    standard: 'ISO 80369-20:2024',
    clauseNumber: 'Annex H',
    titleEn: 'Test Method for Resistance to Overriding',
    titleZh: '附錄 H 抗過載測試方法實施細則',
    type: 'test_method',
    typeZh: '實驗室測試方法',
    objectiveZh: '詳細規範使用扭矩試驗機施加 0.15~0.17 N·m 扭矩的控制速率與數據擷取頻率。',
    appliesToZh: '具螺紋鎖定功能之小口徑連接器',
    quantitativeConditions: {
      testTorqueNm: '0.15 - 0.17 N·m (目標 0.16 N·m)',
      holdTimeSec: '5 - 10 秒',
      temperatureC: '15°C - 30°C'
    },
    fixtureRequiredZh: 'ISO 80369-7 Figure C.3 (母鎖定最壞情況金屬件) 或 C.6',
    testProcedureStepsZh: [
      '將 C.3 金屬夾具固定於自動扭矩測試儀之伺服馬達夾頭。',
      '設定旋轉轉速為 3.0 rpm ± 0.5 rpm。',
      '啟動馬達旋緊至扭矩達 0.16 N·m，觸發定扭矩保持模式。',
      '持續監測 5~10 秒內扭矩衰減曲線，若扭矩驟降 > 30% 判定為滑牙失敗。'
    ],
    acceptanceCriteriaZh: [
      '保持 5~10 秒期間扭矩曲線平穩無斷崖式下降。',
      '卸載後檢查金屬夾具耳翼無塑膠刮屑沾黏。'
    ],
    commonNonConformancesZh: [
      '手動旋緊速率不穩定，瞬間衝擊扭矩超過 0.20 N·m 導致誤判。',
      'C.3 金屬夾具耳翼經多次測試後磨損變圓，未定期驗收直角特徵。'
    ],
    regulatoryTipZh: 'DVP 測試計畫書需隨附扭矩-時間（Torque vs Time）實時曲線圖作為審查佐證。'
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
      testForceN: '32 N - 35 N (Lock) / 23 N - 25 N (Slip)',
      holdTimeSec: '10 秒 - 15 秒'
    },
    fixtureRequiredZh: 'Figure C.3 (公受測物) 或 Figure C.6 (母受測物)',
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
      testTorqueNm: '0.018 N·m - 0.020 N·m (反向)',
      holdTimeSec: '10 秒 - 15 秒'
    },
    fixtureRequiredZh: 'Figure C.1 (母) 或 Figure C.4 (公)',
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
    fixtureRequiredZh: 'Figure C.1 或 Figure C.4',
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
      assemblyTorqueNm: '0.08 - 0.12 N·m',
      restTimeMin: '10 - 15 分鐘 (靜置貼合)',
      maxAllowedUnscrewingTorque: '按產品規格上限 (例: ≤ 0.24 N·m)'
    },
    fixtureRequiredZh: 'Figure C.1 或 Figure C.4',
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
      assemblyTorqueNm: '0.08 - 0.12 N·m',
      holdTimeHours: '≥ 48 小時',
      temperatureC: '15°C - 30°C'
    },
    fixtureRequiredZh: 'Figure C.1 或 Figure C.4',
    testProcedureStepsZh: [
      '裝配接頭並浸泡或塗佈化學藥劑（如 70% 異丙醇）。',
      '在室溫下靜置保持至少 48 小時。',
      '進行 Annex B 或 Annex C 流體洩漏測試驗證密封性。'
    ],
    acceptanceCriteriaZh: [
      '靜置 48 小時後進行洩漏測試 Pass，且視覺無裂紋。'
    ],
    commonNonConformancesZh: [
      'PC 材質殘留內應力高，接觸酒精後 24 小時內破裂。'
    ],
    regulatoryTipZh: '常與 ISO 10993 生物相容性及耐化學性測試整合執行。'
  },
  'iso7-annex-c': {
    id: 'iso7-annex-c',
    standard: 'ISO 80369-7:2021',
    clauseNumber: 'Annex C',
    titleEn: 'Reference Connectors (Figure C.1 to C.6)',
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
      '每次測試前以無塵布與異丙醇清潔金屬表面。',
      '搭配扭矩起子進一步旋合裝配。'
    ],
    acceptanceCriteriaZh: [
      '金屬件表面硬度 ≥ 45 HRC，無鏽蝕或刮痕。',
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
    objectiveZh: '驗證塑膠魯爾接頭在維持預裝配過盈應力下，浸泡於消毒酒精等化學介質 48 小時後無結構破裂與洩漏。',
    appliesToZh: '所有塑膠成型魯爾接頭 (PC, PP, Tritan, ABS 等)',
    quantitativeConditions: {
      assemblyTorqueNm: '0.08 N·m - 0.12 N·m',
      holdTimeHours: '≥ 48 小時',
      temperatureC: '20°C - 30°C',
      media: '70% IPA 異丙醇消毒酒精或脂質溶液'
    },
    fixtureRequiredZh: 'Figure C.1 (母) 或 Figure C.4 (公)',
    testProcedureStepsZh: [
      '以 0.08–0.12 N·m 裝配受測物與參考金屬夾具。',
      '完全浸泡或表面塗佈 70% 異丙醇藥劑。',
      '在 20–30°C 室溫環境下靜置保持至少 48 小時。',
      '進行 6.1 (正壓流體洩漏) 或 6.2 (負壓空氣洩漏) 驗證密封性。'
    ],
    acceptanceCriteriaZh: [
      '靜置 48 小時後，目視表面無微裂紋、龜裂或爆裂現象。',
      '隨後執行的流體洩漏測試須完全 Pass。'
    ],
    commonNonConformancesZh: [
      'Polycarbonate (PC) 射出殘留內應力高，接觸酒精 24 小時內發生應力爆裂。'
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
      '所有幾何尺寸需 100% 落在 ISO 80369-7 Figure B.1~B.6 公差範圍內。'
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

