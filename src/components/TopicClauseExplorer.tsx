import React, { useState, useMemo } from 'react';
import { ISO_TOPICS } from '../data/isoTopicsData';
import { ANNEX_C_FIGURES } from '../data/isoData';
import { AnnexCFigureInfo } from '../types';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { ClauseDetailDrawer } from './ClauseDetailDrawer';
import { useClauseDetailDrawer } from '../hooks/useClauseDetailDrawer';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Search, BookOpen, FileText, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, Copy, Check, Info, Sparkles, Filter, ExternalLink, RefreshCw,
  Droplets, Wind, Zap, ArrowDownUp, RotateCw, ShieldAlert, Ruler, Wrench, Layers3, Layers, Activity,
  FolderTree, ChevronRight, ChevronDown, Tag, Eye, FileCode, Gauge, Maximize2
} from 'lucide-react';
import { 
  getTopicShortSummary, 
  getTopicDetailedDescription, 
  getFigureWorstCaseReason, 
  getFigureDescription, 
  translateHighlightText, 
  formatUnit 
} from '../utils/i18nHelpers';

export const TopicClauseExplorer: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  
  // Navigation & Filter States
  const [viewMode, setViewMode] = useState<'topics' | 'annex_tree'>('topics');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Detail Drawer (Level 3 Deep Dive) - shared with the comparison matrix
  const drawer = useClauseDetailDrawer();

  // Figure Tree States
  const [selectedFigureId, setSelectedFigureId] = useState<string>('B.2');
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

  // Aggregate all annex figures across ISO 80369-7 and ISO 80369-20 directly from SSOT
  const allStandardFigures = useMemo(() => {
    return Object.values(ANNEX_C_FIGURES).map(fig => ({
      id: fig.id,
      figureNumber: fig.figureNumber || `Figure ${fig.id}`,
      standardOwner: fig.standardOwner || (fig.annexGroup === 'ISO 80369-20' ? 'ISO 80369-20:2024' : fig.annexGroup === 'Commercial' ? 'Commercial Non-Standard' : 'ISO 80369-7:2021'),
      name: fig.name,
      nameZh: fig.nameZh,
      description: fig.description,
      descriptionZh: fig.descriptionZh,
      annexGroup: fig.annexGroup,
      svgKey: fig.svgKey || fig.id,
      isWorstCase: fig.isWorstCase,
      worstCaseReason: fig.worstCaseReasonEn || fig.worstCaseReasonZh,
      worstCaseReasonZh: fig.worstCaseReasonZh,
      svgHighlights: fig.svgHighlights || []
    }));
  }, []);

  const filteredAnnexFigures = useMemo(() => {
    return allStandardFigures.filter(fig => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        fig.id.toLowerCase().includes(q) ||
        fig.figureNumber.toLowerCase().includes(q) ||
        fig.name.toLowerCase().includes(q) ||
        (fig.nameZh && fig.nameZh.toLowerCase().includes(q)) ||
        (fig.description && fig.description.toLowerCase().includes(q)) ||
        (fig.descriptionZh && fig.descriptionZh.toLowerCase().includes(q)) ||
        fig.annexGroup.toLowerCase().includes(q)
      );
    });
  }, [allStandardFigures, searchQuery]);

  const selectedFigure = allStandardFigures.find(f => f.id === selectedFigureId) || allStandardFigures[0];

  // Category filter pills - MECE aligned with TopicCategory enum
  const categories = [
    { id: 'all', label: t.explorer.catAll },
    { id: 'leakage', label: t.explorer.catLeakage, icon: Droplets },
    { id: 'mechanical', label: t.explorer.catMechanical, icon: Wrench },
    { id: 'durability', label: t.explorer.catEndurance, icon: RotateCw },
    { id: 'dimensional', label: t.explorer.catDimensional, icon: Ruler },
    { id: 'assembly', label: t.explorer.catFixtures, icon: Layers3 },
    { id: 'general', label: t.explorer.catSafety, icon: ShieldAlert },
  ];

  return (
    <div className="space-y-5">
      
      {/* Level 1: Minimalist Control Bar & Dimension Filter Hub */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        
        {/* Row 1: Mode Switcher & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
            <button
              onClick={() => setViewMode('topics')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-h-[36px] ${
                viewMode === 'topics'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{t.explorer.tabTopics}</span>
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-800">
                {filteredTopics.length}
              </span>
            </button>

            <button
              onClick={() => setViewMode('annex_tree')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-h-[36px] ${
                viewMode === 'annex_tree'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderTree className="w-4 h-4 text-indigo-600" />
              <span>{t.explorer.tabAnnexTree}</span>
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-800">
                {allStandardFigures.length}
              </span>
            </button>
          </div>

          {/* Instant Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.explorer.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[38px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Row 2: Dimension Categories Filter Pills (Topics Mode) */}
        {viewMode === 'topics' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 min-h-[32px] ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Level 2: Compact High-Signal Cards View (Topics Mode) */}
      {viewMode === 'topics' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTopics.length === 0 ? (
            <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">{isEn ? 'No matching topics found' : '查無符合條件之測試主題'}</p>
              <p className="text-xs text-slate-400">{isEn ? 'Try adjusting your search query or category filter' : '請嘗試清除搜尋關鍵字或切換類別分類'}</p>
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => drawer.openTopic(topic)}
                className="group bg-white hover:bg-blue-50/20 border border-slate-200 hover:border-blue-300 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 cursor-pointer relative"
              >
                {/* Topic Header: Icon, Category Badge & Title */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2.5 bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-xl shadow-2xs transition-colors duration-200 shrink-0">
                        {renderIcon(topic.iconName, "w-4 h-4 sm:w-5 sm:h-5")}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                          {isEn ? topic.category : topic.categoryZh}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                          {isEn ? (topic.titleEn || topic.titleZh) : topic.titleZh}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Summary Prose (Max 2 lines) */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {getTopicShortSummary(topic, isEn)}
                  </p>
                </div>

                {/* Key Parameter Pills */}
                {topic.keyParameters.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {topic.keyParameters.slice(0, 2).map((param, pIdx) => (
                      <div key={pIdx} className="bg-slate-50 group-hover:bg-white p-2 rounded-xl border border-slate-100 group-hover:border-slate-200 transition">
                        <span className="text-[10px] text-slate-400 block font-sans truncate">
                          {isEn ? (param.labelEn || translateHighlightText(param.label, true)) : param.label}
                        </span>
                        <span className="font-bold text-slate-800 text-xs truncate block">
                          {isEn ? (param.valueEn || translateHighlightText(param.value, true)) : param.value} <span className="font-normal text-[10px] text-slate-500">{formatUnit(param.unit, isEn)}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Card Footer: Linked Clauses & Action CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                  <div className="flex flex-wrap items-center gap-1 overflow-hidden">
                    {topic.relatedISO7Clauses.map(c => (
                      <span key={c} className="bg-blue-50 text-blue-800 border border-blue-200 font-mono px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0">
                        §{c}
                      </span>
                    ))}
                    {topic.relatedISO20Annexes.slice(0, 1).map(a => (
                      <span key={a} className="bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0">
                        {a.replace('Annex ', 'Anx.')}
                      </span>
                    ))}
                    {topic.relatedRefConnectors.slice(0, 2).map(r => (
                      <span key={r} className="bg-amber-50 text-amber-800 border border-amber-200 font-mono px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0">
                        {r}
                      </span>
                    ))}
                  </div>

                  {/* Deep-Dive CTA Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      drawer.openTopic(topic);
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white transition shrink-0 min-h-[36px] border border-blue-200 group-hover:border-blue-600"
                  >
                    <span>{t.figureTier.fullLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Annex Standard Tree View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Tree Navigation (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 space-y-3 max-h-[760px] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <FolderTree className="w-4 h-4 text-blue-600" />
                {isEn ? 'Standard Annex Figures Navigator' : '規範附件圖表導航樹'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {filteredAnnexFigures.length} {isEn ? 'Figs.' : '幅圖表'}
              </span>
            </div>

            {/* ISO 80369-7 Root Node */}
            <div className="space-y-1">
              <button
                onClick={() => toggleNode('iso7')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 text-blue-900 font-bold text-xs transition border border-blue-100 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {expandedNodes['iso7'] ? <ChevronDown className="w-4 h-4 text-blue-600" /> : <ChevronRight className="w-4 h-4 text-blue-600" />}
                  📘 {isEn ? 'ISO 80369-7 Connector Figures' : 'ISO 80369-7 血管小口徑接頭規範圖表'}
                </span>
                <span className="bg-blue-200/80 text-blue-800 text-xs px-2 py-0.5 rounded-md font-mono font-bold">
                  {allStandardFigures.filter(f => f.annexGroup !== 'ISO 80369-20').length}
                </span>
              </button>

              {expandedNodes['iso7'] && (
                <div className="pl-2 space-y-1 border-l-2 border-blue-100 ml-2 pt-1">
                  {/* Annex A */}
                  <div className="space-y-0.5">
                    <button
                      onClick={() => toggleNode('iso7-annex-a')}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                    >
                      <span className="flex items-center gap-1">
                        {expandedNodes['iso7-annex-a'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                        {isEn ? 'Annex A: Non-Interchangeability' : 'Annex A 防誤插幾何矩陣'}
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
                              className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border cursor-pointer ${
                                isSelected 
                                  ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-xs' 
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
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                    >
                      <span className="flex items-center gap-1">
                        {expandedNodes['iso7-annex-b'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                        {isEn ? 'Annex B: Product CAD Geometry' : 'Annex B 商業產品 CAD 尺寸'}
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
                              className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border cursor-pointer ${
                                isSelected 
                                  ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-xs' 
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
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                    >
                      <span className="flex items-center gap-1">
                        {expandedNodes['iso7-annex-c'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                        {isEn ? 'Annex C: Reference Gauges' : 'Annex C 測試參考金屬夾具'}
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
                              className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border cursor-pointer ${
                                isSelected 
                                  ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-xs' 
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/60'
                              }`}
                            >
                              <span className="flex items-center gap-1.5 truncate">
                                <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
                                <span className="font-mono">{fig.figureNumber}:</span>
                                <span className="truncate">{fig.nameZh || fig.name}</span>
                              </span>
                              {fig.isWorstCase && (
                                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold shrink-0 ml-1 ${
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
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-900 font-bold text-xs transition border border-indigo-100 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {expandedNodes['iso20'] ? <ChevronDown className="w-4 h-4 text-indigo-700" /> : <ChevronRight className="w-4 h-4 text-indigo-700" />}
                  🔬 {isEn ? 'ISO 80369-20 Test Apparatus Figures' : 'ISO 80369-20 實驗室測試方法圖表'}
                </span>
                <span className="bg-indigo-200/80 text-indigo-800 text-xs px-2 py-0.5 rounded-md font-mono font-bold">
                  {allStandardFigures.filter(f => f.annexGroup === 'ISO 80369-20').length}
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
                        className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center justify-between border cursor-pointer ${
                          isSelected 
                            ? 'bg-indigo-700 text-white font-bold border-indigo-500 shadow-xs' 
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

          {/* Figure Preview & CAD Display (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            {selectedFigure && (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-blue-100 text-blue-900 border border-blue-200">
                        {selectedFigure.standardOwner}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 text-slate-700">
                        {selectedFigure.figureNumber}
                      </span>
                      {selectedFigure.isWorstCase && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
                          ★ Worst-Case
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {isEn ? selectedFigure.name : (selectedFigure.nameZh || selectedFigure.name)}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {isEn ? selectedFigure.description : (selectedFigure.descriptionZh || selectedFigure.description)}
                </p>

                {/* Worst Case Rationale Callout if applicable */}
                {selectedFigure.worstCaseReasonZh && (
                  <div className="bg-rose-50/70 border border-rose-200 p-3 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-rose-900 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      {isEn ? 'Worst-Case Mechanical Challenge Rationale:' : '最壞情況極限考驗原理說明:'}
                    </span>
                    <p className="text-rose-950 leading-relaxed">
                      {isEn ? selectedFigure.worstCaseReason : selectedFigure.worstCaseReasonZh}
                    </p>
                  </div>
                )}

                {/* Geometric Features & Measurement Callouts */}
                {selectedFigure.svgHighlights && selectedFigure.svgHighlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {isEn ? 'Geometric Features & Measurement Callouts' : '規範幾何特徵與量測 Callouts'}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                      {selectedFigure.svgHighlights.map((hl, idx) => (
                        <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          <span className="text-xs text-slate-400 block font-sans">{translateHighlightText(hl.title, isEn)}</span>
                          <span className="font-bold text-slate-800 mt-0.5 block">{translateHighlightText(hl.value, isEn)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CAD Blueprint Display */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-center">
                  <ISOStandardFigureRenderer
                    svgKey={selectedFigure.svgKey}
                    titleZh={selectedFigure.nameZh || selectedFigure.name}
                    titleEn={selectedFigure.name}
                    standard={selectedFigure.standardOwner}
                    figureTypeZh={selectedFigure.annexGroup}
                    descriptionZh={selectedFigure.descriptionZh || selectedFigure.description}
                    descriptionEn={selectedFigure.description}
                    keyCallouts={selectedFigure.svgHighlights}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Level 3: Deep-Dive Specification Drawer (100% Zero Information Loss) */}
      <ClauseDetailDrawer
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        topic={drawer.topic}
        relatedClauses={drawer.relatedClauses}
        activeClauseId={drawer.activeClauseId}
        setActiveClauseId={drawer.setActiveClauseId}
      />

    </div>
  );
};
