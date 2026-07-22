import React, { useState } from 'react';
import { ANNEX_C_FIGURES, ISO_CLAUSES } from '../data/isoData';
import { AnnexCFigureId, TestConfigState } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { Eye, ShieldAlert, Layers, Ruler, FileCode, CheckCircle2 } from 'lucide-react';

interface ConnectorInspectorProps {
  config: TestConfigState;
  setConfig: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const ConnectorInspector: React.FC<ConnectorInspectorProps> = ({ config, setConfig }) => {
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'ISO 80369-7' | 'ISO 80369-20' | 'Annex A' | 'Annex B' | 'Annex C'>('all');
  const selectedFigId = config.selectedRefConnectorId || 'C.3';
  const selectedFig = ANNEX_C_FIGURES[selectedFigId] || ANNEX_C_FIGURES['C.3'];

  const handleSelectFig = (figId: AnnexCFigureId) => {
    setConfig(prev => ({
      ...prev,
      selectedRefConnectorId: figId
    }));
  };

  const filteredFigures = Object.values(ANNEX_C_FIGURES).filter(fig => {
    if (selectedGroup === 'all') return fig.annexGroup !== 'Commercial';
    if (selectedGroup === 'ISO 80369-7') return fig.annexGroup === 'Annex A' || fig.annexGroup === 'Annex B' || fig.annexGroup === 'Annex C';
    if (selectedGroup === 'ISO 80369-20') return fig.annexGroup === 'ISO 80369-20';
    return fig.annexGroup === selectedGroup;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                ISO 80369 雙標準全圖號庫
              </span>
              <h2 className="text-lg font-bold">ISO 80369-7 與 ISO 80369-20 規範附件圖號庫 (Fig. A.1 ~ K.1)</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              收錄完整規範圖號：<strong className="text-blue-600">ISO 80369-7 Annex A/B/C</strong> (防誤插矩陣、產品 CAD 尺寸、金屬參考夾具) 與 <strong className="text-purple-600">ISO 80369-20 Annex B~K</strong> (測試方法裝置與機台圖)。
            </p>
          </div>

          {/* Group Filter Tabs */}
          <div className="flex items-center space-x-1.5 text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex-wrap gap-y-1">
            {[
              { id: 'all', label: '全部圖號 (All)' },
              { id: 'ISO 80369-7', label: '📘 80369-7 規格圖 (全)' },
              { id: 'Annex B', label: '📐 80369-7 Annex B 產品CAD圖' },
              { id: 'Annex C', label: '🔧 80369-7 Annex C 金屬夾具圖' },
              { id: 'ISO 80369-20', label: '🔬 80369-20 測試機台與裝置' }
            ].map(group => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id as any)}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                  selectedGroup === group.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* Figure Selector Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 no-scrollbar">
          {filteredFigures.map((fig) => {
            const isSelected = selectedFigId === fig.id;
            return (
              <button
                key={fig.id}
                onClick={() => handleSelectFig(fig.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 border whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="font-mono">{fig.figureNumber}</span>
                <span className="text-xs opacity-80">({fig.annexGroup})</span>
                {fig.isWorstCase && <span className="bg-rose-500/80 text-white text-xs px-1.5 py-0.5 rounded">Worst-Case</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: High-Precision Vector Interactive Renderer */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-slate-400 font-mono flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5 text-blue-400" /> CAD Drawing ID: ISO_80369_7_{selectedFig.annexGroup.replace(' ', '_')}_{selectedFig.id}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              selectedFig.isWorstCase ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}>
              {selectedFig.isWorstCase ? '🚨 極限最壞情況 (Worst-Case)' : `✅ ${selectedFig.annexGroup} 標稱標準件`}
            </span>
          </div>

          <ISOStandardFigureRenderer
            svgKey={selectedFig.svgKey || `ISO7-FIG-${selectedFig.id}`}
            titleZh={`${selectedFig.figureNumber}: ${selectedFig.nameZh || selectedFig.name}`}
            titleEn={selectedFig.name}
            standard={`ISO 80369-7 ${selectedFig.annexGroup}`}
            figureTypeZh={
              selectedFig.annexGroup === 'Annex A'
                ? '防誤插幾何矩陣'
                : selectedFig.annexGroup === 'Annex B'
                ? '產品 CAD 幾何圖'
                : '金屬參考夾具件'
            }
            descriptionZh={selectedFig.descriptionZh}
            keyCallouts={selectedFig.svgHighlights.map((hl, idx) => ({
              id: `callout-${idx}`,
              labelZh: hl.title,
              valueZh: hl.value
            }))}
          />
        </div>

        {/* Right Column: Detailed ISO Specifications */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                    {selectedFig.figureNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{selectedFig.annexGroup}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{selectedFig.nameZh || selectedFig.name}</h3>
              </div>
              <Eye className="w-5 h-5 text-slate-400" />
            </div>

            <div className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-blue-600" /> 圖號功能與適用目的：
              </div>
              <p>{selectedFig.descriptionZh}</p>
            </div>

            {/* Key Specs Highlights */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {selectedFig.svgHighlights.map((hl, idx) => (
                <div key={idx} className="bg-slate-100/80 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">{hl.title}</div>
                  <div className="font-bold text-slate-900 mt-0.5 font-mono">{hl.value}</div>
                </div>
              ))}
            </div>

            {/* Applicable Clauses */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" /> 指定適用之 ISO 80369-7 測試條款：
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {selectedFig.intendedClauses.length > 0 ? (
                  selectedFig.intendedClauses.map((clauseId) => {
                    const clause = ISO_CLAUSES[clauseId];
                    return (
                      <div key={clauseId} className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-200 text-xs flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-blue-900">{clause.titleZh} (Clause {clause.id})</div>
                          <div className="text-xs text-blue-700 mt-0.5">{clause.keyPhysicsZh}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200 text-xs font-medium leading-relaxed">
                    ℹ️ 此圖號為全框架基礎幾何規範（如 Fig. A.1 防誤插矩陣或 Fig. B.6 包絡面），不單獨對應單一測試條款，但為全系統設計審查之核心依據。
                  </div>
                )}
              </div>
            </div>

            {/* Engineering Rationale */}
            <div className="bg-amber-50/90 p-4 rounded-xl border border-amber-200 text-xs space-y-2">
              <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" /> 幾何工程哲學與設計考量 (Engineering Rationale)
              </h4>
              <p className="text-amber-900 leading-relaxed">{selectedFig.worstCaseReasonZh}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
