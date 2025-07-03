import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import SettingsNavigation from './components/SettingsNavigation';
import PersonalInfoSection from './components/PersonalInfoSection';
import SecuritySection from './components/SecuritySection';
import NotificationSection from './components/NotificationSection';
import RoleSpecificSection from './components/RoleSpecificSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfileSettings = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userRole, setUserRole] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const languages = {
    en: {
      profileSettings: 'Profile Settings',
      backToDashboard: 'Back to Dashboard',
      menu: 'Menu',
      close: 'Close',
      changesSaved: 'Changes saved successfully!',
      personalInfo: 'Personal Information',
      security: 'Security',
      notifications: 'Notifications',
      roleSpecific: 'Role Settings'
    },
    es: {
      profileSettings: 'Configuración de Perfil',
      backToDashboard: 'Volver al Panel',
      menu: 'Menú',
      close: 'Cerrar',
      changesSaved: '¡Cambios guardados exitosamente!',
      personalInfo: 'Información Personal',
      security: 'Seguridad',
      notifications: 'Notificaciones',
      roleSpecific: 'Configuración de Rol'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (authUser.role) {
      setUserRole(authUser.role);
    } else {
      navigate('/login-screen');
    }
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleSave = (data) => {
    console.log('Saving data:', data);
    setSuccessMessage(t.changesSaved);
    setHasUnsavedChanges(false);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleCancel = () => {
    setHasUnsavedChanges(false);
  };

  const handleBackToDashboard = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }

    if (userRole === 'salesperson') {
      navigate('/salesperson-dashboard');
    } else if (userRole === 'administrator') {
      navigate('/administrator-dashboard');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const t = languages[currentLanguage];

  if (!userRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Icon name="Loader2" size={20} className="animate-spin text-primary" />
          <span className="text-text-secondary font-caption">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleAdaptiveHeader />
      
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleBackToDashboard}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="text-text-secondary hover:text-text-primary"
                >
                  {t.backToDashboard}
                </Button>
                <div className="h-6 w-px bg-border" />
                <h1 className="text-xl font-semibold text-text-primary font-heading">
                  {t.profileSettings}
                </h1>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="lg:hidden touch-target"
                iconName="Menu"
                aria-label={t.menu}
              />
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success-600" />
                <span className="text-sm text-success-700 font-medium font-body">
                  {successMessage}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Navigation */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <SettingsNavigation
                  activeSection={activeSection}
                  onSectionChange={handleSectionChange}
                  hasUnsavedChanges={hasUnsavedChanges}
                  userRole={userRole}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-surface rounded-lg shadow-elevation-1 border border-border p-6 lg:p-8">
                <PersonalInfoSection
                  isActive={activeSection === 'personal'}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  hasUnsavedChanges={hasUnsavedChanges}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />

                <SecuritySection
                  isActive={activeSection === 'security'}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  hasUnsavedChanges={hasUnsavedChanges}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />

                <NotificationSection
                  isActive={activeSection === 'notifications'}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  hasUnsavedChanges={hasUnsavedChanges}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />

                <RoleSpecificSection
                  isActive={activeSection === 'role-specific'}
                  userRole={userRole}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  hasUnsavedChanges={hasUnsavedChanges}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-1100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 w-80 h-full bg-surface border-r border-border z-1100 lg:hidden animate-slide-in-left overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-text-primary font-heading">
                {t.profileSettings}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                iconName="X"
                aria-label={t.close}
                className="touch-target"
              />
            </div>
            <div className="p-4">
              <SettingsNavigation
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                hasUnsavedChanges={hasUnsavedChanges}
                userRole={userRole}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileSettings;