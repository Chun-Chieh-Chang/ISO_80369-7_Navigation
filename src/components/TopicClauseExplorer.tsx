import React, { useState, useMemo } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ANNEX_C_FIGURES } from '../data/isoData';
import { ISOTopic, StandardClauseDetail, AnnexCFigureInfo } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Search, BookOpen, FileText, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, Copy, Check, Info, Sparkles, Filter, ExternalLink, RefreshCw,
  Droplets, Wind, Zap, ArrowDownUp, RotateCw, ShieldAlert, Ruler, Wrench, Layers3, Layers, Activity,
  FolderTree, ChevronRight, ChevronDown, Tag, Eye, FileCode, Gauge
} from 'lucide-react';
import { 
  getTopicShortSummary, 
  getTopicDetailedDescription, 
  getTopicEngineeringRisk, 
  getTopicAuditFocus, 
  getClauseObjective, 
  getClauseAppliesTo, 
  getClauseTitle, 
  getClauseType,
  getClauseRegulatoryTip,
  getClauseTestProcedureSteps,
  getClauseAcceptanceCriteria,
  translateQuantitativeCondition,
  getFigureWorstCaseReason, 
  getFigureDescription, 
  translateHighlightText, 
  formatUnit 
} from '../utils/i18nHelpers';

export const TopicClauseExplorer: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [viewMode, setViewMode] = useState<'topics' | 'annex_tree'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ISO_TOPICS[0].id);
  const [selectedFigureId, setSelectedFigureId] = useState<string>('B.2');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStandardFilter, setSelectedStandardFilter] = useState<'all' | 'iso7' | 'iso20'>('all');
  const [mobileTab, setMobileTab] = useState<'list' | 'detail'>('list');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [calcVolume, setCalcVolume] = useState<number>(8.5);
  const [calcTime, setCalcTime] = useState<number>(20);
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
    const isEnLang = language === 'en';
    const summary = isEnLang
      ? `[ISO Clause & Standard Retrieval Summary - ${currentTopic.titleEn || currentTopic.titleZh}]
■ Related ISO 80369-7 Clauses: ${currentTopic.relatedISO7Clauses.join(', ')}
■ Related ISO 80369-20 Annexes: ${currentTopic.relatedISO20Annexes.join(', ')}
■ Required Reference Fixtures: ${currentTopic.relatedRefConnectors.join(', ')}
■ Key Conditions: ${currentTopic.keyParameters.map(p => `${p.labelEn || translateHighlightText(p.label, true)}: ${p.valueEn || translateHighlightText(p.value, true)} ${formatUnit(p.unit, true)}`).join(' | ')}
■ Core Requirement: ${currentTopic.shortSummaryEn || currentTopic.shortSummaryZh}
■ R&D Engineering Risk: ${currentTopic.engineeringRiskEn || currentTopic.engineeringRiskZh}
■ Regulatory Audit Focus: ${currentTopic.auditFocusEn || currentTopic.auditFocusZh}`
      : `【ISO 條文與規範檢索摘要 - ${currentTopic.titleZh}】
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
                {t.explorer.badge}
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {t.explorer.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.explorer.subtitle}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.explorer.searchPlaceholder}
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs overflow-hidden">
          <div className="flex flex-wrap items-center gap-1.5 py-1 w-full sm:w-auto">
            <span className="text-slate-400 font-medium flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> {language === 'en' ? 'Category:' : '分類:'}
            </span>
            {[
              { id: 'all', label: t.explorer.catAll },
              { id: 'leakage', label: t.explorer.catLeakage },
              { id: 'mechanical', label: t.explorer.catMechanical },
              { id: 'durability', label: t.explorer.catEndurance },
              { id: 'dimensional', label: t.explorer.catDimensional },
              { id: 'assembly', label: t.explorer.catFixtures },
              { id: 'general', label: t.explorer.catSafety }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] flex items-center ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Mode Switcher Button Group */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl shrink-0 border border-slate-200 self-end sm:self-auto w-full sm:w-auto justify-end">
            <button
              onClick={() => setViewMode('topics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'topics'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.explorer.tabTopics}</span>
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
              <span>{t.explorer.tabAnnexTree}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-only Segmented Control: List vs Detail Switcher */}
      <div className="lg:hidden flex items-center bg-slate-200/70 p-1 rounded-xl border border-slate-300 text-xs font-bold w-full shadow-2xs">
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center space-x-2 transition cursor-pointer ${
            mobileTab === 'list' ? 'bg-white text-blue-700 shadow-sm font-extrabold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>📋 {t.explorer.topicListTitle} ({filteredTopics.length})</span>
        </button>
        <button
          onClick={() => setMobileTab('detail')}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center space-x-2 transition cursor-pointer ${
            mobileTab === 'detail' ? 'bg-blue-600 text-white shadow-sm font-extrabold' : 'text-slate-600'
          }`}
        >
          <Eye className="w-4 h-4 text-white" />
          <span>🔍 {isEn ? 'Clauses & Test Details' : '條文與測試細則'}</span>
        </button>
      </div>

      {/* Main Content Layout: Left Navigation Column & Right Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Navigation Selector (5 cols) */}
        <div className={`lg:col-span-5 space-y-3 ${mobileTab === 'list' ? 'block' : 'hidden lg:block'}`}>
          {viewMode === 'topics' ? (
          <>
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span>{t.explorer.topicListTitle} ({filteredTopics.length})</span>
                </span>
                <span className="text-xs text-slate-400">{t.explorer.topicListSub}</span>
              </div>

              <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                {filteredTopics.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 space-y-2">
                    <Info className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium">{isEn ? `No topics match "${searchQuery}"` : `未找到符合「${searchQuery}」的主題條文`}</p>
                    <p className="text-xs text-slate-400">{isEn ? 'Try keywords like: 300kPa, 0.17Nm, C.3, 6.1, Annex G' : '請嘗試搜尋其他關鍵字如: 300kPa, 0.17Nm, C.3, 6.1, Annex G'}</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                      className="mt-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
                    >
                      {isEn ? 'Reset Filters' : '重置搜尋條件'}
                    </button>
                  </div>
                ) : (
                  filteredTopics.map((topic) => {
                    const isSelected = topic.id === currentTopic?.id;
                    return (
                      <div
                        key={topic.id}
                        onClick={() => {
                          setSelectedTopicId(topic.id);
                          setMobileTab('detail');
                        }}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/30'
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
                                {isEn ? (topic.titleEn || topic.titleZh) : topic.titleZh}
                              </h3>
                              <span className="text-[13px] text-slate-400 font-mono block mt-0.5">
                                {isEn ? topic.category : topic.titleEn}
                              </span>
                            </div>
                          </div>

                          <span className="text-[13px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200/60 shrink-0">
                            {isEn ? topic.category : topic.categoryZh}
                          </span>
                        </div>

                        <p className="text-[13px] text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                          {getTopicShortSummary(topic, isEn)}
                        </p>

                        {/* Quick Badges & Clause Connection */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[13px]">
                          <span className="font-semibold text-slate-400">{t.explorer.linkedClauses}</span>
                          {topic.relatedISO7Clauses.map(c => (
                            <span key={c} className="bg-blue-50 text-blue-800 border border-blue-200/80 font-mono px-2 py-0.5 rounded-lg font-bold">
                              ISO 7 §{c}
                            </span>
                          ))}
                          {topic.relatedISO20Annexes.map(a => (
                            <span key={a} className="bg-indigo-50 text-indigo-800 border border-indigo-200/80 font-mono px-2 py-0.5 rounded-lg font-bold">
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
                  {isEn ? 'ISO 80369 Standard Annex Figures Navigator' : 'ISO 80369 規範附件圖表導航樹'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredAnnexFigures.length} {isEn ? 'Figs.' : '幅圖表'}
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
                    📘 {isEn ? 'ISO 80369-7 Connector Standard Figures' : 'ISO 80369-7 血管小口徑接頭規範圖表'}
                  </span>
                  <span className="bg-blue-200/80 text-blue-800 text-xs px-2 py-0.5 rounded-md font-mono font-bold">
                    {allStandardFigures.filter(f => f.annexGroup !== 'ISO 80369-20').length} {isEn ? 'Figs.' : '幅'}
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
                          {isEn ? 'Annex A: Non-Interchangeability Matrix' : 'Annex A 防誤插幾何矩陣 (Non-Interchangeability)'}
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
                          {isEn ? 'Annex B: Product CAD Geometry' : 'Annex B 商業產品 CAD 尺寸 (Product CAD)'}
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
                          {isEn ? 'Annex C: Reference Metal Gauges' : 'Annex C 測試參考金屬夾具 (Reference Gauges)'}
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
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-900 font-bold text-xs transition border border-indigo-100"
                >
                  <span className="flex items-center gap-1.5">
                    {expandedNodes['iso20'] ? <ChevronDown className="w-4 h-4 text-indigo-700" /> : <ChevronRight className="w-4 h-4 text-indigo-700" />}
                    🔬 {isEn ? 'ISO 80369-20 Test Apparatus & Equipment Figures' : 'ISO 80369-20 實驗室測試方法機台與裝置圖表'}
                  </span>
                  <span className="bg-indigo-200/80 text-indigo-800 text-xs px-2 py-0.5 rounded-md font-mono font-bold">
                    {allStandardFigures.filter(f => f.annexGroup === 'ISO 80369-20').length} {isEn ? 'Figs.' : '幅'}
                  </span>
                </button>

                {expandedNodes['iso20'] && (
                  <div className="pl-2 space-y-1 border-l-2 border-indigo-100 ml-2 pt-1">
                    {filteredAnnexFigures.filter(f => f.annexGroup === 'ISO 80369-20').map(fig => {
                      const isSelected = selectedFigureId === fig.id;
                      return (
                        <button
                          key={fig.id}
                          onClick={() => setSelectedFigureId(fig.id)}
                          className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border ${
                            isSelected 
                              ? 'bg-indigo-700 text-white font-bold border-indigo-500 shadow-sm' 
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/60'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
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
        <div className={`lg:col-span-7 space-y-5 ${mobileTab === 'detail' ? 'block' : 'hidden lg:block'}`}>
          {/* Mobile Back Button */}
          <div className="lg:hidden flex items-center justify-between bg-blue-50/80 border border-blue-200 p-2.5 rounded-xl mb-3 text-xs">
            <button
              onClick={() => setMobileTab('list')}
              className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-xs cursor-pointer min-h-[36px]"
            >
              <span>{isEn ? '← Back to Topics' : '← 返回主題列表'}</span>
            </button>
            <span className="text-blue-800 font-semibold truncate ml-2">
              {isEn ? `Viewing: ${currentTopic?.titleEn || currentTopic?.titleZh}` : `現正檢視：${currentTopic?.titleZh}`}
            </span>
          </div>

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
                          {isEn ? `${currentTopic.category} Details` : `${currentTopic.categoryZh} 主題詳情`}
                        </span>
                        <h2 className="text-lg font-bold text-slate-900">
                          {isEn ? (currentTopic.titleEn || currentTopic.titleZh) : currentTopic.titleZh}
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
                        <span className="text-emerald-700">{isEn ? 'Summary Copied!' : '已複製簡報摘要'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>{isEn ? 'Copy Topic Summary' : '複製檢索條文摘要'}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {getTopicDetailedDescription(currentTopic, isEn)}
                </p>

                {/* Key Parameters Matrix Grid */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {t.explorer.keyParamsTitle}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {currentTopic.keyParameters.map((param, idx) => (
                      <div key={idx} className="bg-blue-50/50 border border-blue-100 p-2.5 rounded-xl">
                        <span className="text-xs text-slate-500 block">{isEn ? (param.labelEn || translateHighlightText(param.label, true)) : param.label}</span>
                        <span className="text-sm font-bold text-blue-900 font-mono mt-0.5 block">
                          {isEn ? (param.valueEn || translateHighlightText(param.value, true)) : param.value} <span className="text-xs font-normal text-slate-600">{formatUnit(param.unit, isEn)}</span>
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

                      {/* Output Results */}
                      <div className="md:col-span-6 bg-blue-900/40 p-3 rounded-xl border border-blue-700/50 flex flex-col justify-between space-y-2">
                        <span className="text-[11px] text-blue-200 font-semibold">{t.explorer.calcAllowableDecay}</span>
                        <div className="grid grid-cols-3 gap-2 text-center font-mono">
                          <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                            <span className="text-[10px] text-slate-400 block">{isEn ? 'Pascal (Pa)' : '帕斯卡 (Pa)'}</span>
                            <span className="text-xs font-black text-amber-300">{Math.round((5000 * calcTime) / calcVolume).toLocaleString()}</span>
                          </div>
                          <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                            <span className="text-[10px] text-slate-400 block">{isEn ? 'Kilopascal (kPa)' : '千帕 (kPa)'}</span>
                            <span className="text-xs font-black text-emerald-300">{((5 * calcTime) / calcVolume).toFixed(2)}</span>
                          </div>
                          <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/30">
                            <span className="text-[10px] text-slate-400 block">{isEn ? 'Millibar (mbar)' : '毫巴 (mbar)'}</span>
                            <span className="text-xs font-black text-sky-300">{(((5000 * calcTime) / calcVolume) / 100).toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-blue-300/80 leading-tight">
                          {isEn 
                            ? `📌 Criteria: during hold time ${calcTime}s, measured decay ΔP ≤ ${((5 * calcTime) / calcVolume).toFixed(2)} kPa → Pass; if > ${((5 * calcTime) / calcVolume).toFixed(2)} kPa → Fail.` 
                            : `📌 判定原則：持壓 ${calcTime}s 期間實測壓降 ΔP ≤ ${((5 * calcTime) / calcVolume).toFixed(2)} kPa → 合格 (Pass)；若 > ${((5 * calcTime) / calcVolume).toFixed(2)} kPa → 不合格 (Fail)。`}
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
                      <span>{isEn ? 'ISO 80369-20:2024 & ISO 80369-7 Pressure Decay (ΔP) Technical Supplement Guide' : 'ISO 80369-20:2024 與 ISO 80369-7 壓差降 (ΔP) 物理量計算法規與技術補充指南'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1.5">
                        <h5 className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {isEn ? '1. Pressure Decay (ΔP) — 4 Applicable Test Scenarios' : '1. 壓差記錄 (ΔP) 4 大適用測試項目'}
                        </h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                          {isEn ? <>
                            <li><strong>Positive Pressure Decay Leakage (Annex B)</strong>: Apply 300~330 kPa; record ΔP over 15~20 s hold.</li>
                            <li><strong>Sub-atmospheric Air Leakage (Annex D)</strong>: Draw 80~88 kPa vacuum; record ΔP over 15~20 s.</li>
                            <li><strong>Post Stress-Cracking Leakage Assessment (Annex E)</strong>: After ≥48 h assembly conditioning, perform gas pressure decay evaluation.</li>
                            <li><strong>Statistical Variability Data (Annex J.2.1/J.2.3)</strong>: Record actual ΔP to compute upper tolerance limit (UTL).</li>
                          </> : <>
                            <li><strong>正壓壓差降洩漏測試 (Annex B)</strong>：施加 300~330 kPa，記錄持壓 15~20s 壓力差。</li>
                            <li><strong>次大氣壓空氣洩漏測試 (Annex D)</strong>：抽取 80~88 kPa 真空負壓，記錄持壓 15~20s 壓差。</li>
                            <li><strong>應力龜裂隨後洩漏評估 (Annex E)</strong>：組裝放置 ≥48h 後執行氣體壓降評估。</li>
                            <li><strong>統計變量數據生成 (Annex J.2.1/J.2.3)</strong>：記錄實際壓降 ΔP，計算單側公差上限 (UTL)。</li>
                          </>}
                        </ul>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-1.5">
                        <h5 className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-700" /> {isEn ? '2. ISO 80369-20:2024 Key Technical Revision' : '2. ISO 80369-20:2024 重大技術修訂'}
                        </h5>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {isEn
                            ? <>The new standard officially <strong>eliminates the traditional leak rate Q formula and instead directly records the pressure change (ΔP) during the test</strong>. This revision substantially reduces calculation errors caused by unknown gap geometry, improving inter-laboratory reproducibility and measurement uncertainty.</>  
                            : <>新版標準正式<strong>取消了傳統洩漏率 Q 的計算公式，改為直接記錄測試期間的壓力變化量 (ΔP)</strong>。此修訂大幅消除因未知的隙縫幾何通路導致的計算誤差，提升實驗室間的可重現性與量測不確定度。</>}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-2 md:col-span-2">
                        <h5 className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                          <Zap className="w-3.5 h-3.5 text-amber-500" /> {isEn ? '3. Test Volume (V) — 3 Determination Methods (Annex B.3.7 & D.3.7) & Rigidity Requirements' : '3. 測試總容積 (Test Volume V) 3 大測定方法 (Annex B.3.7 & D.3.7) 與剛性要求'}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                            <strong className="text-blue-900 block font-bold">{isEn ? '① Dimensional Calculation Method' : '① 尺寸計算量測法 (Dimensional)'}</strong>
                            <p className="text-slate-600 text-[10px] leading-relaxed">
                              {isEn
                                ? <>Compute internal cavity volume directly from <strong>3D CAD models or engineering drawings</strong> of fixtures, tubing, and internal valves. No liquid residue or sensor damage risk.</>
                                : <>依據夾具、管路與內部閥體之 <strong>3D CAD 模型或設計圖紙</strong>直接計算內部空腔體積。無水液殘留與損壞精密電路/傳感器風險。</>}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                            <strong className="text-indigo-900 block font-bold">{isEn ? '② Water Amount Method' : '② 系統注水量測法 (Water Amount)'}</strong>
                            <p className="text-slate-600 text-[10px] leading-relaxed">
                              {isEn
                                ? <>Weigh the dry assembled system, slowly inject distilled water while tilting to <strong>fully purge air bubbles</strong>, align meniscus, then weigh again. Convert using 1 g ≈ 1 mL for total volume.</>
                                : <>裝配乾燥系統於天平稱重，緩緩注入蒸餾水並持續傾斜<strong>徹底排出氣泡</strong>對齊液面後再次稱重。以 1g ≈ 1mL 高精度換算總容積。</>}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                            <strong className="text-emerald-900 block font-bold">{isEn ? '③ Combination Method' : '③ 組合量測法 (Combination)'}</strong>
                            <p className="text-slate-600 text-[10px] leading-relaxed">
                              {isEn
                                ? <>Most common industry approach. Internal sensor and valve volumes are provided by the OEM (dimensional value); add the water-injection measured volume of external tubing/fixtures to get the correct total <span className="font-mono font-bold text-slate-800">V</span>.</>
                                : <>業界最常用做法。內部儀器傳感器與電磁閥體積由原廠提供（尺寸計算值），加總外部管路夾具之注水實測值即得正確總容積 <span className="font-mono font-bold text-slate-800">V</span>。</>}
                            </p>
                          </div>
                        </div>

                        <div className="bg-amber-50/80 border border-amber-200 p-2 rounded-lg text-[10px] text-amber-900 flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>
                            {isEn
                              ? <><strong>⚠️ Rigidity Requirement:</strong> Test instruments and tubing must use high-rigidity materials (e.g. metal fixtures, elastic modulus &gt; 3,433 MPa). Soft flexible tubing that expands under pressure will distort the test volume <span className="font-mono font-bold text-amber-950">V</span> and corrupt the pressure decay verdict.</>
                              : <><strong>⚠️ 剛性防呆要求：</strong>測試儀器與管路必須使用高剛性材料 (如金屬夾具，彈性模數 &gt; 3,433 MPa)。若使用易壓力膨脹/回縮之軟膠管，測試容積 <span className="font-mono font-bold text-amber-950">V</span> 會隨壓力改變而致使壓降判定失真。</>}
                          </span>
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
                      <span>{isEn ? 'R&D Mistake-Proofing & Material Risks (Engineering Risk)' : '研發防呆與材料風險 (R&D Risk)'}</span>
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      {getTopicEngineeringRisk(currentTopic, isEn)}
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-800 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isEn ? 'Regulatory Audit & Validation Focus' : '法規審查與稽核重點 (Audit Focus)'}</span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      {getTopicAuditFocus(currentTopic, isEn)}
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
                      <span>{isEn ? `Standard Reference Figures & Apparatus Layouts (${currentTopic.figures.length})` : `規範文件對應關鍵配圖與裝置結構圖 (Standard Reference Figures) (${currentTopic.figures.length})`}</span>
                    </h3>
                    <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {isEn ? 'Precision CAD / Vector Diagrams' : '高精度 CAD / 結構向量圖解'}
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
                        selectionReasonZh={fig.selectionReasonZh}
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
                    <span>{isEn ? `Corresponding Standard Clauses & Test Details (${currentClauses.length})` : `對應之具體標準條文與測試細則 (${currentClauses.length})`}</span>
                  </h3>

                  {/* Standard toggle filter */}
                  <div className="flex items-center space-x-1 bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setSelectedStandardFilter('all')}
                      className={`px-2 py-0.5 rounded ${selectedStandardFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                    >
                      {isEn ? 'All' : '全部標準'}
                    </button>
                    <button
                      onClick={() => setSelectedStandardFilter('iso7')}
                      className={`px-2 py-0.5 rounded ${selectedStandardFilter === 'iso7' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'}`}
                    >
                      ISO 80369-7
                    </button>
                    <button
                      onClick={() => setSelectedStandardFilter('iso20')}
                      className={`px-2 py-0.5 rounded ${selectedStandardFilter === 'iso20' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
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
                              isISO7 ? 'bg-blue-600 text-white' : 'bg-indigo-700 text-white'
                            }`}>
                              {clause.standard} §{clause.clauseNumber}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">
                                {isEn ? (clause.titleEn || clause.titleZh) : clause.titleZh}
                              </h4>
                              {!isEn && (
                                <span className="text-xs text-slate-400 font-mono block">
                                  {clause.titleEn}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                            isISO7 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}>
                            {getClauseType(clause, isEn)}
                          </span>
                        </div>

                        {/* Objective & Applies To */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                            <span className="text-xs font-semibold text-slate-400 block">{isEn ? 'Standard Objective:' : '規範核心目的 (Objective):'}</span>
                            <p className="text-slate-700">{getClauseObjective(clause, isEn)}</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                            <span className="text-xs font-semibold text-slate-400 block">{isEn ? 'Applies To:' : '適用物件產品 (Applies To):'}</span>
                            <p className="text-slate-700">{getClauseAppliesTo(clause, isEn)}</p>
                          </div>
                        </div>

                        {/* Dual-Phase Engineering Conditions: Pre-assembly vs Test Load Challenge */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            {isEn ? 'Quantitative Test & Pre-assembly Conditions:' : '量化實驗與工況條件 (Quantitative Test & Pre-assembly Conditions):'}
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            {/* Phase 1: Pre-assembly Condition */}
                            <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-3 flex flex-col justify-between space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                                  <Wrench className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  {isEn ? 'Phase 1: Pre-assembly Condition' : '階段一：前置預裝配條件 (Pre-assembly)'}
                                </span>
                                {clause.preAssembly?.status === 'direct_overload' && (
                                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                    {isEn ? 'Direct Overload' : '免預裝配 / 直加過載'}
                                  </span>
                                )}
                                {clause.preAssembly?.status === 'not_applicable' && (
                                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                    {isEn ? 'N/A' : '不適用物理裝配'}
                                  </span>
                                )}
                                {(clause.preAssembly?.status === 'standard_lock' || clause.preAssembly?.status === 'slip') && (
                                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    {isEn ? 'Standard Procedure' : '標準程序'}
                                  </span>
                                )}
                              </div>

                              {clause.preAssembly?.status === 'direct_overload' ? (
                                <div className="bg-white/90 p-2.5 rounded-lg border border-amber-200 text-amber-950 space-y-1">
                                  <div className="font-bold text-xs flex items-center gap-1 text-amber-900">
                                    {isEn ? '⚡ Direct Overload Torque (No axial pre-assembly)' : '⚡ 直加破壞過載扭矩（無前置軸推力裝配）'}
                                  </div>
                                  <p className="text-[11px] text-amber-800 leading-relaxed">
                                    {isEn ? (clause.preAssembly.descriptionEn || 'Assess female luer thread override resistance by directly tightening to 0.15-0.17 N·m without 27.5 N pre-assembly push force.') : (clause.preAssembly.descriptionZh || '考核公套環極限抗滑牙能力，由未旋緊初始狀態直接連續旋緊至 0.15~0.17 N·m，不執行前置 27.5 N 軸向推力預裝配。')}
                                  </p>
                                </div>
                              ) : clause.preAssembly?.status === 'not_applicable' ? (
                                <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                                  {isEn ? (clause.preAssembly.descriptionEn || 'Dimensional CMM measurement or CAD interference analysis; no physical assembly.') : (clause.preAssembly.descriptionZh || '幾何尺寸圖面量測或 CAD 空間防錯干涉分析，無物理預裝配程序。')}
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-xs">
                                    {(clause.preAssembly?.assemblyTorqueNm || clause.quantitativeConditions.assemblyTorqueNm) && (
                                      <div className="bg-white px-2.5 py-1.5 rounded-lg border border-blue-200/80 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Torque:' : '裝配扭矩:'}</span>
                                        <span className="font-bold text-slate-800">
                                          {translateQuantitativeCondition(clause.preAssembly?.assemblyTorqueNm || clause.quantitativeConditions.assemblyTorqueNm, isEn)}
                                        </span>
                                      </div>
                                    )}
                                    {(clause.preAssembly?.assemblyAxialForceN || clause.quantitativeConditions.assemblyAxialForceN) && (
                                      <div className="bg-white px-2.5 py-1.5 rounded-lg border border-blue-200/80 shadow-2xs">
                                        <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Axial Force:' : '軸向推力:'}</span>
                                        <span className="font-bold text-slate-800">
                                          {translateQuantitativeCondition(clause.preAssembly?.assemblyAxialForceN || clause.quantitativeConditions.assemblyAxialForceN, isEn)}
                                        </span>
                                      </div>
                                    )}
                                    <div className="bg-white px-2.5 py-1.5 rounded-lg border border-blue-200/80 shadow-2xs">
                                      <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Hold Time:' : '保持時間:'}</span>
                                      <span className="font-bold text-slate-800">
                                        {translateQuantitativeCondition(clause.preAssembly?.holdTimeSec || (isEn ? '5 - 6 s' : '5 - 6 秒'), isEn)}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-[11px] text-blue-900/80 font-sans leading-relaxed">
                                    💡 {isEn ? (clause.preAssembly?.descriptionEn || 'Simultaneously apply 26.5~27.5 N axial force and 0.08~0.12 N·m torque for 5-6 s, then release.') : (clause.preAssembly?.descriptionZh || '旋合時須同時施加 26.5~27.5 N 推力與 0.08~0.12 N·m 扭矩確立 6% 錐面緊密配合。')}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Phase 2: Test Challenge Load */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <Gauge className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                  {isEn ? 'Phase 2: Test Challenge Load' : '階段二：定量考驗負載 (Test Challenge Load)'}
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                                  {isEn ? 'Test Load' : '實測考驗'}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-xs">
                                {clause.quantitativeConditions.testPressureKpa && (
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                                    <span className="text-[10px] text-blue-600 block font-sans">{isEn ? 'Test Pressure:' : '測試壓力:'}</span>
                                    <span className="font-bold text-blue-900">
                                      {translateQuantitativeCondition(clause.quantitativeConditions.testPressureKpa, isEn)}
                                    </span>
                                  </div>
                                )}
                                {clause.quantitativeConditions.testTorqueNm && (
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-amber-200 shadow-2xs">
                                    <span className="text-[10px] text-amber-700 block font-sans">{isEn ? 'Test Torque:' : '測試扭矩:'}</span>
                                    <span className="font-bold text-amber-900">
                                      {translateQuantitativeCondition(clause.quantitativeConditions.testTorqueNm, isEn)}
                                    </span>
                                  </div>
                                )}
                                {clause.quantitativeConditions.testForceN && (
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200 shadow-2xs">
                                    <span className="text-[10px] text-emerald-700 block font-sans">{isEn ? 'Test Force:' : '測試拉力:'}</span>
                                    <span className="font-bold text-emerald-900">
                                      {translateQuantitativeCondition(clause.quantitativeConditions.testForceN, isEn)}
                                    </span>
                                  </div>
                                )}
                                {clause.quantitativeConditions.holdTimeSec && (
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                                    <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Hold Time:' : '考驗時間:'}</span>
                                    <span className="font-bold text-slate-800">
                                      {translateQuantitativeCondition(clause.quantitativeConditions.holdTimeSec, isEn)}
                                    </span>
                                  </div>
                                )}
                                {clause.quantitativeConditions.media && (
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                                    <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Media:' : '試驗介質:'}</span>
                                    <span className="font-bold text-slate-800 truncate block">
                                      {translateQuantitativeCondition(clause.quantitativeConditions.media, isEn)}
                                    </span>
                                  </div>
                                )}
                                {clause.quantitativeConditions.temperatureC && (
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                                    <span className="text-[10px] text-slate-400 block font-sans">{isEn ? 'Test Temp:' : '環境溫度:'}</span>
                                    <span className="font-bold text-slate-800 truncate block">
                                      {translateQuantitativeCondition(clause.quantitativeConditions.temperatureC, isEn)}
                                    </span>
                                  </div>
                                )}
                                {!clause.quantitativeConditions.testPressureKpa &&
                                  !clause.quantitativeConditions.testTorqueNm &&
                                  !clause.quantitativeConditions.testForceN && (
                                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-3 text-slate-500 text-[11px] font-sans">
                                    {isEn ? 'Dimensional tolerance verification per Annex B drawings / static inspection.' : '依流程規範或 Annex B 圖面標註進行尺寸公差檢驗 / 靜態驗證。'}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Test Procedure Steps */}
                        {getClauseTestProcedureSteps(clause, isEn).length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                              {isEn ? 'Standard Test Procedure Steps:' : '標準實驗流程步驟 (Standard Test Procedure):'}
                            </span>
                            <div className="space-y-1">
                              {getClauseTestProcedureSteps(clause, isEn).map((step, sIdx) => (
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
                            <span>{isEn ? 'Acceptance Criteria (Pass/Fail):' : '合格判定標準 (Acceptance Criteria)'}</span>
                          </div>
                          <ul className="list-disc list-inside text-xs text-emerald-900 space-y-0.5 font-medium">
                            {getClauseAcceptanceCriteria(clause, isEn).map((crit, cIdx) => (
                              <li key={cIdx}>{crit}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Regulatory Tip */}
                        <div className="bg-blue-50/60 border border-blue-200/80 p-3 rounded-xl text-xs space-y-1">
                          <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>{isEn ? 'FDA 510(k) / CE MDR Review Recommendations' : 'FDA 510(k) / TFDA 審查建議與注意事項'}</span>
                          </div>
                          <p className="text-blue-900/90 leading-relaxed">
                            {getClauseRegulatoryTip(clause, isEn)}
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
                      <span>{isEn ? `Corresponding ISO 80369-7 Annex C Reference Fixtures (${currentRefConnectors.length})` : `此主題對應之 ISO 80369-7 附錄 C 金屬參考夾具 (${currentRefConnectors.length})`}</span>
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
                              {isEn ? (fig.gender === 'male' ? 'Male Metal' : 'Female Metal') : (fig.gender === 'male' ? '公金屬件' : '母金屬件')} ({fig.type === 'lock' ? 'Lock' : 'Slip'})
                            </span>
                          </div>

                          {fig.isWorstCase && (
                            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                              {isEn ? 'Worst-Case Fixture' : '極限最壞情況'}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {getFigureDescription(fig, isEn)}
                        </p>

                        <div className="bg-white p-2 rounded-lg border border-slate-200/80 text-xs space-y-0.5 font-mono">
                          {fig.svgHighlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex justify-between">
                              <span className="text-slate-400">{translateHighlightText(h.title, isEn)}:</span>
                              <span className="font-bold text-slate-800">{translateHighlightText(h.value, isEn)}</span>
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
              <h3 className="text-base font-bold text-slate-800">{isEn ? 'No matching clause details' : '無符合目前主題特徵的條文內容'}</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {isEn ? 'No normative topics found matching the current search criteria. Please switch category, clear search or select another topic from the left.' : '未找到與目前分類或關鍵字完全相符的規範主題，請切換主題分類、清除關鍵字或點選左側其他主題。'}
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
                        {isEn ? 'Worst-Case Fixture' : 'Worst-Case 極限夾具'}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {isEn ? currentSelectedFigure.name : (currentSelectedFigure.nameZh || currentSelectedFigure.name)}
                  </h2>
                  {!isEn && (
                    <span className="text-xs text-slate-400 font-mono">
                      {currentSelectedFigure.name}
                    </span>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 font-mono block">CAD ID: {currentSelectedFigure.id}</span>
                  <span className="text-xs font-bold text-blue-600">{isEn ? 'ISO 80369 Official Standard' : 'ISO 80369 規範正本對照'}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {getFigureDescription(currentSelectedFigure, isEn)}
              </p>

              {/* Worst-Case / Standard Rationale Callout */}
              {(currentSelectedFigure.worstCaseReasonZh || currentSelectedFigure.worstCaseReasonEn) && (
                <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-800 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isEn ? 'Normative Basis & Worst-Case Design Rationale' : '法規依據與極限設計考量 (Normative Rationale)'}</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {getFigureWorstCaseReason(currentSelectedFigure, isEn)}
                  </p>
                </div>
              )}

              {/* Key Callouts Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {isEn ? 'Geometric Features & Measurement Callouts' : '規範幾何特徵與量測 Callouts'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {currentSelectedFigure.svgHighlights.map((hl, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-400 block">{translateHighlightText(hl.title, isEn)}</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">{translateHighlightText(hl.value, isEn)}</span>
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
              figureTypeEn={currentSelectedFigure.annexGroup}
              descriptionZh={currentSelectedFigure.descriptionZh}
              descriptionEn={getFigureDescription(currentSelectedFigure, true)}
              selectionReasonZh={currentSelectedFigure.worstCaseReasonZh}
              selectionReasonEn={getFigureWorstCaseReason(currentSelectedFigure, true)}
              keyCallouts={currentSelectedFigure.svgHighlights}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
