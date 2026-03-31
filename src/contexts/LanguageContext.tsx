import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'fr' | 'en';

type Translations = Record<string, any>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved) return saved;
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'fr' || browserLang === 'en') ? (browserLang as Language) : 'fr';
  });

  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    localStorage.setItem('language', language);
    // Dynamic import of all locale modules
    const loadTranslations = async () => {
      try {
        const modules = ['common', 'services', 'training', 'contact', 'about', 'blog', 'portfolio'];
        const loaded: Record<string, any> = {};
        for (const mod of modules) {
          const content = await import(`../locales/${language}/${mod}.json`);
          loaded[mod] = content.default;
        }
        setTranslations(loaded);
      } catch (error) {
        console.error('Failed to load translations', error);
      }
    };
    loadTranslations();
  }, [language]);

  const t = (path: string, options?: { returnObjects?: boolean }): any => {
    const keys = path.split('.');
    let result: any = translations;
    for (const key of keys) {
      if (!result || typeof result !== 'object') return path;
      result = result[key];
    }
    
    if (options?.returnObjects) return result || path;
    return typeof result === 'string' ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within a LanguageProvider');
  return context;
};
