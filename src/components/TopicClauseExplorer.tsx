import React, { useState, useMemo } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ANNEX_C_FIGURES } from '../data/isoData';
import { ISOTopic, StandardClauseDetail, AnnexCFigureInfo } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { 
  Search, BookOpen, FileText, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, Copy, Check, Info, Sparkles, Filter, ExternalLink, RefreshCw,
  Droplets, Wind, Zap, ArrowDownUp, RotateCw, ShieldAlert, Ruler, Wrench, Layers3, Layers, Activity,
  FolderTree, ChevronRight, ChevronDown, Tag, Eye, FileCode
} from 'lucide-react';

export const TopicClauseExplorer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'topics' | 'annex_tree'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ISO_TOPICS[0].id);
  const [selectedFigureId, setSelectedFigureId] = useState<string>('B.2');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStandardFilter, setSelectedStandardFilter] = useState<'all' | 'iso7' | 'iso20'>('all');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [calcVolume, setCalcVolume] = useState<number>(10);
  const [calcTime, setCalcTime] = useState<number>(15);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'iso7': true,
    'iso7-annex-a': true,
    'iso7-annex-b': true,
    'iso7-annex-c': true,
    'iso20': true,
    'iso20-annexes': true
  });

  const toggleNode = (nodeKey: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  };

  // Map icon strings to Lucide icon components
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

  // Filter topics based on search query and category
  const filteredTopics = useMemo(() => {
    return ISO_TOPICS.filter(topic => {
      const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery = 
        topic.titleZh.toLowerCase().includes(q) ||
        topic.titleEn.toLowerCase().includes(q) ||
        topic.shortSummaryZh.toLowerCase().includes(q) ||
        topic.detailedDescriptionZh.toLowerCase().includes(q) ||
        topic.tags.some(tag => tag.toLowerCase().includes(q)) ||
        topic.relatedISO7Clauses.some(c => c.toLowerCase().includes(q)) ||
        topic.relatedISO20Annexes.some(a => a.toLowerCase().includes(q)) ||
        topic.relatedRefConnectors.some(r => r.toLowerCase().includes(q)) ||
        (topic.figures && topic.figures.some(f => 
          f.id.toLowerCase().includes(q) ||
          f.titleZh.toLowerCase().includes(q) ||
          f.standard.toLowerCase().includes(q) ||
          f.svgKey.toLowerCase().includes(q)
        ));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  // All standard figures list (excluding non-standard SML from official standard counts)
  const allStandardFigures = useMemo(() => {
    return Object.values(ANNEX_C_FIGURES).filter(fig => fig.annexGroup !== 'Commercial');
  }, []);

  // Filtered annex figures based on search
  const filteredAnnexFigures = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allStandardFigures;
    return allStandardFigures.filter(fig => 
      fig.figureNumber.toLowerCase().includes(q) ||
      fig.id.toLowerCase().includes(q) ||
      fig.name.toLowerCase().includes(q) ||
      (fig.nameZh && fig.nameZh.toLowerCase().includes(q)) ||
      fig.descriptionZh.toLowerCase().includes(q) ||
      fig.annexGroup.toLowerCase().includes(q) ||
      (fig.standardOwner && fig.standardOwner.toLowerCase().includes(q))
    );
  }, [searchQuery, allStandardFigures]);

  // Current active topic
  const currentTopic = useMemo(() => {
    if (filteredTopics.length === 0) return null;
    const found = filteredTopics.find(t => t.id === selectedTopicId);
    if (found) return found;
    return filteredTopics[0];
  }, [selectedTopicId, filteredTopics]);

  // Current selected figure object
  const currentSelectedFigure = useMemo(() => {
    return ANNEX_C_FIGURES[selectedFigureId] || ANNEX_C_FIGURES['B.2'];
  }, [selectedFigureId]);

  // Associated clause details (MECE deduplicated)
  const currentClauses = useMemo(() => {
    if (!currentTopic) return [];
    
    const clauseKeys: string[] = [];
    currentTopic.relatedISO7Clauses.forEach(c => {
      const sanitized = c.toLowerCase().replace('clause ', '').trim().replace(/\s+/g, '-');
      const key = `iso7-${sanitized}`;
      if (STANDARD_CLAUSE_DETAILS[key] && !clauseKeys.includes(key)) {
        clauseKeys.push(key);
      }
    });

    currentTopic.relatedISO20Annexes.forEach(a => {
      const sanitized = a.toLowerCase().trim().replace(/\s+/g, '-');
      const key = `iso20-${sanitized}`;
      if (STANDARD_CLAUSE_DETAILS[key] && !clauseKeys.includes(key)) {
        clauseKeys.push(key);
      }
    });

    return clauseKeys.map(k => STANDARD_CLAUSE_DETAILS[k]).filter(Boolean);
  }, [currentTopic]);

  // Associated reference connectors (MECE deduplicated)
  const currentRefConnectors = useMemo(() => {
    if (!currentTopic) return [];
    const seen = new Set<string>();
    return currentTopic.relatedRefConnectors
      .map(id => ANNEX_C_FIGURES[id])
      .filter(Boolean)
      .filter(fig => {
        if (seen.has(fig.id)) return false;
        seen.add(fig.id);
        return true;
      });
  }, [currentTopic]);

  // Copy structured summary to clipboard
  const handleCopySummary = () => {
    if (!currentTopic) return;
    const summary = `【ISO 條文與規範檢索摘要 - ${currentTopic.titleZh}】
■ 關聯 ISO 80369-7 條文: ${currentTopic.relatedISO7Clauses.join(', ')}
■ 關聯 ISO 80369-20 測試方法: ${currentTopic.relatedISO20Annexes.join(', ')}
■ 必要參考金屬夾具: ${currentTopic.relatedRefConnectors.join(', ')}
■ 關鍵條件: ${currentTopic.keyParameters.map(p => `${p.label}: ${p.value} ${p.unit || ''}`).join(' | ')}
■ 核心要求說明: ${currentTopic.shortSummaryZh}
■ 研發防呆風險: ${currentTopic.engineeringRiskZh}
■ 法規稽核重點: ${currentTopic.auditFocusZh}`;

    navigator.clipboard.writeText(summary);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                主題與條文檢索樞紐
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                ISO 80369-7 / ISO 80369-20 主題導向條文對照庫
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              點擊特定測試主題或輸入關鍵字，即時調閱連動之 ISO 80369-7 規格條文、ISO 80369-20 實驗室測試方法、定量參數與合格判定標準。
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜尋關鍵字 (例: 300kPa, 6.6, C.3, 滑牙, 龜裂)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Chips Filter & Navigation Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> 主題分類:
            </span>
            {[
              { id: 'all', label: '全部主題 All Topics' },
              { id: 'leakage', label: '💧 洩漏與氣密 Leakage' },
              { id: 'mechanical', label: '⚡ 機械強度 Mechanical' },
              { id: 'durability', label: '🛡️ 耐久與環境 Durability' },
              { id: 'dimensional', label: '📐 幾何尺寸 Dimensions' },
              { id: 'assembly', label: '🔧 夾具與裝配 Assembly' },
              { id: 'general', label: '🌐 通用安全 General' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-all text-xs ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Mode Switcher Button Group */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl shrink-0 border border-slate-200 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('topics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'topics'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>主題對照庫</span>
            </button>
            <button
              onClick={() => setViewMode('annex_tree')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'annex_tree'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>規範附件圖表導航樹</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Navigation Column & Right Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Navigation Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {viewMode === 'topics' ? (
          <>
            <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span>可檢索主題列表 ({filteredTopics.length})</span>
                </span>
                <span className="text-xs text-slate-400">點擊主題卡片查看詳情</span>
              </div>

              <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                {filteredTopics.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 space-y-2">
                    <Info className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium">未找到符合「{searchQuery}」的主題條文</p>
                    <p className="text-xs text-slate-400">請嘗試搜尋其他關鍵字如: 300kPa, 0.17Nm, C.3, 6.1, Annex G</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                      className="mt-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
                    >
                      重置搜尋條件
                    </button>
                  </div>
                ) : (
                  filteredTopics.map((topic) => {
                    const isSelected = topic.id === currentTopic?.id;
                    return (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/30'
                            : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2.5 rounded-xl transition-colors ${
                              isSelected ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-blue-600'
                            }`}>
                              {renderIcon(topic.iconName, "w-4.5 h-4.5")}
                            </div>
                            <div>
                              <h3 className={`text-sm font-bold tracking-tight ${
                                isSelected ? 'text-blue-950 font-extrabold' : 'text-slate-800'
                              }`}>
                                {topic.titleZh}
                              </h3>
                              <span className="text-[13px] text-slate-400 font-mono block mt-0.5">
                                {topic.titleEn}
                              </span>
                            </div>
                          </div>

                          <span className="text-[13px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200/60 shrink-0">
                            {topic.categoryZh}
                          </span>
                        </div>

                        <p className="text-[13px] text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                          {topic.shortSummaryZh}
                        </p>

                        {/* Quick Badges & Clause Connection */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[13px]">
                          <span className="font-semibold text-slate-400">連動條文:</span>
                          {topic.relatedISO7Clauses.map(c => (
                            <span key={c} className="bg-blue-50 text-blue-800 border border-blue-200/80 font-mono px-2 py-0.5 rounded-lg font-bold">
                              ISO 7 §{c}
                            </span>
                          ))}
                          {topic.relatedISO20Annexes.map(a => (
                            <span key={a} className="bg-purple-50 text-purple-800 border border-purple-200/80 font-mono px-2 py-0.5 rounded-lg font-bold">
                              ISO 20 {a}
                            </span>
                          ))}
                          {topic.relatedRefConnectors.map(r => (
                            <span key={r} className="bg-amber-50 text-amber-800 border border-amber-200/80 font-mono px-2 py-0.5 rounded-lg font-bold">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            /* Annex Figures Navigation Tree View */
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 max-h-[720px] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <FolderTree className="w-4 h-4 text-blue-600" />
                  ISO 80369 規範附件圖表導航樹
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredAnnexFigures.length} 幅圖表
                </span>
              </div>

              {/* ISO 80369-7 Root Node */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleNode('iso7')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 text-blue-900 font-bold text-xs transition border border-blue-100"
                >
                  <span className="flex items-center gap-1.5">
                    {expandedNodes['iso7'] ? <ChevronDown className="w-4 h-4 text-blue-600" /> : <ChevronRight className="w-4 h-4 text-blue-600" />}
                    📘 ISO 80369-7 血管小口徑接頭規範圖表
                  </span>
                  <span className="bg-blue-200/80 text-blue-800 text-xs px-2 py-0.5 rounded-md font-mono font-bold">
                    {allStandardFigures.filter(f => f.annexGroup !== 'ISO 80369-20').length} 幅
                  </span>
                </button>

                {expandedNodes['iso7'] && (
                  <div className="pl-2 space-y-1 border-l-2 border-blue-100 ml-2 pt-1">
                    
                    {/* Annex A */}
                    <div className="space-y-0.5">
                      <button
                        onClick={() => toggleNode('iso7-annex-a')}
                        className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-bold"
                      >
                        <span className="flex items-center gap-1">
                          {expandedNodes['iso7-annex-a'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                          Annex A 防誤插幾何矩陣 (Non-Interchangeability)
                        </span>
                      </button>
                      {expandedNodes['iso7-annex-a'] && (
                        <div className="pl-3 space-y-1 border-l border-slate-200 ml-2">
                          {filteredAnnexFigures.filter(f => f.annexGroup === 'Annex A').map(fig => {
                            const isSelected = selectedFigureId === fig.id;
                            return (
                              <button
                                key={fig.id}
                                onClick={() => setSelectedFigureId(fig.id)}
                                className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border ${
                                  isSelected 
                                    ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-sm' 
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/60'
                                }`}
                              >
                                <span className="flex items-center gap-1.5 truncate">
                                  <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-blue-500'}`} />
                                  <span className="font-mono">{fig.figureNumber}:</span>
                                  <span className="truncate">{fig.nameZh || fig.name}</span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Annex B */}
                    <div className="space-y-0.5 pt-1">
                      <button
                        onClick={() => toggleNode('iso7-annex-b')}
                        className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-bold"
                      >
                        <span className="flex items-center gap-1">
                          {expandedNodes['iso7-annex-b'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                          Annex B 商業產品 CAD 尺寸 (Product CAD)
                        </span>
                      </button>
                      {expandedNodes['iso7-annex-b'] && (
                        <div className="pl-3 space-y-1 border-l border-slate-200 ml-2">
                          {filteredAnnexFigures.filter(f => f.annexGroup === 'Annex B').map(fig => {
                            const isSelected = selectedFigureId === fig.id;
                            return (
                              <button
                                key={fig.id}
                                onClick={() => setSelectedFigureId(fig.id)}
                                className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border ${
                                  isSelected 
                                    ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-sm' 
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/60'
                                }`}
                              >
                                <span className="flex items-center gap-1.5 truncate">
                                  <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                                  <span className="font-mono">{fig.figureNumber}:</span>
                                  <span className="truncate">{fig.nameZh || fig.name}</span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Annex C */}
                    <div className="space-y-0.5 pt-1">
                      <button
                        onClick={() => toggleNode('iso7-annex-c')}
                        className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-bold"
                      >
                        <span className="flex items-center gap-1">
                          {expandedNodes['iso7-annex-c'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                          Annex C 測試參考金屬夾具 (Reference Gauges)
                        </span>
                      </button>
                      {expandedNodes['iso7-annex-c'] && (
                        <div className="pl-3 space-y-1 border-l border-slate-200 ml-2">
                          {filteredAnnexFigures.filter(f => f.annexGroup === 'Annex C').map(fig => {
                            const isSelected = selectedFigureId === fig.id;
                            return (
                              <button
                                key={fig.id}
                                onClick={() => setSelectedFigureId(fig.id)}
                                className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border ${
                                  isSelected 
                                    ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-sm' 
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/60'
                                }`}
                              >
                                <span className="flex items-center gap-1.5 truncate">
                                  <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
                                  <span className="font-mono">{fig.figureNumber}:</span>
                                  <span className="truncate">{fig.nameZh || fig.name}</span>
                                </span>
                                {fig.isWorstCase && (
                                  <span className={`text-xs px-1.5 py-0.5 rounded font-bold shrink-0 ml-1 ${
                                    isSelected ? 'bg-rose-400 text-slate-900' : 'bg-rose-100 text-rose-700'
                                  }`}>
                                    Worst-Case
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>

              {/* ISO 80369-20 Root Node */}
              <div className="space-y-1 pt-2">
                <button
                  onClick={() => toggleNode('iso20')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-purple-50/80 hover:bg-purple-100/80 text-purple-900 font-bold text-xs transition border border-purple-100"
                >
                  <span className="flex items-center gap-1.5">
                    {expandedNodes['iso20'] ? <ChevronDown className="w-4 h-4 text-purple-600" /> : <ChevronRight className="w-4 h-4 text-purple-600" />}
                    🔬 ISO 80369-20 實驗室測試方法機台與裝置圖表
                  </span>
                  <span className="bg-purple-200/80 text-purple-800 text-xs px-2 py-0.5 rounded-md font-mono font-bold">
                    {allStandardFigures.filter(f => f.annexGroup === 'ISO 80369-20').length} 幅
                  </span>
                </button>

                {expandedNodes['iso20'] && (
                  <div className="pl-2 space-y-1 border-l-2 border-purple-100 ml-2 pt-1">
                    {filteredAnnexFigures.filter(f => f.annexGroup === 'ISO 80369-20').map(fig => {
                      const isSelected = selectedFigureId === fig.id;
                      return (
                        <button
                          key={fig.id}
                          onClick={() => setSelectedFigureId(fig.id)}
                          className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border ${
                            isSelected 
                              ? 'bg-purple-600 text-white font-bold border-purple-500 shadow-sm' 
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/60'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-purple-500'}`} />
                            <span className="font-mono">{fig.figureNumber}:</span>
                            <span className="truncate">{fig.nameZh || fig.name}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Topic or Figure View (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {viewMode === 'topics' ? (
            currentTopic ? (
              <>
                {/* Active Topic Summary Banner */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm">
                        {renderIcon(currentTopic.iconName, "w-5 h-5")}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                          {currentTopic.categoryZh} 主題詳情
                        </span>
                        <h2 className="text-lg font-bold text-slate-900">
                          {currentTopic.titleZh}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopySummary}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition self-start sm:self-auto"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">已複製簡報摘要</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>複製檢索條文摘要</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {currentTopic.detailedDescriptionZh}
                </p>

                {/* Key Parameters Matrix Grid */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    關鍵定量條件矩陣 (Key Parameters)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {currentTopic.keyParameters.map((param, idx) => (
                      <div key={idx} className="bg-blue-50/50 border border-blue-100 p-2.5 rounded-xl">
                        <span className="text-xs text-slate-500 block">{param.label}</span>
                        <span className="text-sm font-bold text-blue-900 font-mono mt-0.5 block">
                          {param.value} <span className="text-xs font-normal text-slate-600">{param.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive ISO 80369-20:2024 Pressure Decay ΔP_max Calculator Widget */}
                {currentTopic && (currentTopic.id === 'fluid-leakage' || currentTopic.id === 'sub-atmospheric-air-leakage' || currentTopic.id === 'stress-cracking' || currentTopic.category === 'leakage') && (
                  <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 rounded-2xl p-4 text-white space-y-3 shadow-lg border border-blue-800/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-800/50 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
                          ISO 80369-20:2024 Annex B.4 / D.4 / J.2
                        </span>
                        <h4 className="text-xs font-bold text-blue-100 flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-blue-400" />
                          壓差降極限 (&Delta;P<sub>max</sub>) 即時換算計算器
                        </h4>
                      </div>
                      <span className="text-[11px] text-blue-300 font-mono">Q<sub>max</sub> = 0.005 Pa·m³/s</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                      {/* Controls */}
                      <div className="md:col-span-6 space-y-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                        <div className="flex items-center justify-between">
                          <label className="text-slate-300 font-medium">測試系統總容積 V (mL):</label>
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
                          <label className="text-slate-300 font-medium">持壓時間 &Delta;t (秒):</label>
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
                          換算公式: &Delta;P<sub>max</sub> (Pa) = (5000 × &Delta;t) / V (mL)
                        </div>
                      </div>

                      {/* Output Results */}
                      <div className="md:col-span-6 bg-blue-900/40 p-3 rounded-xl border border-blue-700/50 flex flex-col justify-between space-y-2">
                        <span className="text-[11px] text-blue-200 font-semibold">允許最大壓力下降極限 (&Delta;P<sub>max</sub>):</span>
                        <div className="grid grid-cols-3 gap-2 text-center font-mono">
                          <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                            <span className="text-[10px] text-slate-400 block">帕斯卡 (Pa)</span>
                            <span className="text-xs font-black text-amber-300">{Math.round((5000 * calcTime) / calcVolume).toLocaleString()}</span>
                          </div>
                          <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                            <span className="text-[10px] text-slate-400 block">千帕 (kPa)</span>
                            <span className="text-xs font-black text-emerald-300">{((5 * calcTime) / calcVolume).toFixed(2)}</span>
                          </div>
                          <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                            <span className="text-[10px] text-slate-400 block">毫巴 (mbar)</span>
                            <span className="text-xs font-black text-sky-300">{(((5000 * calcTime) / calcVolume) / 100).toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-blue-300/80 leading-tight">
                          📌 判定原則：持壓 {calcTime}s 期間實測壓降 &Delta;P &le; {((5 * calcTime) / calcVolume).toFixed(2)} kPa &rarr; <strong className="text-emerald-400">合格 (Pass)</strong>；若 &gt; {((5 * calcTime) / calcVolume).toFixed(2)} kPa &rarr; <strong className="text-rose-400">不合格 (Fail)</strong>。
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Supplementary Guide for Pressure Decay (ΔP) & ISO 80369-20:2024 Revision */}
                {currentTopic && (currentTopic.id === 'fluid-leakage' || currentTopic.id === 'sub-atmospheric-air-leakage' || currentTopic.id === 'stress-cracking' || currentTopic.category === 'leakage') && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="flex items-center space-x-2 text-slate-800 text-xs font-bold border-b border-slate-200 pb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>ISO 80369-20:2024 與 ISO 80369-7 壓差降 (&Delta;P) 物理量計算法規與技術補充指南</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1.5">
                        <h5 className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> 1. 壓差記錄 (&Delta;P) 4 大適用測試項目
                        </h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                          <li><strong>正壓壓差降洩漏測試 (Annex B)</strong>：施加 300~330 kPa，記錄持壓 15~20s 壓力差。</li>
                          <li><strong>次大氣壓空氣洩漏測試 (Annex D)</strong>：抽取 80~88 kPa 真空負壓，記錄持壓 15~20s 壓差。</li>
                          <li><strong>應力龜裂隨後洩漏評估 (Annex E)</strong>：組裝放置 &ge;48h 後執行氣體壓降評估。</li>
                          <li><strong>統計變量數據生成 (Annex J.2.1/J.2.3)</strong>：記錄實際壓降 &Delta;P，計算單側公差上限 (UTL)。</li>
                        </ul>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1.5">
                        <h5 className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" /> 2. ISO 80369-20:2024 重大技術修訂
                        </h5>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          新版標準正式<strong>取消了傳統洩漏率 Q 的計算公式，改為直接記錄測試期間的壓力變化量 (&Delta;P)</strong>。此修訂大幅消除因未知的隙縫幾何通路導致的計算誤差，提升實驗室間的可重現性與量測不確定度。
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1.5 md:col-span-2">
                        <h5 className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                          <Zap className="w-3.5 h-3.5 text-amber-500" /> 3. 理想氣體狀態方程公式推導與現場 3 大關鍵注意事項
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <strong className="text-slate-700 block mb-0.5">① 精準測定總容積 (V)</strong>
                            <p className="text-slate-500">測試容積含儀器氣路、感測器腔體與管路，須透過 3D CAD 或水重排法精準測定。</p>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <strong className="text-slate-700 block mb-0.5">② 系統夾具剛性 (Rigidity)</strong>
                            <p className="text-slate-500">高壓下軟管膨脹會使體積 V 變大導致壓降判定失真，夾具與管路應使用金屬等剛性材質。</p>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <strong className="text-slate-700 block mb-0.5">③ 環境溫度嚴格控制</strong>
                            <p className="text-slate-500">氣體對溫度極度敏感，微小溫差會造成虛假壓力波動，須於 15°C~30°C 恆溫下測試。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Engineering Risk & Audit Focus Callouts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-800 text-xs font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>研發防呆與材料風險 (R&D Risk)</span>
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      {currentTopic.engineeringRiskZh}
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-800 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>法規審查與稽核重點 (Audit Focus)</span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      {currentTopic.auditFocusZh}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Specification Document Reference Figures (配圖) Section */}
              {currentTopic?.figures && currentTopic.figures.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>規範文件對應關鍵配圖與裝置結構圖 (Standard Reference Figures) ({currentTopic.figures.length})</span>
                    </h3>
                    <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      高精度 CAD / 結構向量圖解
                    </span>
                  </div>

                  <div className="space-y-4">
                    {currentTopic.figures.map((fig) => (
                      <ISOStandardFigureRenderer
                        key={fig.id}
                        svgKey={fig.svgKey}
                        titleZh={fig.titleZh}
                        titleEn={fig.titleEn}
                        standard={fig.standard}
                        figureTypeZh={fig.figureTypeZh}
                        descriptionZh={fig.descriptionZh}
                        keyCallouts={fig.keyCallouts}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Connected Clause Details Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>對應之具體標準條文與測試細則 ({currentClauses.length})</span>
                  </h3>

                  {/* Standard toggle filter */}
                  <div className="flex items-center space-x-1 bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setSelectedStandardFilter('all')}
                      className={`px-2 py-0.5 rounded ${selectedStandardFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                    >
                      全部標準
                    </button>
                    <button
                      onClick={() => setSelectedStandardFilter('iso7')}
                      className={`px-2 py-0.5 rounded ${selectedStandardFilter === 'iso7' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'}`}
                    >
                      ISO 80369-7
                    </button>
                    <button
                      onClick={() => setSelectedStandardFilter('iso20')}
                      className={`px-2 py-0.5 rounded ${selectedStandardFilter === 'iso20' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'}`}
                    >
                      ISO 80369-20
                    </button>
                  </div>
                </div>

                {currentClauses
                  .filter(c => {
                    if (selectedStandardFilter === 'iso7') return c.standard.includes('80369-7');
                    if (selectedStandardFilter === 'iso20') return c.standard.includes('80369-20');
                    return true;
                  })
                  .map((clause) => {
                    const isISO7 = clause.standard.includes('80369-7');
                    return (
                      <div
                        key={clause.id}
                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-300 transition"
                      >
                        {/* Clause Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center space-x-2.5">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                              isISO7 ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                            }`}>
                              {clause.standard} §{clause.clauseNumber}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">
                                {clause.titleZh}
                              </h4>
                              <span className="text-xs text-slate-400 font-mono block">
                                {clause.titleEn}
                              </span>
                            </div>
                          </div>

                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            isISO7 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}>
                            {clause.typeZh}
                          </span>
                        </div>

                        {/* Objective & Applies To */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                            <span className="text-xs font-semibold text-slate-400 block">規範核心目的 (Objective):</span>
                            <p className="text-slate-700">{clause.objectiveZh}</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                            <span className="text-xs font-semibold text-slate-400 block">適用物件產品 (Applies To):</span>
                            <p className="text-slate-700">{clause.appliesToZh}</p>
                          </div>
                        </div>

                        {/* Quantitative Conditions Table */}
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            量化實驗條件 (Quantitative Test Conditions):
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                            {clause.quantitativeConditions.assemblyTorqueNm && (
                              <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                                <span className="text-xs text-slate-400 block">預裝配扭矩:</span>
                                <span className="font-bold text-slate-800">{clause.quantitativeConditions.assemblyTorqueNm}</span>
                              </div>
                            )}
                            {clause.quantitativeConditions.testPressureKpa && (
                              <div className="bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200">
                                <span className="text-xs text-blue-600 block">測試壓力:</span>
                                <span className="font-bold text-blue-900">{clause.quantitativeConditions.testPressureKpa}</span>
                              </div>
                            )}
                            {clause.quantitativeConditions.testTorqueNm && (
                              <div className="bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200">
                                <span className="text-xs text-amber-700 block">測試扭矩:</span>
                                <span className="font-bold text-amber-900">{clause.quantitativeConditions.testTorqueNm}</span>
                              </div>
                            )}
                            {clause.quantitativeConditions.testForceN && (
                              <div className="bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                                <span className="text-xs text-emerald-700 block">測試拉力:</span>
                                <span className="font-bold text-emerald-900">{clause.quantitativeConditions.testForceN}</span>
                              </div>
                            )}
                            {clause.quantitativeConditions.holdTimeSec && (
                              <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                                <span className="text-xs text-slate-400 block">保持時間:</span>
                                <span className="font-bold text-slate-800">{clause.quantitativeConditions.holdTimeSec}</span>
                              </div>
                            )}
                            {clause.quantitativeConditions.media && (
                              <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                                <span className="text-xs text-slate-400 block">介質:</span>
                                <span className="font-bold text-slate-800">{clause.quantitativeConditions.media}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Test Procedure Steps */}
                        {clause.testProcedureStepsZh && clause.testProcedureStepsZh.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                              標準實驗流程步驟 (Standard Test Procedure):
                            </span>
                            <div className="space-y-1">
                              {clause.testProcedureStepsZh.map((step, sIdx) => (
                                <div key={sIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {sIdx + 1}
                                  </span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Acceptance Criteria */}
                        <div className="bg-emerald-50/60 border border-emerald-200/80 p-3 rounded-xl space-y-1">
                          <div className="flex items-center space-x-1.5 text-emerald-800 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>合格判定標準 (Acceptance Criteria)</span>
                          </div>
                          <ul className="list-disc list-inside text-xs text-emerald-900 space-y-0.5 font-medium">
                            {clause.acceptanceCriteriaZh.map((crit, cIdx) => (
                              <li key={cIdx}>{crit}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Regulatory Tip */}
                        <div className="bg-blue-50/60 border border-blue-200/80 p-3 rounded-xl text-xs space-y-1">
                          <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>FDA 510(k) / TFDA 審查建議與注意事項</span>
                          </div>
                          <p className="text-blue-900/90 leading-relaxed">
                            {clause.regulatoryTipZh}
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>

              {/* Reference Connector Link Card */}
              {currentRefConnectors.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                      <Wrench className="w-4 h-4 text-amber-500" />
                      <span>此主題對應之 ISO 80369-7 附錄 C 金屬參考夾具 ({currentRefConnectors.length})</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentRefConnectors.map((fig) => (
                      <div
                        key={fig.id}
                        className={`p-3.5 rounded-xl border space-y-2 ${
                          fig.isWorstCase
                            ? 'bg-amber-50/60 border-amber-300'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                              fig.isWorstCase ? 'bg-amber-600 text-white' : 'bg-slate-700 text-white'
                            }`}>
                              Figure {fig.id}
                            </span>
                            <span className="text-xs font-bold text-slate-800">
                              {fig.gender === 'male' ? '公金屬件' : '母金屬件'} ({fig.type === 'lock' ? 'Lock' : 'Slip'})
                            </span>
                          </div>

                          {fig.isWorstCase && (
                            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                              極限最壞情況
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {fig.descriptionZh}
                        </p>

                        <div className="bg-white p-2 rounded-lg border border-slate-200/80 text-xs space-y-0.5 font-mono">
                          {fig.svgHighlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex justify-between">
                              <span className="text-slate-400">{h.title}:</span>
                              <span className="font-bold text-slate-800">{h.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
              <Info className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">無符合目前主題特徵的條文內容</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                未找到與目前分類或關鍵字完全相符的規範主題，請切換主題分類、清除關鍵字或點選左側其他主題。
              </p>
            </div>
          )
        ) : (
          /* viewMode === 'annex_tree' Right Inspector View */
          <div className="space-y-5">
            {/* Active Figure Header Banner */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-600 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg shadow-xs">
                      {currentSelectedFigure.figureNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      {currentSelectedFigure.standardOwner || 'ISO 80369-7'} ({currentSelectedFigure.annexGroup})
                    </span>
                    {currentSelectedFigure.isWorstCase && (
                      <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                        Worst-Case 極限夾具
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {currentSelectedFigure.nameZh || currentSelectedFigure.name}
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentSelectedFigure.name}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 font-mono block">CAD ID: {currentSelectedFigure.id}</span>
                  <span className="text-xs font-bold text-blue-600">ISO 80369 規範正本對照</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {currentSelectedFigure.descriptionZh}
              </p>

              {/* Worst-Case / Standard Rationale Callout */}
              {currentSelectedFigure.worstCaseReasonZh && (
                <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-800 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>法規依據與極限設計考量 (Normative Rationale)</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {currentSelectedFigure.worstCaseReasonZh}
                  </p>
                </div>
              )}

              {/* Key Callouts Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  規範幾何特徵與量測 Callouts
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {currentSelectedFigure.svgHighlights.map((hl, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-400 block">{hl.title}</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">{hl.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Vector CAD Renderer */}
            <ISOStandardFigureRenderer
              svgKey={currentSelectedFigure.svgKey}
              titleZh={currentSelectedFigure.nameZh || currentSelectedFigure.name}
              titleEn={currentSelectedFigure.name}
              standard={currentSelectedFigure.standardOwner || 'ISO 80369-7'}
              figureTypeZh={currentSelectedFigure.annexGroup}
              descriptionZh={currentSelectedFigure.descriptionZh}
              keyCallouts={currentSelectedFigure.svgHighlights.map(h => `${h.title}: ${h.value}`)}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
