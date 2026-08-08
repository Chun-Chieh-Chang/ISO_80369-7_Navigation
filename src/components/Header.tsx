import React from 'react';
import { BookOpen, Network, Table, Wrench, FileSpreadsheet, FileText } from 'lucide-react';
import { TestConfigState } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  config?: TestConfigState;
  setConfig?: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'topic-explorer', label: '🔍 主題與條文檢索', icon: BookOpen },
    { id: 'visual-map', label: '🕸️ 條文脈絡圖表', icon: Network },
    { id: 'comparison-matrix', label: '⚖️ 雙標準對照矩陣', icon: Table },
    { id: 'connectors', label: '🔧 參考金屬夾具庫', icon: Wrench },
    { id: 'dvp-report', label: '📋 設計驗證矩陣表', icon: FileSpreadsheet },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-[1920px] w-[96%] mx-auto px-2.5 sm:px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-2.5 sm:py-3.5 gap-2.5 sm:gap-4">
          
          {/* Brand & Main Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl sm:rounded-2xl shadow-md shadow-blue-600/20 shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                <h1 className="text-sm sm:text-lg lg:text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  ISO 80369-7 & 20 視覺化導航系統
                </h1>
                <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-[12px] sm:text-[13px] font-bold px-2 py-0.5 rounded-full border border-blue-200/80 shrink-0 shadow-2xs">
                  v7.7 原生 XLSX 版
                </span>
              </div>
              <p className="text-[12px] sm:text-[13px] text-slate-500 mt-0.5 font-normal hidden sm:block">
                醫療級魯爾連接器主題檢索、規範條文對照、實驗室測試細則與最壞情況夾具導航
              </p>
            </div>
          </div>

          {/* Quick Standard Info Badges */}
          <div className="flex items-center space-x-2 text-[12px] sm:text-[13px] font-mono shrink-0 self-end lg:self-auto">
            <div className="bg-slate-50/90 border border-slate-200 px-2.5 sm:px-3.5 py-1 rounded-xl sm:rounded-2xl flex items-center space-x-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-800">ISO 80369-7:2021</span>
              <span className="text-slate-300">|</span>
              <span className="font-bold text-slate-800">ISO 80369-20:2024</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar - Touch Target & Horizontal Scrollable on Mobile */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 pb-2 pt-1 border-t border-slate-100/80 scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer touch-target ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 font-bold scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 bg-slate-50/50 sm:bg-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
