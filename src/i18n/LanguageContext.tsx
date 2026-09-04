import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['zh'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check URL query parameters (e.g. ?lang=en)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam === 'en' || langParam === 'zh') {
        return langParam;
      }
      // 2. Check localStorage
      const savedLang = localStorage.getItem('iso_lang');
      if (savedLang === 'en' || savedLang === 'zh') {
        return savedLang;
      }
    }
    return 'zh';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('iso_lang', lang);
      // Also update URL query without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = language === 'en'
        ? 'ISO 80369-7 & 20 Medical Small-Bore Connectors Verification Navigation System'
        : 'ISO 80369-7 醫療器材小口徑連接器標準驗證導航系統';
      document.documentElement.lang = language === 'en' ? 'en' : 'zh-TW';
    }
  }, [language]);

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
