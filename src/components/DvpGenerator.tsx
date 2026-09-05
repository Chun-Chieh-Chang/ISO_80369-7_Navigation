import React, { useState } from 'react';
import { ISO_CLAUSES, ISO20_MANDATORY_REPORT_ITEMS, ISO20_ANNEX_A_PRECONDITIONING } from '../data/isoData';
import { ConnectorGender, ConnectorType, TestConfigState, TestClauseId, ISOClauseInfo } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { getClauseSvgKey, getAnnexCFigure } from '../utils/isoHelpers';
import { exportMedicalGradeExcelReport } from '../utils/excelExporter';
import { useLanguage } from '../i18n/LanguageContext';
import { FileSpreadsheet, Eye, Info, FileCheck, Download, Calendar, ShieldCheck, Thermometer, FileText } from 'lucide-react';

interface DvpGeneratorProps {
  config: TestConfigState;
  setConfig: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const DvpGenerator: React.FC<DvpGeneratorProps> = ({ config, setConfig }) => {
  const { language, t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'report_checklist'>('matrix');
  const selectedGender = config.connectorGender || 'male';
  const selectedType = config.connectorType || 'lock';

  const setSelectedGender = (gender: ConnectorGender) => setConfig(prev => ({ ...prev, connectorGender: gender }));
  const setSelectedType = (type: ConnectorType) => setConfig(prev => ({ ...prev, connectorType: type }));
  const setSelectedClause = (clauseId: TestClauseId) => setConfig(prev => ({ ...prev, selectedClauseId: clauseId }));

  const activeClauseObj = ISO_CLAUSES[config.selectedClauseId || '6.1'];
  const activeSvgKey = getClauseSvgKey(config.selectedClauseId || '6.1');
  const activeFigInfo = getAnnexCFigure(activeSvgKey);

  const exportReportChecklistCSV = () => {
    const isEn = language === 'en';
    const headers = isEn
      ? ['Item', 'ISO Clause (a~n)', 'Field Name (EN)', 'Regulatory Requirement & Details', 'Example Value / Format']
      : ['項目編號', 'ISO 條款 (a~n)', '必填欄位名稱 (EN)', '必填欄位中文', '法規規範與範例說明'];

    const rows = ISO20_MANDATORY_REPORT_ITEMS.map(item => [
      item.code,
      `Section .5 (${item.id})`,
      `"${item.titleEn}"`,
      isEn ? `"${item.descriptionEn || item.descriptionZh}"` : `"${item.titleZh}"`,
      isEn ? `"${item.exampleValueEn || item.exampleValueZh}"` : `"${item.exampleValueZh}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isEn
      ? `ISO_80369_20_Test_Report_14_Mandatory_Elements.csv`
      : `ISO_80369_20_測試報告_14大必填項目檢核表.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Returns the pre-assembly label for a clause.
   * ISO 80369-20 Annex H.4 requires pre-assembly (0.08–0.12 N·m + 26.5–27.5 N, hold 5–6 s, release)
   * for ALL tests including 6.6.
   */
  const renderPreAssembly = (clause: ISOClauseInfo) => (
    <div>
      <div className="font-semibold text-slate-800">
        <span className="text-slate-500 font-normal">{language === 'en' ? 'Torque: ' : '扭矩: '}</span>
        {clause.assemblyTorqueNm?.min ?? 0.08}–{clause.assemblyTorqueNm?.max ?? 0.12} N·m
      </div>
      <div className="text-[11px] text-blue-700 font-bold">
        + <span className="font-normal text-blue-600">{language === 'en' ? 'Axial Force: ' : '軸向推力: '}</span>26.5–27.5 N
      </div>
      <div className="text-[10px] text-blue-900 font-semibold bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block border border-blue-200">
        {t.dvp.releaseBadge}
      </div>
    </div>
  );

  /**
   * Returns the hold-time label.
   * Clause 6.1 has two independent methods:
   *   - 6.1.2 (pressure decay / 氣壓法): hold 15–20 s
   *   - 6.1.3 (positive liquid pressure / 水壓法): hold 30–35 s
   * They are "either/or" (ISO 80369-7 6.1.1).
   */
  const renderHoldTime = (clause: ISOClauseInfo) => {
    if (clause.id === '6.1') {
      return (
        <div className="space-y-1">
          <div><span className="font-bold">{t.dvp.pressureDecay}</span>15–20 {t.dvp.seconds}</div>
          <div><span className="font-bold">{t.dvp.hydraulicPressure}</span>30–35 {t.dvp.seconds}</div>
          <div className="text-[10px] text-blue-600 font-bold bg-blue-50/60 px-1 py-0.5 rounded border border-blue-100 inline-block">
            {t.dvp.chooseOne}
          </div>
        </div>
      );
    }
    if (clause.id === '6.3') {
      return (
        <div>
          <div className="font-bold text-slate-900">{t.dvp.airRest48h}</div>
          <div className="text-[10px] text-slate-500">{t.dvp.airRest48hSub}</div>
        </div>
      );
    }
    return (
      <div>
        <div className="font-bold text-slate-900">{clause.holdTimeSec.min}–{clause.holdTimeSec.max} {t.dvp.seconds}</div>
      </div>
    );
  };

  /**
   * Returns the test-load label, with L1/L2 differentiation for clause 6.4.
   */
  const renderTestLoad = (clause: ISOClauseInfo) => {
    if (clause.id === '6.1') {
      return (
        <div>
          <div className="font-bold text-slate-900">300–330 kPa</div>
          <div className="text-[10px] text-slate-500">
            {language === 'en' ? 'Hydraulic or Pneumatic (Either/Or)' : '水壓或氣壓 (二選一)'}
          </div>
        </div>
      );
    }
    if (clause.id === '6.2') {
      return (
        <div>
          <div className="font-bold text-slate-900">80.0–88.0 kPa</div>
          <div className="text-[10px] text-slate-500">{t.dvp.vacuumPressureLabel}</div>
        </div>
      );
    }
    if (clause.id === '6.3') {
      return (
        <div>
          <div className="font-bold text-slate-900">N/A</div>
          <div className="text-[10px] text-slate-500">{t.dvp.airRestLabel}</div>
        </div>
      );
    }
    if (clause.id === '6.4') {
      return selectedType === 'slip' ? (
        <div>
          <div className="font-bold text-blue-700">23–25 N</div>
          <div className="text-[10px] text-slate-500">{t.dvp.slipForceLabel}</div>
        </div>
      ) : (
        <div>
          <div className="font-bold text-indigo-700">32–35 N</div>
          <div className="text-[10px] text-slate-500">{t.dvp.lockForceLabel}</div>
        </div>
      );
    }
    if (clause.id === '6.5') {
      return (
        <div>
          <div className="font-bold text-slate-900">0.018–0.020 N·m</div>
          <div className="text-[10px] text-slate-500">{t.dvp.unscrewingTorqueLabel}</div>
        </div>
      );
    }
    if (clause.id === '6.6') {
      return (
        <div>
          <div className="font-bold text-slate-900">0.15–0.17 N·m</div>
          <div className="text-[10px] text-slate-500">{t.dvp.pureTorqueLabel}</div>
        </div>
      );
    }
    return 'N/A';
  };

  /**
   * Returns the pass-criteria label with Clause 6.6 correction & 6.4 dynamic filtering:
   * - Append "且接頭無歪斜 (No cocking)（ISO 80369-20 Annex H.4 d）"
   * - Clause 6.3: only leak test, no visual crack requirement
   */
  const renderPassCriteria = (clause: ISOClauseInfo) => {
    if (language === 'en') {
      if (clause.id === '6.4') {
        return selectedType === 'slip'
          ? 'Shall not separate from the reference connector when subjected to an axial force of 23 N to 25 N for 10 s to 15 s.'
          : 'Shall not separate from the reference connector when subjected to an axial force of 32 N to 35 N for 10 s to 15 s.';
      }
      if (clause.id === '6.6') {
        return 'Shall not override the threads or lugs when subjected to a torque of 0.15 N·m to 0.17 N·m for 5 s to 10 s, and no cocking shall occur (ISO 80369-20 Annex H.4 d).';
      }
      if (clause.id === '6.3') {
        return 'Condition assembled to reference connector for 48 h per ISO 80369-20 Annex E, then meet Clause 6.1.1 leakage requirements.';
      }
      return clause.passCriteria;
    }

    // Chinese (Default)
    if (clause.id === '6.4') {
      return selectedType === 'slip'
        ? '在 23 N–25 N（Slip 滑動型）軸向拉力下維持 10–15 秒，接頭不得脫開分離。'
        : '在 32 N–35 N（Lock 鎖定型）軸向拉力下維持 10–15 秒，接頭不得脫開分離。';
    }
    if (clause.id === '6.6') {
      return '施加 0.15 N·m–0.17 N·m 破壞性扭矩維持 5–10 秒，螺紋或耳翼不得越過滑脫（不滑牙），且接頭無歪斜 (No cocking)（ISO 80369-20 Annex H.4 d）。';
    }
    if (clause.id === '6.3') {
      return '依 ISO 80369-20 Annex E 裝配於金屬參考接頭於環境中靜置 48 小時後，依 6.1.1 執行洩漏測試並符合其要求。';
    }
    return clause.passCriteriaZh;
  };

  return (
    <div className="space-y-6 print:space-y-2">
      {/* Subtab Bar (Hidden when printing) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSubTab('matrix')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeSubTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t.dvp.subtabMatrix}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('report_checklist')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
                activeSubTab === 'report_checklist'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{t.dvp.subtabChecklist}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportMedicalGradeExcelReport(config, language)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t.dvp.exportExcel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* View 1: DVP Test Matrix */}
      {activeSubTab === 'matrix' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 print:border-none print:shadow-none">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t.dvp.planTitle}</span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {t.dvp.matrixHeading}
              </h2>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs print:hidden w-full sm:w-auto">
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value as ConnectorGender)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer min-h-[42px] flex-1 sm:flex-initial"
              >
                <option value="male">{t.dvp.filterGenderMale}</option>
                <option value="female">{t.dvp.filterGenderFemale}</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ConnectorType)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer min-h-[42px] flex-1 sm:flex-initial"
              >
                <option value="lock">{t.dvp.filterTypeLock}</option>
                <option value="slip">{t.dvp.filterTypeSlip}</option>
              </select>
            </div>
          </div>

          {/* DVP Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold">
                  <th className="p-3 rounded-tl-xl border border-slate-200">{t.dvp.colClause}</th>
                  <th className="p-3 border border-slate-200">{t.dvp.colTestTitle}</th>
                  <th className="p-3 border border-slate-200">
                    <div>{t.dvp.colPreAssembly}</div>
                    <span className="text-[10px] text-blue-600 font-normal block normal-case">{t.dvp.colPreAssemblySub}</span>
                  </th>
                  <th className="p-3 border border-slate-200">
                    <div>{t.dvp.colTestLoad}</div>
                    <span className="text-[10px] text-indigo-700 font-normal block normal-case">{t.dvp.colTestLoadSub}</span>
                  </th>
                  <th className="p-3 border border-slate-200">{t.dvp.colHoldTime}</th>
                  <th className="p-3 border border-slate-200">{t.dvp.colReferenceFixture}</th>
                  <th className="p-3 rounded-tr-xl border border-slate-200">{t.dvp.colPassCriteria}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                {Object.values(ISO_CLAUSES)
                  .filter(c => c.applicableTypes.includes(selectedType))
                  .map((clause) => {
                    // Helper to get exact standard ISO 80369-7 Annex C reference connector
                    let requiredRefId = 'C.1';
                    if (selectedGender === 'male') {
                      // Testing Male Luer product -> Requires Female Reference Connector (C.1, C.3, or C.5)
                      if (selectedType === 'slip') {
                        requiredRefId = 'C.5'; // Female Reference Luer Slip
                      } else {
                        requiredRefId = (clause.id === '6.4' || clause.id === '6.6') ? 'C.3' : 'C.1';
                      }
                    } else {
                      // Testing Female Luer product -> Requires Male Reference Connector (C.2, C.4, or C.6)
                      if (selectedType === 'slip') {
                        requiredRefId = 'C.2'; // Male Reference Luer Slip
                      } else {
                        requiredRefId = (clause.id === '6.4' || clause.id === '6.6') ? 'C.6' : 'C.4';
                      }
                    }

                    const requiredRef = getAnnexCFigure(requiredRefId);
                    const refLabel = language === 'en'
                      ? (requiredRefId === 'C.3' ? 'Female Worst-case 2.71mm'
                        : requiredRefId === 'C.6' ? 'Male Worst-case'
                        : requiredRefId === 'C.5' ? 'Female Slip Nominal'
                        : requiredRefId === 'C.2' ? 'Male Slip Nominal'
                        : requiredRefId === 'C.1' ? 'Female Lock Nominal 3.50mm'
                        : 'Male Lock Nominal')
                      : (requiredRefId === 'C.3' ? '母最壞情況 2.71mm'
                        : requiredRefId === 'C.6' ? '公最壞情況'
                        : requiredRefId === 'C.5' ? '母滑動標稱'
                        : requiredRefId === 'C.2' ? '公滑動標稱'
                        : requiredRefId === 'C.1' ? '母鎖定標稱 3.50mm'
                        : '公鎖定標稱');

                    const isActiveClause = clause.id === config.selectedClauseId;
                    return (
                      <tr 
                        key={clause.id} 
                        onClick={() => setSelectedClause(clause.id as TestClauseId)}
                        className={`cursor-pointer transition ${
                          isActiveClause ? 'bg-blue-50/90 font-semibold text-blue-900 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3 font-bold text-blue-600 font-mono border border-slate-200">
                          {clause.id}
                        </td>
                        <td className="p-3 border border-slate-200 font-bold">
                          {language === 'en' ? clause.title : clause.titleZh}
                        </td>
                        <td className="p-3 border border-slate-200 font-mono">
                          {renderPreAssembly(clause)}
                        </td>
                        <td className="p-3 border border-slate-200 font-mono">
                          {renderTestLoad(clause)}
                        </td>
                        <td className="p-3 border border-slate-200 font-mono">
                          {renderHoldTime(clause)}
                        </td>
                        <td className="p-3 border border-slate-200 font-bold">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            requiredRef?.isWorstCase ? 'bg-rose-100 text-rose-800 font-black border border-rose-300' : 'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            Fig.{requiredRefId} ({refLabel})
                          </span>
                        </td>
                        <td className="p-3 border border-slate-200 text-slate-700 leading-tight text-xs">
                          {renderPassCriteria(clause)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Active Clause Embedded Diagram Section */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-3 print:hidden">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
                {language === 'en' ? `Clause ${config.selectedClauseId} Test Fixture Diagram` : `Clause ${config.selectedClauseId} 內嵌規範圖示 (SVG CAD)`}
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                【{language === 'en' ? activeClauseObj?.title : activeClauseObj?.titleZh}】{language === 'en' ? 'Apparatus & Fixture Layout' : '對應 ISO 80369-20 實驗裝置圖解'}
              </h3>
            </div>

            <div className="w-full flex justify-center py-2">
              <ISOStandardFigureRenderer
                svgKey={activeSvgKey}
                titleZh={activeFigInfo?.nameZh || activeClauseObj?.titleZh || ''}
                titleEn={activeFigInfo?.name || activeClauseObj?.title || ''}
                standard={activeFigInfo?.standardOwner || 'ISO 80369-20:2024'}
                figureTypeZh={activeFigInfo?.annexGroup || '測試方法圖解'}
                descriptionZh={activeFigInfo?.descriptionZh || activeClauseObj?.passCriteriaZh || ''}
                keyCallouts={activeFigInfo?.svgHighlights}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800">{t.dvp.auditNotesTitle}</div>
            <p>{t.dvp.auditNote1}</p>
            <p>{t.dvp.auditNote2}</p>
            <p className="text-rose-600 font-bold mt-1">{t.dvp.auditNote3}</p>
          </div>
        </div>
      ) : (
        /* View 2: ISO 80369-20 Section .5 Mandatory 14 Test Report Reporting Elements (a ~ n) Checklist */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-600 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-md">
                  ISO 80369-20:2024 Section .5
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[12px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  {language === 'en' ? 'Mandatory 14 Reporting Items (a ~ n)' : '法規強制 14 大必填欄位 (a ~ n)'}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {t.dvp.checklistTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t.dvp.checklistDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => exportMedicalGradeExcelReport(config, language)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{t.dvp.exportExcel}</span>
              </button>

              <button
                onClick={exportReportChecklistCSV}
                className="flex items-center space-x-2 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200"
              >
                <Download className="w-4 h-4" />
                <span>{t.dvp.exportCsv}</span>
              </button>
            </div>
          </div>

          {/* Annex A Environmental Preconditioning Highlight Banner */}
          <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-sm text-blue-950">
                    {language === 'en' ? 'Clause 4 / Section .2 Environmental Conditioning' : ISO20_ANNEX_A_PRECONDITIONING.titleZh}
                  </span>
                  <span className="bg-blue-600 text-white font-mono text-[11px] px-2 py-0.5 rounded font-bold">{ISO20_ANNEX_A_PRECONDITIONING.standard}</span>
                </div>
                <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                  {language === 'en' 
                    ? 'Prior to testing, test specimens shall be conditioned for not less than 24 h at (20 ± 5) °C and (50 ± 10) % relative humidity in accordance with ISO 80369-20:2024 Clause 4 and Section .2 (B.2, C.2, D.2, E.2, F.2, G.2, H.2).'
                    : ISO20_ANNEX_A_PRECONDITIONING.descriptionZh}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 bg-white/90 p-3 rounded-xl border border-blue-200 text-xs font-mono font-bold text-slate-800 shadow-2xs">
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-500 block">{language === 'en' ? 'Standard Temp' : '標準溫度'}</span>
                <span className="text-blue-700 font-extrabold text-sm">20 ± 5 °C</span>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-500 block">{language === 'en' ? 'Relative Humidity' : '標準相對濕度'}</span>
                <span className="text-indigo-700 font-extrabold text-sm">50 ± 10 % RH</span>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-500 block">{language === 'en' ? 'Conditioning Time' : '前置靜置時間'}</span>
                <span className="text-emerald-700 font-extrabold text-sm">≥ 24 Hours</span>
              </div>
            </div>
          </div>

          {/* 14 Mandatory Reporting Elements Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ISO20_MANDATORY_REPORT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-2.5 shadow-2xs hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-extrabold text-xs flex items-center justify-center shadow-2xs">
                      {item.code}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {language === 'en' ? item.titleEn : item.titleZh}
                      </h4>
                      {language !== 'en' && (
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">{item.titleEn}</span>
                      )}
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {language === 'en' ? 'Section .5 Mandatory' : '必填 Section .5'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en' ? (item.descriptionEn || item.descriptionZh) : item.descriptionZh}
                </p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block mb-0.5 text-[11px]">
                    {language === 'en' ? '📝 Example Value / Compliance Format:' : '📝 報告填寫實例 / 範例說明:'}
                  </span>
                  <span className="font-mono text-slate-800 font-semibold">
                    {language === 'en' ? (item.exampleValueEn || item.exampleValueZh) : item.exampleValueZh}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center space-x-1.5 text-amber-950">
              <Info className="w-4 h-4 text-amber-600" />
              <span>{language === 'en' ? 'Regulatory Compliance & Audit Warning:' : '法規查核與認證審查注意事項 (Regulatory Compliance Warning):'}</span>
            </div>
            {language === 'en' ? (
              <>
                <p>1. Omission of any item from a) through n) may result in a Request for Information (RFI) or rejection from FDA (510k), CE MDR notified bodies, or TFDA reviewers.</p>
                <p>2. Item k) Total test system volume V is a mandatory disclosure in ISO 80369-20:2024, evaluated in accordance with Figure B.1 methodology.</p>
              </>
            ) : (
              <>
                <p>1. 缺少上述 a) 至 n) 任何一項內容，可能導致 TFDA、FDA (510k) 或 CE MDR 稽核員補件發問 (RFI) 或退件。</p>
                <p>2. 第 k) 項測試系統總積 V（系統內部容積）為 ISO 80369-20:2024 新版強制揭露項目，需搭配 Figure B.1 的測定方法標註。</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
