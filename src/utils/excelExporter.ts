import { ISO20_MANDATORY_REPORT_ITEMS, ISO20_ANNEX_A_PRECONDITIONING, ISO_CLAUSES } from '../data/isoData';
import { TestConfigState } from '../types';
import { getAnnexCFigure } from './isoHelpers';

/**
 * Escapes XML special characters for safe XML Spreadsheet 2003 rendering.
 */
const escapeXml = (str: string | number | undefined | null): string => {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Generates an ISO 17025 compliant, A4 Landscape Optimized XML Spreadsheet 2003 file (.xls).
 * Features Morandi Medical styling, auto-wrapping, bold headers, colored badges, and A4 1-page width fitting.
 */
export const exportMedicalGradeExcelReport = (config: TestConfigState) => {
  const selectedGenderZh = config.connectorGender === 'male' ? '♂️ 公接頭 (Male Luer)' : '♀️ 母接頭 (Female Luer)';
  const selectedTypeZh = config.connectorType === 'lock' ? '剛性/旋轉鎖定型 (Lock)' : '6% 滑動型 (Slip)';
  const currentDate = new Date().toISOString().split('T')[0];

  // XML Header & Styles Declaration
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Title>ISO 80369-7 &amp; 20 醫療器材測試報告矩陣</Title>
  <Author>ISO 80369 Navigation System</Author>
  <Created>${currentDate}</Created>
 </DocumentProperties>
 <Styles>
  <!-- Main Title Banner Style -->
  <Style ss:ID="TitleBanner">
   <Font ss:FontName="微軟正黑體, Microsoft JhengHei, Segoe UI" ss:Size="13" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#0F172A" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
  </Style>
  
  <!-- Subtitle Info Style -->
  <Style ss:ID="SubtitleBanner">
   <Font ss:FontName="微軟正黑體, Microsoft JhengHei, Segoe UI" ss:Size="9.5" ss:Color="#1E40AF" ss:Bold="1"/>
   <Interior ss:Color="#EFF6FF" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
  </Style>

  <!-- Header Column Style -->
  <Style ss:ID="ColHeader">
   <Font ss:FontName="微軟正黑體, Microsoft JhengHei, Segoe UI" ss:Size="10" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#2563EB" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#94A3B8"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#64748B"/>
   </Borders>
  </Style>

  <!-- Normal Data Row Style -->
  <Style ss:ID="DataCell">
   <Font ss:FontName="微軟正黑體, Microsoft JhengHei, Segoe UI" ss:Size="9.5" ss:Color="#1E293B"/>
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>

  <!-- Alternating Row Style -->
  <Style ss:ID="DataCellAlt">
   <Font ss:FontName="微軟正黑體, Microsoft JhengHei, Segoe UI" ss:Size="9.5" ss:Color="#1E293B"/>
   <Interior ss:Color="#F8FAFC" ss:Pattern="Solid"/>
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>

  <!-- Code/ID Cell Style -->
  <Style ss:ID="CodeCell">
   <Font ss:FontName="Segoe UI, Consolas" ss:Size="9.5" ss:Color="#1E293B" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Top"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>

  <!-- Mandatory Badge Style -->
  <Style ss:ID="MandatoryBadge">
   <Font ss:FontName="微軟正黑體, Microsoft JhengHei, Segoe UI" ss:Size="9" ss:Color="#166534" ss:Bold="1"/>
   <Interior ss:Color="#DCFCE7" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Top"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>

  <!-- Warning Box Style -->
  <Style ss:ID="WarningBox">
   <Font ss:FontName="微軟正黑體, Microsoft JhengHei, Segoe UI" ss:Size="9" ss:Color="#78350F"/>
   <Interior ss:Color="#FEF3C7" ss:Pattern="Solid"/>
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#D97706"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FCD34D"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FCD34D"/>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FCD34D"/>
   </Borders>
  </Style>
 </Styles>
`;

  // ==========================================
  // WORKSHEET 1: ISO 80369-20 Section .5 Mandatory 14 Test Report Items
  // ==========================================
  xml += ` <Worksheet ss:Name="14項法定報告檢核(Section .5)">
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Layout ss:Orientation="Landscape"/>
    <Header x:Margin="0.3"/>
    <Footer x:Margin="0.3"/>
    <PageMargins x:Left="0.4" x:Right="0.4" x:Top="0.5" x:Bottom="0.5"/>
   </PageSetup>
   <FitToPage/>
   <Print>
    <FitWidth>1</FitWidth>
    <FitHeight>0</FitHeight>
    <ValidPrinterInfo/>
   </Print>
  </WorksheetOptions>
  <Table>
   <Column ss:Width="55"/>  <!-- Code -->
   <Column ss:Width="100"/> <!-- Section .5 -->
   <Column ss:Width="160"/> <!-- EN Name -->
   <Column ss:Width="140"/> <!-- ZH Name -->
   <Column ss:Width="120"/> <!-- Mandatory -->
   <Column ss:Width="320"/> <!-- Instructions -->
   <Column ss:Width="260"/> <!-- Example -->
   <Column ss:Width="190"/> <!-- Lab Input -->

   <!-- Row 1: Title Banner -->
   <Row ss:Height="32">
    <Cell ss:MergeAcross="7" ss:StyleID="TitleBanner"><Data ss:Type="String">  ISO 80369-20:2024 Section .5 實驗室正式測試報告 14 大法定必填項目檢核表</Data></Cell>
   </Row>

   <!-- Row 2: Subtitle Info -->
   <Row ss:Height="24">
    <Cell ss:MergeAcross="7" ss:StyleID="SubtitleBanner"><Data ss:Type="String">  規範依據: ISO 80369-20:2024 Annex B.5 / C.5 / D.5 / E.5 / F.5 / G.5 | 大氣預處理: ${ISO20_ANNEX_A_PRECONDITIONING.tempC.target}±${ISO20_ANNEX_A_PRECONDITIONING.tempC.tolerance}°C, ${ISO20_ANNEX_A_PRECONDITIONING.rhPercent.target}±${ISO20_ANNEX_A_PRECONDITIONING.rhPercent.tolerance}% RH (≥24h) | 導出日期: ${currentDate}</Data></Cell>
   </Row>
   <Row ss:Height="10"></Row>

   <!-- Row 4: Column Headers -->
   <Row ss:Height="28">
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">項目代碼</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">ISO 條款 (a~n)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">欄位名稱 (EN)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">必填欄位名稱 (中文)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">法規強制程度</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">法規規範說明與指導</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">報告填寫範例說明</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">實驗室填報內容 (Lab Input)</Data></Cell>
   </Row>
`;

  ISO20_MANDATORY_REPORT_ITEMS.forEach((item, idx) => {
    const styleId = idx % 2 === 0 ? 'DataCell' : 'DataCellAlt';
    xml += `   <Row ss:Height="45">
    <Cell ss:StyleID="CodeCell"><Data ss:Type="String">${escapeXml(item.code)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">Section .5 (${escapeXml(item.id)})</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(item.titleEn)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(item.titleZh)}</Data></Cell>
    <Cell ss:StyleID="MandatoryBadge"><Data ss:Type="String">MANDATORY (法定必填)</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(item.descriptionZh)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(item.exampleValueZh)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String"></Data></Cell>
   </Row>
`;
  });

  xml += `   <Row ss:Height="12"></Row>
   <Row ss:Height="36">
    <Cell ss:MergeAcross="7" ss:StyleID="WarningBox"><Data ss:Type="String">📌 法規查核與認證審查注意事項 (Regulatory Compliance Warning):\n1. 缺少上述 a) 至 n) 任何一項內容，可能導致 TFDA、FDA (510k) 或 CE MDR 稽核員補件發問 (RFI) 或退件。\n2. 第 k) 項測試系統總積 V（系統內部容積）為 ISO 80369-20:2024 新版強制揭露項目，需搭配 Figure B.1 的測定方法標註。</Data></Cell>
   </Row>
  </Table>
 </Worksheet>
