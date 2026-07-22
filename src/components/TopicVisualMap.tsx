import React, { useState, useMemo } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ANNEX_C_FIGURES } from '../data/isoData';
import { Network, Sparkles, Filter, Info, ArrowRight, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';

export const TopicVisualMap: React.FC = () => {
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
      return STANDARD_CLAUSE_DETAILS[key] || {
        id: key,
        standard: 'ISO 80369-7:2021',
        clauseNumber: clauseNum,
        titleZh: `第 ${clauseNum} 節 規範`,
        typeZh: '規格條文',
        objectiveZh: activeTopic.shortSummaryZh,
        appliesToZh: '公/母魯爾鎖定與滑動接頭',
        quantitativeConditions: {},
        acceptanceCriteriaZh: []
      };
    });

    const iso20 = activeTopic.relatedISO20Annexes.map(annexName => {
      const sanitized = annexName.toLowerCase().trim().replace(/\s+/g, '-');
      const key = `iso20-${sanitized}`;
      return STANDARD_CLAUSE_DETAILS[key] || {
        id: key,
        standard: 'ISO 80369-20:2024',
        clauseNumber: annexName,
        titleZh: `${annexName} 實驗室測試細則`,
        typeZh: '測試方法',
        objectiveZh: `驗證 ${annexName} 之標準測試流程與儀器要求`,
        appliesToZh: '所有小口徑連接器',
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
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <Network className="w-3.5 h-3.5" />
                檢索視覺化圖表
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                ISO 80369-7 ➔ ISO 80369-20 條文關聯脈絡圖
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              點選不同主題，可即時查看「主題 ➔ ISO 80369-7 規格條文 ➔ ISO 80369-20 測試方法 ➔ Annex C 參考金屬夾具 ➔ 定量條件與合格標準」的多維關聯流向圖。
            </p>
          </div>
        </div>

        {/* Topic Selector Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 pb-1">
          <span className="text-xs font-bold text-slate-400 shrink-0">切換主題:</span>
          {ISO_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedTopicId === topic.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {topic.titleZh.split(' ')[1] || topic.titleZh}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Flow Network Diagram */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 overflow-hidden">
        
        {/* Node Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Column 1: Topic Selected */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>1. 檢索主題 (Topic)</span>
            </div>

            <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-4 shadow-sm space-y-2">
              <span className="text-xs bg-blue-600 text-white font-bold px-2 py-0.5 rounded-md">
                {activeTopic.categoryZh}
              </span>
              <h3 className="text-sm font-bold text-blue-950">
                {activeTopic.titleZh}
              </h3>
              <p className="text-xs text-blue-900 leading-relaxed">
                {activeTopic.shortSummaryZh}
              </p>
              
              <div className="pt-2 border-t border-blue-200/60 text-xs space-y-1 font-mono">
                {activeTopic.keyParameters.map((kp, idx) => (
                  <div key={idx} className="flex justify-between text-blue-900">
                    <span className="text-blue-700">{kp.label}:</span>
                    <span className="font-bold">{kp.value} {kp.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: ISO 80369-7 Requirements */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>2. ISO 80369-7 規格條文</span>
            </div>

            <div className="space-y-3">
              {mappingNodes.iso7.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-blue-300 rounded-xl p-3.5 shadow-xs space-y-2 hover:border-blue-500 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-600 text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                      ISO 7 §{item.clauseNumber}
                    </span>
                    <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      法規要求
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.titleZh}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.objectiveZh}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: ISO 80369-20 Test Annexes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              <span>3. ISO 80369-20 實驗方法</span>
            </div>

            <div className="space-y-3">
              {mappingNodes.iso20.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-purple-50/50 border border-purple-300 rounded-xl p-3.5 shadow-xs space-y-2 hover:border-purple-500 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-600 text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                      ISO 20 {item.clauseNumber}
                    </span>
                    <span className="text-xs text-purple-700 font-semibold bg-purple-100 px-1.5 py-0.5 rounded">
                      測試細則
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-purple-950">
                    {item.titleZh}
                  </h4>
                  <p className="text-xs text-purple-900 leading-relaxed">
                    {item.objectiveZh}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Reference Fixtures & Pass Criteria */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>4. 金屬夾具與合格標準</span>
            </div>

            <div className="space-y-3">
              {/* Fixture cards */}
              {mappingNodes.fixtures.map((fig) => (
                <div
                  key={fig.id}
                  className={`p-3 rounded-xl border space-y-1.5 ${
                    fig.isWorstCase
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-emerald-50/50 border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                      fig.isWorstCase ? 'bg-amber-600 text-white' : 'bg-emerald-700 text-white'
                    }`}>
                      Figure {fig.id}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {fig.gender === 'male' ? '公金屬件' : '母金屬件'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    {fig.descriptionZh}
                  </p>
                </div>
              ))}

              {/* Acceptance Criteria Card */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 space-y-1">
                <div className="flex items-center space-x-1 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>最終 Pass 合格判定</span>
                </div>
                <p className="text-xs text-emerald-900">
                  {activeTopic.relatedISO7Clauses.includes('6.1') && '加壓 300~330 kPa 保持 10 秒無水滴滲漏'}
                  {activeTopic.relatedISO7Clauses.includes('6.2') && '80~88 kPa 真空負壓下無氣體滲入'}
                  {activeTopic.relatedISO7Clauses.includes('6.6') && '承受 0.15~0.17 N·m 保持 10 秒無滑牙脫開'}
                  {activeTopic.relatedISO7Clauses.includes('6.4') && '承受 35 N 軸向拉力 10 秒無分離'}
                  {activeTopic.relatedISO7Clauses.includes('6.3') && '70% IPA 浸泡 48 小時無應力龜裂'}
                  {activeTopic.relatedISO7Clauses.includes('6.5') && '0.02 N·m 反向旋鬆力下維持自鎖不鬆脫'}
                  {activeTopic.relatedISO7Clauses.includes('Clause 5.1') && '尺寸完全符合 6% 錐度規範'}
                  {activeTopic.relatedISO7Clauses.includes('Clause 4') && '非通用介面，100% 避免跨應用誤接'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Relationship Connection Flow Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center space-x-2 font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>目前檢索主題關聯鏈結 (Connection Chain):</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded font-bold">
              {activeTopic.titleZh.split(' ')[1] || activeTopic.titleZh}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold">
              ISO 80369-7 §{activeTopic.relatedISO7Clauses.join(', ')}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">
              ISO 80369-20 {activeTopic.relatedISO20Annexes.join(', ')}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="bg-amber-600 text-white px-2 py-1 rounded font-bold">
              夾具 {activeTopic.relatedRefConnectors.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
