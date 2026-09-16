import React from 'react';
import { BookOpen, Network, Table, Wrench, FileSpreadsheet, FileText, Globe, Presentation, FlaskConical } from 'lucide-react';
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
  const isEn = language === 'en';

  const getActiveHub = (tab: string): 'explorer' | 'matrix' | 'workbench' => {
    if (tab === 'visual-map' || tab === 'topic-explorer') return 'explorer';
    if (tab === 'comparison-matrix') return 'matrix';
    if (tab === 'connectors' || tab === 'dvp-report') return 'workbench';
    return 'explorer';
  };

  const activeHub = getActiveHub(activeTab);

  const primaryHubs = [
    { id: 'explorer',   label: t.nav.hubExplorer,  defaultTab: 'topic-explorer',    icon: BookOpen },
    { id: 'matrix',     label: t.nav.hubMatrix,    defaultTab: 'comparison-matrix', icon: Table },
    { id: 'workbench',  label: t.nav.hubWorkbench, defaultTab: 'connectors',        icon: FlaskConical },
  ];

  const subTabsMap: Record<string, Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>> = {
    explorer: [
      { id: 'topic-explorer', label: t.nav.subExplorerClauses,  icon: FileText },
      { id: 'visual-map',     label: t.nav.subExplorerNetwork,  icon: Network },
    ],
    workbench: [
      { id: 'connectors', label: t.nav.subWorkbenchFixtures, icon: Wrench },
      { id: 'dvp-report', label: t.nav.subWorkbenchDvp,      icon: FileSpreadsheet },
    ],
  };

  const currentSubTabs = subTabsMap[activeHub];

  return (
    <header className="sticky top-0 z-50">

      {/* ── Brand bar: 黛紫灰 deep purple, calm authority ── */}
      <div className="bg-[#252035] border-b border-white/[0.07]">
        <div className="max-w-[1920px] w-[96%] mx-auto px-3 sm:px-6 lg:px-10 h-[52px] flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-1.5 rounded-lg bg-purple-400/15 border border-purple-400/25 shrink-0">
              <FileText className="w-4 h-4 text-purple-300" />
            </div>
            <div className="min-w-0 leading-none">
              <h1 className="text-[14px] font-semibold text-white tracking-tight truncate">
                {t.app.title}
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block truncate">
                ISO 80369-7:2021 · ISO 80369-20:2024
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`${import.meta.env.BASE_URL}slides/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/18 border border-amber-400/20 hover:border-amber-400/35 transition-all whitespace-nowrap"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav.presentation}</span>
            </a>

            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              title={isEn ? '切換至繁體中文' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isEn ? '中文' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Primary navigation: Inset Focus — neo-bg ground, pill tabs ── */}
      <div className="bg-[var(--neo-bg)] border-b border-[var(--neo-border)]">
        <div className="max-w-[1920px] w-[96%] mx-auto px-3 sm:px-6 lg:px-10 flex items-center justify-between gap-4 min-h-[48px] py-1.5">

          {/* Primary hub tabs — pill tray style */}
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {primaryHubs.map((hub) => {
              const Icon = hub.icon;
              const isActive = activeHub === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveTab(hub.defaultTab)}
                  className={`flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium transition-all whitespace-nowrap rounded-xl cursor-pointer ${
                    isActive
                      ? 'neo-pill-active text-[var(--neo-accent)] font-semibold'
                      : 'text-[var(--neo-muted)] hover:text-[var(--neo-text)]'
                  }`}
                >
                  <Icon className={`w-[15px] h-[15px] shrink-0 ${isActive ? 'text-[var(--neo-accent)]' : 'text-[var(--neo-muted)]'}`} />
                  <span>{hub.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Contextual sub-tabs */}
          {currentSubTabs && currentSubTabs.length > 0 && (
            <div className="neo-tray flex items-center gap-0.5 px-1 py-1 rounded-xl shrink-0">
              {currentSubTabs.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                      isSubActive
                        ? 'neo-pill-active text-[var(--neo-accent)] font-semibold'
                        : 'text-[var(--neo-muted)] hover:text-[var(--neo-text)]'
                    }`}
                  >
                    <SubIcon className={`w-[14px] h-[14px] ${isSubActive ? 'text-[var(--neo-accent)]' : 'text-[var(--neo-muted)]'}`} />
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
