
"use client";
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  translations: any; // A more specific type can be defined based on portfolio-data.ts structure
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Dynamically import translations to avoid making portfolio-data.ts a client component by default.
async function loadTranslations() {
  const dataModule = await import('@/data/portfolio-data');
  return dataModule.siteTranslations; // Assuming siteTranslations is exported for general UI text
}


export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('es');
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      const trans = await loadTranslations();
      setTranslations(trans);
    };
    fetchTranslations();
  }, []);
  
  // Persist language preference (optional)
  useEffect(() => {
    const storedLang = localStorage.getItem('portfolioLanguage') as Language | null;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolioLanguage', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
