import React, { useState, useEffect } from 'react';

const AuthenticationCard = ({ children, title, subtitle, showLogo = true }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      crmPortal: 'CRM Portal',
      secureAccess: 'Secure Access'
    },
    es: {
      crmPortal: 'Portal CRM',
      secureAccess: 'Acceso Seguro'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = languages[currentLanguage];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        {showLogo && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-text-primary font-heading mb-1">
              {t.crmPortal}
            </h1>
            <p className="text-sm text-text-secondary font-caption">
              {t.secureAccess}
            </p>
          </div>
        )}

        {/* Authentication Card */}
        <div className="bg-surface rounded-lg shadow-elevation-2 border border-border p-6">
          {/* Card Header */}
          {(title || subtitle) && (
            <div className="text-center mb-6">
              {title && (
                <h2 className="text-xl font-semibold text-text-primary font-heading mb-2">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-text-secondary font-caption">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Card Content */}
          <div className="space-y-4">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-text-tertiary font-caption">
            © 2024 CRM Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCard;