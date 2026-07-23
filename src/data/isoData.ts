import { AnnexCFigureInfo, FailureModeInfo, ISOClauseInfo, PlasticMaterial } from '../types';

export const ISO_CLAUSES: Record<string, ISOClauseInfo> = {
  '6.1': {
    id: '6.1',
    title: 'Fluid Leakage',
    titleZh: '6.1 流體洩漏測試',
    category: 'leakage',
    applicableTypes: ['lock', 'slip'],
    assemblyTorqueNm: { min: 0.08, max: 0.12 },
    holdTimeSec: { min: 10, max: 15 },
    requiredMaleRef: 'C.4', // For Female Lock
    requiredFemaleRef: 'C.1', // For Male Lock
    passCriteria: 'No fluid leakage exceeding 0.005 Pa·m³/s or no falling drop for 10s at 300 kPa–330 kPa.',
    passCriteriaZh: '加壓 300 kPa–330 kPa 保持 10 秒以上，無漏水滴落，或壓降洩漏率 < 0.005 Pa·m³/s。',
    keyPhysics: 'Assesses 6% taper seal interface under nominal assembly torque.',
    keyPhysicsZh: '評估 6% 魯爾錐面在標準裝配扭矩（0.08–0.12 N·m）下的正壓密封防漏能力。'
  },
  '6.2': {
    id: '6.2',
    title: 'Sub-atmospheric Air Leakage',
    titleZh: '6.2 負壓空氣洩漏測試',
    category: 'leakage',
    applicableTypes: ['lock', 'slip'],
    assemblyTorqueNm: { min: 0.08, max: 0.12 },
    holdTimeSec: { min: 10, max: 15 },
    requiredMaleRef: 'C.4',
    requiredFemaleRef: 'C.1',
    passCriteria: 'Air leakage rate shall not exceed 0.005 Pa·m³/s at 80 kPa–88 kPa vacuum.',
    passCriteriaZh: '在 80 kPa–88 kPa 負壓真空下保持 10–15 秒，空氣洩漏率不超過 0.005 Pa·m³/s。',
    keyPhysics: 'Ensures no air ingress into fluid lines under vacuum aspiration.',
    keyPhysicsZh: '確保在抽吸或負壓狀態下，空氣不會經由錐面吸入輸液管路（預防氣栓）。'
  },
  '6.3': {
    id: '6.3',
    title: 'Stress Cracking',
    titleZh: '6.3 應力龜裂測試',
    category: 'durability',
    applicableTypes: ['lock', 'slip'],
    assemblyTorqueNm: { min: 0.08, max: 0.12 },
    holdTimeSec: { min: 172800, max: 172800 }, // 48 hours
    requiredMaleRef: 'C.4',
    requiredFemaleRef: 'C.1',
    passCriteria: 'No evidence of stress cracking after 48h assembly in chemical media (e.g. 70% IPA).',
    passCriteriaZh: '裝配後浸泡於化學介質（如 70% 異丙醇酒精）靜置 48 小時，無結構破裂或應力龜裂。',
    keyPhysics: 'Verifies environmental stress cracking resistance (ESCR) under sustained hoop stress.',
    keyPhysicsZh: '驗證塑膠材料在持續環向應力與化學藥品共同作用下的抗環境應力龜裂（ESCR）能力。'
  },
  '6.4': {
    id: '6.4',
    title: 'Resistance to Separation from Axial Load',
    titleZh: '6.4 抗軸向負載分離測試',
    category: 'mechanical',
    applicableTypes: ['lock', 'slip'],
    assemblyTorqueNm: { min: 0.08, max: 0.12 },
    testForceN: { min: 32, max: 35 }, // Lock: 32-35N, Slip: 23-25N
    holdTimeSec: { min: 10, max: 15 },
    requiredMaleRef: 'C.6', // For Female Lock
    requiredFemaleRef: 'C.3', // For Male Lock (Worst-case 2.71mm)
    passCriteria: 'Shall not separate when subjected to 32 N–35 N axial tension for 10 s–15 s.',
    passCriteriaZh: '在 32 N–35 N（Slip為 23–25 N）軸向拉力下維持 10–15 秒，接頭不得脫開分離。',
    keyPhysics: 'Tests mechanical lock thread shear strength under worst-case narrow ear engagement.',
    keyPhysicsZh: '使用最壞情況窄耳翼（C.3）測試螺紋在軸向強拉力下的剪切抗拉拔強度。'
  },
  '6.5': {
    id: '6.5',
    title: 'Resistance to Separation from Unscrewing',
    titleZh: '6.5 抗旋鬆分離測試',
    category: 'mechanical',
    applicableTypes: ['lock'],
    assemblyTorqueNm: { min: 0.08, max: 0.12 },
    testTorqueNm: { min: 0.018, max: 0.02 },
    holdTimeSec: { min: 10, max: 15 },
    requiredMaleRef: 'C.4',
    requiredFemaleRef: 'C.1',
    passCriteria: 'Shall not unscrew when subjected to a 0.02 N·m reverse torque for 10 s–15 s.',
    passCriteriaZh: '裝配後施加 0.018–0.020 N·m 的反向旋鬆扭矩維持 10–15 秒，接頭不得自行旋鬆。',
    keyPhysics: 'Verifies frictional self-locking angle between taper and thread surface.',
    keyPhysicsZh: '驗證錐面摩擦力與螺紋角組成的自鎖能力，防止管路因微小外力晃動而自動鬆脫。'
  },
  '6.6': {
    id: '6.6',
    title: 'Resistance to Overriding',
    titleZh: '6.6 抗過載（抗滑牙）測試',
    category: 'mechanical',
    applicableTypes: ['lock'],
    assemblyTorqueNm: { min: 0, max: 0 }, // Direct torque test
    testTorqueNm: { min: 0.15, max: 0.17 },
    holdTimeSec: { min: 5, max: 10 },
    requiredMaleRef: 'C.6', // For Female Lock
    requiredFemaleRef: 'C.3', // For Male Lock (Worst-case 2.71mm)
    passCriteria: 'Shall not override threads when subjected to 0.15 N·m–0.17 N·m torque for 5 s–10 s.',
    passCriteriaZh: '施加 0.15–0.17 N·m 破壞性扭矩維持 5–10 秒，螺紋或耳翼不得越過滑脫（不滑牙）。',
    keyPhysics: 'Tests hoop expansion, creep, and worst-case 2.71mm ear shear limit under severe over-torque.',
    keyPhysicsZh: '考驗公套環在極限過鎖扭力下的抗環向膨脹、抗塑膠蠕變及對抗 C.3 窄耳翼（2.71mm）應力集中的能力。'
  }
};

export const ANNEX_C_FIGURES: Record<string, AnnexCFigureInfo> = {
  'A.1': {
    id: 'A.1',
    figureNumber: 'Fig.A.1',
    annexGroup: 'Annex A',
    name: 'ISO 80369 Non-Interchangeability Matrix',
    gender: 'male',
    type: 'lock',
    description: 'Family architecture non-interchangeability geometry matrix across medical fields.',
    descriptionZh: 'ISO 80369 跨領域小口徑連接器防誤插幾何矩陣：血管 (Luer -7)、腸道 (ENFit -3)、神經軸 (NRFit -6) 及呼吸 (-2) 之幾何隔絕防呆原理圖。',
    intendedClauses: [],
    isWorstCase: false,
    worstCaseReasonZh: '確立跨領域物理防呆基準，確保不同臨床用途之小口徑接頭無法相互誤接。',
    svgHighlights: [
      { title: '血管應用 (-7)', value: '6% Luer 標稱錐度' },
      { title: '腸道應用 (-3)', value: 'ENFit 反向鎖定結構' },
      { title: '神經軸 (-6)', value: 'NRFit 20% 大錐度' }
    ],
    svgKey: 'ISO7-FIG-A1'
  },
  'B.1': {
    id: 'B.1',
    figureNumber: 'Fig.B.1',
    annexGroup: 'Annex B',
    name: 'Male Luer Slip Connector',
    gender: 'male',
    type: 'slip',
    description: 'Dimensional specifications for male 6% Luer slip connector.',
    descriptionZh: '6% (1:16.667) 公魯爾滑動接頭 CAD 尺寸規範圖，包含錐體長度 e ≥ 7.5 mm、尖端直徑 Ø3.970~4.072 mm 與錐度斜率。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4'],
    isWorstCase: false,
    worstCaseReasonZh: '標準公魯爾滑動接頭（L1），用於無螺紋滑動對接需求。',
    svgHighlights: [
      { title: '錐體長度 e', value: '≥ 7.5 mm' },
      { title: '圓錐斜率', value: '6% (1:16.667)' },
      { title: '適用類型', value: '公滑動 (Male Slip)' }
    ],
    svgKey: 'ISO7-FIG-B1'
  },
  'B.2': {
    id: 'B.2',
    figureNumber: 'Fig.B.2',
    annexGroup: 'Annex B',
    name: 'Female Luer Slip Connector',
    gender: 'female',
    type: 'slip',
    description: 'Dimensional specifications for female 6% Luer slip connector.',
    descriptionZh: '6% 母魯爾滑動接頭 CAD 尺寸規範圖，包含開口處標稱直徑 Ø4.198~4.298 mm、基底直徑 Ø3.793~3.893 mm 與內錐角。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4'],
    isWorstCase: false,
    worstCaseReasonZh: '標準母魯爾滑動接頭（L1），用於接收公滑動錐體。',
    svgHighlights: [
      { title: '開口直徑', value: 'Ø4.198~4.298 mm' },
      { title: '基底直徑', value: 'Ø3.793~3.893 mm' },
      { title: '適用類型', value: '母滑動 (Female Slip)' }
    ],
    svgKey: 'ISO7-FIG-B2'
  },
  'B.3': {
    id: 'B.3',
    figureNumber: 'Fig.B.3',
    annexGroup: 'Annex B',
    name: 'Male Luer Lock Connector with Rigid Thread Collar',
    gender: 'male',
    type: 'lock',
    description: 'Dimensional specifications for male Luer lock connector with rigid thread collar.',
    descriptionZh: '公魯爾鎖定接頭與內螺紋套環 CAD 尺寸規範圖，規範螺距 Pitch = 2.5 mm、螺紋牙型 25°、第一螺牙位置 t ≤ 3.2 mm 與投影量 c ≥ 2.1 mm。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6'],
    isWorstCase: false,
    worstCaseReasonZh: '具備標準剛性套環與螺紋，提供與母耳翼旋合的牢固鎖定介面。',
    svgHighlights: [
      { title: '螺距 Pitch', value: '2.5 mm' },
      { title: '投影量 c', value: '≥ 2.1 mm' },
      { title: '牙型角度', value: '25° (雙線螺紋)' }
    ],
    svgKey: 'ISO7-FIG-B3'
  },
  'B.4': {
    id: 'B.4',
    figureNumber: 'Fig.B.4',
    annexGroup: 'Annex B',
    name: 'Female Luer Lock Connector with Rigid Lugs',
    gender: 'female',
    type: 'lock',
    tabWidthMm: 3.50,
    backFlankAngleDeg: 25,
    description: 'Dimensional specifications for female Luer lock connector with rigid lugs.',
    descriptionZh: '母魯爾鎖定接頭與剛性耳翼（Lugs）CAD 尺寸規範圖，標稱耳翼寬度 3.50 mm，背側斜角 25°，與公鎖定螺紋嚙合。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6'],
    isWorstCase: false,
    worstCaseReasonZh: '標準母魯爾鎖定產品，耳翼提供穩定之旋緊拉合力。',
    svgHighlights: [
      { title: '耳翼寬度', value: '3.50 mm (標稱)' },
      { title: '背側角度', value: '25°' },
      { title: '適用類型', value: '母鎖定 (Female Lock)' }
    ],
    svgKey: 'ISO7-FIG-B4'
  },
  'B.5': {
    id: 'B.5',
    figureNumber: 'Fig.B.5',
    annexGroup: 'Annex B',
    name: 'Male Luer Lock Connector with Floating Ring',
    gender: 'male',
    type: 'lock',
    description: 'Dimensional specifications for male Luer lock connector with floating ring collar.',
    descriptionZh: '旋轉套環式（Floating Ring Collar）公魯爾鎖定接頭 CAD 尺寸圖，螺紋套環可自由旋轉，防止管路在鎖緊過程中扭曲。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6'],
    isWorstCase: false,
    worstCaseReasonZh: '獨立旋轉套環避免管路絞纏，常用於三通閥、留置針及延長管路。',
    svgHighlights: [
      { title: '套環結構', value: '獨立 360° 旋轉套環' },
      { title: '螺距 Pitch', value: '2.5 mm' },
      { title: '主要功能', value: '防管路扭曲 (Anti-Torsion)' }
    ],
    svgKey: 'ISO7-FIG-B5'
  },
  'B.6': {
    id: 'B.6',
    figureNumber: 'Fig.B.6',
    annexGroup: 'Annex B',
    name: 'Female Luer Lock Connector Dimensional Envelope',
    gender: 'female',
    type: 'lock',
    description: 'Dimensional envelope boundary for female Luer lock connector.',
    descriptionZh: '母魯爾鎖定接頭包絡面（Dimensional Envelope）極限幾何圖，界定外形最大邊界，用於 3D CAD 空間干涉與非互換性模擬。',
    intendedClauses: [],
    isWorstCase: false,
    worstCaseReasonZh: '提供整體包絡面極限尺寸，確保周邊結構不會干擾魯爾旋合對接。',
    svgHighlights: [
      { title: '包絡直徑', value: 'Ø7.80 mm (最大外界)' },
      { title: '用途', value: '3D CAD 防干涉評估 (Annex D)' }
    ],
    svgKey: 'ISO7-FIG-B6'
  },
  'C.1': {
    id: 'C.1',
    figureNumber: 'Fig.C.1',
    annexGroup: 'Annex C',
    name: 'Female Reference Luer Lock (Nominal)',
    gender: 'female',
    type: 'lock',
    tabWidthMm: 3.50,
    backFlankAngleDeg: 25,
    description: 'Female reference connector with 3.50 mm nominal tab width for general functional tests.',
    descriptionZh: '標準母魯爾鎖定金屬參考接頭 (Fig.C.1)，具備 3.50 mm 標稱寬度凸耳，用於 6.1/6.2 洩漏、6.3 應力龜裂及 6.5 抗旋鬆測試。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.5'],
    isWorstCase: false,
    worstCaseReasonZh: '採用標準 3.50 mm 寬度耳翼，接觸面積大、應力分佈均勻，用於提供穩定氣密配合面，避免人為干擾氣密性評估。',
    svgHighlights: [
      { title: '耳翼寬度 (Tab Width)', value: '3.50 mm' },
      { title: '背側角度 (Flank Angle)', value: '25°' },
      { title: '適用受測物', value: '公魯爾鎖定 (Male Lock)' }
    ],
    svgKey: 'ISO7-FIG-C1'
  },
  'C.2': {
    id: 'C.2',
    figureNumber: 'Fig.C.2',
    annexGroup: 'Annex C',
    name: 'Male Reference Luer Slip',
    gender: 'male',
    type: 'slip',
    description: 'Male 6% taper reference connector for female Luer slip testing.',
    descriptionZh: '公魯爾滑動式（Slip）參考接頭 (Fig.C.2)，專門用於測試母滑動接頭（Female Slip, L1）的密封性與拉拔力。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4'],
    isWorstCase: false,
    worstCaseReasonZh: '標準 6% 圓錐接頭，不具備旋緊鎖定螺紋，僅用於滑動錐面配合。',
    svgHighlights: [
      { title: '錐度 (Taper)', value: '6% (1:16.667)' },
      { title: '適用受測物', value: '母魯爾滑動 (Female Slip)' }
    ],
    svgKey: 'ISO7-FIG-C2'
  },
  'C.3': {
    id: 'C.3',
    figureNumber: 'Fig.C.3',
    annexGroup: 'Annex C',
    name: 'Female Reference Luer Lock (Worst-Case)',
    gender: 'female',
    type: 'lock',
    tabWidthMm: 2.71,
    backFlankAngleDeg: 30,
    description: 'Female reference connector with narrowed 2.71 mm tab width and 30° flank angle for worst-case mechanical testing.',
    descriptionZh: '最壞情況母參考接頭 (Fig.C.3)，耳翼寬度大幅縮窄至 2.71 mm（接觸面積少 22%），背角加大至 30°。專用於 6.4 抗拉拔與 6.6 抗過旋（滑牙）測試。',
    intendedClauses: ['6.4', '6.6'],
    isWorstCase: true,
    worstCaseReasonZh: '模擬臨床極端最劣配合配件（最小材料條件 LMC）。極窄的 2.71 mm 耳翼會產生高度集中的剪切力與徑向膨脹力，是驗證機械強度的最嚴苛考驗！',
    svgHighlights: [
      { title: '耳翼寬度 (Tab Width)', value: '2.71 mm (縮窄 22%)' },
      { title: '背側角度 (Flank Angle)', value: '30° (外撐力更大)' },
      { title: '特徵結構', value: '僅 2 顆對稱耳翼 ("ears")' }
    ],
    svgKey: 'ISO7-FIG-C3'
  },
  'C.4': {
    id: 'C.4',
    figureNumber: 'Fig.C.4',
    annexGroup: 'Annex C',
    name: 'Male Reference Luer Lock (Nominal)',
    gender: 'male',
    type: 'lock',
    description: 'Male reference connector with nominal threads for female Luer lock testing.',
    descriptionZh: '標準公魯爾鎖定金屬參考接頭 (Fig.C.4)，用於測試母魯爾鎖定產品（Female Lock）的 6.1/6.2 洩漏、6.3 應力龜裂與 6.5 抗旋鬆性能。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.5'],
    isWorstCase: false,
    worstCaseReasonZh: '具備標準公螺紋，提供均勻穩定的旋合介面。',
    svgHighlights: [
      { title: '外螺紋 (Thread)', value: '標稱全螺紋/雙線螺紋' },
      { title: '適用受測物', value: '母魯爾鎖定 (Female Lock)' }
    ],
    svgKey: 'ISO7-FIG-C4'
  },
  'C.5': {
    id: 'C.5',
    figureNumber: 'Fig.C.5',
    annexGroup: 'Annex C',
    name: 'Female Reference Luer Slip',
    gender: 'female',
    type: 'slip',
    description: 'Female 6% taper reference connector for male Luer slip testing.',
    descriptionZh: '母魯爾滑動式（Slip）參考接頭 (Fig.C.5)，專門用於測試公滑動接頭（Male Slip, L1）。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4'],
    isWorstCase: false,
    worstCaseReasonZh: '標準母錐面金屬接頭，無螺紋。',
    svgHighlights: [
      { title: '錐度 (Taper)', value: '6% 內錐面' },
      { title: '適用受測物', value: '公魯爾滑動 (Male Slip)' }
    ],
    svgKey: 'ISO7-FIG-C5'
  },
  'C.6': {
    id: 'C.6',
    figureNumber: 'Fig.C.6',
    annexGroup: 'Annex C',
    name: 'Male Reference Luer Lock (Worst-Case)',
    gender: 'male',
    type: 'lock',
    description: 'Male reference connector with worst-case thread profile for female mechanical testing.',
    descriptionZh: '最壞情況公參考接頭 (Fig.C.6)，具備最大極限錐度與最薄螺牙特徵，用於測試母魯爾鎖定產品的 6.4 拉拔與 6.6 過旋性能。',
    intendedClauses: ['6.4', '6.6'],
    isWorstCase: true,
    worstCaseReasonZh: '專為考驗母接頭外側螺紋或耳翼強度設計的最壞幾何配合件。',
    svgHighlights: [
      { title: '螺紋特徵', value: '最壞情況極限牙型' },
      { title: '適用受測物', value: '母魯爾鎖定 (Female Lock)' }
    ],
    svgKey: 'ISO7-FIG-C6'
  },
  'ISO20-B.1': {
    id: 'ISO20-B.1',
    figureNumber: 'Fig.B.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Pressure Decay Positive Pressure Air Leakage Apparatus',
    nameZh: '壓降法正壓氣體洩漏測試裝置圖',
    description: 'ISO 80369-20 Annex B apparatus schema for pressure decay positive pressure air leakage test (300~330 kPa).',
    descriptionZh: 'ISO 80369-20 Annex B 氣壓衰減洩漏試驗架構圖，包含 300~330 kPa 壓力源、調壓閥、±0.3% 精度傳感器與參考夾具。',
    intendedClauses: ['6.1'],
    isWorstCase: false,
    worstCaseReasonZh: '規範正壓氣壓衰減量測法，確保洩漏率不超過 0.005 Pa·m³/s。',
    svgHighlights: [
      { title: '測試壓力', value: '300 ~ 330 kPa' },
      { title: '感測器精度', value: '±0.3%' },
      { title: '持壓時間', value: '15 ~ 20 秒' }
    ],
    svgKey: 'ISO20-FIG-B1'
  },
  'ISO20-C.1': {
    id: 'ISO20-C.1',
    figureNumber: 'Fig.C.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Falling Drop Liquid Leakage Test Apparatus',
    nameZh: '水滴法正壓液體洩漏測試裝置圖',
    description: 'ISO 80369-20 Annex C liquid leakage apparatus using de-aerated water and paper drop inspection under 300~330 kPa.',
    descriptionZh: 'ISO 80369-20 Annex C 水壓滴落測試裝置圖，以去離子水填充，300~330 kPa 持壓 30~35 秒，乾燥紙檢驗有無水滴滴落。',
    intendedClauses: ['6.1'],
    isWorstCase: false,
    worstCaseReasonZh: '目視水滴法水壓測試裝置標準圖。',
    svgHighlights: [
      { title: '測試介質', value: '去離子水 (De-aerated Water)' },
      { title: '持壓時間', value: '30 ~ 35 秒' },
      { title: '檢測基準', value: '無水滴擴散' }
    ],
    svgKey: 'ISO20-FIG-C1'
  },
  'ISO20-D.1': {
    id: 'ISO20-D.1',
    figureNumber: 'Fig.D.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Sub-atmospheric Vacuum Decay Leakage Test Apparatus',
    nameZh: '負壓真空衰減空氣洩漏測試裝置圖',
    description: 'ISO 80369-20 Annex D vacuum leakage setup under 80.0~88.0 kPa sub-atmospheric vacuum.',
    descriptionZh: 'ISO 80369-20 Annex D 真空衰減法測試裝置圖，抽真空至 80~88 kPa 保持 15~20 秒，驗證無外界空氣吸入。',
    intendedClauses: ['6.2'],
    isWorstCase: false,
    worstCaseReasonZh: '模擬抽吸負壓環境，預防靜脈空氣栓塞風險。',
    svgHighlights: [
      { title: '負壓範圍', value: '80.0 ~ 88.0 kPa' },
      { title: '洩漏極限', value: '≤ 0.005 Pa·m³/s' },
      { title: '持壓時間', value: '15 ~ 20 秒' }
    ],
    svgKey: 'ISO20-FIG-D1'
  },
  'ISO20-E.1': {
    id: 'ISO20-E.1',
    figureNumber: 'Fig.E.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: '70% IPA Chemical Solvent Stress Cracking Test Setup',
    nameZh: '70% 異丙醇溶劑應力龜裂試驗圖',
    description: 'ISO 80369-20 Annex E environmental stress cracking test setup under 48-hour solvent immersion.',
    descriptionZh: 'ISO 80369-20 Annex E 試驗圖，受測組件浸泡於 70% IPA 酒精溶劑中靜置 48 小時，檢視高分子鏈龜裂。',
    intendedClauses: ['6.3'],
    isWorstCase: false,
    worstCaseReasonZh: '驗證高應力區在消毒劑浸泡下之抗龜裂 (ESCR) 能力。',
    svgHighlights: [
      { title: '浸泡介質', value: '70% IPA 異丙醇' },
      { title: '靜置時間', value: '≥ 48 小時' },
      { title: '溫度範圍', value: '20°C ~ 30°C' }
    ],
    svgKey: 'ISO20-FIG-E1'
  },
  'ISO20-F.1': {
    id: 'ISO20-F.1',
    figureNumber: 'Fig.F.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Axial Load Pull-off Separation Test Apparatus',
    nameZh: '萬能拉力機軸向拉拔分離測試裝置圖',
    description: 'ISO 80369-20 Annex F axial tension apparatus (35N Lock / 25N Slip).',
    descriptionZh: 'ISO 80369-20 Annex F 萬能材料試驗機軸向拉拔示意圖，施加 35 N (Lock) 或 25 N (Slip) 持壓 10~15 秒。',
    intendedClauses: ['6.4'],
    isWorstCase: false,
    worstCaseReasonZh: '驗證強拉力下螺紋與錐面之抗脫離能力。',
    svgHighlights: [
      { title: '鎖定型拉力', value: '35 N (10~15秒)' },
      { title: '滑動型拉力', value: '25 N (10~15秒)' },
      { title: '加載速率', value: '10 N/s' }
    ],
    svgKey: 'ISO20-FIG-F1'
  },
  'ISO20-G.1': {
    id: 'ISO20-G.1',
    figureNumber: 'Fig.G.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Unscrewing Torque Separation Apparatus',
    nameZh: '反向旋鬆扭矩與拆卸力雙軌測試示意圖',
    description: 'ISO 80369-20 Annex G & Annex I reverse unscrewing torque (0.02 N·m) test rig.',
    descriptionZh: 'ISO 80369-20 Annex G (0.02 N·m 反向旋鬆持壓) 與 Annex I (拆卸扭矩) 雙軌試驗機構圖。',
    intendedClauses: ['6.5'],
    isWorstCase: false,
    worstCaseReasonZh: '考驗 6% 錐面摩擦自鎖性，防止震動自動鬆脫。',
    svgHighlights: [
      { title: 'Annex G 反旋力', value: '0.018 ~ 0.020 N·m' },
      { title: 'Annex I 拆卸峰值', value: '靜置 10~15 分鐘後量測' }
    ],
    svgKey: 'ISO20-FIG-G1'
  },
  'ISO20-H.1': {
    id: 'ISO20-H.1',
    figureNumber: 'Fig.H.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Resistance to Overriding Torque Test Rig',
    nameZh: '抗過載滑牙測試機台與環向應力機構圖',
    description: 'ISO 80369-20 Annex H overriding torque test rig (0.15~0.17 N·m) paired with C.3 worst-case fixture.',
    descriptionZh: 'ISO 80369-20 Annex H 破壞性高扭矩 (0.15~0.17 N·m) 伺服電機驅動測試機台，展現套環環向張應力膨脹機制。',
    intendedClauses: ['6.6'],
    isWorstCase: true,
    worstCaseReasonZh: '配合 Fig.C.3 縮窄耳翼極限考驗公套環抗過鎖滑牙強度。',
    svgHighlights: [
      { title: '過載扭矩', value: '0.15 ~ 0.17 N·m' },
      { title: '伺服轉速', value: '3.0 ± 0.5 rpm' },
      { title: '最壞夾具', value: 'Fig.C.3 (2.71mm 耳翼)' }
    ],
    svgKey: 'ISO20-FIG-H1'
  },
  'ISO20-J.1': {
    id: 'ISO20-J.1',
    figureNumber: 'Fig.J.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Standard Pre-assembly Torque & Thrust Rig',
    nameZh: '標準預裝配定扭矩起子與軸推力機構圖',
    description: 'ISO 80369-20 pre-assembly standard procedure driver with 0.08~0.12 N·m torque and 27.5 N axial push.',
    descriptionZh: 'ISO 80369-20 通用標準預裝配裝置圖，結合 0.08~0.12 N·m 扭矩與 26.5~27.5 N 軸向推力，保持 5~6 秒。',
    intendedClauses: ['6.1', '6.2', '6.3', '6.4', '6.5'],
    isWorstCase: false,
    worstCaseReasonZh: '所有物理性能測試前之標準預裝配作業基準。',
    svgHighlights: [
      { title: '預裝配扭矩', value: '0.08 ~ 0.12 N·m' },
      { title: '預裝配軸推力', value: '26.5 ~ 27.5 N' },
      { title: '保持時間', value: '5 ~ 6 秒' }
    ],
    svgKey: 'ISO20-FIG-J1'
  },
  'ISO20-K.1': {
    id: 'ISO20-K.1',
    figureNumber: 'Fig.K.1 (ISO 20)',
    standardOwner: 'ISO 80369-20',
    annexGroup: 'ISO 80369-20',
    name: 'Submerged Air Leakage During Aspiration Test Setup',
    nameZh: '抽吸過程水下氣泡法氣密測試裝置圖',
    description: 'ISO 80369-20:2024 Annex K underwater bubble stream inspection under 80~88 kPa vacuum aspiration.',
    descriptionZh: 'ISO 80369-20:2024 最新 Annex K 抽吸試驗，組件沉浸於水槽底層，上方抽真空 80~88 kPa 觀察連續氣泡流。',
    intendedClauses: ['6.2'],
    isWorstCase: false,
    worstCaseReasonZh: '目視水下氣泡流法負壓氣密檢驗裝置。',
    svgHighlights: [
      { title: '測試方法', value: '水下沉浸目視氣泡法' },
      { title: '負壓範圍', value: '80.0 ~ 88.0 kPa' },
      { title: '合格標準', value: '無連續產生氣泡流' }
    ],
    svgKey: 'ISO20-FIG-K1'
  },
  'SML': {
    id: 'SML',
    figureNumber: 'Non-Standard SML',
    standardOwner: 'Commercial',
    annexGroup: 'Commercial',
    name: 'Full-Thread SML Connector (Commercial Non-Standard)',
    gender: 'female',
    type: 'lock',
    description: 'Commercial 360° full-threading connector (non-compliant for ISO 80369-7 certification).',
    descriptionZh: '商業級 360° 全螺紋連接器（非 ISO 80369-7 認可之參考接頭）。應力均勻分佈，極易通過測試，但不能用於法規申報驗證！',
    intendedClauses: [],
    isWorstCase: false,
    worstCaseReasonZh: '360° 連續螺紋分散了剪切應力，完全避開了標準 Fig.C.3 接頭「雙耳翼點狀應力集中」的考驗。用此接頭 Passing 不具法規效益！',
    svgHighlights: [
      { title: '螺紋結構', value: '360° 全周螺紋' },
      { title: '法規效力', value: '❌ 不被 FDA / TFDA 認可' }
    ],
    svgKey: 'ISO7-FIG-SML'
  }
};

