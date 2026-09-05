import ExcelJS from 'exceljs';
import { ISO20_MANDATORY_REPORT_ITEMS, ISO20_ANNEX_A_PRECONDITIONING, ISO_CLAUSES } from '../data/isoData';
import { TestConfigState } from '../types';
import { getAnnexCFigure } from './isoHelpers';

/**
 * Configures A4 Landscape page setup, print margins, and single-page width scaling.
 */
const configureA4LandscapePageSetup = (worksheet: ExcelJS.Worksheet) => {
  worksheet.pageSetup = {
    paperSize: 9, // A4 Paper Size
    orientation: 'landscape', // A4 Landscape
    fitToPage: true, // Enable fit to page scaling
    fitToWidth: 1, // Force all columns to fit within 1 A4 page width
    fitToHeight: 0, // Allow rows to flow naturally across pages
    margins: {
      left: 0.4,
      right: 0.4,
      top: 0.5,
      bottom: 0.5,
      header: 0.3,
      footer: 0.3
    }
  };
};

/**
 * Generates and downloads a true native binary Excel workbook (.xlsx) via ExcelJS.
 * Supports bilingual (ZH / EN) export for international regulatory compliance.
 */
export const exportMedicalGradeExcelReport = async (config: TestConfigState, language: 'zh' | 'en' = 'zh') => {
  const isEn = language === 'en';
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ISO 80369 Navigation System';
  workbook.created = new Date();

  const selectedGenderLabel = isEn
    ? (config.connectorGender === 'male' ? '♂️ Male Luer' : '♀️ Female Luer')
    : (config.connectorGender === 'male' ? '♂️ 公接頭 (Male Luer)' : '♀️ 母接頭 (Female Luer)');

  const selectedTypeLabel = isEn
    ? (config.connectorType === 'lock' ? 'Rigid/Rotatable Lock (L2)' : '6% Slip (L1)')
    : (config.connectorType === 'lock' ? '剛性/旋轉鎖定型 (Lock)' : '6% 滑動型 (Slip)');

  const currentDate = new Date().toISOString().split('T')[0];

  // Common Border Style
  const thinBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'thin', color: { argb: 'E2E8F0' } },
    left: { style: 'thin', color: { argb: 'E2E8F0' } },
    bottom: { style: 'thin', color: { argb: 'E2E8F0' } },
    right: { style: 'thin', color: { argb: 'E2E8F0' } }
  };

  // ==========================================
  // SHEET 1: ISO 80369-20 Section .5 Mandatory 14 Test Report Items
  // ==========================================
  const sheet1Name = isEn ? 'ISO20 Report 14 Items' : '14項法定報告檢核(Section .5)';
  const ws1 = workbook.addWorksheet(sheet1Name);
  configureA4LandscapePageSetup(ws1);

  ws1.columns = [
    { header: '', key: 'code', width: 10 },
    { header: '', key: 'clause', width: 16 },
    { header: '', key: 'titleEn', width: 28 },
    { header: '', key: 'titleZh', width: isEn ? 26 : 22 },
    { header: '', key: 'mandatory', width: 18 },
    { header: '', key: 'instructions', width: 46 },
    { header: '', key: 'example', width: 38 },
    { header: '', key: 'labInput', width: 25 }
  ];

  // Row 1: Main Title Banner
  ws1.mergeCells('A1:H1');
  const titleCell1 = ws1.getCell('A1');
  titleCell1.value = isEn
    ? '  ISO 80369-20:2024 Section .5 Laboratory Test Report 14 Mandatory Reporting Elements Checklist'
    : '  ISO 80369-20:2024 Section .5 實驗室正式測試報告 14 大法定必填項目檢核表 (A4 檢核頁面)';
  titleCell1.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFF' } };
  titleCell1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E1B4B' } };
  titleCell1.alignment = { vertical: 'middle', horizontal: 'left' };
  ws1.getRow(1).height = 34;

  // Row 2: Subtitle Banner
  ws1.mergeCells('A2:H2');
  const subCell1 = ws1.getCell('A2');
  subCell1.value = isEn
    ? `  Standard Annexes B.5 ~ G.5 Compliance Requirements | Specimen: ${selectedGenderLabel} ${selectedTypeLabel} | Generated: ${currentDate}`
    : `  依據法規附錄 B.5 ~ G.5 規範 | 受測規格: ${selectedGenderLabel} ${selectedTypeLabel} | 產出日期: ${currentDate} | 適用醫療器材 DHF 驗證檔案存檔`;
  subCell1.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: 'C7D2FE' } };
  subCell1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '312E81' } };
  subCell1.alignment = { vertical: 'middle', horizontal: 'left' };
  ws1.getRow(2).height = 22;

  // Row 4: Column Headers
  const headers1 = isEn
    ? ['Item', 'Standard Clause', 'Field Name (EN)', 'Reporting Category', 'Mandatory Level', 'Regulatory & Inspection Details', 'Compliance Example Value', 'Lab Verification Status']
    : ['項目編號', '標準條款 (a~n)', '必填欄位名稱 (EN)', '必填欄位中文說明', '法規要求層級', '法規規範與填寫指引 (Audit Guidance)', '規範範例數值說明 (Example Data)', '實驗室填寫 / 稽核記錄欄位'];

  const headerRow1 = ws1.getRow(4);
  headerRow1.height = 30;
  headers1.forEach((text, i) => {
    const cell = headerRow1.getCell(i + 1);
    cell.value = text;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4338CA' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      bottom: { style: 'medium', color: { argb: '312E81' } },
      right: { style: 'thin', color: { argb: '6366F1' } }
    };
  });

  // Populate 14 items
  ISO20_MANDATORY_REPORT_ITEMS.forEach((item, idx) => {
    const rowNum = idx + 5;
    const row = ws1.getRow(rowNum);
    row.height = 38;
    const bgFill = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';

    const desc = isEn ? (item.descriptionEn || item.descriptionZh) : item.descriptionZh;
    const exampleVal = isEn ? (item.exampleValueEn || item.exampleValueZh) : item.exampleValueZh;
    const category = isEn ? item.titleZh : item.titleZh;
    const mandatoryLevel = isEn ? 'Mandatory (Section .5)' : '★ 法定必填 (Section .5)';
    const labStatus = isEn ? '[ ] Documented' : '[ ] 已填寫 (合格)';

    const values = [
      item.code,
      `Section .5 (${item.id})`,
      item.titleEn,
      category,
      mandatoryLevel,
      desc,
      exampleVal,
      labStatus
    ];

    values.forEach((val, i) => {
      const cell = row.getCell(i + 1);
      cell.value = val;
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: '1E293B' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgFill } };
      cell.alignment = { vertical: 'middle', wrapText: true };
      cell.border = thinBorder;

      if (i === 0 || i === 1) {
        cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '4338CA' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else if (i === 4) {
        cell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '047857' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else if (i === 7) {
        cell.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: '64748B' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // Warning Banner
  const warningStartRow = 5 + ISO20_MANDATORY_REPORT_ITEMS.length + 1;
  ws1.mergeCells(`A${warningStartRow}:H${warningStartRow}`);
  const warnCell = ws1.getCell(`A${warningStartRow}`);
  warnCell.value = isEn
    ? '  ⚠️ AUDIT COMPLIANCE WARNING: Omission of any item from a) through n) may lead to FDA (510k) RFI or EU MDR notified body non-conformance.'
    : '  ⚠️ 認證審查安全警語 (Regulatory Warning)：測試報告中若缺少上述 a) 至 n) 任何一項內容，將引來主管機關 (FDA 510k / CE MDR / TFDA) 稽核員補件發問 (RFI) 或直接退件。';
  warnCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '9A3412' } };
  warnCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEDD5' } };
  warnCell.alignment = { vertical: 'middle', horizontal: 'left' };
  warnCell.border = { top: { style: 'thin', color: { argb: 'FDBA74' } }, bottom: { style: 'thin', color: { argb: 'FDBA74' } } };
  ws1.getRow(warningStartRow).height = 28;

  ws1.autoFilter = `A4:H${4 + ISO20_MANDATORY_REPORT_ITEMS.length}`;

  // ==========================================
  // SHEET 2: ISO 80369-7 DVP Design Verification Matrix
  // ==========================================
  const sheet2Name = isEn ? 'DVP Test Matrix' : 'ISO 80369-7 DVP驗證矩陣';
  const ws2 = workbook.addWorksheet(sheet2Name);
  configureA4LandscapePageSetup(ws2);

  ws2.columns = [
    { header: '', key: 'clause', width: 12 },
    { header: '', key: 'title', width: 34 },
    { header: '', key: 'iso7', width: 16 },
    { header: '', key: 'iso20', width: 16 },
    { header: '', key: 'preAssembly', width: 34 },
    { header: '', key: 'testLoad', width: 30 },
    { header: '', key: 'holdTime', width: 28 },
    { header: '', key: 'fixture', width: 28 },
    { header: '', key: 'worstCase', width: 24 },
    { header: '', key: 'criteria', width: 48 }
  ];

  // Row 1: Title Banner
  ws2.mergeCells('A1:J1');
  const titleCell2 = ws2.getCell('A1');
  titleCell2.value = isEn
    ? '  ISO 80369-7:2021 & ISO 80369-20:2024 Design Verification Plan (DVP) Comprehensive Test Matrix'
    : '  ISO 80369-7:2021 & ISO 80369-20:2024 醫療器材設計驗證規範 (DVP) 完整測試矩陣表';
  titleCell2.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFF' } };
  titleCell2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
  titleCell2.alignment = { vertical: 'middle', horizontal: 'left' };
  ws2.getRow(1).height = 34;

  // Row 2: Subtitle Banner
  ws2.mergeCells('A2:J2');
  const subCell2 = ws2.getCell('A2');
  subCell2.value = isEn
    ? `  Target Specimen: ${selectedGenderLabel} ${selectedTypeLabel} | Standard Evaluation: Clauses 6.1 ~ 6.6 | Date: ${currentDate}`
    : `  受測規格: ${selectedGenderLabel} ${selectedTypeLabel} | 涵蓋條文: Clause 6.1 ~ 6.6 全部物理性能驗證項目 | 產出日期: ${currentDate}`;
  subCell2.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: 'CBD5E1' } };
  subCell2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E293B' } };
  subCell2.alignment = { vertical: 'middle', horizontal: 'left' };
  ws2.getRow(2).height = 22;

  // Row 4: Column Headers
  const headers2 = isEn
    ? ['Clause', 'Test Title', 'ISO 80369-7', 'ISO 80369-20', 'Pre-assembly Condition', 'Applied Test Load', 'Hold Time', 'Specified Reference Fixture', 'Worst-Case Geometry Requirement', 'Acceptance Pass Criteria']
    : ['條款編號', '測試項目名稱', 'ISO 80369-7 條文', 'ISO 80369-20 附錄', '預裝配條件 (扭矩 / 軸推力)', '定量加載考驗負載', '規定保持時間 (Hold Time)', '指定金屬參考接頭', '最壞情況幾何判定', '法規允收標準 (Pass Criteria)'];

  const headerRow2 = ws2.getRow(4);
  headerRow2.height = 30;
  headers2.forEach((text, i) => {
    const cell = headerRow2.getCell(i + 1);
    cell.value = text;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E40AF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      bottom: { style: 'medium', color: { argb: '172554' } },
      right: { style: 'thin', color: { argb: '3B82F6' } }
    };
  });

  // Populate DVP Rows
  const applicableClauses = Object.values(ISO_CLAUSES).filter(c => c.applicableTypes.includes(config.connectorType));
  applicableClauses.forEach((clause, idx) => {
    const rowNum = idx + 5;
    const row = ws2.getRow(rowNum);
    row.height = 42;
    const bgFill = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';

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
    const preAssemblyStr = isEn
      ? 'Torque: 0.08–0.12 N·m + Axial Force: 26.5–27.5 N (Hold 5–6 s then Release)'
      : '扭矩: 0.08–0.12 N·m + 軸向推力: 26.5–27.5 N (維持 5–6 秒後釋放)';

    let activeLoadStr = 'N/A';
    if (clause.id === '6.1') activeLoadStr = isEn ? '300–330 kPa (Hydraulic or Pneumatic either/or)' : '300–330 kPa (水壓法或氣壓法二選一)';
    else if (clause.id === '6.2') activeLoadStr = isEn ? '80.0–88.0 kPa (Vacuum Negative Pressure)' : '80.0–88.0 kPa (真空負壓)';
    else if (clause.id === '6.3') activeLoadStr = isEn ? 'N/A (Air rest 48h then test 6.1.1)' : 'N/A (靜置48h後測6.1.1)';
    else if (clause.id === '6.4') activeLoadStr = isEn
      ? ((config.connectorType === 'slip') ? '23–25 N (Slip L1 Load)' : '32–35 N (Lock L2 Load)')
      : ((config.connectorType === 'slip') ? '23–25 N (滑動型拉力)' : '32–35 N (鎖定型拉力)');
    else if (clause.id === '6.5') activeLoadStr = isEn ? '0.018–0.020 N·m (Unscrewing Torque)' : '0.018–0.020 N·m (反向旋鬆扭矩)';
    else if (clause.id === '6.6') activeLoadStr = isEn ? '0.15–0.17 N·m (Pure Overriding Torque)' : '0.15–0.17 N·m (純扭矩，無其他方向外力)';
    else if (clause.testTorqueNm) activeLoadStr = `${clause.testTorqueNm.min}–${clause.testTorqueNm.max} N·m`;
    else if (clause.testForceN) activeLoadStr = `${clause.testForceN.min}–${clause.testForceN.max} N`;

    const holdTimeStr = clause.id === '6.1'
      ? (isEn ? 'Pneumatic: 15–20 s / Hydraulic: 30–35 s (Choose one)' : '氣壓法 15–20 秒 / 水壓法 30–35 秒 (二選一)')
      : clause.id === '6.3'
      ? (isEn ? '48 Hours (Air condition at 23°C)' : '48 小時 (23°C 空氣靜置)')
      : clause.holdTimeSec
      ? `${clause.holdTimeSec.min}–${clause.holdTimeSec.max} ${isEn ? 's' : '秒'}`
      : 'N/A';

    const worstCaseText = isEn
      ? (requiredRef?.isWorstCase ? '★ Mandated Worst-Case (2.71mm Lug)' : 'Nominal Standard Fixture (3.50mm Lug)')
      : (requiredRef?.isWorstCase ? '★ 強制最壞情況 (2.71mm 窄耳翼極限)' : '標稱標準接頭 (3.50mm 耳翼)');

    const refFixtureText = isEn
      ? `Fig.${requiredRefId} (${requiredRef?.name || ''})`
      : `Fig.${requiredRefId} (${requiredRef?.nameZh || ''})`;

    const criteriaText = isEn
      ? (clause.id === '6.4'
          ? (config.connectorType === 'slip' ? 'Shall not separate from the reference connector when subjected to an axial force of 23 N to 25 N for 10 s to 15 s.' : 'Shall not separate from the reference connector when subjected to an axial force of 32 N to 35 N for 10 s to 15 s.')
          : clause.id === '6.6'
          ? 'Shall not override the threads or lugs when subjected to a torque of 0.15 N·m to 0.17 N·m for 5 s to 10 s, and no cocking shall occur (ISO 80369-20 Annex H.4 d).'
          : clause.id === '6.3'
          ? 'Condition assembled to reference connector for 48 h per ISO 80369-20 Annex E, then meet Clause 6.1.1 leakage requirements.'
          : clause.passCriteria)
      : (clause.id === '6.4'
          ? (config.connectorType === 'slip' ? '在 23 N–25 N（Slip 滑動型）軸向拉力下維持 10–15 秒，接頭不得脫開分離。' : '在 32 N–35 N（Lock 鎖定型）軸向拉力下維持 10–15 秒，接頭不得脫開分離。')
          : clause.id === '6.6'
          ? '施加 0.15 N·m–0.17 N·m 破壞性扭矩維持 5–10 秒，螺紋或耳翼不得越過滑脫（不滑牙），且接頭無歪斜 (No cocking)（ISO 80369-20 Annex H.4 d）。'
          : clause.id === '6.3'
          ? '依 ISO 80369-20 Annex E 裝配於金屬參考接頭於環境中靜置 48 小時後，依 6.1.1 執行洩漏測試並符合其要求。'
          : clause.passCriteriaZh);

    const values = [
      clause.id,
      isEn ? clause.title : clause.titleZh,
      `Clause ${clause.id}`,
      `Annex ${clause.id === '6.1' ? 'B/C' : clause.id === '6.2' ? 'D' : clause.id === '6.3' ? 'E' : clause.id === '6.4' ? 'F' : clause.id === '6.5' ? 'G' : 'H'}`,
      preAssemblyStr,
      activeLoadStr,
      holdTimeStr,
      refFixtureText,
      worstCaseText,
      criteriaText
    ];

    values.forEach((val, i) => {
      const cell = row.getCell(i + 1);
      cell.value = val;
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: '1E293B' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgFill } };
      cell.alignment = { vertical: 'middle', wrapText: true };
      cell.border = thinBorder;

      if (i === 0) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '1E40AF' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else if (i === 2 || i === 3) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else if (i === 8 && requiredRef?.isWorstCase) {
        cell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'BE123C' } };
      }
    });
  });

  ws2.autoFilter = `A4:J${4 + applicableClauses.length}`;

  // ==========================================
  // SHEET 3: ISO 80369-20:2024 Clause 4 & Section .2 Preconditioning Specifications
  // ==========================================
  const sheet3Name = isEn ? 'Preconditioning Specs' : '大氣環境預處理規格';
  const ws3 = workbook.addWorksheet(sheet3Name);
  configureA4LandscapePageSetup(ws3);

  ws3.columns = [
    { header: '', key: 'clause', width: 16 },
    { header: '', key: 'item', width: isEn ? 28 : 22 },
    { header: '', key: 'target', width: 16 },
    { header: '', key: 'tolerance', width: isEn ? 32 : 28 },
    { header: '', key: 'notes', width: 48 }
  ];

  ws3.mergeCells('A1:E1');
  const titleCell3 = ws3.getCell('A1');
  titleCell3.value = isEn
    ? '  ISO 80369-20:2024 Clause 4 & Section .2 Environmental Preconditioning Specification'
    : '  ISO 80369-20:2024 Clause 4 與各附錄 Section .2 標準大氣預處理與環境條件規格';
  titleCell3.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFF' } };
  titleCell3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
  titleCell3.alignment = { vertical: 'middle', horizontal: 'left' };
  ws3.getRow(1).height = 32;

  const headers3 = isEn
    ? ['Standard Clause', 'Control Parameter', 'Target Standard Value', 'Allowable Tolerance / Range', 'Requirement & Technical Notes']
    : ['標準條款', '管制項目', '目標標準值', '允許公差 / 範圍', '強制規定與備註說明'];

  const headerRow3 = ws3.getRow(3);
  headerRow3.height = 28;
  headers3.forEach((text, i) => {
    const cell = headerRow3.getCell(i + 1);
    cell.value = text;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '2563EB' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      bottom: { style: 'medium', color: { argb: '1D4ED8' } },
      right: { style: 'thin', color: { argb: '64748B' } }
    };
  });

  const annexARows = isEn ? [
    ['Clause 4 / .2.1', 'Sample Preconditioning Temp', '20.0 °C', '± 5.0 °C (15.0 °C ~ 25.0 °C)', 'Specimens and reference connectors preconditioned for not less than 24 h.'],
    ['Clause 4 / .2.1', 'Preconditioning Humidity (RH)', '50.0 %', '± 10.0 % (40.0 % ~ 60.0 %)', 'Prevents moisture variation or dimension changes prior to test assembly.'],
    ['Clause 4 / .2.1', 'Conditioning Duration', '24 Hours', '≥ 24.0 Hours', 'Mandatory for hygroscopic materials; non-hygroscopic polymers exempt.'],
    ['Clause 4 / .2.2', 'Environmental Test Temp', '15 °C ~ 30 °C', 'Nominal ~20–25 °C Range', 'Ambient test execution laboratory temperature range per ISO 80369-20:2024.'],
    ['Clause 4 / .2.2', 'Environmental Test RH', '10 % ~ 70 %', 'Standard Ambient Range', 'Ambient laboratory relative humidity range during physical testing execution.'],
    ['Clause 6.3 / E.4', 'Stress Cracking Exposure', '48 Hours', '≥ 48.0 Hours (at 15–30 °C)', 'Leave assembled for not less than 48 h per ISO 80369-20 Annex E.4 b, then test 6.1.1.']
  ] : [
    ['Clause 4 / .2.1', '樣品狀態預處理溫度', '20.0 °C', '± 5.0 °C (15.0 °C ~ 25.0 °C)', '受測樣品與金屬參考接頭於測試前置靜置於標準大氣環境至少 24 小時。'],
    ['Clause 4 / .2.1', '預處理相對濕度 (RH)', '50.0 %', '± 10.0 % (40.0 % ~ 60.0 %)', '大氣濕度調節管制，防止親水高分子材料吸濕變形。'],
    ['Clause 4 / .2.1', '狀態調節靜置時間', '24 小時', '≥ 24.0 小時', '吸濕性材料強制要求；非吸濕性材料可豁免 (ISO 80369-20 Section .2.1)。'],
    ['Clause 4 / .2.2', '測試執行環境溫度', '15 °C ~ 30 °C', '常溫區間 (15.0 °C ~ 30.0 °C)', '物理測試執行全程實驗室環境溫度管制範圍 (ISO 80369-20:2024 Section .2.2)。'],
    ['Clause 4 / .2.2', '測試執行環境濕度', '10 % ~ 70 %', '常規濕度 (10.0 % ~ 70.0 % RH)', '物理測試執行期間實驗室環境相對濕度管制範圍。'],
    ['Clause 6.3 / E.4', '應力龜裂組裝靜置時間', '48 小時', '≥ 48.0 小時 (於 15–30 °C 環境)', '依 ISO 80369-20 Annex E.4 b 裝配後靜置保持至少 48 小時，再測 6.1.1 洩漏。']
  ];

  annexARows.forEach((r, idx) => {
    const rowNum = idx + 4;
    const row = ws3.getRow(rowNum);
    row.height = 30;
    const bgFill = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';

    r.forEach((val, i) => {
      const cell = row.getCell(i + 1);
      cell.value = val;
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: '1E293B' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgFill } };
      cell.alignment = { vertical: 'middle', wrapText: true };
      cell.border = thinBorder;

      if (i === 0) {
        cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '1E293B' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  ws3.autoFilter = `A3:E${3 + annexARows.length}`;

  // Download binary .xlsx file in browser
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isEn
      ? `ISO_80369_7_Design_Verification_Plan_Report_${currentDate}.xlsx`
      : `ISO_80369_Medical_Test_Report_and_DVP_Matrix_${currentDate}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return workbook;
};
