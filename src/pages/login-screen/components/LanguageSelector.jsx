import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: langCode }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary bg-surface-secondary hover:bg-surface-tertiary rounded-md transition-colors duration-200 border border-border focus-ring"
        aria-label="Select language"
      >
        <span className="text-base">{languages[currentLanguage].flag}</span>
        <span className="font-medium">{languages[currentLanguage].name}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-surface rounded-md shadow-lg border border-border z-50 animate-scale-in">
          <div className="py-1">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`flex items-center w-full px-3 py-2 text-sm transition-colors duration-200 ${
                  currentLanguage === code
                    ? 'bg-primary-50 text-primary font-medium' :'text-text-primary hover:bg-secondary-50'
                }`}
              >
                <span className="text-base mr-3">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLanguage === code && (
                  <Icon name="Check" size={16} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;