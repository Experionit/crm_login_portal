import React, { useState, useEffect } from 'react';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import SystemMetricsWidget from './components/SystemMetricsWidget';
import UserManagementTab from './components/UserManagementTab';
import SystemConfigurationTab from './components/SystemConfigurationTab';
import AnalyticsTab from './components/AnalyticsTab';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';

const AdministratorDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState(null);

  const languages = {
    en: {
      administratorDashboard: 'Administrator Dashboard',
      overview: 'Overview',
      userManagement: 'User Management',
      systemConfig: 'System Configuration',
      analytics: 'Analytics',
      welcome: 'Welcome back',
      systemOverview: 'System Overview',
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity'
    },
    es: {
      administratorDashboard: 'Panel de Administrador',
      overview: 'Resumen',
      userManagement: 'Gestión de Usuarios',
      systemConfig: 'Configuración del Sistema',
      analytics: 'Analíticas',
      welcome: 'Bienvenido de nuevo',
      systemOverview: 'Resumen del Sistema',
      quickActions: 'Acciones Rápidas',
      recentActivity: 'Actividad Reciente'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check user authentication and role
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (authUser.role) {
      setUserRole(authUser.role);
    }
  }, []);

  const tabItems = [
    {
      id: 'overview',
      label: languages[currentLanguage].overview,
      icon: 'LayoutDashboard'
    },
    {
      id: 'users',
      label: languages[currentLanguage].userManagement,
      icon: 'Users'
    },
    {
      id: 'config',
      label: languages[currentLanguage].systemConfig,
      icon: 'Settings'
    },
    {
      id: 'analytics',
      label: languages[currentLanguage].analytics,
      icon: 'BarChart3'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <SystemMetricsWidget />
            <QuickActionsPanel />
          </div>
        );
      case 'users':
        return <UserManagementTab />;
      case 'config':
        return <SystemConfigurationTab />;
      case 'analytics':
        return <AnalyticsTab />;
      default:
        return (
          <div className="space-y-8">
            <SystemMetricsWidget />
            <QuickActionsPanel />
          </div>
        );
    }
  };

  const t = languages[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      <RoleAdaptiveHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary font-heading">
                  {t.administratorDashboard}
                </h1>
                <p className="text-text-secondary font-caption">
                  {t.welcome}, Administrator
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }`}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={18} 
                      className={activeTab === tab.id ? 'text-primary' : 'text-secondary-600'} 
                    />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministratorDashboard;