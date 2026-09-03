import React, { useState } from 'react';
import { ISO_CLAUSES, ISO20_MANDATORY_REPORT_ITEMS, ISO20_ANNEX_A_PRECONDITIONING } from '../data/isoData';
import { ConnectorGender, ConnectorType, TestConfigState, TestClauseId, ISOClauseInfo } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { getClauseSvgKey, getAnnexCFigure } from '../utils/isoHelpers';
import { exportMedicalGradeExcelReport } from '../utils/excelExporter';
import { FileSpreadsheet, Eye, Info, FileCheck, Download, Calendar, ShieldCheck, Thermometer, FileText } from 'lucide-react';

interface DvpGeneratorProps {
  config: TestConfigState;
  setConfig: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const DvpGenerator: React.FC<DvpGeneratorProps> = ({ config, setConfig }) => {
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
    const headers = ['項目編號', 'ISO 條款 (a~n)', '必填欄位名稱 (EN)', '必填欄位中文', '法規規範與範例說明'];
    const rows = ISO20_MANDATORY_REPORT_ITEMS.map(item => [
      item.code,
      `Section .5 (${item.id})`,
      `"${item.titleEn}"`,
      `"${item.titleZh}"`,
      `"${item.exampleValueZh}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ISO_80369_20_Test_Report_14_Mandatory_Elements.csv`;
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
      <div>{clause.assemblyTorqueNm?.min ?? 0.08}–{clause.assemblyTorqueNm?.max ?? 0.12} N·m</div>
      <div className="text-[11px] text-blue-700 font-bold">+ 26.5–27.5 N (推力)</div>
      <div className="text-[10px] text-blue-900 font-semibold bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block border border-blue-200">
        維持 5–6 秒後釋放 (Release)
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
          <div><span className="font-bold">氣壓法：</span>15–20 秒</div>
          <div><span className="font-bold">水壓法：</span>30–35 秒</div>
          <div className="text-[10px] text-blue-600 font-bold bg-blue-50/60 px-1 py-0.5 rounded border border-blue-100 inline-block">
            (二選一執行)
          </div>
        </div>
      );
    }
    if (clause.id === '6.3') {
      return (
        <div>
          <div className="font-bold text-slate-900">48 小時</div>
          <div className="text-[10px] text-slate-500">23°C 空氣靜置</div>
        </div>
      );
    }
    return (
      <div>
        <div className="font-bold text-slate-900">{clause.holdTimeSec.min}–{clause.holdTimeSec.max} 秒</div>
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
          <div className="text-[10px] text-slate-500">水壓或氣壓 (二選一)</div>
        </div>
      );
    }
    if (clause.id === '6.2') {
      return (
        <div>
          <div className="font-bold text-slate-900">80.0–88.0 kPa</div>
          <div className="text-[10px] text-slate-500">負壓真空</div>
        </div>
      );
    }
    if (clause.id === '6.3') {
      return (
        <div>
          <div className="font-bold text-slate-900">N/A</div>
          <div className="text-[10px] text-slate-500">靜置48h後測6.1.1</div>
        </div>
      );
    }
    if (clause.id === '6.4') {
      return selectedType === 'slip' ? (
        <div>
          <div className="font-bold text-blue-700">23–25 N</div>
          <div className="text-[10px] text-slate-500">滑動型 (L1) 專用拉力</div>
        </div>
      ) : (
        <div>
          <div className="font-bold text-indigo-700">32–35 N</div>
          <div className="text-[10px] text-slate-500">鎖定型 (L2) 專用拉力</div>
        </div>
      );
    }
    if (clause.id === '6.5') {
      return (
        <div>
          <div className="font-bold text-slate-900">0.018–0.020 N·m</div>
          <div className="text-[10px] text-slate-500">反向旋鬆扭矩</div>
        </div>
      );
    }
    if (clause.id === '6.6') {
      return (
        <div>
          <div className="font-bold text-slate-900">0.15–0.17 N·m</div>
          <div className="text-[10px] text-slate-500">純扭矩 (無其他方向外力)</div>
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
              <span>📋 DVP 設計驗證矩陣表 (ISO 80369-7 Test Matrix)</span>
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
              <span>📄 ISO 80369-20 附錄 Section .5 測試報告 14 大必填項目 (a~n) 檢核</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportMedicalGradeExcelReport(config)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>📊 匯出專業 Excel 報告工作簿 (.xlsx)</span>
            </button>
          </div>
        </div>
      </div>

      {/* View 1: DVP Test Matrix */}
      {activeSubTab === 'matrix' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 print:border-none print:shadow-none">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Design Verification Plan (DVP)</span>
              <h2 className="text-xl font-extrabold text-slate-900">
                ISO 80369-7:2021 完整設計驗證測試規範矩陣 (Test Matrix)
              </h2>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs print:hidden w-full sm:w-auto">
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value as ConnectorGender)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer min-h-[42px] flex-1 sm:flex-initial"
              >
                <option value="male">♂️ 公接頭 (Male Luer)</option>
                <option value="female">♀️ 母接頭 (Female Luer)</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ConnectorType)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer min-h-[42px] flex-1 sm:flex-initial"
              >
                <option value="lock">🔒 鎖定式 (L2 Lock)</option>
                <option value="slip">💧 滑動式 (L1 Slip)</option>
              </select>
            </div>
          </div>

          {/* DVP Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold">
                  <th className="p-3 rounded-tl-xl border border-slate-200">條款 (Clause)</th>
                  <th className="p-3 border border-slate-200">測試項目 (Test Title)</th>
                  <th className="p-3 border border-slate-200">
                    <div>預裝配條件 (扭矩 / 軸向推力)</div>
                    <span className="text-[10px] text-blue-600 font-normal block normal-case">前置準備條件</span>
                  </th>
                  <th className="p-3 border border-slate-200">
                    <div>定量加載考驗 (壓力/拉力/扭矩)</div>
                    <span className="text-[10px] text-indigo-700 font-normal block normal-case">實測考驗負載</span>
                  </th>
                  <th className="p-3 border border-slate-200">保持時間 (Hold Time)</th>
                  <th className="p-3 border border-slate-200">指定金屬參考接頭</th>
                  <th className="p-3 rounded-tr-xl border border-slate-200">允收標準 (Pass Criteria)</th>
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
                    const refLabel = requiredRefId === 'C.3' 
                      ? '母最壞情況 2.71mm' 
                      : requiredRefId === 'C.6' 
                      ? '公最壞情況' 
                      : requiredRefId === 'C.5' 
                      ? '母滑動標稱' 
                      : requiredRefId === 'C.2' 
                      ? '公滑動標稱' 
                      : requiredRefId === 'C.1' 
                      ? '母鎖定標稱 3.50mm' 
                      : '公鎖定標稱';

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
                          {clause.titleZh}
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
                Clause {config.selectedClauseId} 內嵌規範圖示 (SVG CAD / 3D Render)
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                【{activeClauseObj?.titleZh}】對應 ISO 80369-20 實驗裝置圖解
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
            <div className="font-bold text-slate-800">📌 DVP 審查注意事項 (Audit Notes):</div>
            <p>1. 第 6.6 節抗過旋測試與第 6.4 節抗拉拔測試，標準強制規定必須採用 Fig.C.3 最壞情況（2.71 mm 耳翼）參考接頭。</p>
            <p>2. 6.1/6.2 洩漏與 6.3 龜裂測試，採標稱 Fig.C.1（3.50 mm 耳翼）接頭，用以隔離密封面變量。</p>
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
                  法規強制 14 大必填欄位 (a ~ n)
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                實驗室正式測試報告 (Test Report) 14 大必備項目與範例清單
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                依據 ISO 80369-20:2024 附錄 B.5、C.5、D.5、E.5、F.5、G.5 之嚴格規定，第三方實驗室與內部測試報告必須完整揭露下列 14 項法定內容。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => exportMedicalGradeExcelReport(config)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>匯出專業 Excel 報告工作簿 (.xlsx)</span>
              </button>

              <button
                onClick={exportReportChecklistCSV}
                className="flex items-center space-x-2 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200"
              >
                <Download className="w-4 h-4" />
                <span>匯出 CSV</span>
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
                  <span className="font-extrabold text-sm text-blue-950">{ISO20_ANNEX_A_PRECONDITIONING.titleZh}</span>
                  <span className="bg-blue-600 text-white font-mono text-[11px] px-2 py-0.5 rounded font-bold">{ISO20_ANNEX_A_PRECONDITIONING.standard}</span>
                </div>
                <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                  {ISO20_ANNEX_A_PRECONDITIONING.descriptionZh}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 bg-white/90 p-3 rounded-xl border border-blue-200 text-xs font-mono font-bold text-slate-800 shadow-2xs">
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-500 block">標準溫度</span>
                <span className="text-blue-700 font-extrabold text-sm">23 ± 2 °C</span>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-500 block">標準相對濕度</span>
                <span className="text-indigo-700 font-extrabold text-sm">50 ± 5 % RH</span>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-500 block">前置靜置時間</span>
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
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.titleZh}</h4>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">{item.titleEn}</span>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    必填 Section .5
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.descriptionZh}
                </p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block mb-0.5 text-[11px]">📝 報告填寫實例 / 範例說明:</span>
                  <span className="font-mono text-slate-800 font-semibold">{item.exampleValueZh}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center space-x-1.5 text-amber-950">
              <Info className="w-4 h-4 text-amber-600" />
              <span>法規查核與認證審查注意事項 (Regulatory Compliance Warning):</span>
            </div>
            <p>1. 缺少上述 a) 至 n) 任何一項內容，可能導致 TFDA、FDA (510k) 或 CE MDR 稽核員補件發問 (RFI) 或退件。</p>
            <p>2. 第 k) 項測試系統總積 V（系統內部容積）為 ISO 80369-20:2024 新版強制揭露項目，需搭配 Figure B.1 的測定方法標註。</p>
          </div>
        </div>
      )}
    </div>
  );
};
