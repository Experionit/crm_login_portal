import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileNavigationDrawer = ({ isOpen, onClose, userRole }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  const languages = {
    en: {
      dashboard: 'Dashboard',
      myCustomers: 'My Customers',
      pipeline: 'Pipeline',
      todaysTasks: "Today\'s Tasks",
      userManagement: 'User Management',
      systemConfig: 'System Config',
      analytics: 'Analytics',
      profile: 'Profile Settings',
      logout: 'Logout'
    },
    es: {
      dashboard: 'Panel',
      myCustomers: 'Mis Clientes',
      pipeline: 'Pipeline',
      todaysTasks: 'Tareas de Hoy',
      userManagement: 'Gestión de Usuarios',
      systemConfig: 'Configuración del Sistema',
      analytics: 'Analíticas',
      profile: 'Configuración de Perfil',
      logout: 'Cerrar Sesión'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    navigate('/login-screen');
    onClose();
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const t = languages[currentLanguage];

  const salespersonNavItems = [
    {
      label: t.dashboard,
      icon: 'LayoutDashboard',
      path: '/salesperson-dashboard',
      primary: true
    },
    {
      label: t.myCustomers,
      icon: 'Users',
      path: '/customers',
      primary: false
    },
    {
      label: t.pipeline,
      icon: 'TrendingUp',
      path: '/pipeline',
      primary: false
    },
    {
      label: t.todaysTasks,
      icon: 'CheckSquare',
      path: '/tasks',
      primary: false
    }
  ];

  const administratorNavItems = [
    {
      label: t.dashboard,
      icon: 'LayoutDashboard',
      path: '/administrator-dashboard',
      primary: true
    },
    {
      label: t.userManagement,
      icon: 'UserCog',
      path: '/user-management',
      primary: false
    },
    {
      label: t.systemConfig,
      icon: 'Settings',
      path: '/system-config',
      primary: false
    },
    {
      label: t.analytics,
      icon: 'BarChart3',
      path: '/analytics',
      primary: false
    }
  ];

  const navItems = userRole === 'salesperson' ? salespersonNavItems : administratorNavItems;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-1100 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 w-80 h-full bg-surface border-r border-border z-1100 lg:hidden animate-slide-in-left overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-text-primary font-heading">
              CRM Portal
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target"
            aria-label="Close menu"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center w-full px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200 touch-target ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary border-l-4 border-primary'
                    : item.primary
                    ? 'text-text-primary hover:bg-secondary-50' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`mr-3 ${
                    isActivePath(item.path) ? 'text-primary' : 'text-secondary-600'
                  }`} 
                />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-border" />

          {/* Secondary Actions */}
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation('/user-profile-settings')}
              className={`flex items-center w-full px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200 touch-target ${
                isActivePath('/user-profile-settings')
                  ? 'bg-primary-50 text-primary border-l-4 border-primary' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
              }`}
            >
              <Icon 
                name="User" 
                size={20} 
                className={`mr-3 ${
                  isActivePath('/user-profile-settings') ? 'text-primary' : 'text-secondary-600'
                }`} 
              />
              {t.profile}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-3 text-sm font-medium text-error hover:bg-error-50 rounded-md transition-colors duration-200 touch-target"
            >
              <Icon name="LogOut" size={20} className="mr-3" />
              {t.logout}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-surface-secondary">
          <div className="text-center">
            <p className="text-xs text-text-tertiary font-caption">
              © 2024 CRM Portal
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigationDrawer;