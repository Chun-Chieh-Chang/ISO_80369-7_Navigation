import React, { useState } from 'react';
import { Header } from './components/Header';
import { TopicClauseExplorer } from './components/TopicClauseExplorer';
import { TopicVisualMap } from './components/TopicVisualMap';
import { ClauseComparisonMatrix } from './components/ClauseComparisonMatrix';
import { ConnectorInspector } from './components/ConnectorInspector';
import { DvpGenerator } from './components/DvpGenerator';
import { TestConfigState } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('topic-explorer');

  // Global shared test configuration state
  const [config, setConfig] = useState<TestConfigState>({
    deviceType: 't-port',
    connectorGender: 'male',
    connectorType: 'lock',
    selectedClauseId: '6.6',
    selectedRefConnectorId: 'C.3', // Default to ISO worst-case
    appliedAssemblyTorqueNm: 0,
    appliedTestTorqueNm: 0.16,
    appliedTestForceN: 35,
    appliedHoldTimeSec: 8,
    selectedMaterialId: 'pp-standard',
    collarWallThicknessMm: 1.1,
    collarOuterDiameterMm: 7.5,
    tPortAsymmetryFactor: 1.25
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Header Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} config={config} setConfig={setConfig} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'topic-explorer' && (
          <TopicClauseExplorer />
        )}

        {activeTab === 'visual-map' && (
          <TopicVisualMap />
        )}

        {activeTab === 'comparison-matrix' && (
          <ClauseComparisonMatrix />
        )}

        {activeTab === 'connectors' && (
          <ConnectorInspector config={config} setConfig={setConfig} />
        )}

        {activeTab === 'dvp-report' && (
          <DvpGenerator config={config} setConfig={setConfig} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-slate-700">
            ISO 80369-7:2021 & ISO 80369-20:2015 醫療小口徑連接器 條文檢索與視覺化導航系統
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Designed for Medical Device R&D, Quality Assurance, Regulatory Affairs (RA), and Testing Laboratory Engineers.
          </p>
        </div>
      </footer>
    </div>
  );
}