`;

  // ==========================================
  // WORKSHEET 2: ISO 80369-7 DVP Test Matrix
  // ==========================================
  xml += ` <Worksheet ss:Name="DVP驗證計畫矩陣表(ISO 7&amp;20)">
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Layout ss:Orientation="Landscape"/>
    <Header x:Margin="0.3"/>
    <Footer x:Margin="0.3"/>
    <PageMargins x:Left="0.4" x:Right="0.4" x:Top="0.5" x:Bottom="0.5"/>
   </PageSetup>
   <FitToPage/>
   <Print>
    <FitWidth>1</FitWidth>
    <FitHeight>0</FitHeight>
    <ValidPrinterInfo/>
   </Print>
  </WorksheetOptions>
  <Table>
   <Column ss:Width="65"/>  <!-- ID -->
   <Column ss:Width="160"/> <!-- Title -->
   <Column ss:Width="95"/>  <!-- Clause -->
   <Column ss:Width="95"/>  <!-- Annex -->
   <Column ss:Width="160"/> <!-- PreAssembly -->
   <Column ss:Width="160"/> <!-- ActiveLoad -->
   <Column ss:Width="110"/> <!-- HoldTime -->
   <Column ss:Width="160"/> <!-- RefConnector -->
   <Column ss:Width="210"/> <!-- WorstCase Rationale -->
   <Column ss:Width="260"/> <!-- PassCriteria -->

   <Row ss:Height="32">
    <Cell ss:MergeAcross="9" ss:StyleID="TitleBanner"><Data ss:Type="String">  ISO 80369-7:2021 &amp; ISO 80369-20:2024 完整設計驗證計畫 (DVP) 測試規範矩陣</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:MergeAcross="9" ss:StyleID="SubtitleBanner"><Data ss:Type="String">  受測產品對象: ${escapeXml(selectedGenderZh)} - ${escapeXml(selectedTypeZh)} | 導出日期: ${currentDate} | ISO 17025 合規對照表</Data></Cell>
   </Row>
   <Row ss:Height="10"></Row>

   <Row ss:Height="28">
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">條文 ID</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">測試名稱 &amp; 主題 (Test Title)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">ISO 80369-7 條文</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">ISO 80369-20 附錄</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">預裝配條件 (扭矩 / 推力)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">定量加載條件 (壓力/拉力/扭矩)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">持壓時間</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">指定金屬參考接頭 (Annex C)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">最壞情況選用理由 (Worst-Case Rationale)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">合格判定 Pass 標準</Data></Cell>
   </Row>
