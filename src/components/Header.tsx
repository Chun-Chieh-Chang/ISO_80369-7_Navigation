import React from 'react';
import { BookOpen, Network, Table, Wrench, Activity, ShieldCheck, FileSpreadsheet, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { TestConfigState } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  config: TestConfigState;
  setConfig: React.Dispatch<React.SetStateAction<TestConfigState>>;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'topic-explorer', label: '🔍 主題與條文檢索', icon: BookOpen },
    { id: 'visual-map', label: '🕸️ 條文脈絡圖表', icon: Network },
    { id: 'comparison-matrix', label: '⚖️ 雙標準對照矩陣', icon: Table },
    { id: 'connectors', label: '🔧 參考金屬夾具庫', icon: Wrench },
    { id: 'dvp-report', label: '📋 DVP 與報告生成', icon: FileSpreadsheet },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between py-3.5 gap-4">
          
          {/* Brand & Main Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                  ISO 80369-7 & ISO 80369-20 條文檢索與視覺化導航系統
                </h1>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200 shrink-0">
                  淺色視覺模式
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                醫療級魯爾連接器主題檢索、規範條文對照、實驗室測試細則與最壞情況夾具導航
              </p>
            </div>
          </div>

          {/* Quick Standard Info Badges */}
          <div className="flex items-center space-x-2 text-xs font-mono shrink-0">
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="font-bold text-slate-800">ISO 80369-7:2021</span>
              <span className="text-slate-400">|</span>
              <span className="font-bold text-slate-800">ISO 80369-20:2015</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap gap-1.5 pb-2.5 pt-1 border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
