import React, { useState, useEffect } from 'react';

const LoginFooter = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const currentYear = new Date().getFullYear();

  const languages = {
    en: {
      copyright: 'All rights reserved.',
      poweredBy: 'Powered by CRM Solutions',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      support: 'Support'
    },
    es: {
      copyright: 'Todos los derechos reservados.',
      poweredBy: 'Desarrollado por CRM Solutions',
      termsOfService: 'Términos de Servicio',
      privacyPolicy: 'Política de Privacidad',
      support: 'Soporte'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const t = languages[currentLanguage];

  return (
    <div className="text-center space-y-4">
      {/* Links */}
      <div className="flex items-center justify-center space-x-6 text-xs">
        <button className="text-text-tertiary hover:text-text-secondary transition-colors duration-200 focus-ring rounded">
          {t.termsOfService}
        </button>
        <span className="text-border">•</span>
        <button className="text-text-tertiary hover:text-text-secondary transition-colors duration-200 focus-ring rounded">
          {t.privacyPolicy}
        </button>
        <span className="text-border">•</span>
        <button className="text-text-tertiary hover:text-text-secondary transition-colors duration-200 focus-ring rounded">
          {t.support}
        </button>
      </div>

      {/* Copyright */}
      <div className="space-y-1">
        <p className="text-xs text-text-tertiary font-caption">
          © {currentYear} CRM Portal. {t.copyright}
        </p>
        <p className="text-xs text-text-tertiary font-caption">
          {t.poweredBy}
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;