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
 * Features 100% zero warning popups, A4 Landscape 1-page width fitting, Morandi colors,
 * cell borders, bold title headers, and automatic text wrapping.
 */
export const exportMedicalGradeExcelReport = async (config: TestConfigState) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ISO 80369 Navigation System';
  workbook.created = new Date();

  const selectedGenderZh = config.connectorGender === 'male' ? '♂️ 公接頭 (Male Luer)' : '♀️ 母接頭 (Female Luer)';
  const selectedTypeZh = config.connectorType === 'lock' ? '剛性/旋轉鎖定型 (Lock)' : '6% 滑動型 (Slip)';
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
  const ws1 = workbook.addWorksheet('14項法定報告檢核(Section .5)');
  configureA4LandscapePageSetup(ws1);

  ws1.columns = [
    { header: '', key: 'code', width: 10 },
    { header: '', key: 'clause', width: 16 },
    { header: '', key: 'titleEn', width: 28 },
    { header: '', key: 'titleZh', width: 22 },
    { header: '', key: 'mandatory', width: 18 },
    { header: '', key: 'instructions', width: 46 },
    { header: '', key: 'example', width: 38 },
    { header: '', key: 'labInput', width: 25 }
  ];

  // Row 1: Main Title Banner
  ws1.mergeCells('A1:H1');
  const titleCell1 = ws1.getCell('A1');
  titleCell1.value = '  ISO 80369-20:2024 Section .5 實驗室正式測試報告 14 大法定必填項目檢核表 (A4 檢核頁面)';
  titleCell1.font = { name: 'Microsoft JhengHei', size: 12, bold: true, color: { argb: 'FFFFFF' } };
  titleCell1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
  titleCell1.alignment = { vertical: 'middle', horizontal: 'left' };
  ws1.getRow(1).height = 32;

  // Row 2: Subtitle Banner
  ws1.mergeCells('A2:H2');
  const subTitleCell1 = ws1.getCell('A2');
  subTitleCell1.value = `  規範依據: ISO 80369-20:2024 Annex B.5 / C.5 / D.5 / E.5 / F.5 / G.5 | 大氣預處理: ${ISO20_ANNEX_A_PRECONDITIONING.tempC.target}±${ISO20_ANNEX_A_PRECONDITIONING.tempC.tolerance}°C, ${ISO20_ANNEX_A_PRECONDITIONING.rhPercent.target}±${ISO20_ANNEX_A_PRECONDITIONING.rhPercent.tolerance}% RH (≥24h) | 導出日期: ${currentDate}`;
  subTitleCell1.font = { name: 'Microsoft JhengHei', size: 9.5, bold: true, color: { argb: '1E40AF' } };
  subTitleCell1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EFF6FF' } };
  subTitleCell1.alignment = { vertical: 'middle', horizontal: 'left' };
  ws1.getRow(2).height = 24;

  // Row 4: Column Headers
  const headers1 = ['項目代碼', 'ISO 條款 (a~n)', '欄位名稱 (EN)', '必填欄位名稱 (中文)', '法規強制程度', '法規規範說明與指導', '報告填寫範例說明', '實驗室實際填報內容 (Lab Input)'];
  const headerRow1 = ws1.getRow(4);
  headerRow1.height = 28;
  headers1.forEach((text, i) => {
    const cell = headerRow1.getCell(i + 1);
    cell.value = text;
    cell.font = { name: 'Microsoft JhengHei', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '2563EB' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      bottom: { style: 'medium', color: { argb: '1D4ED8' } },
      right: { style: 'thin', color: { argb: '64748B' } }
    };
  });

  // Data Rows for Sheet 1
  ISO20_MANDATORY_REPORT_ITEMS.forEach((item, idx) => {
    const rowNum = idx + 5;
    const row = ws1.getRow(rowNum);
    row.height = 42;
    const bgFill = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';

    const values = [
      item.code,
      `Section .5 (${item.id})`,
      item.titleEn,
      item.titleZh,
      'MANDATORY (法定必填)',
      item.descriptionZh,
      item.exampleValueZh,
      ''
    ];

    values.forEach((val, i) => {
      const cell = row.getCell(i + 1);
      cell.value = val;
      cell.font = { name: 'Microsoft JhengHei', size: 9.5, color: { argb: '1E293B' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgFill } };
      cell.alignment = { vertical: 'top', wrapText: true };
      cell.border = thinBorder;

      if (i === 0) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '1E293B' } };
        cell.alignment = { vertical: 'top', horizontal: 'center' };
      } else if (i === 4) {
        // Mandatory Badge
        cell.font = { name: 'Microsoft JhengHei', size: 9, bold: true, color: { argb: '166534' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
        cell.alignment = { vertical: 'top', horizontal: 'center' };
      }
    });
  });

  // Warning Footer Box
  const warningStartRow = 5 + ISO20_MANDATORY_REPORT_ITEMS.length + 1;
  ws1.mergeCells(`A${warningStartRow}:H${warningStartRow + 1}`);
  const warningCell = ws1.getCell(`A${warningStartRow}`);
  warningCell.value = '📌 法規查核與認證審查注意事項 (Regulatory Compliance Warning):\n1. 缺少上述 a) 至 n) 任何一項內容，可能導致 TFDA、FDA (510k) 或 CE MDR 稽核員補件發問 (RFI) 或退件。\n2. 第 k) 項測試系統總積 V（系統內部容積）為 ISO 80369-20:2024 新版強制揭露項目，需搭配 Figure B.1 的測定方法標註。';
  warningCell.font = { name: 'Microsoft JhengHei', size: 9, color: { argb: '78350F' } };
  warningCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FEF3C7' } };
  warningCell.alignment = { vertical: 'middle', wrapText: true };

  ws1.autoFilter = `A4:H${4 + ISO20_MANDATORY_REPORT_ITEMS.length}`;

  // ==========================================
  // SHEET 2: ISO 80369-7 DVP Test Matrix
  // ==========================================
  const ws2 = workbook.addWorksheet('DVP驗證計畫矩陣表(ISO 7&20)');
  configureA4LandscapePageSetup(ws2);

  ws2.columns = [
    { header: '', key: 'id', width: 10 },
    { header: '', key: 'title', width: 24 },
    { header: '', key: 'clause7', width: 14 },
    { header: '', key: 'annex20', width: 14 },
    { header: '', key: 'preAssembly', width: 22 },
    { header: '', key: 'activeLoad', width: 22 },
    { header: '', key: 'holdTime', width: 16 },
    { header: '', key: 'refConnector', width: 24 },
    { header: '', key: 'worstCase', width: 32 },
    { header: '', key: 'passCriteria', width: 42 }
  ];

  // Row 1: Title Banner
  ws2.mergeCells('A1:J1');
  const titleCell2 = ws2.getCell('A1');
  titleCell2.value = '  ISO 80369-7:2021 & ISO 80369-20:2024 完整設計驗證計畫 (DVP) 測試規範矩陣';
  titleCell2.font = { name: 'Microsoft JhengHei', size: 12, bold: true, color: { argb: 'FFFFFF' } };
  titleCell2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
  titleCell2.alignment = { vertical: 'middle', horizontal: 'left' };
  ws2.getRow(1).height = 32;

  // Row 2: Subtitle Banner
  ws2.mergeCells('A2:J2');
  const subTitleCell2 = ws2.getCell('A2');
  subTitleCell2.value = `  受測產品對象: ${selectedGenderZh} - ${selectedTypeZh} | 導出日期: ${currentDate} | ISO 17025 合規對照表`;
  subTitleCell2.font = { name: 'Microsoft JhengHei', size: 9.5, bold: true, color: { argb: '1E40AF' } };
  subTitleCell2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EFF6FF' } };
  subTitleCell2.alignment = { vertical: 'middle', horizontal: 'left' };
  ws2.getRow(2).height = 24;

  // Row 4: Column Headers
  const headers2 = ['條文 ID', '測試名稱 & 主題 (Test Title)', 'ISO 80369-7 條文', 'ISO 80369-20 附錄', '預裝配條件 (扭矩 / 推力)', '定量加載條件 (壓力/拉力/扭矩)', '持壓時間', '指定金屬參考接頭 (Annex C)', '最壞情況選用理由 (Worst-Case Rationale)', '合格判定 Pass 標準'];
  const headerRow2 = ws2.getRow(4);
  headerRow2.height = 28;
  headers2.forEach((text, i) => {
    const cell = headerRow2.getCell(i + 1);
    cell.value = text;
    cell.font = { name: 'Microsoft JhengHei', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '2563EB' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      bottom: { style: 'medium', color: { argb: '1D4ED8' } },
      right: { style: 'thin', color: { argb: '64748B' } }
    };
  });

  const activeClauses = Object.values(ISO_CLAUSES).filter(c => c.applicableTypes.includes(config.connectorType || 'lock'));
  activeClauses.forEach((clause, idx) => {
    const rowNum = idx + 5;
    const row = ws2.getRow(rowNum);
    row.height = 38;
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
    const preAssemblyStr = '0.08–0.12 N·m + 26.5–27.5 N (維持 5–6 秒後釋放)';

    let activeLoadStr = 'N/A';
    if (clause.id === '6.1') activeLoadStr = '300–330 kPa (水壓法或氣壓法二選一)';
    else if (clause.id === '6.2') activeLoadStr = '80.0–88.0 kPa (真空負壓)';
    else if (clause.id === '6.3') activeLoadStr = 'N/A (靜置48h後測6.1.1)';
    else if (clause.id === '6.4') activeLoadStr = (config.connectorType === 'slip') ? '23–25 N (滑動型拉力)' : '32–35 N (鎖定型拉力)';
    else if (clause.id === '6.5') activeLoadStr = '0.018–0.020 N·m (反向旋鬆扭矩)';
    else if (clause.id === '6.6') activeLoadStr = '0.15–0.17 N·m (純扭矩，無其他方向外力)';
    else if (clause.testTorqueNm) activeLoadStr = `${clause.testTorqueNm.min}–${clause.testTorqueNm.max} N·m`;
    else if (clause.testForceN) activeLoadStr = `${clause.testForceN.min}–${clause.testForceN.max} N`;

    const holdTimeStr = clause.id === '6.1'
      ? '氣壓法 15–20 秒 / 水壓法 30–35 秒 (二選一)'
      : clause.id === '6.3'
      ? '48 小時 (23°C 空氣靜置)'
      : clause.holdTimeSec
      ? `${clause.holdTimeSec.min}–${clause.holdTimeSec.max} 秒`
      : 'N/A';

    const values = [
      clause.id,
      clause.titleZh,
      `Clause ${clause.id}`,
      `Annex ${clause.id === '6.1' ? 'B/C' : clause.id === '6.2' ? 'D' : clause.id === '6.3' ? 'E' : clause.id === '6.4' ? 'F' : clause.id === '6.5' ? 'G' : 'H'}`,
      preAssemblyStr,
      activeLoadStr,
      holdTimeStr,
      `Fig.${requiredRefId} (${requiredRef?.nameZh || ''})`,
      requiredRef?.isWorstCase ? '★ 強制最壞情況 (2.71mm 窄耳翼極限)' : '標稱標準接頭 (3.50mm 耳翼)',
      (clause.id === '6.4'
        ? (config.connectorType === 'slip' ? '在 23 N–25 N（Slip 滑動型）軸向拉力下維持 10–15 秒，接頭不得脫開分離。' : '在 32 N–35 N（Lock 鎖定型）軸向拉力下維持 10–15 秒，接頭不得脫開分離。')
        : clause.id === '6.6'
        ? '施加 0.15 N·m–0.17 N·m 破壞性扭矩維持 5–10 秒，螺紋或耳翼不得越過滑脫（不滑牙），且接頭無歪斜 (No cocking)（ISO 80369-20 Annex H.4 d）。'
        : clause.id === '6.3'
        ? '依 ISO 80369-20 Annex E 裝配於金屬參考接頭於環境中靜置 48 小時後，依 6.1.1 執行洩漏測試並符合其要求。'
        : clause.passCriteriaZh)
    ];

    values.forEach((val, i) => {
      const cell = row.getCell(i + 1);
      cell.value = val;
      cell.font = { name: 'Microsoft JhengHei', size: 9.5, color: { argb: '1E293B' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgFill } };
      cell.alignment = { vertical: 'top', wrapText: true };
      cell.border = thinBorder;

      if (i === 0) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '1E293B' } };
        cell.alignment = { vertical: 'top', horizontal: 'center' };
      }
    });
  });

  ws2.autoFilter = `A4:J${4 + activeClauses.length}`;

  // ==========================================
  // SHEET 3: Annex A Environmental Preconditioning Specifications
  // ==========================================
  const ws3 = workbook.addWorksheet('Annex A 大氣環境規格');
  configureA4LandscapePageSetup(ws3);

  ws3.columns = [
    { header: '', key: 'clause', width: 14 },
    { header: '', key: 'item', width: 22 },
    { header: '', key: 'target', width: 16 },
    { header: '', key: 'tolerance', width: 28 },
    { header: '', key: 'notes', width: 48 }
  ];

  ws3.mergeCells('A1:E1');
  const titleCell3 = ws3.getCell('A1');
  titleCell3.value = '  ISO 80369-20:2024 Annex A 大氣預處理與環境測試條款規格';
  titleCell3.font = { name: 'Microsoft JhengHei', size: 12, bold: true, color: { argb: 'FFFFFF' } };
  titleCell3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
  titleCell3.alignment = { vertical: 'middle', horizontal: 'left' };
  ws3.getRow(1).height = 32;

  const headers3 = ['標準條款', '管制項目', '目標標準值', '允許公差 / 範圍', '強制規定與備註說明'];
  const headerRow3 = ws3.getRow(3);
  headerRow3.height = 28;
  headers3.forEach((text, i) => {
    const cell = headerRow3.getCell(i + 1);
    cell.value = text;
    cell.font = { name: 'Microsoft JhengHei', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '2563EB' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
      bottom: { style: 'medium', color: { argb: '1D4ED8' } },
      right: { style: 'thin', color: { argb: '64748B' } }
    };
  });

  const annexARows = [
    ['Annex A.3', '環境試驗溫度', '23.0 °C', '± 2.0 °C (21.0 °C ~ 25.0 °C)', '測試全程必須維持於此溫度範圍，避免高溫引發塑膠蠕變 (Creep)。'],
    ['Annex A.3', '相對濕度 (RH)', '50.0 %', '± 5.0 % (45.0 % ~ 55.0 %)', '大氣濕度調節管制，防止親水高分子材料吸濕變形。'],
    ['Annex A.3', '狀態調節時間', '24 小時', '≥ 24.0 小時', '受測樣品與金屬參考接頭必須於測試前置靜置於標準大氣環境中。'],
    ['Clause 6.3', '應力龜裂試驗環境', '48 小時', '48h ± 1h at 23±2°C', '裝配後靜置於空氣或指定介質中 (ISO 80369-20 Annex E)。']
  ];

  annexARows.forEach((r, idx) => {
    const rowNum = idx + 4;
    const row = ws3.getRow(rowNum);
    row.height = 30;
    const bgFill = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';

    r.forEach((val, i) => {
      const cell = row.getCell(i + 1);
      cell.value = val;
      cell.font = { name: 'Microsoft JhengHei', size: 9.5, color: { argb: '1E293B' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgFill } };
      cell.alignment = { vertical: 'middle', wrapText: true };
      cell.border = thinBorder;

      if (i === 0) {
        cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '1E293B' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  ws3.autoFilter = 'A3:E7';

  // Download binary .xlsx file in browser
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ISO_80369_Medical_Test_Report_and_DVP_Matrix_${currentDate}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return workbook;
};
