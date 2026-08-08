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
            <strong className="text-blue-900 block font-bold text-[13px]">1. 材質與硬化要求 (ISO vs 冶金學事實)</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>ISO 條文強制規範</strong>：`Hardened Stainless Steel` (硬化不鏽鋼)，且必須經硬化處理以防磨損 (`hardened to resist wear`)。</li>
              <li><strong>Stavax® ESR (醫療級模具鋼)</strong>：AISI 420 Mod (45~52 HRC, 200 GPa)，電渣重熔極高純度、鏡面拋光與優異耐蝕，為醫療鋼規高級選材！</li>
              <li><strong>17-4PH / 440C (標準硬化鋼)</strong>：17-4PH (&ge;45 HRC) 綜合性佳；440C (58~60 HRC) 超硬但水測後須即時防銹。</li>
              <li><strong>316 (高耐蝕奧斯田體)</strong>：一般未處理退火態基材過軟 (&lt;20 HRC) 且極易 Galling 咬死，<strong>必須經表面低溫氮化硬化才合格</strong>。</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-purple-900 block font-bold text-[13px]">2. 表面粗糙度極限</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>關鍵表面 (Critical)</strong>：錐面與密封接觸面粗糙度平均值 <span className="font-mono font-bold text-slate-800">R<sub>a</sub></span> <strong>不得超過 0.8 μm</strong>。</li>
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
                <li><strong>難量測特徵替代判定</strong>：公接頭尖端至第一牙底部 <span className="font-mono font-bold text-slate-800">t</span> 軸向尺寸改為「輔助尺寸」，其有效性由「抗軸向拉力分離測試」功能性試驗進行間接評估，不強制極限硬性量測。</li>
              </ul>
            </div>

            {/* Aspect 2 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-600" /> 2. 表面粗糙度檢測 (Surface Roughness)
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>設備儀器</strong>：使用表面粗糙度觸針儀對關鍵接觸界面進行檢測。</li>
                <li><strong>合格判定標準</strong>：關鍵表面粗糙度平均值 <span className="font-mono font-bold text-slate-800">R<sub>a</sub></span> <strong>不得超過 0.8 μm</strong>。</li>
                <li>確保重複測試時密封面的可重現性與耐磨損度。</li>
              </ul>
            </div>

            {/* Aspect 3 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> 3. 材質與硬度確認 (Material & Hardness Verification)
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>ISO 原文規範</strong>：`Hardened Stainless Steel`，要求必須硬化抗磨損 (hardened to resist wear)。</li>
                <li><strong>材料選材權衡</strong>：<strong>Stavax® ESR (45~52 HRC)</strong> 高純度鏡面防蝕極佳；<strong>17-4PH (&ge;45 HRC)</strong> 綜合佳；<strong>440C (60 HRC)</strong> 極硬但水測須防銹；<strong>316</strong> 須表面氮化。</li>
                <li><strong>認證實務處置</strong>：鋼規認證須檢查熱處理強度證明或表面氮化質控報告。</li>
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

      {/* Interactive Material Evaluation Matrix Card (8 Candidate Materials) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="bg-slate-900 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg shadow-xs">
              Material Science Matrix
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              ISO 80369-7 參考鋼規金屬候選材料客觀數據評估對照表
            </h3>
          </div>
          <a
            href="/iso_80369_7_material_evaluation_matrix.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition cursor-pointer self-start sm:self-auto"
          >
            <FileCode className="w-4 h-4" />
            <span>開啟獨立 HTML 報告檔</span>
          </a>
        </div>

        <p className="text-xs text-slate-500">
          依據 ISO 80369-7 Annex C（硬化不鏽鋼 <span className="font-mono text-slate-700 font-bold">Hardened SS</span>、彈性模數 <span className="font-mono text-slate-700 font-bold">&gt; 3 433 MPa</span>、表面粗糙度 <span className="font-mono text-slate-700 font-bold">Ra ≤ 0.8 µm</span>）與材料加工價格代價，【性價比 CP 值由高到低】排序評估：
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-2.5">CP 值排名</th>
                <th className="p-2.5">材料名稱 &amp; 牌號</th>
                <th className="p-2.5">硬度 (Hardness)</th>
                <th className="p-2.5">彈性模數 (Modulus)</th>
                <th className="p-2.5">耐磨損與抗咬合</th>
                <th className="p-2.5">水壓測試防銹性</th>
                <th className="p-2.5">綜合 CP 值分析評語</th>
                <th className="p-2.5">ISO 合規判定</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {/* Rank 1: 17-4PH */}
              <tr className="hover:bg-amber-50/40 bg-amber-50/20 transition">
                <td className="p-2.5">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    🏆 No.1 最佳性價比
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  17-4PH / SUS630
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">AISI 630 / H900 狀態</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-blue-700">40 – 45 HRC</td>
                <td className="p-2.5 font-mono">196 GPa</td>
                <td className="p-2.5 text-slate-700">優秀 (沉澱硬化相強度高)</td>
                <td className="p-2.5 text-emerald-700 font-medium">🌟 良好 (含 Cu/Ni/Cr 防銹)</td>
                <td className="p-2.5 font-medium text-slate-800">性價比之王！熱處理便宜防銹高硬度兼備。</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">✅ 完全合規 (鋼規標配)</span></td>
              </tr>

              {/* Rank 2: Uddeholm Stavax ESR */}
              <tr className="hover:bg-sky-50/40 bg-sky-50/10 transition">
                <td className="p-2.5">
                  <span className="bg-sky-100 text-sky-900 border border-sky-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    🌟 No.2 高階 CP 首選
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  Uddeholm Stavax® ESR
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">AISI 420 Mod / 電渣重熔鋼</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-blue-700">45 – 52 HRC</td>
                <td className="p-2.5 font-mono">200 GPa</td>
                <td className="p-2.5 text-emerald-700 font-medium">極佳 (高純淨相，耐磨抗咬)</td>
                <td className="p-2.5 text-emerald-700 font-medium">🌟 優秀 (鏡面抗水蒸氣)</td>
                <td className="p-2.5 font-medium text-slate-800">高階醫療首選！45-52 HRC + 鏡面抗蝕。</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">✅ 完全合規 (醫療首選)</span></td>
              </tr>

              {/* Rank 3: AISI 440C */}
              <tr className="hover:bg-slate-50/80 transition">
                <td className="p-2.5">
                  <span className="bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    ⚖️ No.3 高硬度便宜
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  AISI 440C / SUS440C
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">高碳馬氏體不鏽鋼</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-indigo-700">58 – 60 HRC</td>
                <td className="p-2.5 font-mono">200 GPa</td>
                <td className="p-2.5 text-slate-700">極高 (馬氏體高硬度抗刮)</td>
                <td className="p-2.5 text-amber-700 font-medium">⚠️ 較弱 (水測後須防銹擦乾)</td>
                <td className="p-2.5 font-medium text-slate-800">58-60 HRC 極便宜，但水測後須保養。</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">✅ 合規 (極硬，須防銹)</span></td>
              </tr>

              {/* Rank 4: Uddeholm Elmax SuperClean */}
              <tr className="hover:bg-slate-50/80 transition">
                <td className="p-2.5">
                  <span className="bg-slate-100 text-slate-700 border border-slate-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    💎 No.4 頂級粉末鋼
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  Uddeholm Elmax® SuperClean
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">高鉻高釩粉末冶金不鏽鋼</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-indigo-700">58 – 62 HRC</td>
                <td className="p-2.5 font-mono">210 GPa</td>
                <td className="p-2.5 text-emerald-700 font-medium">頂級 (碳化釩極致抗磨)</td>
                <td className="p-2.5 text-emerald-700 font-medium">🌟 優秀 (18% Cr 粉末防鏽)</td>
                <td className="p-2.5 font-medium text-slate-800">頂級極致性能，但原料切削成本高。</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">✅ 完全合規 (頂級粉末鋼)</span></td>
              </tr>

              {/* Rank 5: Nitrided 316 */}
              <tr className="hover:bg-slate-50/80 transition">
                <td className="p-2.5">
                  <span className="bg-slate-100 text-slate-700 border border-slate-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    🔧 No.5 工藝費用高
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  AISI 316 / 316L (低溫氮化)
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">Surface Nitrided / Kolsterising®</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-blue-700">表面 &gt;68 HRC<span className="block font-normal text-[10px] text-slate-400">基材 &lt;20 HRC</span></td>
                <td className="p-2.5 font-mono">193 GPa</td>
                <td className="p-2.5 text-slate-700">優秀 (氮化表面層抑制咬死)</td>
                <td className="p-2.5 text-emerald-700 font-medium">🌟 極佳 (保留 316 高抗蝕)</td>
                <td className="p-2.5 font-medium text-slate-800">基材便宜但特殊氮化處理費用極高。</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">✅ 合規 (須表面氮化)</span></td>
              </tr>

              {/* Rank 6: Free-Cutting Brass */}
              <tr className="hover:bg-slate-50/80 transition bg-amber-50/20">
                <td className="p-2.5">
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    ⚠️ No.6 便宜但質軟
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  快削黃銅 Free-Cutting Brass
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">C36000 / UNS C36000</span>
                </td>
                <td className="p-2.5 font-mono text-amber-700">&lt; 10 HRC (110-140 HV)</td>
                <td className="p-2.5 font-mono">105 GPa</td>
                <td className="p-2.5 text-amber-700">❌ 較差 (質軟，高頻耳翼易變形)</td>
                <td className="p-2.5 text-amber-700">⚠️ 中等 (無銹但易氧化變色)</td>
                <td className="p-2.5 font-medium text-slate-800">極便宜，但高頻旋合耳朵極易變形。</td>
                <td className="p-2.5"><span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-300">⚠️ 有限度允許 (低頻治具)</span></td>
              </tr>

              {/* Rank 7: Titanium Grade 5 */}
              <tr className="hover:bg-slate-50/80 transition bg-amber-50/20">
                <td className="p-2.5">
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    ⚠️ No.7 昂貴易咬死
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  鈦合金 Ti-6Al-4V
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">Titanium Grade 5</span>
                </td>
                <td className="p-2.5 font-mono text-amber-700">35 – 38 HRC</td>
                <td className="p-2.5 font-mono">114 GPa</td>
                <td className="p-2.5 text-amber-700">⚠️ 一般 (乾摩擦易黏著咬合)</td>
                <td className="p-2.5 text-emerald-700 font-medium">🌟 極佳 (生物相容極抗蝕)</td>
                <td className="p-2.5 font-medium text-slate-800">材料昂貴且極難切削，乾摩擦易咬死。</td>
                <td className="p-2.5"><span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-300">⚠️ 須鍍膜才防旋合磨損</span></td>
              </tr>

              {/* Rank 8: Raw Annealed 316 */}
              <tr className="hover:bg-rose-50/50 bg-rose-50/30 transition">
                <td className="p-2.5">
                  <span className="bg-rose-100 text-rose-800 border border-rose-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    ❌ No.8 0分 (不合格)
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  AISI 316 / 316L (未處理退火態)
                  <span className="block font-mono text-[10px] text-rose-500 font-normal">Standard Annealed Stainless</span>
                </td>
                <td className="p-2.5 font-mono text-rose-600">&lt; 20 HRC (150-200 HV)</td>
                <td className="p-2.5 font-mono">193 GPa</td>
                <td className="p-2.5 text-rose-600 font-bold">❌ 極差 (過軟易 Galling 咬死)</td>
                <td className="p-2.5 text-emerald-700 font-medium">🌟 極佳</td>
                <td className="p-2.5 font-bold text-rose-700">性價比為零！未經硬化不符 ISO 規定。</td>
                <td className="p-2.5"><span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-rose-300">❌ 不合規 (未硬化無法抗磨)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
