import { createContext, useState, useEffect } from 'react';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

export const LanguageContext = createContext();

const translations = { es, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'es' || saved === 'en')) return saved;
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    return browserLang;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};