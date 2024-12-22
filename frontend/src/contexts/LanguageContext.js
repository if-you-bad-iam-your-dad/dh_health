import React, { createContext, useContext, useState } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const languages = {
  en: 'English',
  hi: 'हिंदी' // Hindi in Devanagari script
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translate = (key) => {
    return translations[currentLanguage][key] || translations['en'][key] || key;
  };

  const value = {
    currentLanguage,
    setCurrentLanguage,
    languages,
    translate
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
