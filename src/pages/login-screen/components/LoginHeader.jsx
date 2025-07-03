import React, { useState, useEffect } from 'react';

const LoginHeader = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      welcomeBack: 'Welcome Back',
      signInToContinue: 'Sign in to your account to continue',
      crmPortal: 'CRM Portal',
      secureAccess: 'Secure Access to Your Business'
    },
    es: {
      welcomeBack: 'Bienvenido de Nuevo',
      signInToContinue: 'Inicia sesión en tu cuenta para continuar',
      crmPortal: 'Portal CRM',
      secureAccess: 'Acceso Seguro a Tu Negocio'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = languages[currentLanguage];

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-lg">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 text-primary-foreground"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-3xl font-bold text-text-primary font-heading mb-2">
        {t.crmPortal}
      </h1>
      
      {/* Tagline */}
      <p className="text-sm text-text-secondary font-caption mb-6">
        {t.secureAccess}
      </p>

      {/* Welcome Message */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          {t.welcomeBack}
        </h2>
        <p className="text-sm text-text-secondary font-caption mt-1">
          {t.signInToContinue}
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;