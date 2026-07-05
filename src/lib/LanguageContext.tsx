'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Language, translations, TranslationKeys } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'nusabeetrip-lang';

function getRouteLanguage(pathname: string | null): Language | null {
  if (!pathname) return null;
  return pathname === '/id' || pathname.startsWith('/id/') ? 'id' : null;
}

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: Language;
}> = ({ children, initialLanguage = 'en' }) => {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // Route locale wins for /id/* URLs. Default URLs keep the user's preference.
  useEffect(() => {
    const routeLanguage = getRouteLanguage(pathname);
    if (routeLanguage) {
      setLanguageState(routeLanguage);
      localStorage.setItem(STORAGE_KEY, routeLanguage);
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === 'en' || saved === 'id') {
      setLanguageState(saved);
    }
  }, [pathname]);

  // Keep the document <html lang> in sync with the active language for SEO/a11y
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to access language context.
 * Must be used inside LanguageProvider.
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
