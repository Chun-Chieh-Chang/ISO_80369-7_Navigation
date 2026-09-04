import React, { useState } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ISO_CLAUSES } from '../data/isoData';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { getClauseSvgKey, getAnnexCFigure } from '../utils/isoHelpers';
import { useLanguage } from '../i18n/LanguageContext';
import { Table, Search, Download, Filter, Info, CheckCircle2, AlertTriangle, ArrowUpDown, ChevronDown, ChevronUp, Eye, Sparkles } from 'lucide-react';

export const ClauseComparisonMatrix: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'lock' | 'slip'>('lock');

  // Dynamically derive clausesList from Single Source of Truth (ISO_CLAUSES & STANDARD_CLAUSE_DETAILS)
  const clausesList = React.useMemo(() => {
    const clause5Detail = STANDARD_CLAUSE_DETAILS['iso7-clause-5'];
    const c61Data = ISO_CLAUSES['6.1'];
    const c61Detail = STANDARD_CLAUSE_DETAILS['iso7-6.1'];
    const c62Data = ISO_CLAUSES['6.2'];
    const c62Detail = STANDARD_CLAUSE_DETAILS['iso7-6.2'];
    const c63Data = ISO_CLAUSES['6.3'];
    const c63Detail = STANDARD_CLAUSE_DETAILS['iso7-6.3'];
    const c64Data = ISO_CLAUSES['6.4'];
    const c64Detail = STANDARD_CLAUSE_DETAILS['iso7-6.4'];
    const c65Data = ISO_CLAUSES['6.5'];
    const c65Detail = STANDARD_CLAUSE_DETAILS['iso7-6.5'];
    const c66Data = ISO_CLAUSES['6.6'];
    const c66Detail = STANDARD_CLAUSE_DETAILS['iso7-6.6'];

    const isEn = language === 'en';
    return [
      {
        id: 'Clause 1',
        title: isEn ? 'Clause 1 Scope' : 'Clause 1 適用範圍 (Scope)',
        iso7: 'Clause 1',
        iso20: 'Clause 1',
        category: 'general',
        categoryZh: isEn ? 'General' : '一般',
        type: isEn ? 'All Connectors' : '所有接頭',
        assemblyTorque: '-',
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: '-',
        fixture: isEn ? 'Regulatory Scope Matrix' : '法規審查對照表',
        criteria: isEn 
          ? 'Specifies small-bore connectors intended for use in intravascular or subcutaneous applications'
          : '明確界定適用於血管（Intravascular）或皮下（Subcutaneous）注射/輸液設備之小口徑魯爾連接器範疇',
        risk: isEn ? 'Misclassification of intended use leads to regulatory rejection' : '產品預期用途劃分錯誤致審查退件'
      },
      {
        id: 'Clause 2',
        title: isEn ? 'Clause 2 Normative References' : 'Clause 2 規範性引用文件 (Normative References)',
        iso7: 'Clause 2',
        iso20: 'Clause 2',
        category: 'general',
        categoryZh: isEn ? 'General' : '一般',
        type: isEn ? 'All Connectors' : '所有接頭',
        assemblyTorque: '-',
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: '-',
        fixture: isEn ? 'Standards Traceability Register' : '標準追溯文件',
        criteria: isEn
          ? 'Mandatory reference to ISO 80369-1 (general requirements) and ISO 80369-20 (test methods)'
          : '強制引用 ISO 80369-1 (通用防錯要求) 與 ISO 80369-20 (通用測試方法) 規範版本',
        risk: isEn ? 'Citing superseded ISO 594 legacy standards' : '引用被廢止之舊版 ISO 594 標準'
      },
      {
        id: 'Clause 3',
        title: isEn ? 'Clause 3 Terms & Definitions' : 'Clause 3 術語與定義 (Terms & Definitions)',
        iso7: 'Clause 3',
        iso20: 'Clause 3',
        category: 'general',
        categoryZh: isEn ? 'General' : '一般',
        type: isEn ? 'All Connectors' : '所有接頭',
        assemblyTorque: '-',
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: '-',
        fixture: isEn ? 'DHF Nomenclature Glossary' : 'DHF 專有名詞對照表',
        criteria: isEn
          ? 'Precise definitions for Luer connector, Luer slip, Luer lock, reference connector, leak rate'
          : '精確定義 Luer connector、Luer slip、Luer lock、Reference connector、Leak rate 等法規專有名詞',
        risk: isEn ? 'Inconsistent nomenclature causing regulatory RFIs' : '圖面名詞與國際標準歧異導致審查補件'
      },
      {
        id: 'Clause 4',
        title: isEn ? 'Clause 4 General & Pre-assembly Procedure' : 'Clause 4 通用要求與預裝配程序 (General & Pre-assembly)',
        iso7: 'Clause 4',
        iso20: 'Clause 4 & General Procedure',
        category: 'assembly',
        categoryZh: isEn ? 'Assembly' : '裝配',
        type: isEn ? 'Lock & Slip' : 'Lock & Slip',
        assemblyTorque: isEn ? '0.08–0.12 N·m + 26.5–27.5 N, hold 5–6 s then release' : '0.08–0.12 N·m + 26.5–27.5 N 推力，維持 5–6 秒後釋放',
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: isEn ? '5 – 6 s' : '5 – 6 秒',
        fixture: isEn ? 'Calibrated Torque Driver & Axial Force Mechanism' : '校正定扭矩起子 & 彈簧推力機構',
        criteria: isEn
          ? 'Mandatory standard pre-assembly: simultaneously apply 0.08–0.12 N·m torque and 26.5–27.5 N axial force for 5–6 s, then release all loads prior to test'
          : '性能測試前必須執行統一標準預裝配作業，旋合時須同時施加 0.08~0.12 N·m 扭矩與 26.5~27.5 N 軸向推力持壓 5~6s 確立 6% 錐面配合，然後完全釋放外力',
        risk: isEn ? 'Failure to perform quantitative pre-assembly causes false leakage' : '預裝配未定量加壓致使假洩漏或螺紋損傷'
      },
      {
        id: 'Clause 5',
        title: isEn ? 'Clause 5 Dimensional Requirements (6% Taper)' : 'Clause 5 幾何尺寸與 6% 圓錐度驗證 (Dimensional Requirements)',
        iso7: 'Clause 5 (Figures B.1~B.6)',
        iso20: isEn ? 'Annex A (Geometric Measurement)' : 'Annex A (幾何量測法)',
        category: 'dimensional',
        categoryZh: isEn ? 'Dimensions' : '尺寸',
        type: 'Lock & Slip',
        assemblyTorque: '-',
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: '-',
        fixture: isEn ? 'CMM / Optical Comparator / Gauges' : (clause5Detail?.fixtureRequiredZh || '三次元 CMM / 6% 光學投影儀 / 通止規'),
        criteria: isEn ? '6% (1:16.667) taper, engagement length >= 7.5mm, thread pitch 2.5mm' : (clause5Detail?.acceptanceCriteriaZh?.join('；') || '圓錐度 6% (1:16.667)、配合長度 ≥ 7.5mm、螺紋 Pitch 2.5mm'),
        risk: isEn ? 'Injection sinkage or taper deviation' : (clause5Detail?.commonNonConformancesZh?.join('；') || '射出保壓不足致錐度偏離 6% 或螺紋厚度超差')
      },
      {
        id: '6.1',
        title: isEn ? '6.1 Fluid Leakage (6.1.2 Decay vs 6.1.3 Liquid)' : '6.1 流體洩漏 (6.1.2 氣壓衰減法 vs 6.1.3 正壓液體法)',
        iso7: 'Clause 6.1',
        iso20: isEn ? 'Annex B (Pneumatic) / Annex C (Hydraulic)' : 'Annex B (氣壓) / Annex C (水壓)',
        category: c61Data?.category || 'leakage',
        categoryZh: isEn ? 'Leakage' : '洩漏',
        type: 'Lock & Slip',
        assemblyTorque: isEn ? `${c61Data?.assemblyTorqueNm.min}–${c61Data?.assemblyTorqueNm.max} N·m + ${c61Data?.assemblyAxialForceN?.min}–${c61Data?.assemblyAxialForceN?.max} N, hold 5–6 s then release` : `${c61Data?.assemblyTorqueNm.min}–${c61Data?.assemblyTorqueNm.max} N·m + ${c61Data?.assemblyAxialForceN?.min}–${c61Data?.assemblyAxialForceN?.max} N 推力，維持 5–6 秒後釋放`,
        testPressure: '300–330 kPa',
        testForce: '-',
        testTorque: '-',
        holdTime: isEn ? 'Decay (6.1.2): 15–20 s / Liquid (6.1.3): 30–35 s' : '氣壓法 (6.1.2): 15–20 秒　/　水壓法 (6.1.3): 30–35 秒（二選一）',
        fixture: isEn ? 'Fig. C.1/C.5 (Lock/Slip) or Fig. C.4/C.2 (Lock/Slip)' : 'Fig.C.1/C.5 (母鎖定/滑動) 或 Fig.C.4/C.2 (公鎖定/滑動)',
        criteria: isEn ? (c61Data?.passCriteria || 'Hydraulic (6.1.3): No falling drop of water over 30-35 s at 300-330 kPa. Pneumatic (6.1.2): Leakage rate <= 0.005 Pa*m3/s over 15-20 s at 300-330 kPa.') : (c61Data?.passCriteriaZh || '【正壓液體洩漏 (6.1.3 水壓法)】加壓 300~330 kPa 持壓 30~35s，目視無水滴滲漏滴落；【壓力衰減洩漏 (6.1.2 氣壓法)】加壓 300~330 kPa 持壓 15~20s 測 ΔP，洩漏率 ≤ 0.005 Pa·m³/s'),
        risk: isEn ? 'Molding flash or taper shrink deformation' : (c61Detail?.commonNonConformancesZh?.join('；') || '射出成型毛邊、6% 錐度縮水變形')
      },
      {
        id: '6.2',
        title: isEn ? '6.2 Sub-atmospheric Air Leakage (Vacuum)' : '6.2 負壓空氣洩漏 (Sub-atmospheric Air Leakage)',
        iso7: 'Clause 6.2',
        iso20: isEn ? 'Annex D (Vacuum Decay) / Annex K (Submerged Air Bubble)' : 'Annex D (負壓衰減) / Annex K (抽吸水下氣泡)',
        category: c62Data?.category || 'leakage',
        categoryZh: isEn ? 'Leakage' : '洩漏',
        type: 'Lock & Slip',
        assemblyTorque: isEn ? `${c62Data?.assemblyTorqueNm.min}–${c62Data?.assemblyTorqueNm.max} N·m + ${c62Data?.assemblyAxialForceN?.min}–${c62Data?.assemblyAxialForceN?.max} N, hold 5–6 s then release` : `${c62Data?.assemblyTorqueNm.min}–${c62Data?.assemblyTorqueNm.max} N·m + ${c62Data?.assemblyAxialForceN?.min}–${c62Data?.assemblyAxialForceN?.max} N 推力，維持 5–6 秒後釋放`,
        testPressure: isEn ? '80.0–88.0 kPa Vacuum' : '80.0–88.0 kPa 真空',
        testForce: '-',
        testTorque: '-',
        holdTime: isEn ? `${c62Data?.holdTimeSec.min}–${c62Data?.holdTimeSec.max} s` : `${c62Data?.holdTimeSec.min}–${c62Data?.holdTimeSec.max} 秒`,
        fixture: isEn ? 'Fig. C.1/C.5 (Lock/Slip) or Fig. C.4/C.2 (Lock/Slip)' : 'Fig.C.1/C.5 (母鎖定/滑動) 或 Fig.C.4/C.2 (公鎖定/滑動)',
        criteria: isEn ? (c62Data?.passCriteria || 'Shall not exceed a leakage rate of 0.005 Pa*m3/s over 15-20 s at 80.0-88.0 kPa vacuum (Annex D)') : (c62Data?.passCriteriaZh || '在 80.0 kPa–88.0 kPa 負壓真空下保持 15–20 秒，空氣洩漏率不超過 0.005 Pa·m³/s (Annex D)'),
        risk: isEn ? 'Micro-void formation during vacuum causing air embolism' : (c62Detail?.commonNonConformancesZh?.join('；') || '負壓時錐面微幅收縮脫離產生微氣孔致氣栓')
      },
      {
        id: '6.3',
        title: isEn ? '6.3 Stress Cracking (48h conditioning)' : '6.3 耐環境應力龜裂 (Stress Cracking)',
        iso7: 'Clause 6.3',
        iso20: isEn ? 'Annex E (48 h Assembly Hold)' : 'Annex E (裝配靜置 48h)',
        category: c63Data?.category || 'durability',
        categoryZh: isEn ? 'Durability' : '耐久',
        type: 'Lock & Slip',
        assemblyTorque: isEn ? `${c63Data?.assemblyTorqueNm.min}–${c63Data?.assemblyTorqueNm.max} N·m + ${c63Data?.assemblyAxialForceN?.min}–${c63Data?.assemblyAxialForceN?.max} N, hold 5–6 s then release` : `${c63Data?.assemblyTorqueNm.min}–${c63Data?.assemblyTorqueNm.max} N·m + ${c63Data?.assemblyAxialForceN?.min}–${c63Data?.assemblyAxialForceN?.max} N 推力，維持 5–6 秒後釋放`,
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: isEn ? '≥ 48 Hours' : '≥ 48 小時',
        fixture: isEn ? 'Fig. C.1/C.5 (Lock/Slip) or Fig. C.4/C.2 (Lock/Slip)' : 'Fig.C.1/C.5 (母鎖定/滑動) 或 Fig.C.4/C.2 (公鎖定/滑動)',
        criteria: isEn ? 'Meet the requirements of Clause 6.1.1 after 48 h assembly hold per ISO 80369-20 Annex E (No visual crack requirement in ISO standard)' : '依 6.1.1 執行洩漏測試並合格即可（法規無目視裂紋要求）',
        risk: isEn ? 'Residual injection stress causing delayed hoop cracking' : (c63Detail?.commonNonConformancesZh?.join('；') || 'PC/PMMA 材質射出殘留內應力高，受長效過盈應力作用發生爆裂')
      },
      {
        id: '6.4',
        title: isEn ? '6.4 Resistance to Separation from Axial Load' : '6.4 抗軸向負載分離 (Resistance to Separation from Axial Load)',
        iso7: 'Clause 6.4',
        iso20: 'Annex F',
        category: c64Data?.category || 'mechanical',
        categoryZh: isEn ? 'Mechanical' : '機械',
        type: `Lock (${c64Data?.testForceN?.max || 35}N) / Slip (${c64Data?.testForceN?.min || 23}N)`,
        assemblyTorque: isEn ? `${c64Data?.assemblyTorqueNm.min}–${c64Data?.assemblyTorqueNm.max} N·m + ${c64Data?.assemblyAxialForceN?.min}–${c64Data?.assemblyAxialForceN?.max} N, hold 5–6 s then release` : `${c64Data?.assemblyTorqueNm.min}–${c64Data?.assemblyTorqueNm.max} N·m + ${c64Data?.assemblyAxialForceN?.min}–${c64Data?.assemblyAxialForceN?.max} N 推力，維持 5–6 秒後釋放`,
        testPressure: '-',
        testForce: selectedType === 'slip' ? '23–25 N (Slip/L1)' : '32–35 N (Lock/L2)',
        testTorque: '-',
        holdTime: isEn ? `${c64Data?.holdTimeSec.min}–${c64Data?.holdTimeSec.max} s` : `${c64Data?.holdTimeSec.min}–${c64Data?.holdTimeSec.max} 秒`,
        fixture: isEn ? 'Fig. C.3/C.5 (Lock worst-case / Slip) or Fig. C.6/C.2 (Lock worst-case / Slip)' : 'Fig.C.3/C.5 (母鎖定最壞/滑動) 或 Fig.C.6/C.2 (公鎖定最壞/滑動)',
        criteria: isEn ? (c64Data?.passCriteria || 'Shall remain assembled without separation while subjected to axial load for 10-15 s.') : (c64Data?.passCriteriaZh || '在 23 N–25 N（Slip/L1）或 32 N–35 N（Lock/L2）軸向拉力下維持 10–15 秒，接頭不得脫開分離'),
        risk: isEn ? 'Insufficient thread engagement depth leading to sheared lugs' : (c64Detail?.commonNonConformancesZh?.join('；') || '螺紋咬合深度不足，耳翼被直接剪切拉平')
      },
      {
        id: '6.5',
        title: isEn ? '6.5 Resistance to Separation from Unscrewing' : '6.5 抗旋鬆分離 (Resistance to Separation from Unscrewing)',
        iso7: 'Clause 6.5',
        iso20: isEn ? 'Annex G (Unscrewing) / Annex I (Removal Force)' : 'Annex G (反旋) / Annex I (拆卸力)',
        category: c65Data?.category || 'mechanical',
        categoryZh: isEn ? 'Mechanical' : '機械',
        type: 'Lock only',
        assemblyTorque: isEn ? `${c65Data?.assemblyTorqueNm.min}–${c65Data?.assemblyTorqueNm.max} N·m + ${c65Data?.assemblyAxialForceN?.min}–${c65Data?.assemblyAxialForceN?.max} N, hold 5–6 s then release` : `${c65Data?.assemblyTorqueNm.min}–${c65Data?.assemblyTorqueNm.max} N·m + ${c65Data?.assemblyAxialForceN?.min}–${c65Data?.assemblyAxialForceN?.max} N 推力，維持 5–6 秒後釋放`,
        testPressure: '-',
        testForce: '-',
        testTorque: `${c65Data?.testTorqueNm?.min || 0.018}–${c65Data?.testTorqueNm?.max || 0.020} N·m` + (isEn ? ' (Reverse)' : ' (反向)'),
        holdTime: isEn ? `${c65Data?.holdTimeSec.min}–${c65Data?.holdTimeSec.max} s` : `${c65Data?.holdTimeSec.min}–${c65Data?.holdTimeSec.max} 秒`,
        fixture: isEn ? 'Fig. C.1 (Female) / Fig. C.4 (Male)' : (c65Detail?.fixtureRequiredZh || 'Fig.C.1 (母) / Fig.C.4 (公)'),
        criteria: isEn ? (c65Data?.passCriteria || 'Shall not separate from the reference connector when subjected to an unscrewing torque of between 0.018 N·m and 0.020 N·m for 10–15 s.') : (c65Data?.passCriteriaZh || '裝配後施加 0.018 N·m–0.020 N·m 的反向旋鬆扭矩維持 10–15 秒，接頭不得自行旋鬆脫開'),
        risk: isEn ? 'Excessive mold release agents causing self-loosening' : (c65Detail?.commonNonConformancesZh?.join('；') || '材料表面太滑（脫模劑/潤滑劑過量）致自鎖失敗')
      },
      {
        id: '6.6',
        title: isEn ? '6.6 Resistance to Overriding' : '6.6 抗過載滑牙測試 (Resistance to Overriding)',
        iso7: 'Clause 6.6',
        iso20: 'Annex H',
        category: c66Data?.category || 'mechanical',
        categoryZh: isEn ? 'Mechanical' : '機械',
        type: 'Lock only',
        assemblyTorque: isEn ? `${c66Data?.assemblyTorqueNm.min || 0.08}–${c66Data?.assemblyTorqueNm.max || 0.12} N·m + ${c66Data?.assemblyAxialForceN?.min || 26.5}–${c66Data?.assemblyAxialForceN?.max || 27.5} N, hold 5–6 s then release (ISO 80369-20 Annex H.4 a)` : `${c66Data?.assemblyTorqueNm.min || 0.08}–${c66Data?.assemblyTorqueNm.max || 0.12} N·m + ${c66Data?.assemblyAxialForceN?.min || 26.5}–${c66Data?.assemblyAxialForceN?.max || 27.5} N 推力，維持 5–6 秒後釋放`,
        testPressure: '-',
        testForce: '-',
        testTorque: `${c66Data?.testTorqueNm?.min || 0.15}–${c66Data?.testTorqueNm?.max || 0.17} N·m`,
        holdTime: isEn ? `${c66Data?.holdTimeSec.min}–${c66Data?.holdTimeSec.max} s` : `${c66Data?.holdTimeSec.min}–${c66Data?.holdTimeSec.max} 秒`,
        fixture: isEn ? 'Fig. C.3 (2.71mm narrow lug worst-case) / Fig. C.6' : (c66Detail?.fixtureRequiredZh || 'Fig.C.3 (2.71mm 窄耳翼最壞情況) / Fig.C.6'),
        criteria: isEn ? 'Threads/lugs shall not override reference connector and show no cocking under 0.15–0.17 N·m torque for 5–10 s (ISO 80369-20 Annex H.4 d)' : `${c66Data?.passCriteriaZh || '施加 0.15 N·m–0.17 N·m 破壞性扭矩維持 5–10 秒，螺紋或耳翼不得越過滑脫（不滑牙）'}，且接頭無歪斜 (No cocking)（ISO 80369-20 Annex H.4 d）`,
        risk: isEn ? 'Polymer hoop expansion leading to thread override' : (c66Detail?.commonNonConformancesZh?.join('；') || 'PP 等低剛性材料環向膨脹 (Hoop Expansion) 脫牙')
      },
      {
        id: 'Annex C',
        title: isEn ? 'Annex C Standard Reference Connectors' : 'Annex C 金屬標準參考連接器 (Reference Connectors)',
        iso7: 'Annex C (Figures C.1~C.6)',
        iso20: 'General Apparatus Section 4',
        category: 'assembly',
        categoryZh: isEn ? 'Fixtures' : '夾具',
        type: 'Fig.C.1 ~ Fig.C.6',
        assemblyTorque: '-',
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: '-',
        fixture: isEn ? 'Hardened SS (17-4PH >=45HRC, Stavax ESR, Ra <= 0.8um)' : '硬化不鏽鋼參考夾具 (ISO: Hardened SS / 實務: 17-4PH ≥45HRC 或 316氮化)',
        criteria: isEn ? 'Complies with ISO 80369-7 Annex C reference connectors; Fig. C.3 has 2.71mm worst-case lug' : '符合 ISO Annex C 精密金屬測試夾具 (硬化處理/Ra≤0.8μm)，Fig.C.3 具備 2.71mm 極限最壞情況耳翼',
        risk: isEn ? 'Failure to calibrate fixtures voids all verification data' : '未定期校正參考夾具尺寸導致全盤測試結果無效'
      },
      {
        id: 'Annex A/D/E',
        title: isEn ? 'Annex A / D / E Rationales, Non-interchangeability & Test Matrix' : 'Annex A / D / E 原理說明、防錯評估與測試總覽',
        iso7: 'Annex A, D, E',
        iso20: isEn ? 'Annex J (Revision History)' : 'Annex J (修訂歷史)',
        category: 'general',
        categoryZh: isEn ? 'General' : '一般',
        type: isEn ? 'All Connectors' : '所有接頭',
        assemblyTorque: '-',
        testPressure: '-',
        testForce: '-',
        testTorque: '-',
        holdTime: '-',
        fixture: isEn ? 'Regulatory Guidance & Standards Register' : '法規綜合說明文件',
        criteria: isEn ? 'Clinical rationales (Annex A), 3D non-interchangeability CAD evaluation (Annex D), and test matrix (Annex E)' : '提供測試參數臨床原理 (Annex A)、跨領域 3D 碰撞防誤接評估 (Annex D) 及完整測試矩陣 (Annex E)',
        risk: isEn ? 'Missing scientific justifications in risk management files' : '風險管理文件中漏引 Annex A 科學說明'
      }
    ];
  }, [selectedType, language]);

  const filteredClauses = clausesList.filter(c => {
    let matchesCat = false;
    if (filterType === 'all') {
      matchesCat = true;
    } else if (filterType === 'general') {
      matchesCat = c.category === 'general' || c.category === 'assembly' || c.id === 'Clause 4' || c.id === 'Clause 1' || c.id === 'Clause 2' || c.id === 'Clause 3';
    } else if (filterType === 'dimensional') {
      matchesCat = c.category === 'dimensional' || c.id === 'Annex C';
    } else if (filterType === 'leakage') {
      matchesCat = c.category === 'leakage';
    } else if (filterType === 'mechanical') {
      matchesCat = c.category === 'mechanical';
    } else if (filterType === 'durability') {
      matchesCat = c.category === 'durability' || c.category === 'crack';
    } else if (filterType === 'assembly') {
      matchesCat = c.category === 'assembly' || c.id === 'Clause 4' || c.id === 'Annex C';
    } else {
      matchesCat = c.category === filterType;
    }

    const q = searchTerm.toLowerCase();
    const matchesSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.iso7.toLowerCase().includes(q) ||
      c.iso20.toLowerCase().includes(q) ||
      c.criteria.toLowerCase().includes(q) ||
      c.fixture.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const exportCSV = () => {
    const headers = language === 'en'
      ? ['Clause', 'ISO 80369-7 Clause', 'ISO 80369-20 Annex', 'Type', 'Pre-assembly (Torque / Axial)', 'Test Load (Pressure/Force/Torque)', 'Hold Time', 'Reference Fixture', 'PASS Criteria']
      : ['條文號', 'ISO 80369-7 條文', 'ISO 80369-20 附錄', '適用類型', '預裝配條件 (扭矩 / 軸向推力)', '定量加載考驗 (壓力/拉力/扭矩)', '保持時間', '指定金屬夾具', '合格標準'];
    const rows = clausesList.map(c => [
      c.id,
      c.iso7,
      c.iso20,
      c.type,
      c.assemblyTorque,
      c.testPressure !== '-' ? c.testPressure : (c.testTorque !== '-' ? c.testTorque : c.testForce),
      c.holdTime,
      c.fixture,
      `"${c.criteria}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', language === 'en' ? 'ISO_80369_Comparison_Matrix.csv' : 'ISO_80369_條文對照矩陣.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[13px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                <Table className="w-4 h-4 text-emerald-600" />
                {t.comparisonMatrix.badge}
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {t.comparisonMatrix.title}
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 mt-1">
              {t.comparisonMatrix.subtitle}
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t.comparisonMatrix.exportCsv}</span>
          </button>
        </div>

        {/* Type filter for 6.4 L1/L2 differentiation */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-slate-500 font-semibold">{t.comparisonMatrix.filterTypeLabel}</span>
          <button
            onClick={() => setSelectedType('lock')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer min-h-[36px] flex items-center ${
              selectedType === 'lock' ? 'bg-blue-600 text-white shadow-xs font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.comparisonMatrix.filterLock}
          </button>
          <button
            onClick={() => setSelectedType('slip')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer min-h-[36px] flex items-center ${
              selectedType === 'slip' ? 'bg-blue-600 text-white shadow-xs font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.comparisonMatrix.filterSlip}
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100/80">
          <div className="flex flex-wrap items-center gap-1.5 py-1 w-full sm:w-auto">
            <span className="text-slate-400 font-semibold text-xs shrink-0">{t.comparisonMatrix.filterLabel}</span>
            {[
              { id: 'all', label: t.comparisonMatrix.catAll },
              { id: 'general', label: t.comparisonMatrix.catGeneral },
              { id: 'dimensional', label: t.comparisonMatrix.catDimensional },
              { id: 'leakage', label: t.comparisonMatrix.catLeakage },
              { id: 'mechanical', label: t.comparisonMatrix.catMechanical },
              { id: 'durability', label: t.comparisonMatrix.catEndurance },
              { id: 'assembly', label: t.comparisonMatrix.catFixtures }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 min-h-[36px] flex items-center ${
                  filterType === f.id ? 'bg-blue-600 text-white shadow-xs font-bold' : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.comparisonMatrix.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Dual Layout */}
      <div className="space-y-4 md:hidden">
          {filteredClauses.map((clause) => {
            const isExpanded = expandedClauseId === clause.id;
            const svgKey = getClauseSvgKey(clause.id);
            const figInfo = getAnnexCFigure(svgKey);

            return (
              <div
                key={clause.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 transition-all hover:border-slate-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-600 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-md shadow-2xs">
                        {clause.id}
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[12px] font-bold px-2 py-0.5 rounded-md border border-slate-200">
                        {clause.categoryZh}
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-1.5">
                      {clause.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setExpandedClauseId(isExpanded ? null : clause.id)}
                    className="p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold shrink-0 flex items-center space-x-1 border border-blue-200 cursor-pointer min-h-[36px]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isExpanded ? t.comparisonMatrix.collapseDiagram : t.comparisonMatrix.viewDiagram}</span>
                  </button>
                </div>

                {/* Standard Mapping Info */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">{language === 'en' ? 'ISO 80369-7 Clause:' : 'ISO 80369-7 條文:'}</span>
                    <strong className="text-blue-900">{clause.iso7}</strong>
                  </div>
                  <div className="bg-indigo-50/50 p-2 rounded-xl border border-indigo-100">
                    <span className="text-indigo-500 block text-[11px]">{language === 'en' ? 'ISO 80369-20 Annex:' : 'ISO 80369-20 附錄:'}</span>
                    <strong className="text-indigo-900">{clause.iso20}</strong>
                  </div>
                </div>

                {/* Parameter Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-blue-50/40 p-2.5 rounded-xl border border-blue-100/80">
                    <span className="font-bold text-blue-900 block text-[11px] mb-0.5">{language === 'en' ? 'Pre-assembly Condition:' : '預裝配前置條件:'}</span>
                    <span className="font-mono text-slate-800">{clause.assemblyTorque}</span>
                  </div>
                  <div className="bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/80">
                    <span className="font-bold text-indigo-900 block text-[11px] mb-0.5">{language === 'en' ? 'Applied Test Load:' : '實測考驗負載:'}</span>
                    <span className="font-mono text-slate-800">{clause.testPressure !== '-' ? (language === 'en' ? `Pressure ${clause.testPressure}` : `壓力 ${clause.testPressure}`) : clause.testForce !== '-' ? (language === 'en' ? `Force ${clause.testForce}` : `拉力 ${clause.testForce}`) : clause.testTorque !== '-' ? (language === 'en' ? `Torque ${clause.testTorque}` : `扭矩 ${clause.testTorque}`) : '-'}</span>
                  </div>
                  <div className="bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/80">
                    <span className="font-bold text-amber-900 block text-[11px] mb-0.5">{language === 'en' ? 'Hold Time & Fixture:' : '持壓時間 & 金屬夾具:'}</span>
                    <span className="text-slate-800">{clause.holdTime !== '-' ? (language === 'en' ? `Hold ${clause.holdTime}` : `持壓 ${clause.holdTime}`) : ''} ({clause.fixture})</span>
                  </div>
                </div>

                {/* Pass Criteria & Risk */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-start space-x-1.5 text-emerald-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-950 font-bold">{language === 'en' ? 'PASS Criteria:' : 'Pass 合格標準:'}</strong>
                      <span className="text-slate-700 leading-relaxed">{clause.criteria}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-1.5 text-rose-800 bg-rose-50/50 p-2.5 rounded-xl border border-rose-200/60">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-rose-950 font-bold">{language === 'en' ? 'Non-conformance Risk:' : '常見不合格風險:'}</strong>
                      <span className="text-slate-700 leading-relaxed">{clause.risk}</span>
                    </div>
                  </div>
                </div>

                {/* Inline SVG Figure Drawer for Mobile Card */}
                {isExpanded && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                        <Sparkles className="w-4 h-4 text-indigo-700" />
                        <span>{clause.title} — {language === 'en' ? 'Standard CAD Blueprint' : '規範圖解'}</span>
                      </div>
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                        <ISOStandardFigureRenderer
                          svgKey={svgKey}
                          titleZh={figInfo?.nameZh || clause.title}
                          titleEn={figInfo?.name || clause.iso7}
                          standard={figInfo?.standardOwner || `${clause.iso7} / ${clause.iso20}`}
                          figureTypeZh={figInfo?.annexGroup || (isEn ? 'Test Method Diagram' : '測試方法圖解')}
                          descriptionZh={figInfo?.descriptionZh || clause.criteria}
                          descriptionEn={figInfo?.description || clause.criteria}
                          keyCallouts={figInfo?.svgHighlights}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full Table View (Desktop >= 768px) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">{t.comparisonMatrix.colClause}</th>
                <th className="py-3 px-4 min-w-[160px]">{t.comparisonMatrix.colTestName}</th>
                <th className="py-3 px-4">{t.comparisonMatrix.colIso7}</th>
                <th className="py-3 px-4">{t.comparisonMatrix.colIso20}</th>
                <th className="py-3 px-4">
                  <div>{t.comparisonMatrix.colPreAssembly}</div>
                  <span className="text-[10px] text-blue-600 font-normal block normal-case">{t.comparisonMatrix.colPreAssemblySub}</span>
                </th>
                <th className="py-3 px-4">
                  <div>{t.comparisonMatrix.colTestLoad}</div>
                  <span className="text-[10px] text-indigo-700 font-normal block normal-case">{t.comparisonMatrix.colTestLoadSub}</span>
                </th>
                <th className="py-3 px-4">{t.comparisonMatrix.colHoldTime}</th>
                <th className="py-3 px-4 min-w-[150px]">{t.comparisonMatrix.colFixture}</th>
                <th className="py-3 px-4 min-w-[200px]">{t.comparisonMatrix.colCriteria}</th>
                <th className="py-3 px-4 w-28 text-center">{t.comparisonMatrix.colDiagram}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredClauses.map((clause) => {
                const isExpanded = expandedClauseId === clause.id;
                const svgKey = getClauseSvgKey(clause.id);
                const figInfo = getAnnexCFigure(svgKey);

                return (
                  <React.Fragment key={clause.id}>
                    <tr
                      onClick={() => setExpandedClauseId(isExpanded ? null : clause.id)}
                      className={`cursor-pointer transition ${isExpanded ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3 px-4 font-bold font-mono text-center text-blue-700 bg-slate-50/50">
                        {clause.id}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div>{clause.title}</div>
                        <span className="text-[11px] font-mono text-slate-400 font-normal block mt-0.5">
                          {clause.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-900 text-xs">
                        {clause.iso7}
                      </td>
                      <td className="py-3 px-4 font-mono text-indigo-900 text-xs font-semibold">
                        {clause.iso20}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-800">
                        {clause.assemblyTorque}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {clause.testPressure !== '-' && <span className="text-blue-600">{clause.testPressure}</span>}
                        {clause.testForce !== '-' && <span className="text-emerald-600">{clause.testForce}</span>}
                        {clause.testTorque !== '-' && <span className="text-amber-600">{clause.testTorque}</span>}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-800">
                        {clause.holdTime}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {clause.fixture}
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed bg-slate-50/30">
                        {clause.criteria}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedClauseId(isExpanded ? null : clause.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 mx-auto ${
                            isExpanded
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isExpanded ? t.comparisonMatrix.collapseDiagram : t.comparisonMatrix.viewDiagram}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Inline Embedded Figure Drawer */}
                    {isExpanded && (
                      <tr className="bg-slate-50/90 border-b-2 border-blue-200">
                        <td colSpan={10} className="p-4 sm:p-6">
                          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-lg space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                              <div className="flex items-center space-x-2">
                                <span className="bg-indigo-100 text-indigo-800 font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-indigo-200">
                                  {isEn ? `${clause.iso7} Embedded CAD Blueprint` : `${clause.iso7} 內嵌規範圖示 (SVG CAD / 3D Render)`}
                                </span>
                                <h4 className="font-bold text-slate-900 text-sm">{clause.title} — {isEn ? 'Standard Test Apparatus & CAD Blueprint' : '規範實驗裝置與 CAD 圖解'}</h4>
                              </div>
                              <span className="text-xs text-slate-400 font-mono">
                                {isEn ? 'R&D Risk: ' : '研發防呆風險: '}<strong className="text-rose-600 font-sans">{clause.risk}</strong>
                              </span>
                            </div>

                            {/* Embedded ISO Figure Renderer */}
                            <div className="w-full flex justify-center py-2">
                              <ISOStandardFigureRenderer
                                svgKey={svgKey}
                                titleZh={figInfo?.nameZh || clause.title}
                                titleEn={figInfo?.name || clause.iso7}
                                standard={figInfo?.standardOwner || 'ISO 80369-20:2024'}
                                figureTypeZh={figInfo?.annexGroup || (isEn ? 'Test Method Diagram' : '測試方法圖解')}
                                descriptionZh={figInfo?.descriptionZh || clause.criteria}
                                descriptionEn={figInfo?.description || clause.criteria}
                                keyCallouts={figInfo?.svgHighlights}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
