import React, { useState } from 'react';
import { Header } from './components/Header';
import { TopicClauseExplorer } from './components/TopicClauseExplorer';
import { TopicVisualMap } from './components/TopicVisualMap';
import { ClauseComparisonMatrix } from './components/ClauseComparisonMatrix';
import { ConnectorInspector } from './components/ConnectorInspector';
import { DvpGenerator } from './components/DvpGenerator';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { TestConfigState } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('topic-explorer');
  const { t } = useLanguage();

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
      <main className="max-w-[1920px] w-[96%] mx-auto px-3 sm:px-5 lg:px-8 py-6">
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
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-[13px] text-slate-500 mt-12 print:hidden">
        <div className="max-w-[1920px] w-[96%] mx-auto px-4">
          <p className="font-semibold text-slate-700 text-sm">
            {t.app.footer}
          </p>
          <p className="mt-1 text-[13px] text-slate-500">
            Designed for Medical Device R&D, Quality Assurance, Regulatory Affairs (RA), and Testing Laboratory Engineers.
          </p>
        </div>
      </footer>

      {/* PWA Home Screen Install Banner & Offline Status Indicator */}
      <PwaInstallPrompt />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
