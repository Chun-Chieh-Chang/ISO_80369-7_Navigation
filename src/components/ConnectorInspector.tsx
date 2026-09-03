import React, { useState } from 'react';
import { ANNEX_C_FIGURES, ISO_CLAUSES } from '../data/isoData';
import { AnnexCFigureId, TestConfigState } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { useLanguage } from '../i18n/LanguageContext';
import { Eye, ShieldAlert, Layers, Ruler, FileCode, CheckCircle2 } from 'lucide-react';

interface ConnectorInspectorProps {
  config: TestConfigState;
  setConfig: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const ConnectorInspector: React.FC<ConnectorInspectorProps> = ({ config, setConfig }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
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
                {t.connectors.badge}
              </span>
              <h2 className="text-lg font-bold">{t.connectors.title}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.connectors.subtitle}
            </p>
          </div>

          {/* Group Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
            {[
              { id: 'all', label: t.connectors.filterAll },
              { id: 'ISO 80369-7', label: t.connectors.filterIso7 },
              { id: 'Annex B', label: t.connectors.filterAnnexB },
              { id: 'Annex C', label: t.connectors.filterAnnexC },
              { id: 'ISO 80369-20', label: t.connectors.filterIso20 }
            ].map(group => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
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
              {selectedFig.isWorstCase ? t.connectors.worstCaseBadge : (isEn ? `✅ ${selectedFig.annexGroup} Nominal Standard` : `✅ ${selectedFig.annexGroup} 標稱標準件`)}
            </span>
          </div>

          <ISOStandardFigureRenderer
            svgKey={selectedFig.svgKey || `ISO7-FIG-${selectedFig.id}`}
            titleZh={`${selectedFig.figureNumber}: ${isEn ? selectedFig.name : (selectedFig.nameZh || selectedFig.name)}`}
            titleEn={selectedFig.name}
            standard={`ISO 80369-7 ${selectedFig.annexGroup}`}
            figureTypeZh={
              isEn 
                ? (selectedFig.annexGroup === 'Annex A' ? 'Non-interchangeability Matrix' : selectedFig.annexGroup === 'Annex B' ? 'Product CAD Geometry' : 'Metal Reference Fixture')
                : (selectedFig.annexGroup === 'Annex A' ? '防誤插幾何矩陣' : selectedFig.annexGroup === 'Annex B' ? '產品 CAD 幾何圖' : '金屬參考夾具件')
            }
            descriptionZh={isEn ? (selectedFig.description || selectedFig.descriptionZh) : selectedFig.descriptionZh}
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
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{isEn ? selectedFig.name : (selectedFig.nameZh || selectedFig.name)}</h3>
              </div>
              <Eye className="w-5 h-5 text-slate-400" />
            </div>

            <div className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-blue-600" /> {isEn ? 'Drawing Function & Objective:' : '圖號功能與適用目的：'}
              </div>
              <p>{isEn ? (selectedFig.description || selectedFig.descriptionZh) : selectedFig.descriptionZh}</p>
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
                <Layers className="w-4 h-4 text-blue-600" /> {isEn ? 'Designated ISO 80369-7 Test Clauses:' : '指定適用之 ISO 80369-7 測試條款：'}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {selectedFig.intendedClauses.length > 0 ? (
                  selectedFig.intendedClauses.map((clauseId) => {
                    const clause = ISO_CLAUSES[clauseId];
                    return (
                      <div key={clauseId} className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-200 text-xs flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-blue-900">{isEn ? (clause.title || clause.titleZh) : clause.titleZh} (Clause {clause.id})</div>
                          <div className="text-xs text-blue-700 mt-0.5">{isEn ? (clause.keyPhysics || clause.keyPhysicsZh) : clause.keyPhysicsZh}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200 text-xs font-medium leading-relaxed">
                    {isEn 
                      ? 'ℹ️ This drawing provides baseline geometry (e.g. Fig.A.1 non-interchangeability matrix or Fig.B.6 envelope) and serves as an overarching design review basis.' 
                      : 'ℹ️ 此圖號為全框架基礎幾何規範（如 Fig.A.1 防誤插矩陣或 Fig.B.6 包絡面），不單獨對應單一測試條款，但為全系統設計審查之核心依據。'}
                  </div>
                )}
              </div>
            </div>

            {/* Engineering Rationale */}
            <div className="bg-amber-50/90 p-4 rounded-xl border border-amber-200 text-xs space-y-2">
              <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" /> {isEn ? 'Geometric Engineering Philosophy & Design Rationale' : '幾何工程哲學與設計考量 (Engineering Rationale)'}
              </h4>
              <p className="text-amber-900 leading-relaxed">{isEn ? (selectedFig.worstCaseReasonEn || selectedFig.worstCaseReasonZh) : selectedFig.worstCaseReasonZh}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Standard Guide Card: ISO 80369-7:2021 Annex C.1 Manufacturing & Geometric Requirements */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <span className="bg-blue-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg shadow-xs">
            ISO 80369-7:2021 Annex C.1
          </span>
          <h3 className="text-base font-extrabold text-slate-900">
            {isEn ? 'Reference Connectors: 4 Key Manufacturing & Geometric Requirements' : '金屬參考接頭 (Reference Connectors) 4 大製造與幾何核心規範'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-blue-900 block font-bold text-[13px]">{isEn ? '1. Material & Hardening Requirements' : '1. 材質與硬化要求 (ISO vs 冶金學事實)'}</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>{isEn ? 'ISO Requirement:' : 'ISO 條文強制規範：'}</strong> {isEn ? 'Hardened Stainless Steel, hardened to resist wear.' : '`Hardened Stainless Steel` (硬化不鏽鋼)，且必須經硬化處理以防磨損 (`hardened to resist wear`)。'}</li>
              <li><strong>Stavax® ESR</strong>: {isEn ? 'AISI 420 Mod (45~52 HRC, 200 GPa), premium medical mold steel with mirror polish & superior corrosion resistance.' : 'AISI 420 Mod (45~52 HRC, 200 GPa)，電渣重熔極高純度、鏡面拋光與優異耐蝕，為醫療鋼規高級選材！'}</li>
              <li><strong>17-4PH / 440C</strong>: {isEn ? '17-4PH (≥45 HRC) optimal balance; 440C (58~60 HRC) ultra-hard but requires immediate drying after water testing.' : '17-4PH (≥45 HRC) 綜合性佳；440C (58~60 HRC) 超硬但水測後須即時防銹。'}</li>
              <li><strong>316 SS</strong>: {isEn ? 'Raw annealed is too soft (<20 HRC) and galling prone; must be surface nitrided.' : '一般未處理退火態基材過軟 (<20 HRC) 且極易 Galling 咬死，必須經表面低溫氮化硬化才合格。'}</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-indigo-900 block font-bold text-[13px]">{isEn ? '2. Surface Roughness Limits' : '2. 表面粗糙度極限'}</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>{isEn ? 'Critical Surfaces:' : '關鍵表面 (Critical)：'}</strong> {isEn ? 'Taper and seal contact roughness Ra shall not exceed 0.8 µm.' : '錐面與密封接觸面粗糙度平均值 Ra 不得超過 0.8 μm。'}</li>
              <li>{isEn ? 'Ensures repeatable sealing and wear resistance across cycles.' : '確保測試密封重現性與極致抗磨損耐用度。'}</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-amber-900 block font-bold text-[13px]">{isEn ? '3. Dimensions & Chamfers' : '3. 尺寸與倒角細節'}</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>{isEn ? 'Edge Radii:' : '邊緣圓角：'}</strong> {isEn ? 'Outer edge radius between 0.15 mm and 0.20 mm.' : '外側邊緣圓角半徑需在 0.15 mm ~ 0.20 mm。'}</li>
              <li><strong>{isEn ? 'Lead Chamfer:' : '入口倒角：'}</strong> {isEn ? 'Entry chamfer/radius R ≤ 0.5 mm.' : '入口處圓角/倒角 R ≤ 0.5 mm。'}</li>
              <li><strong>{isEn ? 'Male Length:' : '公錐長度：'}</strong> {isEn ? 'Non-interchangeability ≥ 10.5 mm; general tests ≥ 7.5 mm.' : '非相互連接測試 ≥ 10.5 mm；一般測試 ≥ 7.5 mm。'}</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
            <strong className="text-emerald-900 block font-bold text-[13px]">{isEn ? '4. Designated Test Figures' : '4. 測試項目指定圖樣'}</strong>
            <ul className="list-disc list-inside text-slate-600 space-y-1 leading-relaxed text-[11px]">
              <li><strong>{isEn ? 'Leak / Cracking / Unscrewing:' : '洩漏/應力龜裂/反旋：'}</strong> {isEn ? 'Male to Fig.C.1/C.5; Female to Fig.C.2/C.4.' : '公件配 Fig.C.1/C.5；母件配 Fig.C.2/C.4。'}</li>
              <li><strong>{isEn ? 'Axial / Override:' : '抗拉拔/過載滑牙：'}</strong> {isEn ? 'Male to Fig.C.3 (2.71mm worst-case); Female to Fig.C.6.' : '公件配 Fig.C.3 (2.71mm 最壞情況)；母件配 Fig.C.6。'}</li>
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
                {isEn ? 'ISO 80369-7:2021 Reference Connector Calibration & Certification: 4 Key Aspects' : 'ISO 80369-7:2021 參考接頭校驗與認證 (Calibration & Certification) 4 大評估面向'}
              </strong>
            </div>
            <span className="text-blue-800 text-[11px] font-medium">
              {isEn ? '💡 Note: Routine gage checks outside scope; applies to certification & calibration.' : '💡 註：量具日常點檢程序超出本標準範疇，此指認證與出廠校驗判定'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Aspect 1 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-blue-600" /> {isEn ? '1. Dimensional Verification' : '1. 幾何尺寸與公差校驗 (Dimensional Verification)'}
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>{isEn ? 'Equipment:' : '量測設備：'}</strong> {isEn ? 'CMM, vision measuring system, or optical toolmaker microscope.' : '使用三次元量儀 (CMM)、影像測量儀或高精度工具顯微鏡。'}</li>
                <li><strong>{isEn ? 'Critical Features:' : '關鍵接觸特徵：'}</strong> {isEn ? 'Precisely measure 0.06:1 (1:16.667) taper and contact diameters.' : '精確量測 0.06:1 (1:16.667) 錐度與接觸直徑。'}</li>
                <li><strong>{isEn ? 'Edge Chamfers:' : '邊緣倒角：'}</strong> {isEn ? 'Thread crest radius 0.15 mm ~ 0.20 mm, entry chamfer R ≤ 0.5 mm.' : '螺紋外側邊緣圓角 0.15 mm ~ 0.20 mm，入口倒角 R ≤ 0.5 mm。'}</li>
                <li><strong>{isEn ? 'Alternative Verification:' : '難量測特徵替代判定：'}</strong> {isEn ? 'Dimension t (tip to thread root) is auxiliary; functional separation test evaluates validity.' : '公接頭尖端至第一牙底部 t 軸向尺寸改為「輔助尺寸」，其有效性由「抗軸向拉力分離測試」功能性試驗進行間接評估，不強制極限硬性量測。'}</li>
              </ul>
            </div>

            {/* Aspect 2 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-700" /> {isEn ? '2. Surface Roughness Inspection' : '2. 表面粗糙度檢測 (Surface Roughness)'}
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>{isEn ? 'Instrument:' : '設備儀器：'}</strong> {isEn ? 'Stylus profilometer on key mating contact surfaces.' : '使用表面粗糙度觸針儀對關鍵接觸界面進行檢測。'}</li>
                <li><strong>{isEn ? 'Pass Criteria:' : '合格判定標準：'}</strong> {isEn ? 'Average roughness Ra shall not exceed 0.8 µm.' : '關鍵表面粗糙度平均值 Ra 不得超過 0.8 μm。'}</li>
                <li>{isEn ? 'Guarantees repeatability of seal and long-term wear resistance.' : '確保重複測試時密封面的可重現性與耐磨損度。'}</li>
              </ul>
            </div>

            {/* Aspect 3 */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> {isEn ? '3. Material & Hardness Verification' : '3. 材質與硬度確認 (Material & Hardness Verification)'}
              </h5>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px] leading-relaxed">
                <li><strong>{isEn ? 'ISO Requirement:' : 'ISO 原文規範：'}</strong> {isEn ? 'Hardened Stainless Steel, hardened to resist wear.' : '`Hardened Stainless Steel`，要求必須硬化抗磨損 (hardened to resist wear)。'}</li>
                <li><strong>{isEn ? 'Trade-offs:' : '材料選材權衡：'}</strong> {isEn ? 'Stavax® ESR (45~52 HRC) high purity; 17-4PH (≥45 HRC) balanced; 440C (60 HRC) ultra-hard; 316 requires nitriding.' : 'Stavax® ESR (45~52 HRC) 高純度鏡面防蝕極佳；17-4PH (≥45 HRC) 綜合佳；440C (60 HRC) 極硬但水測須防銹；316 須表面氮化。'}</li>
                <li><strong>{isEn ? 'Certification:' : '認證實務處置：'}</strong> {isEn ? 'Verify heat-treatment certificates or surface nitriding QC reports.' : '鋼規認證須檢查熱處理強度證明或表面氮化質控報告。'}</li>
              </ul>
            </div>

            {/* Aspect 4 */}
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-1.5">
              <h5 className="font-bold text-emerald-950 text-[12px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {isEn ? '4. Legacy Compatibility Clause' : '4. 歷史版本過渡相容條款 (Legacy Compatibility)'}
              </h5>
              <p className="text-emerald-900 text-[11px] leading-relaxed">
                {isEn 
                  ? 'Practical transition clause: existing reference connectors compliant with ISO 80369-7:2016 Annex C tolerances are deemed fully compliant with the 2021 edition without re-procurement.'
                  : '標準給予極具實用性的過渡規範：若實驗室目前使用之金屬參考接頭符合舊版 ISO 80369-7:2016 Annex C 公差要求，直接視為符合現行 2021 年版本，不需因為標準修訂而重新採購或重新認證！'}
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
              {t.connectors.materialMatrixTitle}
            </h3>
          </div>
          <a
            href={`${import.meta.env.BASE_URL}iso_80369_7_material_evaluation_matrix.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition cursor-pointer self-start sm:self-auto"
          >
            <FileCode className="w-4 h-4" />
            <span>{t.connectors.openStandaloneHtml}</span>
          </a>
        </div>

        <p className="text-xs text-slate-500">
          {t.connectors.materialMatrixDesc}
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-2.5">{isEn ? 'P/P Rank' : 'CP 值排名'}</th>
                <th className="p-2.5">{isEn ? 'Material & Grade' : '材料名稱 & 牌號'}</th>
                <th className="p-2.5">{isEn ? 'Hardness' : '硬度 (Hardness)'}</th>
                <th className="p-2.5">{isEn ? 'Modulus' : '彈性模數 (Modulus)'}</th>
                <th className="p-2.5">{isEn ? 'Wear & Galling' : '耐磨損與抗咬合'}</th>
                <th className="p-2.5">{isEn ? 'Corrosion Resist' : '水壓測試防銹性'}</th>
                <th className="p-2.5">{isEn ? 'Comprehensive Analysis' : '綜合 CP 值分析評語'}</th>
                <th className="p-2.5">{isEn ? 'ISO Verdict' : 'ISO 合規判定'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {/* Rank 1: 17-4PH */}
              <tr className="hover:bg-amber-50/40 bg-amber-50/20 transition">
                <td className="p-2.5">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '🏆 No.1 Best Value' : '🏆 No.1 最佳性價比'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  17-4PH / SUS630
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">{isEn ? 'AISI 630 / H900 Condition' : 'AISI 630 / H900 狀態'}</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-blue-700">40 – 45 HRC</td>
                <td className="p-2.5 font-mono">196 GPa</td>
                <td className="p-2.5 text-slate-700">{isEn ? 'Excellent (Precipitation hardened strength)' : '優秀 (沉澱硬化相強度高)'}</td>
                <td className="p-2.5 text-emerald-700 font-medium">{isEn ? '🌟 Good (Cu/Ni/Cr corrosion resistance)' : '🌟 良好 (含 Cu/Ni/Cr 防銹)'}</td>
                <td className="p-2.5 font-medium text-slate-800">{isEn ? 'P/P champion! Economical heat treatment with great hardness & rust resistance.' : '性價比之王！熱處理便宜防銹高硬度兼備。'}</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">{isEn ? '✅ Fully Compliant (Standard Benchmark)' : '✅ 完全合規 (鋼規標配)'}</span></td>
              </tr>

              {/* Rank 2: Uddeholm Stavax ESR */}
              <tr className="hover:bg-sky-50/40 bg-sky-50/10 transition">
                <td className="p-2.5">
                  <span className="bg-sky-100 text-sky-900 border border-sky-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '🌟 No.2 Premium Choice' : '🌟 No.2 高階 CP 首選'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  Uddeholm Stavax® ESR
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">{isEn ? 'AISI 420 Mod / ESR Remelted' : 'AISI 420 Mod / 電渣重熔鋼'}</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-blue-700">45 – 52 HRC</td>
                <td className="p-2.5 font-mono">200 GPa</td>
                <td className="p-2.5 text-emerald-700 font-medium">{isEn ? 'Superior (High purity, anti-galling)' : '極佳 (高純淨相，耐磨抗咬)'}</td>
                <td className="p-2.5 text-emerald-700 font-medium">{isEn ? '🌟 Excellent (Mirror-polish water resistance)' : '🌟 優秀 (鏡面抗水蒸氣)'}</td>
                <td className="p-2.5 font-medium text-slate-800">{isEn ? 'Top tier medical choice! 45-52 HRC + mirror polish corrosion resistance.' : '高階醫療首選！45-52 HRC + 鏡面抗蝕。'}</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">{isEn ? '✅ Fully Compliant (Medical Top Choice)' : '✅ 完全合規 (醫療首選)'}</span></td>
              </tr>

              {/* Rank 3: AISI 440C */}
              <tr className="hover:bg-slate-50/80 transition">
                <td className="p-2.5">
                  <span className="bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '⚖️ No.3 Hard & Economical' : '⚖️ No.3 高硬度便宜'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  AISI 440C / SUS440C
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">{isEn ? 'High-Carbon Martensitic Stainless' : '高碳馬氏體不鏽鋼'}</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-indigo-700">58 – 60 HRC</td>
                <td className="p-2.5 font-mono">200 GPa</td>
                <td className="p-2.5 text-slate-700">{isEn ? 'Very High (Martensite high scratch resistance)' : '極高 (馬氏體高硬度抗刮)'}</td>
                <td className="p-2.5 text-amber-700 font-medium">{isEn ? '⚠️ Moderate (Requires drying after water tests)' : '⚠️ 較弱 (水測後須防銹擦乾)'}</td>
                <td className="p-2.5 font-medium text-slate-800">{isEn ? '58-60 HRC extremely economical, but requires post-test rust maintenance.' : '58-60 HRC 極便宜，但水測後須保養。'}</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">{isEn ? '✅ Compliant (Hard, rust care required)' : '✅ 合規 (極硬，須防銹)'}</span></td>
              </tr>

              {/* Rank 4: Uddeholm Elmax SuperClean */}
              <tr className="hover:bg-slate-50/80 transition">
                <td className="p-2.5">
                  <span className="bg-slate-100 text-slate-700 border border-slate-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '💎 No.4 Premium Powder Steel' : '💎 No.4 頂級粉末鋼'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  Uddeholm Elmax® SuperClean
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">{isEn ? 'High Cr-V Powder Metallurgy SS' : '高鉻高釩粉末冶金不鏽鋼'}</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-indigo-700">58 – 62 HRC</td>
                <td className="p-2.5 font-mono">210 GPa</td>
                <td className="p-2.5 text-emerald-700 font-medium">{isEn ? 'Ultimate (Vanadium carbide wear resistance)' : '頂級 (碳化釩極致抗磨)'}</td>
                <td className="p-2.5 text-emerald-700 font-medium">{isEn ? '🌟 Excellent (18% Cr powder corrosion resist)' : '🌟 優秀 (18% Cr 粉末防鏽)'}</td>
                <td className="p-2.5 font-medium text-slate-800">{isEn ? 'Ultimate performance, though high machining and stock costs.' : '頂級極致性能，但原料切削成本高。'}</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">{isEn ? '✅ Fully Compliant (Premium Powder Steel)' : '✅ 完全合規 (頂級粉末鋼)'}</span></td>
              </tr>

              {/* Rank 5: Nitrided 316 */}
              <tr className="hover:bg-slate-50/80 transition">
                <td className="p-2.5">
                  <span className="bg-slate-100 text-slate-700 border border-slate-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '🔧 No.5 High Process Cost' : '🔧 No.5 工藝費用高'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  AISI 316 / 316L ({isEn ? 'Low-temp Nitrided' : '低溫氮化'})
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">Surface Nitrided / Kolsterising®</span>
                </td>
                <td className="p-2.5 font-mono font-bold text-blue-700">{isEn ? 'Surface >68 HRC' : '表面 >68 HRC'}<span className="block font-normal text-[10px] text-slate-400">{isEn ? 'Core <20 HRC' : '基材 <20 HRC'}</span></td>
                <td className="p-2.5 font-mono">193 GPa</td>
                <td className="p-2.5 text-slate-700">{isEn ? 'Excellent (Nitrided surface inhibits galling)' : '優秀 (氮化表面層抑制咬死)'}</td>
                <td className="p-2.5 text-emerald-700 font-medium">{isEn ? '🌟 Superior (Preserves 316 corrosion resistance)' : '🌟 極佳 (保留 316 高抗蝕)'}</td>
                <td className="p-2.5 font-medium text-slate-800">{isEn ? 'Economical raw stock but proprietary low-temp nitriding is costly.' : '基材便宜但特殊氮化處理費用極高。'}</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-300">{isEn ? '✅ Compliant (Surface nitriding required)' : '✅ 合規 (須表面氮化)'}</span></td>
              </tr>

              {/* Rank 6: Free-Cutting Brass */}
              <tr className="hover:bg-slate-50/80 transition bg-amber-50/20">
                <td className="p-2.5">
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '⚠️ No.6 Cheap but Soft' : '⚠️ No.6 便宜但質軟'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  {isEn ? 'Free-Cutting Brass' : '快削黃銅 Free-Cutting Brass'}
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">C36000 / UNS C36000</span>
                </td>
                <td className="p-2.5 font-mono text-amber-700">&lt; 10 HRC (110-140 HV)</td>
                <td className="p-2.5 font-mono">105 GPa</td>
                <td className="p-2.5 text-amber-700">{isEn ? '❌ Poor (Soft, lugs easily deform under torque)' : '❌ 較差 (質軟，高頻耳翼易變形)'}</td>
                <td className="p-2.5 text-amber-700">{isEn ? '⚠️ Moderate (No rust but tarnishes)' : '⚠️ 中等 (無銹但易氧化變色)'}</td>
                <td className="p-2.5 font-medium text-slate-800">{isEn ? 'Inexpensive, but high-torque threads deform easily.' : '極便宜，但高頻旋合耳朵極易變形。'}</td>
                <td className="p-2.5"><span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-300">{isEn ? '⚠️ Conditionally Permitted (Low-frequency jigs only)' : '⚠️ 有限度允許 (低頻治具)'}</span></td>
              </tr>

              {/* Rank 7: Titanium Grade 5 */}
              <tr className="hover:bg-slate-50/80 transition bg-amber-50/20">
                <td className="p-2.5">
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '⚠️ No.7 Expensive & Galling Prone' : '⚠️ No.7 昂貴易咬死'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  {isEn ? 'Titanium Grade 5' : '鈦合金 Ti-6Al-4V'}
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">Titanium Grade 5 (Ti-6Al-4V)</span>
                </td>
                <td className="p-2.5 font-mono text-amber-700">35 – 38 HRC</td>
                <td className="p-2.5 font-mono">114 GPa</td>
                <td className="p-2.5 text-amber-700">{isEn ? '⚠️ Moderate (Dry friction adhesive galling)' : '⚠️ 一般 (乾摩擦易黏著咬合)'}</td>
                <td className="p-2.5 text-emerald-700 font-medium">{isEn ? '🌟 Superior (Biocompatible & rust-proof)' : '🌟 極佳 (生物相容極抗蝕)'}</td>
                <td className="p-2.5 font-medium text-slate-800">{isEn ? 'Expensive and difficult to machine; prone to thread galling.' : '材料昂貴且極難切削，乾摩擦易咬死。'}</td>
                <td className="p-2.5"><span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-300">{isEn ? '⚠️ Coating required to prevent thread galling' : '⚠️ 須鍍膜才防旋合磨損'}</span></td>
              </tr>

              {/* Rank 8: Raw Annealed 316 */}
              <tr className="hover:bg-rose-50/50 bg-rose-50/30 transition">
                <td className="p-2.5">
                  <span className="bg-rose-100 text-rose-800 border border-rose-300 font-bold px-2 py-0.5 rounded text-[11px] font-mono">
                    {isEn ? '❌ No.8 Non-Compliant' : '❌ No.8 0分 (不合格)'}
                  </span>
                </td>
                <td className="p-2.5 font-bold text-slate-900">
                  AISI 316 / 316L ({isEn ? 'Raw Annealed' : '未處理退火態'})
                  <span className="block font-mono text-[10px] text-rose-500 font-normal">Standard Annealed Stainless</span>
                </td>
                <td className="p-2.5 font-mono text-rose-600">&lt; 20 HRC (150-200 HV)</td>
                <td className="p-2.5 font-mono">193 GPa</td>
                <td className="p-2.5 text-rose-600 font-bold">{isEn ? '❌ Severe (Too soft, severe galling & seizure)' : '❌ 極差 (過軟易 Galling 咬死)'}</td>
                <td className="p-2.5 text-emerald-700 font-medium">🌟 {isEn ? 'Superior' : '極佳'}</td>
                <td className="p-2.5 font-bold text-rose-700">{isEn ? 'Zero value! Soft unhardened steel fails ISO wear requirements.' : '性價比為零！未經硬化不符 ISO 規定。'}</td>
                <td className="p-2.5"><span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-rose-300">{isEn ? '❌ Non-Compliant (Soft, fails wear resistance)' : '❌ 不合規 (未硬化無法抗磨)'}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
