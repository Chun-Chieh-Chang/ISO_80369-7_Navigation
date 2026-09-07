import React from 'react';
import { BookOpen, Network, Table, Wrench, FileSpreadsheet, FileText, Globe, Presentation } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { TestConfigState } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  config?: TestConfigState;
  setConfig?: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t } = useLanguage();

  // Determine active primary hub based on activeTab
  const getActiveHub = (tab: string): 'explorer' | 'matrix' | 'workbench' => {
    if (tab === 'visual-map' || tab === 'topic-explorer') return 'explorer';
    if (tab === 'comparison-matrix') return 'matrix';
    if (tab === 'connectors' || tab === 'dvp-report') return 'workbench';
    return 'explorer';
  };

  const activeHub = getActiveHub(activeTab);

  // Primary Hub Definitions
  const primaryHubs = [
    {
      id: 'explorer',
      label: t.nav.hubExplorer,
      defaultTab: 'topic-explorer',
      icon: BookOpen,
      badge: '2 Sub-views',
      badgeZh: '2 個維度'
    },
    {
      id: 'matrix',
      label: t.nav.hubMatrix,
      defaultTab: 'comparison-matrix',
      icon: Table,
      badge: 'ISO 7 vs 20',
      badgeZh: '雙標對照'
    },
    {
      id: 'workbench',
      label: t.nav.hubWorkbench,
      defaultTab: 'connectors',
      icon: Wrench,
      badge: 'Fixtures & DVP',
      badgeZh: '工程工具'
    },
  ];

  // Secondary Sub-tabs per Hub
  const subTabsMap: Record<string, Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>> = {
    explorer: [
      { id: 'topic-explorer', label: t.nav.subExplorerClauses, icon: FileText },
      { id: 'visual-map', label: t.nav.subExplorerNetwork, icon: Network },
    ],
    workbench: [
      { id: 'connectors', label: t.nav.subWorkbenchFixtures, icon: Wrench },
      { id: 'dvp-report', label: t.nav.subWorkbenchDvp, icon: FileSpreadsheet },
    ],
  };

  const currentSubTabs = subTabsMap[activeHub];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-[1920px] w-[96%] mx-auto px-2.5 sm:px-5 lg:px-8">
        
        {/* Tier 1: Brand, ISO Meta Badges & Language Switcher */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-2 sm:py-3 gap-2 sm:gap-3">
          {/* Brand & Main Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            <div className="p-2 sm:p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-600/20 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
                  {t.app.title}
                </h1>
                <span className="bg-blue-50 text-blue-800 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200/80 shrink-0 shadow-2xs">
                  {t.app.versionBadge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-normal hidden sm:block">
                {t.app.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Meta Badges, Presentation Slide & Language Switcher */}
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono shrink-0 self-end lg:self-auto">
            <div className="bg-slate-50/90 border border-slate-200 px-2.5 py-1 rounded-xl flex items-center space-x-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-800">ISO 80369-7:2021</span>
              <span className="text-slate-300">|</span>
              <span className="font-bold text-slate-800">ISO 80369-20:2024</span>
            </div>

            {/* Slides External Link */}
            <a
              href={`${import.meta.env.BASE_URL}slides/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/80 shadow-2xs text-xs"
              title="Open Presentation Slides"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.nav.presentation}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition shadow-2xs cursor-pointer min-h-[32px]"
              title={language === 'zh' ? 'Switch to English' : '切換至繁體中文'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'zh' ? 'English' : '繁體中文'}</span>
            </button>
          </div>
        </div>

        {/* Tier 2: Primary Hub Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-2 pt-1 border-t border-slate-100 gap-2">
          {/* Primary Workspaces */}
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            {primaryHubs.map((hub) => {
              const Icon = hub.icon;
              const isCurrentHub = activeHub === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveTab(hub.defaultTab)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer touch-target ${
                    isCurrentHub
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 bg-slate-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrentHub ? 'text-white' : 'text-slate-500'}`} />
                  <span>{hub.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                    isCurrentHub ? 'bg-blue-700/80 text-blue-100' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    {language === 'en' ? hub.badge : hub.badgeZh}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Tier 3: Secondary Sub-tab Pills (Progressive Contextual Sub-navigation) */}
          {currentSubTabs && currentSubTabs.length > 0 && (
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 self-start sm:self-center shrink-0">
              {currentSubTabs.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer min-h-[30px] ${
                      isSubActive
                        ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
