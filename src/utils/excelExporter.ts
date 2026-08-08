import * as XLSX from 'xlsx';
import { ISO20_MANDATORY_REPORT_ITEMS, ISO20_ANNEX_A_PRECONDITIONING, ISO_CLAUSES } from '../data/isoData';
import { TestConfigState } from '../types';
import { getAnnexCFigure } from './isoHelpers';

/**
 * Generates and downloads a medical-grade, highly structured Excel workbook (.xlsx)
 * containing Section .5 Mandatory 14 Test Report Items, DVP Test Matrix, and Annex A Preconditioning.
 */
export const exportMedicalGradeExcelReport = (config: TestConfigState) => {
  const wb = XLSX.utils.book_new();

  // ==========================================
  // SHEET 1: ISO 80369-20 Section .5 Mandatory 14 Test Report Items
  // ==========================================
  const sheet1Data: (string | number)[][] = [
    ['ISO 80369-20:2024 Section .5 實驗室正式測試報告 14 大法定必填項目檢核表'],
    [`規範依據: ISO 80369-20:2024 Annex B.5 / C.5 / D.5 / E.5 / F.5 / G.5 | 大氣預處理: ${ISO20_ANNEX_A_PRECONDITIONING.tempC.target}±${ISO20_ANNEX_A_PRECONDITIONING.tempC.tolerance}°C, ${ISO20_ANNEX_A_PRECONDITIONING.rhPercent.target}±${ISO20_ANNEX_A_PRECONDITIONING.rhPercent.tolerance}% RH (≥24h)`],
    [], // Empty spacing
    ['項目代碼', 'ISO 條款 (a~n)', '欄位名稱 (EN)', '必填欄位名稱 (中文)', '法規強制程度', '法規規範說明與指導', '報告填寫範例說明', '實驗室實際填報內容 (Lab Input)']
  ];

  ISO20_MANDATORY_REPORT_ITEMS.forEach((item) => {
    sheet1Data.push([
      item.code,
      `Section .5 (${item.id})`,
      item.titleEn,
      item.titleZh,
      'MANDATORY (法定必填)',
      item.descriptionZh,
      item.exampleValueZh,
      '' // Empty field for lab engineer input
    ]);
  });

  // Add audit warning footer
  sheet1Data.push([]);
  sheet1Data.push(['📌 法規查核與認證審查注意事項 (Regulatory Compliance Warning):']);
  sheet1Data.push(['1. 缺少上述 a) 至 n) 任何一項內容，可能導致 TFDA、FDA (510k) 或 CE MDR 稽核員補件發問 (RFI) 或退件。']);
  sheet1Data.push(['2. 第 k) 項測試系統總積 V（系統內部容積）為 ISO 80369-20:2024 新版強制揭露項目，需搭配 Figure B.1 的測定方法標註。']);

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);

  // Set column widths for Sheet 1
  ws1['!cols'] = [
    { wch: 10 }, // 代碼
    { wch: 18 }, // ISO 條款
    { wch: 36 }, // 英文欄位
    { wch: 24 }, // 中文欄位
    { wch: 20 }, // 強制程度
    { wch: 60 }, // 規範說明
    { wch: 50 }, // 範例
    { wch: 35 }  // 實驗室實填
  ];

  XLSX.utils.book_append_sheet(wb, ws1, '14項法定報告檢核(Section .5)');

  // ==========================================
  // SHEET 2: ISO 80369-7 DVP Test Matrix
  // ==========================================
  const selectedGenderZh = config.connectorGender === 'male' ? '♂️ 公接頭 (Male Luer)' : '♀️ 母接頭 (Female Luer)';
  const selectedTypeZh = config.connectorType === 'lock' ? '剛性/旋轉鎖定型 (Lock)' : '6% 滑動型 (Slip)';

  const sheet2Data: (string | number)[][] = [
    ['ISO 80369-7:2021 & ISO 80369-20:2024 完整設計驗證計畫 (DVP) 測試規範矩陣'],
    [`受測產品對象: ${selectedGenderZh} - ${selectedTypeZh} | 導出日期: ${new Date().toISOString().split('T')[0]}`],
    [],
    ['條文 ID', '測試名稱 & 主題 (Test Title)', 'ISO 80369-7 條文', 'ISO 80369-20 附錄', '預裝配條件 (扭矩 / 推力)', '定量加載條件 (壓力/拉力/扭矩)', '持壓時間', '指定金屬參考接頭 (Annex C)', '最壞情況選用理由 (Worst-Case Rationale)', '合格判定 Pass 標準']
  ];

  Object.values(ISO_CLAUSES)
    .filter(clause => clause.applicableTypes.includes(config.connectorType || 'lock'))
    .forEach((clause) => {
      let requiredRefId = 'C.1';
      if (config.connectorGender === 'male') {
        if (config.connectorType === 'slip') {
          requiredRefId = 'C.5';
        } else {
          requiredRefId = (clause.id === '6.4' || clause.id === '6.6') ? 'C.3' : 'C.1';
        }
      } else {
        if (config.connectorType === 'slip') {
          requiredRefId = 'C.2';
        } else {
          requiredRefId = (clause.id === '6.4' || clause.id === '6.6') ? 'C.6' : 'C.4';
        }
      }

      const requiredRef = getAnnexCFigure(requiredRefId);
      const preAssemblyStr = `${clause.assemblyTorqueNm.min}–${clause.assemblyTorqueNm.max} N·m + ${clause.assemblyAxialForceN.min}–${clause.assemblyAxialForceN.max} N`;

      let activeLoadStr = 'N/A';
      if (clause.id === '6.1') activeLoadStr = '300–330 kPa (正壓)';
      else if (clause.id === '6.2') activeLoadStr = '80.0–88.0 kPa (真空負壓)';
      else if (clause.testTorqueNm) activeLoadStr = `${clause.testTorqueNm.min}–${clause.testTorqueNm.max} N·m (扭矩)`;
      else if (clause.testForceN) activeLoadStr = `${clause.testForceN.min}–${clause.testForceN.max} N (拉力)`;

      const holdTimeStr = clause.id === '6.3' ? '48 小時 (23°C 空氣)' : `${clause.holdTimeSec.min}–${clause.holdTimeSec.max} 秒`;

      sheet2Data.push([
        clause.id,
        clause.titleZh,
        `Clause ${clause.id}`,
        `Annex ${clause.id === '6.1' ? 'B/C' : clause.id === '6.2' ? 'D' : clause.id === '6.3' ? 'E' : clause.id === '6.4' ? 'F' : clause.id === '6.5' ? 'G' : 'H'}`,
        preAssemblyStr,
        activeLoadStr,
        holdTimeStr,
        `Fig.${requiredRefId} (${requiredRef?.nameZh || ''})`,
        requiredRef?.isWorstCase ? '★ 強制最壞情況 (2.71mm 窄耳翼最窄極限)' : '標稱標準接頭 (3.50mm 耳翼)',
        clause.passCriteriaZh
      ]);
    });

  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  ws2['!cols'] = [
    { wch: 10 }, // 條文 ID
    { wch: 30 }, // 測試名稱
    { wch: 18 }, // ISO 7
    { wch: 18 }, // ISO 20
    { wch: 28 }, // 預裝配
    { wch: 28 }, // 定量加載
    { wch: 22 }, // 持壓
    { wch: 30 }, // 金屬夾具
    { wch: 40 }, // 最壞情況理由
    { wch: 60 }  // 合格標準
  ];

  XLSX.utils.book_append_sheet(wb, ws2, 'DVP驗證計畫矩陣表(ISO 7&20)');

  // ==========================================
  // SHEET 3: Annex A Environmental Preconditioning Specifications
  // ==========================================
  const sheet3Data: (string | number)[][] = [
    ['ISO 80369-20:2024 Annex A 大氣預處理與環境測試條款規格'],
    ['標準條款', '管制項目', '目標標準值', '允許公差 / 範圍', '強制規定與備註說明'],
    ['Annex A.3', '環境試驗溫度', '23.0 °C', '± 2.0 °C (21.0 °C ~ 25.0 °C)', '測試全程必須維持於此溫度範圍'],
    ['Annex A.3', '相對濕度 (RH)', '50.0 %', '± 5.0 % (45.0 % ~ 55.0 %)', '大氣濕度調節管制'],
    ['Annex A.3', '狀態調節時間', '24 小時', '≥ 24.0 小時', '受測樣品與金屬參考接頭必須於測試前置靜置於標準環境'],
    ['Clause 6.3', '應力龜裂試驗環境', '48 小時', '48h ± 1h at 23±2°C', '裝配後靜置於空氣或指定介質中 (ISO 80369-20 Annex E)']
  ];

  const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);
  ws3['!cols'] = [
    { wch: 16 },
    { wch: 24 },
    { wch: 16 },
    { wch: 30 },
    { wch: 60 }
  ];

  XLSX.utils.book_append_sheet(wb, ws3, 'Annex A 大氣環境規格');

  // Trigger download as .xlsx file
  const fileName = `ISO_80369_Medical_Test_Report_and_DVP_Matrix_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
