import React, { useState, useEffect } from 'react';
import { Smartphone, Download, CheckCircle2, X, WifiOff, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const PwaInstallPrompt: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Detect online/offline network status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for PWA Before Install Prompt (Chrome / Android / Edge)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Detect if app is already running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  return (
    <>
      {/* Offline Status Floating Toast Indicator */}
      {isOffline && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 bg-amber-500 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs font-bold border border-amber-400 animate-bounce">
          <div className="flex items-center space-x-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>
              {isEn
                ? 'Currently offline. System is running in full medical-grade PWA offline cache mode.'
                : '目前處於無網路狀態，系統正以醫療級 PWA 全離線快取模式運作中。'}
            </span>
          </div>
        </div>
      )}

      {/* PWA Home Screen Install Banner */}
      {showPrompt && !isInstalled && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 space-y-3 print:hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-md text-white shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-extrabold text-white">
                    {isEn ? 'Install ISO 80369 Navigator App' : '安裝 ISO 80369 導航 App'}
                  </h4>
                  <span className="bg-blue-500/30 text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">PWA</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  {isEn
                    ? 'Add to home screen for frameless full-screen operation and offline testing laboratory access!'
                    : '新增至手機主畫面，享全螢幕無框操作與實驗室斷網全離線檢視！'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2 pt-1 border-t border-slate-800">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-3 rounded-xl transition shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isEn ? 'Install to Home Screen' : '立即安裝至主畫面'}</span>
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition cursor-pointer"
            >
              {isEn ? 'Later' : '稍後'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
