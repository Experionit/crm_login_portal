import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeSection, onSectionChange, hasUnsavedChanges, userRole }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      personalInfo: 'Personal Information',
      security: 'Security',
      notifications: 'Notifications',
      roleSpecific: userRole === 'salesperson' ? 'Sales Settings' : 'Admin Settings',
      unsavedChanges: 'Unsaved changes'
    },
    es: {
      personalInfo: 'Información Personal',
      security: 'Seguridad',
      notifications: 'Notificaciones',
      roleSpecific: userRole === 'salesperson' ? 'Configuración de Ventas' : 'Configuración de Admin',
      unsavedChanges: 'Cambios sin guardar'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const navigationItems = [
    {
      id: 'personal',
      label: languages[currentLanguage].personalInfo,
      icon: 'User',
      description: 'Name, email, and profile photo'
    },
    {
      id: 'security',
      label: languages[currentLanguage].security,
      icon: 'Shield',
      description: 'Password and authentication'
    },
    {
      id: 'notifications',
      label: languages[currentLanguage].notifications,
      icon: 'Bell',
      description: 'Email and push preferences'
    },
    {
      id: 'role-specific',
      label: languages[currentLanguage].roleSpecific,
      icon: userRole === 'salesperson' ? 'TrendingUp' : 'Settings',
      description: userRole === 'salesperson' ? 'Territory and mobile settings' : 'System administration'
    }
  ];

  const handleSectionClick = (sectionId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this section?');
      if (!confirmLeave) return;
    }
    onSectionChange(sectionId);
  };

  const t = languages[currentLanguage];

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleSectionClick(item.id)}
          className={`w-full text-left p-4 rounded-lg transition-all duration-200 group touch-target ${
            activeSection === item.id
              ? 'bg-primary-50 border-l-4 border-primary text-primary' :'hover:bg-secondary-50 text-text-secondary hover:text-text-primary'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 ${
              activeSection === item.id
                ? 'bg-primary-100' :'bg-secondary-100 group-hover:bg-secondary-200'
            }`}>
              <Icon 
                name={item.icon} 
                size={18} 
                className={`transition-colors duration-200 ${
                  activeSection === item.id ? 'text-primary-600' : 'text-secondary-600'
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium transition-colors duration-200 ${
                activeSection === item.id ? 'text-primary' : 'text-text-primary'
              }`}>
                {item.label}
                {hasUnsavedChanges && activeSection === item.id && (
                  <span className="ml-2 inline-flex items-center">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                  </span>
                )}
              </div>
              <div className={`text-xs mt-1 transition-colors duration-200 ${
                activeSection === item.id ? 'text-primary-600' : 'text-text-tertiary'
              }`}>
                {item.description}
              </div>
            </div>
          </div>
        </button>
      ))}

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning-600" />
            <span className="text-xs text-warning-700 font-medium font-caption">
              {t.unsavedChanges}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SettingsNavigation;