`;

  Object.values(ISO_CLAUSES)
    .filter(clause => clause.applicableTypes.includes(config.connectorType || 'lock'))
    .forEach((clause, idx) => {
      const styleId = idx % 2 === 0 ? 'DataCell' : 'DataCellAlt';
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
      const torqueStr = clause.assemblyTorqueNm ? `${clause.assemblyTorqueNm.min}–${clause.assemblyTorqueNm.max} N·m` : '';
      const forceStr = clause.assemblyAxialForceN ? `${clause.assemblyAxialForceN.min}–${clause.assemblyAxialForceN.max} N` : '';
      const preAssemblyStr = (torqueStr && forceStr)
        ? `${torqueStr} + ${forceStr}`
        : clause.id === '6.6'
        ? '直加破壞性過載扭矩 (無拉力預裝配)'
        : (torqueStr || forceStr || 'N/A');

      let activeLoadStr = 'N/A';
      if (clause.id === '6.1') activeLoadStr = '300–330 kPa (正壓)';
      else if (clause.id === '6.2') activeLoadStr = '80.0–88.0 kPa (真空負壓)';
      else if (clause.testTorqueNm) activeLoadStr = `${clause.testTorqueNm.min}–${clause.testTorqueNm.max} N·m (扭矩)`;
      else if (clause.testForceN) activeLoadStr = `${clause.testForceN.min}–${clause.testForceN.max} N (拉力)`;

      const holdTimeStr = clause.id === '6.3'
        ? '48 小時 (23°C 空氣)'
        : clause.holdTimeSec
        ? `${clause.holdTimeSec.min}–${clause.holdTimeSec.max} 秒`
        : 'N/A';

      xml += `   <Row ss:Height="40">
    <Cell ss:StyleID="CodeCell"><Data ss:Type="String">${escapeXml(clause.id)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(clause.titleZh)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">Clause ${escapeXml(clause.id)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">Annex ${escapeXml(clause.id === '6.1' ? 'B/C' : clause.id === '6.2' ? 'D' : clause.id === '6.3' ? 'E' : clause.id === '6.4' ? 'F' : clause.id === '6.5' ? 'G' : 'H')}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(preAssemblyStr)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(activeLoadStr)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(holdTimeStr)}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">Fig.${escapeXml(requiredRefId)} (${escapeXml(requiredRef?.nameZh || '')})</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(requiredRef?.isWorstCase ? '★ 強制最壞情況 (2.71mm 窄耳翼極限)' : '標稱標準接頭 (3.50mm 耳翼)')}</Data></Cell>
    <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(clause.passCriteriaZh)}</Data></Cell>
   </Row>
