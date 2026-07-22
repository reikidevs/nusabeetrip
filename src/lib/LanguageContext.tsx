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

function getRouteLanguage(pathname: string | null): Language {
  return pathname === '/id' || pathname?.startsWith('/id/') ? 'id' : 'en';
}

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: Language;
}> = ({ children, initialLanguage = 'en' }) => {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // The locale encoded in the URL is the source of truth. Keeping chrome and
  // content aligned prevents mixed-language pages after cross-locale navigation.
  useEffect(() => {
    const routeLanguage = getRouteLanguage(pathname);
    setLanguageState(routeLanguage);
    localStorage.setItem(STORAGE_KEY, routeLanguage);
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