export const PLASTIC_MATERIALS: PlasticMaterial[] = [
  {
    id: 'pc',
    name: 'Polycarbonate (PC) 聚碳酸酯',
    flexuralModulusMpa: 2400,
    yieldStrengthMpa: 65,
    creepResistanceScore: 'Very High',
    recommendationZh: '首選推薦！高彈性模數能極佳地抵抗 0.17 N·m 扭矩產生的套環徑向膨脹（Hoop Expansion），能完美通過 6.6 節 C.3 接頭過旋測試。'
  },
  {
    id: 'tritan',
    name: 'Eastman Tritan™ 共聚酯',
    flexuralModulusMpa: 2100,
    yieldStrengthMpa: 55,
    creepResistanceScore: 'High',
    recommendationZh: '優良推薦。兼具極佳耐化學性（抗酒精）與高剛性，在 6.3 應力龜裂與 6.6 抗過旋測試中均有優異表現。'
  },
  {
    id: 'abs',
    name: 'ABS 樹脂',
    flexuralModulusMpa: 2200,
    yieldStrengthMpa: 50,
    creepResistanceScore: 'High',
    recommendationZh: '良好的醫療級選擇，剛性佳，適合與硬質管路結合。'
  },
  {
    id: 'san',
    name: 'SAN (AS 樹脂)',
    flexuralModulusMpa: 3400,
    yieldStrengthMpa: 70,
    creepResistanceScore: 'Very High',
    recommendationZh: '剛性極高（模數 > 3400 MPa，屬於剛性材料），絕不滑牙，但較脆，需注意衝擊韌性。'
  },
  {
    id: 'pp-rigid',
    name: 'PP (High-Rigidity Polypropylene) 硬質聚丙烯',
    flexuralModulusMpa: 1400,
    yieldStrengthMpa: 38,
    creepResistanceScore: 'Medium',
    recommendationZh: '臨界可接受。需適度加厚套環壁厚（> 1.4mm）並增加加強肋，否則在 0.17 N·m 下容易發生微幅蠕變外撐。'
  },
  {
    id: 'pp-standard',
    name: 'PP (Standard Polypropylene) 標準聚丙烯',
    flexuralModulusMpa: 1000,
    yieldStrengthMpa: 30,
    creepResistanceScore: 'Low',
    recommendationZh: '高風險！彈性模數偏低（< 1200 MPa），在 0.15–0.17 N·m 扭力下容易因環向應力而膨脹外撐，於 5–10 秒內發生 C.3 窄耳翼滑脫（Override）。'
  },
  {
    id: 'pe-ldpe',
    name: 'LDPE 低密度聚乙烯',
    flexuralModulusMpa: 300,
    yieldStrengthMpa: 12,
    creepResistanceScore: 'Low',
    recommendationZh: '嚴禁用於 L2 鎖定套環！材質過軟，無法承受 32N 軸向力或 0.15 N·m 扭矩。'
  }
];

