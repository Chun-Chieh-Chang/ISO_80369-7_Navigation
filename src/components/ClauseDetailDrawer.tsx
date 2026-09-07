import React, { useState } from 'react';
import { ISOTopic, StandardClauseDetail } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  X, Wrench, Gauge, CheckCircle2, AlertTriangle, ShieldCheck, 
  Copy, Check, FileText, Activity, Droplets, Wind, Zap, 
  ArrowDownUp, RotateCw, ShieldAlert, Ruler, Sparkles, Layers3
} from 'lucide-react';
import { 
  getClauseObjective, 
  getClauseAppliesTo, 
  getClauseFixture, 
  getClauseTitle, 
  getClauseType,
  getClauseRegulatoryTip,
  getClauseTestProcedureSteps,
  getClauseAcceptanceCriteria,
  translateQuantitativeCondition,
  getTopicDetailedDescription,
  translateHighlightText,
  formatUnit
} from '../utils/i18nHelpers';
import { getAnnexCFigure } from '../utils/isoHelpers';

interface ClauseDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  topic: ISOTopic | null;
  relatedClauses: StandardClauseDetail[];
  activeClauseId: string | null;
  setActiveClauseId: (id: string) => void;
}

export const ClauseDetailDrawer: React.FC<ClauseDetailDrawerProps> = ({
  isOpen,
  onClose,
  topic,
  relatedClauses,
  activeClauseId,
  setActiveClauseId
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [copied, setCopied] = useState(false);

  // Pressure Decay Calculator State
  const [calcVolume, setCalcVolume] = useState<number>(8.5);
  const [calcTime, setCalcTime] = useState<number>(20);

  if (!isOpen || !topic) return null;

  const activeClause = relatedClauses.find(c => c.id === activeClauseId) || relatedClauses[0];

  const handleCopy = () => {
    if (!activeClause) return;
    const text = `[${activeClause.standard} §${activeClause.clauseNumber}] ${getClauseTitle(activeClause, isEn)}
${isEn ? 'Objective' : '規範目的'}: ${getClauseObjective(activeClause, isEn)}
${isEn ? 'Applies To' : '適用對象'}: ${getClauseAppliesTo(activeClause, isEn)}
${isEn ? 'Fixture' : '必要夾具'}: ${getClauseFixture(activeClause, isEn)}
${isEn ? 'Acceptance Criteria' : '法定允收標準'}: ${getClauseAcceptanceCriteria(activeClause, isEn).join('; ')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Droplets': return <Droplets className={className} />;
      case 'Wind': return <Wind className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'ArrowDownUp': return <ArrowDownUp className={className} />;
      case 'RotateCw': return <RotateCw className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Ruler': return <Ruler className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Layers3': return <Layers3 className={className} />;
      default: return <FileText className={className} />;
    }
  };

  const isLeakageTopic = topic.id === 'fluid-leakage' || topic.id === 'sub-atmospheric-air-leakage' || topic.id === 'stress-cracking' || topic.category === 'leakage';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-label="Close drawer" />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-3xl lg:max-w-4xl bg-white shadow-2xl flex flex-col h-full z-10 border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 truncate">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs shrink-0">
              {renderIcon(topic.iconName, "w-5 h-5")}
            </div>
            <div className="truncate">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                {isEn ? `${topic.category} Deep-Dive Specification` : `${topic.categoryZh} 法規深度規格`}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 truncate">
                {isEn ? (topic.titleEn || topic.titleZh) : topic.titleZh}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-2xs cursor-pointer min-h-[34px]"
              title="Copy details"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{isEn ? 'Copied' : '已複製'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isEn ? 'Copy' : '複製規格'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clause Selector Tabs (If multiple related clauses) */}
        {relatedClauses.length > 1 && (
          <div className="px-5 py-2.5 bg-slate-100/80 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-xs font-bold text-slate-500 mr-1 shrink-0">
              {isEn ? 'Linked Clauses:' : '相關連動條文:'}
            </span>
            {relatedClauses.map((clause) => {
              const isActive = activeClause?.id === clause.id;
              return (
                <button
                  key={clause.id}
                  onClick={() => setActiveClauseId(clause.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shrink-0 cursor-pointer min-h-[30px] ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  <span className="font-mono">{clause.standard.includes('80369-7') ? 'ISO 7' : 'ISO 20'}</span>
                  <span>§{clause.clauseNumber}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Drawer Scrollable Body - 100% Zero Information Loss */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Active Clause Main Card */}
          {activeClause && (
            <section className="space-y-5">
              
              {/* Clause Title & Badges */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-blue-100 text-blue-900 border border-blue-200">
                      {activeClause.standard}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                      §{activeClause.clauseNumber}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {getClauseType(activeClause, isEn)}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                  {getClauseTitle(activeClause, isEn)}
                </h4>
              </div>

              {/* Objective & Applies To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    {isEn ? 'Standard Objective:' : '規範核心目的 (Objective):'}
                  </span>
                  <p className="text-slate-800 leading-relaxed">{getClauseObjective(activeClause, isEn)}</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    {isEn ? 'Applies To:' : '適用物件產品 (Applies To):'}
                  </span>
                  <p className="text-slate-800 leading-relaxed">{getClauseAppliesTo(activeClause, isEn)}</p>
                </div>
              </div>

              {/* Specified Metal Reference Fixture (SSOT Standardized) */}
              {getClauseFixture(activeClause, isEn) && (
                <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-amber-700 shrink-0" />
                      {isEn ? 'Specified Metal Reference Fixture:' : '必要金屬參考夾具 (Specified Metal Reference Fixture):'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      ISO 80369-7 Annex C
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-950 font-mono leading-relaxed">
                    {getClauseFixture(activeClause, isEn)}
                  </p>
                </div>
              )}

              {/* Dual-Phase Engineering Conditions: Pre-assembly vs Test Load Challenge */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {isEn ? 'Quantitative Test & Pre-assembly Conditions:' : '量化實驗與工況條件 (Quantitative Conditions):'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  
                  {/* Phase 1: Pre-assembly Condition */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-blue-600" />
                        {isEn ? 'Phase 1: Pre-assembly' : '階段一：前置預裝配條件'}
                      </span>
                      {activeClause.preAssembly?.status === 'direct_overload' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {isEn ? 'Direct Overload' : '免預裝配 / 直加過載'}
                        </span>
                      )}
                      {(activeClause.preAssembly?.status === 'standard_lock' || activeClause.preAssembly?.status === 'slip') && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          {isEn ? 'Standard' : '標準程序'}
                        </span>
                      )}
                    </div>

                    {activeClause.preAssembly?.status === 'direct_overload' ? (
                      <p className="text-[11px] text-amber-900 leading-relaxed bg-white/80 p-2.5 rounded-lg border border-amber-200">
                        {isEn ? (activeClause.preAssembly.descriptionEn || 'Directly tighten to 0.15-0.17 N·m without 27.5 N pre-assembly push force.') : (activeClause.preAssembly.descriptionZh || '考核公套環極限抗滑牙能力，由未旋緊初始狀態直接連續旋緊至 0.15~0.17 N·m，不執行前置 27.5 N 軸向推力預裝配。')}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-xs">
                          {(activeClause.preAssembly?.assemblyTorqueNm || activeClause.quantitativeConditions.assemblyTorqueNm) && (
                            <div className="bg-white px-2 py-1.5 rounded-lg border border-blue-200">
                              <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Torque:' : '裝配扭矩:'}</span>
                              <span className="font-bold text-slate-800">
                                {translateQuantitativeCondition(activeClause.preAssembly?.assemblyTorqueNm || activeClause.quantitativeConditions.assemblyTorqueNm, isEn)}
                              </span>
                            </div>
                          )}
                          {(activeClause.preAssembly?.assemblyAxialForceN || activeClause.quantitativeConditions.assemblyAxialForceN) && (
                            <div className="bg-white px-2 py-1.5 rounded-lg border border-blue-200">
                              <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Axial Force:' : '軸向推力:'}</span>
                              <span className="font-bold text-slate-800">
                                {translateQuantitativeCondition(activeClause.preAssembly?.assemblyAxialForceN || activeClause.quantitativeConditions.assemblyAxialForceN, isEn)}
                              </span>
                            </div>
                          )}
                          <div className="bg-white px-2 py-1.5 rounded-lg border border-blue-200">
                            <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Hold Time:' : '保持時間:'}</span>
                            <span className="font-bold text-slate-800">
                              {translateQuantitativeCondition(activeClause.preAssembly?.holdTimeSec || (isEn ? '5 - 6 s' : '5 - 6 秒'), isEn)}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-blue-900/80 leading-relaxed">
                          💡 {isEn ? (activeClause.preAssembly?.descriptionEn || 'Simultaneously apply 26.5~27.5 N axial force and 0.08~0.12 N·m torque for 5-6 s, then release.') : (activeClause.preAssembly?.descriptionZh || '旋合時須同時施加 26.5~27.5 N 推力與 0.08~0.12 N·m 扭矩確立 6% 錐面緊密配合。')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Phase 2: Test Challenge Load */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-indigo-600" />
                        {isEn ? 'Phase 2: Challenge Load' : '階段二：定量考驗負載'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {isEn ? 'Test Load' : '實測考驗'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-xs">
                      {activeClause.quantitativeConditions.testPressureKpa && (
                        <div className="bg-white px-2 py-1.5 rounded-lg border border-blue-200">
                          <span className="text-[10px] text-blue-600 block font-sans">{isEn ? 'Pressure:' : '測試壓力:'}</span>
                          <span className="font-bold text-blue-900">
                            {translateQuantitativeCondition(activeClause.quantitativeConditions.testPressureKpa, isEn)}
                          </span>
                        </div>
                      )}
                      {activeClause.quantitativeConditions.testTorqueNm && (
                        <div className="bg-white px-2 py-1.5 rounded-lg border border-amber-200">
                          <span className="text-[10px] text-amber-700 block font-sans">{isEn ? 'Torque:' : '測試扭矩:'}</span>
                          <span className="font-bold text-amber-900">
                            {translateQuantitativeCondition(activeClause.quantitativeConditions.testTorqueNm, isEn)}
                          </span>
                        </div>
                      )}
                      {activeClause.quantitativeConditions.testForceN && (
                        <div className="bg-white px-2 py-1.5 rounded-lg border border-emerald-200">
                          <span className="text-[10px] text-emerald-700 block font-sans">{isEn ? 'Force:' : '測試拉力:'}</span>
                          <span className="font-bold text-emerald-900">
                            {translateQuantitativeCondition(activeClause.quantitativeConditions.testForceN, isEn)}
                          </span>
                        </div>
                      )}
                      {activeClause.quantitativeConditions.holdTimeSec && (
                        <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Hold Time:' : '考驗時間:'}</span>
                          <span className="font-bold text-slate-800">
                            {translateQuantitativeCondition(activeClause.quantitativeConditions.holdTimeSec, isEn)}
                          </span>
                        </div>
                      )}
                      {activeClause.quantitativeConditions.temperatureC && (
                        <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Temp:' : '溫度:'}</span>
                          <span className="font-bold text-slate-800">
                            {translateQuantitativeCondition(activeClause.quantitativeConditions.temperatureC, isEn)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Standard Test Procedure Steps */}
              {getClauseTestProcedureSteps(activeClause, isEn).length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isEn ? 'Standard Test Procedure Steps:' : '標準實驗流程步驟 (Standard Procedure Steps):'}
                  </span>
                  <div className="space-y-1.5">
                    {getClauseTestProcedureSteps(activeClause, isEn).map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Acceptance Criteria */}
              {getClauseAcceptanceCriteria(activeClause, isEn).length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isEn ? 'Statutory Acceptance Pass Criteria:' : '法定允收標準 (Pass Criteria):'}
                  </span>
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-1.5">
                    {getClauseAcceptanceCriteria(activeClause, isEn).map((criteria, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-emerald-950">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-semibold">{criteria}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Non-conformances */}
              {activeClause.commonNonConformancesZh && activeClause.commonNonConformancesZh.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isEn ? 'Common Engineering & Molding Failure Modes:' : '常見工程與射出失效模式 (Common Non-conformances):'}
                  </span>
                  <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-3.5 space-y-1.5">
                    {activeClause.commonNonConformancesZh.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-rose-950">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regulatory Tip */}
              {getClauseRegulatoryTip(activeClause, isEn) && (
                <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3.5 flex items-start space-x-2.5 text-xs text-blue-950">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <strong className="block text-blue-900 font-bold">{isEn ? 'Regulatory Audit Tip:' : '法規審查與確效指引:'}</strong>
                    <p className="leading-relaxed">{getClauseRegulatoryTip(activeClause, isEn)}</p>
                  </div>
                </div>
              )}

              {/* Embedded ISO Figure Renderer (If figure available for this clause) */}
              {activeClause.figureKey && (() => {
                const figInfo = getAnnexCFigure(activeClause.figureKey);
                return (
                  <div className="pt-2 space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      {isEn ? 'Standard Apparatus CAD Blueprint & Vector Render:' : '規範實驗裝置與 CAD 向量圖解:'}
                    </span>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-center">
                      <ISOStandardFigureRenderer
                        svgKey={activeClause.figureKey}
                        titleZh={figInfo?.nameZh || getClauseTitle(activeClause, false)}
                        titleEn={figInfo?.name || getClauseTitle(activeClause, true)}
                        standard={figInfo?.standardOwner || activeClause.standard}
                        figureTypeZh={figInfo?.annexGroup || "規範裝置 CAD 圖解"}
                        descriptionZh={figInfo?.descriptionZh || getClauseObjective(activeClause, false)}
                        descriptionEn={figInfo?.description || getClauseObjective(activeClause, true)}
                        keyCallouts={figInfo?.svgHighlights}
                      />
                    </div>

                    {/* Critical Dimensions & Geometric Features if available */}
                    {figInfo?.svgHighlights && figInfo.svgHighlights.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          {isEn ? 'Critical Dimensions & Geometric Tolerances:' : '幾何特徵與關鍵公差量測 (Critical Dimensions):'}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                          {figInfo.svgHighlights.map((hl, idx) => (
                            <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                              <span className="text-[11px] text-slate-400 block font-sans">{translateHighlightText(hl.title, isEn)}</span>
                              <span className="font-bold text-slate-800 mt-0.5 block">{translateHighlightText(hl.value, isEn)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

            </section>
          )}

          {/* Interactive Calculator (If Leakage Topic) */}
          {isLeakageTopic && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 rounded-2xl p-4 text-white space-y-3 shadow-lg border border-blue-800/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-800/50 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
                    ISO 80369-20:2024 Annex B.4 / D.4
                  </span>
                  <h4 className="text-xs font-bold text-blue-100 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-blue-400" />
                    {t.explorer.calculatorTitle}
                  </h4>
                </div>
                <span className="text-[11px] text-blue-300 font-mono">Q<sub>max</sub> = 0.005 Pa·m³/s</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                {/* Controls */}
                <div className="md:col-span-6 space-y-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-medium">{t.explorer.calcVolume}</label>
                    <input
                      type="number"
                      min="0.5"
                      max="100"
                      step="0.5"
                      value={calcVolume}
                      onChange={(e) => setCalcVolume(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                      className="w-24 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-right font-mono font-bold text-blue-300 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-medium">{t.explorer.calcTime}</label>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      step="1"
                      value={calcTime}
                      onChange={(e) => setCalcTime(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-24 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-right font-mono font-bold text-blue-300 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    {isEn ? 'Formula: ΔP max (Pa) = (5000 × Δt) / V (mL)' : '換算公式: ΔP max (Pa) = (5000 × Δt) / V (mL)'}
                  </div>
                </div>

                {/* Output */}
                <div className="md:col-span-6 bg-blue-900/40 p-3 rounded-xl border border-blue-700/50 flex flex-col justify-between space-y-2">
                  <span className="text-[11px] text-blue-200 font-semibold">{t.explorer.calcAllowableDecay}</span>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                      <span className="text-[10px] text-slate-400 block">Pa</span>
                      <span className="text-xs font-black text-amber-300">{Math.round((5000 * calcTime) / calcVolume).toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                      <span className="text-[10px] text-slate-400 block">kPa</span>
                      <span className="text-xs font-black text-emerald-300">{((5 * calcTime) / calcVolume).toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                      <span className="text-[10px] text-slate-400 block">mbar</span>
                      <span className="text-xs font-black text-sky-300">{(((5000 * calcTime) / calcVolume) / 100).toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-blue-300/80 leading-tight">
                    {isEn 
                      ? `Criteria: during hold time ${calcTime}s, measured decay ΔP ≤ ${((5 * calcTime) / calcVolume).toFixed(2)} kPa → Pass.` 
                      : `判定原則：持壓 ${calcTime}s 期間實測壓降 ΔP ≤ ${((5 * calcTime) / calcVolume).toFixed(2)} kPa → 合格 (Pass)。`}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>ISO 80369 SSOT Verification System</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition cursor-pointer min-h-[32px]"
          >
            {isEn ? 'Close' : '關閉視窗'}
          </button>
        </div>

      </aside>
    </div>
  );
};