`;
    });

  xml += `  </Table>
 </Worksheet>
`;

  // ==========================================
  // WORKSHEET 3: Annex A Environmental Preconditioning Specifications
  // ==========================================
  xml += ` <Worksheet ss:Name="Annex A 大氣環境規格">
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Layout ss:Orientation="Landscape"/>
    <Header x:Margin="0.3"/>
    <Footer x:Margin="0.3"/>
    <PageMargins x:Left="0.4" x:Right="0.4" x:Top="0.5" x:Bottom="0.5"/>
   </PageSetup>
   <FitToPage/>
   <Print>
    <FitWidth>1</FitWidth>
    <FitHeight>0</FitHeight>
    <ValidPrinterInfo/>
   </Print>
  </WorksheetOptions>
  <Table>
   <Column ss:Width="110"/>
   <Column ss:Width="160"/>
   <Column ss:Width="110"/>
   <Column ss:Width="200"/>
   <Column ss:Width="360"/>

   <Row ss:Height="32">
    <Cell ss:MergeAcross="4" ss:StyleID="TitleBanner"><Data ss:Type="String">  ISO 80369-20:2024 Annex A 大氣預處理與環境測試條款規格</Data></Cell>
   </Row>
   <Row ss:Height="10"></Row>

   <Row ss:Height="28">
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">標準條款</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">管制項目</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">目標標準值</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">允許公差 / 範圍</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">強制規定與備註說明</Data></Cell>
   </Row>

   <Row ss:Height="30">
    <Cell ss:StyleID="CodeCell"><Data ss:Type="String">Annex A.3</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">環境試驗溫度</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">23.0 °C</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">± 2.0 °C (21.0 °C ~ 25.0 °C)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">測試全程必須維持於此溫度範圍，避免高溫引發塑膠蠕變 (Creep)。</Data></Cell>
   </Row>
   <Row ss:Height="30">
    <Cell ss:StyleID="CodeCell"><Data ss:Type="String">Annex A.3</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">相對濕度 (RH)</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">50.0 %</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">± 5.0 % (45.0 % ~ 55.0 %)</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">大氣濕度調節管制，防止親水高分子材料吸濕變形。</Data></Cell>
   </Row>
   <Row ss:Height="30">
    <Cell ss:StyleID="CodeCell"><Data ss:Type="String">Annex A.3</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">狀態調節時間</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">24 小時</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">≥ 24.0 小時</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">受測樣品與金屬參考接頭必須於測試前置靜置於標準大氣環境中。</Data></Cell>
   </Row>
   <Row ss:Height="30">
    <Cell ss:StyleID="CodeCell"><Data ss:Type="String">Clause 6.3</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">應力龜裂試驗環境</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">48 小時</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">48h ± 1h at 23±2°C</Data></Cell>
    <Cell ss:StyleID="DataCellAlt"><Data ss:Type="String">裝配後靜置於空氣或指定介質中 (ISO 80369-20 Annex E)。</Data></Cell>
   </Row>
  </Table>
 </Worksheet>
`;

  xml += `</Workbook>`;

  // Trigger download as .xls (XML Spreadsheet 2003) file in browser
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ISO_80369_Medical_Test_Report_and_DVP_Matrix_${currentDate}.xls`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return xml;
};