export const FAILURE_MODES: FailureModeInfo[] = [
  {
    id: 'hoop-expansion',
    title: 'Sliding Wedge & Hoop Stress Radial Expansion',
    titleZh: '1. 斜面楔力與套環徑向膨脹',
    subtitleZh: '扭矩轉化為橫向外推力，將塑膠套環像橡皮筋一樣撐大',
    iconName: 'Maximize2',
    mechanismZh: '旋緊扭矩（0.15–0.17 N·m）經由螺紋 25°–30° 斜面轉化為強大的徑向外推力（Radial Force）。此力產生高達 20–40 MPa 的環向應力（Hoop Stress），迫使塑膠公套環（Collar）向外直徑膨脹。',
    visualMetaphorZh: '就像用力將木楔子打入竹圈中，木楔的斜面會強行把外層竹圈撐大外擴。',
    keyFormulaZh: 'σ_hoop = (P_radial × d_inner) / (2 × t_wall)',
    countermeasuresZh: [
      '改用彈性模數 > 2000 MPa 之高剛性材料（如 PC、Tritan、SAN）',
      '增加公套環外壁厚度（將外徑 Øw 加大 0.2–0.4 mm）',
      '螺紋承載面角度（σ）嚴格控制在直立的 25°，減少徑向分力'
    ]
  },
  {
    id: 'overlap-collapse',
    title: 'Geometric Overlap Depth Collapse (h -> 0)',
    titleZh: '2. 嚙合深度幾何塌陷',
    subtitleZh: '套環外擴導致金屬耳翼與塑膠螺牙的咬合面積歸零',
    iconName: 'Layers',
    mechanismZh: '當套環受力膨脹時，公接頭螺牙與母耳翼（Lug）之間的垂直咬合高度（h）直線下降。一旦膨脹量超過螺牙高度，2.71 mm 的 C.3 金屬耳翼就會直接錯開螺牙屏障，瞬間發生 Override。',
    visualMetaphorZh: '就像兩台擦身而過的火車，當外側軌道向外移開 10 公分時，車頂遮雨棚的交疊面積瞬間歸零而脫軌。',
    keyFormulaZh: 'h_effective = h_nominal - Δr_expansion',
    countermeasuresZh: [
      '精密控制射出成型縮水率，確保螺牙標稱高度處於上限',
      '縮小套環與內部錐面之間的空隙，阻斷過度膨脹空間',
      '消除螺牙頂角的倒角（Chamfer），保持銳利垂直咬合面'
    ]
  },
  {
    id: 'cantilever-bending',
    title: 'Thread Crest Cantilever Beam Bending & Creep',
    titleZh: '3. 螺牙懸臂樑彎曲與塑膠蠕變',
    subtitleZh: '高分子塑料在 5–10 秒內隨時間產生剪切屈服與流動',
    iconName: 'TrendingDown',
    mechanismZh: 'C.3 接頭的 2.71 mm 窄耳翼使受力點極度集中。塑膠螺牙可視為懸臂樑，在持續 5–10 秒的 0.17 N·m 負載下，高分子鏈發生蠕變（Creep）與局部屈服，螺牙頂部被壓扁塑性變形。',
    visualMetaphorZh: '就像站在游泳池畔的彈性跳板邊緣，重壓下跳板彎曲向下傾斜，原本擋住耳翼的垂直面退化成下滑斜坡。',
    keyFormulaZh: 'ε(t) = σ / E + C × t^n (Viscoelastic Creep Model)',
    countermeasuresZh: [
      '選用 creep resistance 評分高之材料',
      '控制測試環境溫度（高溫會加速塑膠蠕變）',
      '確保模具無分模線毛邊或局部位移，防止局部應力集中'
    ]
  },
  {
    id: 'tport-ovalization',
    title: 'T-Port Asymmetrical Stiffness & Ovalization',
    titleZh: '4. T-Port 結構不對稱性與套環橢圓化',
    subtitleZh: '三通分叉處極硬，無支撐側極軟，受力時圓套筒退化為橢圓',
    iconName: 'CircleDot',
    mechanismZh: 'T-Port（三通閥）或 Stopcock 在分叉管路側具有極高的結構剛性，但在無分叉側剛性較弱。旋轉扭力下，套環不會均勻變大，而是被撐成「橢圓形」。當耳翼旋轉至橢圓長軸側時瞬間滑脫。',
    visualMetaphorZh: '像是一個一側被焊死的圓套筒，內部加壓時圓筒不會變大圓，而是向兩側軟弱處鼓起成橢圓。',
    keyFormulaZh: 'K_asymmetric = K_stiff / K_soft >> 1.0',
    countermeasuresZh: [
      '在 T-Port 套環無分叉側根部設計外加強肋（Stiffening Ribs）',
      '平衡模具射出澆口（Gate）位置，避免套環產生合模線（Weld Line）弱點',
      '確保套環與內錐體的同心度（Concentricity）< 0.03 mm'
    ]
  }
];
