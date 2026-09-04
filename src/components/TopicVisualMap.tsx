import React, { useState, useMemo } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ANNEX_C_FIGURES } from '../data/isoData';
import { useLanguage } from '../i18n/LanguageContext';
import { Network, Sparkles, Filter, Info, ArrowRight, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';

import { 
  getTopicShortSummary, 
  getClauseObjective, 
  getClauseAppliesTo, 
  getClauseTitle, 
  getClauseType, 
  translateHighlightText, 
  formatUnit 
} from '../utils/i18nHelpers';

export const TopicVisualMap: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ISO_TOPICS[0].id);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeTopic = useMemo(() => {
    return ISO_TOPICS.find(t => t.id === selectedTopicId) || ISO_TOPICS[0];
  }, [selectedTopicId]);

  // Derived mapping links
  const mappingNodes = useMemo(() => {
    if (!activeTopic) return { iso7: [], iso20: [], fixtures: [] };

    const iso7 = activeTopic.relatedISO7Clauses.map(clauseNum => {
      const sanitized = clauseNum.toLowerCase().replace('clause ', '').trim().replace(/\s+/g, '-');
      const key = `iso7-${sanitized}`;
      const detail = STANDARD_CLAUSE_DETAILS[key];
      if (detail) {
        return {
          ...detail,
          titleEn: detail.titleEn || getClauseTitle(detail, true),
          objectiveEn: detail.objectiveEn || getClauseObjective(detail, true),
          appliesToEn: detail.appliesToEn || getClauseAppliesTo(detail, true),
          typeEn: detail.typeEn || getClauseType(detail, true)
        };
      }
      return {
        id: key,
        standard: 'ISO 80369-7:2021',
        clauseNumber: clauseNum,
        titleZh: `第 ${clauseNum} 節 規範`,
        titleEn: `Clause ${clauseNum} Specification`,
        typeZh: '規格條文',
        typeEn: 'Requirement',
        objectiveZh: activeTopic.shortSummaryZh,
        objectiveEn: getTopicShortSummary(activeTopic, true),
        appliesToZh: '公/母魯爾鎖定與滑動接頭',
        appliesToEn: 'Male & Female Luer Lock and Slip Connectors',
        quantitativeConditions: {},
        acceptanceCriteriaZh: []
      };
    });

    const iso20 = activeTopic.relatedISO20Annexes.map(annexName => {
      const sanitized = annexName.toLowerCase().trim().replace(/\s+/g, '-');
      const key = `iso20-${sanitized}`;
      const detail = STANDARD_CLAUSE_DETAILS[key];
      if (detail) {
        return {
          ...detail,
          titleEn: detail.titleEn || getClauseTitle(detail, true),
          objectiveEn: detail.objectiveEn || getClauseObjective(detail, true),
          appliesToEn: detail.appliesToEn || getClauseAppliesTo(detail, true),
          typeEn: detail.typeEn || getClauseType(detail, true)
        };
      }
      return {
        id: key,
        standard: 'ISO 80369-20:2024',
        clauseNumber: annexName,
        titleZh: `${annexName} 實驗室測試細則`,
        titleEn: `${annexName} Test Method`,
        typeZh: '測試方法',
        typeEn: 'Test Method',
        objectiveZh: `驗證 ${annexName} 之標準測試流程與儀器要求`,
        objectiveEn: `Standard laboratory test procedure and apparatus requirements for ${annexName}`,
        appliesToZh: '所有小口徑連接器',
        appliesToEn: 'All Small-Bore Connectors',
        quantitativeConditions: {},
        acceptanceCriteriaZh: []
      };
    });

    const fixtures = activeTopic.relatedRefConnectors.map(figId => ANNEX_C_FIGURES[figId]).filter(Boolean);

    return { iso7, iso20, fixtures };
  }, [activeTopic]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-[13px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                <Network className="w-4 h-4 text-indigo-700" />
                {t.visualMap.badge}
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {t.visualMap.title}
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 mt-1">
              {t.visualMap.subtitle}
            </p>
          </div>
        </div>

        {/* Topic Selector Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100/80 flex flex-wrap items-center gap-2 pb-1 text-[13px]">
          <span className="font-bold text-slate-400 shrink-0">{t.visualMap.selectTopic}</span>
          {ISO_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition-all cursor-pointer min-h-[38px] flex items-center ${
                selectedTopicId === topic.id
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {isEn ? (topic.titleEn || topic.titleZh) : (topic.titleZh.split(' ')[1] || topic.titleZh)}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Flow Network Diagram */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6 overflow-hidden">
        
        {/* Node Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
          
          {/* Column 1: Topic Selected */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[13px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>{t.visualMap.step1Title}</span>
            </div>

            <div className="bg-blue-50 border border-blue-300/80 rounded-2xl p-4 shadow-sm space-y-2.5">
              <span className="text-[13px] bg-blue-600 text-white font-bold px-2.5 py-0.5 rounded-md shadow-2xs">
                {isEn ? activeTopic.category : activeTopic.categoryZh}
              </span>
              <h3 className="text-sm font-bold text-blue-950">
                {isEn ? (activeTopic.titleEn || activeTopic.titleZh) : activeTopic.titleZh}
              </h3>
              <p className="text-[13px] text-blue-900 leading-relaxed">
                {getTopicShortSummary(activeTopic, isEn)}
              </p>
              
              <div className="pt-2 border-t border-blue-200/60 text-[13px] space-y-1.5 font-mono">
                {activeTopic.keyParameters.map((kp, idx) => (
                  <div key={idx} className="flex justify-between text-blue-900">
                    <span className="text-blue-700">{isEn ? (kp.labelEn || translateHighlightText(kp.label, true)) : kp.label}:</span>
                    <span className="font-bold">{isEn ? (kp.valueEn || translateHighlightText(kp.value, true)) : kp.value} {formatUnit(kp.unit, isEn)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Arrow Connector 1 -> 2 */}
          <div className="md:hidden flex justify-center py-1 text-blue-600 font-bold text-lg animate-bounce">
            ↓
          </div>

          {/* Column 2: ISO 80369-7 Requirements */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[13px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>{t.visualMap.step2Title}</span>
            </div>

            <div className="space-y-3">
              {mappingNodes.iso7.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-2 hover:border-blue-400 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-600 text-white font-mono font-bold text-[13px] px-2 py-0.5 rounded-md">
                      ISO 7 §{item.clauseNumber}
                    </span>
                    <span className="text-[13px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      {isEn ? 'Requirement' : '法規要求'}
                    </span>
                  </div>
                  <h4 className="text-[13px] font-bold text-slate-900">
                    {isEn ? (item.titleEn || item.titleZh) : item.titleZh}
                  </h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    {isEn ? (item.objectiveEn || item.objectiveZh) : item.objectiveZh}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Arrow Connector 2 -> 3 */}
          <div className="md:hidden flex justify-center py-1 text-indigo-700 font-bold text-lg animate-bounce">
            ↓
          </div>

          {/* Column 3: ISO 80369-20 Test Annexes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[13px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-700"></span>
              <span>{t.visualMap.step3Title}</span>
            </div>

            <div className="space-y-3">
              {mappingNodes.iso20.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-50/40 border border-indigo-200/80 rounded-2xl p-3.5 shadow-2xs space-y-2 hover:border-indigo-400 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-indigo-700 text-white font-mono font-bold text-[13px] px-2 py-0.5 rounded-md">
                      ISO 20 {item.clauseNumber}
                    </span>
                    <span className="text-[13px] text-indigo-700 font-semibold bg-indigo-100/80 px-2 py-0.5 rounded-md">
                      {isEn ? 'Test Method' : '測試細則'}
                    </span>
                  </div>
                  <h4 className="text-[13px] font-bold text-indigo-950">
                    {isEn ? (item.titleEn || item.titleZh) : item.titleZh}
                  </h4>
                  <p className="text-[13px] text-indigo-900 leading-relaxed">
                    {isEn ? (item.objectiveEn || item.objectiveZh) : item.objectiveZh}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Arrow Connector 3 -> 4 */}
          <div className="md:hidden flex justify-center py-1 text-emerald-600 font-bold text-lg animate-bounce">
            ↓
          </div>

          {/* Column 4: Reference Fixtures & Pass Criteria */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[13px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>{t.visualMap.step4Title}</span>
            </div>

            <div className="space-y-3">
              {/* Fixture cards */}
              {mappingNodes.fixtures.map((fig) => (
                <div
                  key={fig.id}
                  className={`p-3.5 rounded-2xl border space-y-1.5 transition-all ${
                    fig.isWorstCase
                      ? 'bg-amber-50/80 border-amber-300/80'
                      : 'bg-emerald-50/40 border-emerald-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-bold text-[13px] px-2 py-0.5 rounded-md ${
                      fig.isWorstCase ? 'bg-amber-600 text-white' : 'bg-emerald-700 text-white'
                    }`}>
                      Figure {fig.id}
                    </span>
                    <span className="text-[13px] font-bold text-slate-700">
                      {isEn ? (fig.gender === 'male' ? 'Male Fixture' : 'Female Fixture') : (fig.gender === 'male' ? '公金屬件' : '母金屬件')}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-700">
                    {isEn ? (fig.descriptionEn || fig.name) : fig.descriptionZh}
                  </p>
                </div>
              ))}

              {/* Acceptance Criteria Card */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-2xs">
                <div className="flex items-center space-x-1.5 text-emerald-800 text-[13px] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'Pass / Acceptance Criteria' : '最終 Pass 合格判定'}</span>
                </div>
                <p className="text-[13px] text-emerald-900 leading-relaxed">
                  {isEn ? (
                    activeTopic.relatedISO7Clauses.includes('6.1') ? 'No falling drop under 300-330 kPa hydraulic (30-35s) or pressure decay <= 0.005 Pa·m³/s (15-20s)' :
                    activeTopic.relatedISO7Clauses.includes('6.2') ? 'Leakage rate <= 0.005 Pa·m³/s under 80.0-88.0 kPa vacuum for 15-20s' :
                    activeTopic.relatedISO7Clauses.includes('6.6') ? 'No thread overriding and no cocking under 0.15-0.17 N·m torque for 5-10s' :
                    activeTopic.relatedISO7Clauses.includes('6.4') ? 'Remain assembled without separation under 23-25 N (Slip) or 32-35 N (Lock) for 10-15s' :
                    activeTopic.relatedISO7Clauses.includes('6.3') ? 'No cracking after 48 h assembly hold per ISO 80369-20 Annex E, and pass Clause 6.1.1' :
                    activeTopic.relatedISO7Clauses.includes('6.5') ? 'No separation under 0.018-0.020 N·m unscrewing torque for 10-15s' :
                    activeTopic.relatedISO7Clauses.includes('Clause 5.1') ? 'Full compliance with 6% taper geometric tolerances' :
                    activeTopic.relatedISO7Clauses.includes('Clause 4') ? 'Non-interchangeable interface preventing misconnections' : ''
                  ) : (
                    activeTopic.relatedISO7Clauses.includes('6.1') ? '300~330 kPa 加壓下無漏水滴落 (30~35s) 或壓降 ≤ 0.005 Pa·m³/s (15~20s)' :
                    activeTopic.relatedISO7Clauses.includes('6.2') ? '80.0~88.0 kPa 負壓下持壓 15~20 秒，洩漏率 ≤ 0.005 Pa·m³/s' :
                    activeTopic.relatedISO7Clauses.includes('6.6') ? '0.15~0.17 N·m 扭力下持壓 5~10 秒無滑牙脫開' :
                    activeTopic.relatedISO7Clauses.includes('6.4') ? '23~25 N (Slip) 或 32~35 N (Lock) 軸向拉力下持壓 10~15 秒無分離' :
                    activeTopic.relatedISO7Clauses.includes('6.3') ? '23°C 空氣靜置 48 小時 (Annex E) 無龜裂破裂，且通過 6.1.1 洩漏驗證' :
                    activeTopic.relatedISO7Clauses.includes('6.5') ? '0.018~0.020 N·m 反向扭矩下持壓 10~15 秒維持自鎖不鬆脫' :
                    activeTopic.relatedISO7Clauses.includes('Clause 5.1') ? '尺寸完全符合 6% 錐度規範' :
                    activeTopic.relatedISO7Clauses.includes('Clause 4') ? '非通用介面，100% 避免跨應用誤接' : ''
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Relationship Connection Flow Bar */}
        <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-slate-700 shadow-2xs">
          <div className="flex items-center space-x-2 font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{t.visualMap.chainTitle}:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[13px]">
            <span className="bg-blue-100 text-blue-900 border border-blue-200/60 px-2.5 py-1 rounded-lg font-bold">
              {isEn ? (activeTopic.titleEn || activeTopic.titleZh) : (activeTopic.titleZh.split(' ')[1] || activeTopic.titleZh)}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg font-bold shadow-2xs">
              ISO 80369-7 §{activeTopic.relatedISO7Clauses.join(', ')}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="bg-indigo-700 text-white px-2.5 py-1 rounded-lg font-bold shadow-2xs">
              ISO 80369-20 {activeTopic.relatedISO20Annexes.join(', ')}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="bg-amber-600 text-white px-2.5 py-1 rounded-lg font-bold shadow-2xs">
              {isEn ? `Fixtures ${activeTopic.relatedRefConnectors.join(', ')}` : `夾具 ${activeTopic.relatedRefConnectors.join(', ')}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
