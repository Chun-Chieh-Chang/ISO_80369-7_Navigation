import React from 'react';
import { ISO_CLAUSES } from '../data/isoData';
import { ConnectorGender, ConnectorType, TestConfigState, TestClauseId } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { getClauseSvgKey, getAnnexCFigure } from '../utils/isoHelpers';
import { FileSpreadsheet, Eye, Info } from 'lucide-react';

interface DvpGeneratorProps {
  config: TestConfigState;
  setConfig: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const DvpGenerator: React.FC<DvpGeneratorProps> = ({ config, setConfig }) => {
  const selectedGender = config.connectorGender || 'male';
  const selectedType = config.connectorType || 'lock';

  const setSelectedGender = (gender: ConnectorGender) => setConfig(prev => ({ ...prev, connectorGender: gender }));
  const setSelectedType = (type: ConnectorType) => setConfig(prev => ({ ...prev, connectorType: type }));
  const setSelectedClause = (clauseId: TestClauseId) => setConfig(prev => ({ ...prev, selectedClauseId: clauseId }));

  const activeClauseObj = ISO_CLAUSES[config.selectedClauseId || '6.1'];
  const activeSvgKey = getClauseSvgKey(config.selectedClauseId || '6.1');
  const activeFigInfo = getAnnexCFigure(activeSvgKey);

  return (
    <div className="space-y-6 print:space-y-2">
      {/* Subtab Bar (Hidden when printing) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 bg-blue-600 text-white shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>DVP 設計驗證矩陣表 (ISO 80369-7 Test Matrix)</span>
            </button>
          </div>
        </div>
      </div>

      {/* View 1: DVP Test Matrix */}
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
                    <span className="text-[10px] text-purple-600 font-normal block normal-case">實測考驗負載</span>
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
                          {clause.assemblyTorqueNm.max > 0 ? (
                            <div>
                              <div>{clause.assemblyTorqueNm.min}–{clause.assemblyTorqueNm.max} N·m</div>
                              {clause.assemblyAxialForceN && (
                                <div className="text-[11px] text-blue-700 font-bold">+ {clause.assemblyAxialForceN.min}–{clause.assemblyAxialForceN.max} N (推力)</div>
                              )}
                            </div>
                          ) : '直加破壞扭矩'}
                        </td>
                        <td className="p-3 border border-slate-200 font-mono">
                          {clause.id === '6.1' ? '300–330 kPa' : clause.id === '6.2' ? '80.0–88.0 kPa (真空)' : clause.testTorqueNm
                            ? `${clause.testTorqueNm.min}–${clause.testTorqueNm.max} N·m`
                            : clause.testForceN
                            ? `${clause.testForceN.min}–${clause.testForceN.max} N`
                            : 'N/A'}
                        </td>
                        <td className="p-3 border border-slate-200 font-mono">
                          {clause.id === '6.3' ? '48 小時' : `${clause.holdTimeSec.min}–${clause.holdTimeSec.max} 秒`}
                        </td>
                        <td className="p-3 border border-slate-200 font-bold">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            requiredRef?.isWorstCase ? 'bg-rose-100 text-rose-800 font-black border border-rose-300' : 'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            Fig.{requiredRefId} ({refLabel})
                          </span>
                        </td>
                        <td className="p-3 border border-slate-200 text-slate-700 leading-tight text-xs">
                          {clause.passCriteriaZh}
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
    </div>
  );
};
