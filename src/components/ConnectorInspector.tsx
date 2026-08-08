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
              <h2 className="text-lg font-bold">ISO 80369-7 與 ISO 80369-20 規範附件圖號庫 (Fig.A.1 ~ K.1)</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              收錄完整規範圖號：<strong className="text-blue-600">ISO 80369-7 Annex A/B/C</strong> (防誤插矩陣、產品 CAD 尺寸、金屬參考夾具) 與 <strong className="text-purple-600">ISO 80369-20 Annex B~K</strong> (測試方法裝置與機台圖)。
            </p>
          </div>

          {/* Group Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
            {[
              { id: 'all', label: '全部圖號 All' },
              { id: 'ISO 80369-7', label: '📘 80369-7 規格圖' },
              { id: 'Annex B', label: '📐 Annex B CAD圖' },
              { id: 'Annex C', label: '🔧 Annex C 金屬夾具' },
              { id: 'ISO 80369-20', label: '🔬 80369-20 機台圖' }
            ].map(group => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] flex items-center ${
                  selectedGroup === group.id
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* Figure Selector Buttons - Expanded & Fully Visible */}
        <div className="flex flex-wrap items-center gap-2 pt-3 pb-1 w-full">
          {filteredFigures.map((fig) => {
            const isSelected = selectedFigId === fig.id;
            return (
              <button
                key={fig.id}
                onClick={() => handleSelectFig(fig.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 border whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="font-mono">{fig.figureNumber}</span>
                <span className="text-[11px] opacity-80">({fig.annexGroup})</span>
                {fig.isWorstCase && <span className="bg-rose-500/90 text-white text-[10px] px-1.5 py-0.5 rounded font-sans">Worst-Case</span>}
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
                    ℹ️ 此圖號為全框架基礎幾何規範（如 Fig.A.1 防誤插矩陣或 Fig.B.6 包絡面），不單獨對應單一測試條款，但為全系統設計審查之核心依據。
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

      {/* Technical Standard Guide Card: ISO 80369-7:2021 Annex C.1 Manufacturing & Geometric Requirements */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg shadow-xs">
            ISO 80369-7:2021 Annex C.1
          </span>
          <h3 className="text-base font-extrabold text-slate-900">
            金屬參考接頭 (Reference Connectors) 4 大製造與幾何核心規範
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-blue-900 block font-bold text-[13px]">1. 材質與剛性要求</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>耐腐蝕剛性材質</strong>：使用不鏽鋼 (≥45 HRC) 或黃銅。</li>
              <li><strong>彈性模數限制</strong>：彎曲/拉伸彈性模數 (Modulus of Elasticity) 必須 <strong>&gt; 3 433 MPa</strong>。</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-purple-900 block font-bold text-[13px]">2. 表面粗糙度極限</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>關鍵表面 (Critical)</strong>：錐面與密封接觸面粗糙度平均值 $R_a$ <strong>不得超過 0.8 μm</strong>。</li>
              <li>確保測試密封重現性與極致抗磨損耐用度。</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-amber-900 block font-bold text-[13px]">3. 尺寸與倒角細節</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>邊緣圓角</strong>：外側邊緣圓角半徑需在 <strong>0.15 mm ~ 0.20 mm</strong>。</li>
              <li><strong>入口倒角</strong>：入口處圓角/倒角 R ≤ 0.5 mm。</li>
              <li><strong>公錐長度</strong>：非相互連接測試 ≥ 10.5 mm；一般測試 ≥ 7.5 mm。</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-emerald-900 block font-bold text-[13px]">4. 測試項目指定圖樣</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>洩漏/應力龜裂/反旋</strong>：公件配 <strong>Fig.C.1/C.5</strong>；母件配 <strong>Fig.C.2/C.4</strong>。</li>
              <li><strong>抗拉拔/過載滑牙</strong>：公件配 <strong>Fig.C.3 (2.71mm 最壞情況)</strong>；母件配 <strong>Fig.C.6</strong>。</li>
            </ul>
          </div>
        </div>

        {/* Calibration & Certification Standard Section */}
        <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-50/80 p-3 rounded-xl border border-blue-200/80 text-xs">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white font-mono font-bold px-2 py-0.5 rounded text-[11px]">
                Certification & Calibration
              </span>
              <strong className="text-blue-950 font-bold text-xs">
                ISO 80369-7:2021 參考接頭校驗與認證 (Calibration & Certification) 4 大評估面向
              </strong>
            </div>
            <span className="text-blue-800 text-[11px] font-medium">
              💡 註：量具日常點檢程序超出本標準範疇，此指認證與出廠校驗判定
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Aspect 1 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-blue-600" /> 1. 幾何尺寸與公差校驗 (Dimensional Verification)
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>量測設備</strong>：使用三次元量儀 (CMM)、影像測量儀或高精度工具顯微鏡。</li>
                <li><strong>關鍵接觸特徵</strong>：精確量測 0.06:1 (1:16.667) 錐度與接觸直徑。</li>
                <li><strong>邊緣倒角</strong>：螺紋外側邊緣圓角 <strong>0.15 mm ~ 0.20 mm</strong>，入口倒角 R ≤ 0.5 mm。</li>
                <li><strong>難量測特徵替代判定</strong>：公接頭尖端至第一牙底部 $t$ 軸向尺寸改為「輔助尺寸」，其有效性由「抗軸向拉力分離測試」功能性試驗進行間接評估，不強制極限硬性量測。</li>
              </ul>
            </div>

            {/* Aspect 2 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-600" /> 2. 表面粗糙度檢測 (Surface Roughness)
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>設備儀器</strong>：使用表面粗糙度觸針儀對關鍵接觸界面進行檢測。</li>
                <li><strong>合格判定標準</strong>：關鍵表面粗糙度平均值 $R_a$ <strong>不得超過 0.8 μm</strong>。</li>
                <li>確保重複測試時密封面的可重現性與耐磨損度。</li>
              </ul>
            </div>

            {/* Aspect 3 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> 3. 材質與硬度確認 (Material & Hardness)
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>耐腐蝕剛性材質</strong>：使用 316 不鏽鋼 (≥45 HRC) 或黃銅材料。</li>
                <li><strong>彈性模數確認</strong>：材料彎曲/拉伸彈性模數 <strong>&gt; 3 433 MPa</strong>。</li>
                <li>透過出廠材料證明 (MTR) 與接收硬度檢測雙重驗證。</li>
              </ul>
            </div>

            {/* Aspect 4 */}
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-1.5">
              <h5 className="font-bold text-emerald-950 text-[12px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 4. 歷史版本過渡相容條款 (Legacy Compatibility)
              </h5>
              <p className="text-emerald-900 text-[11px] leading-relaxed">
                標準給予極具實用性的過渡規範：若實驗室目前使用之金屬參考接頭符合舊版 <strong>ISO 80369-7:2016</strong> Annex C 公差要求，<strong>直接視為符合現行 2021 年版本</strong>，不需因為標準修訂而重新採購或重新認證！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
