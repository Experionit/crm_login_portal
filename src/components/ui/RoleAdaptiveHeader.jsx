import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleAdaptiveHeader = () => {
  const [userRole, setUserRole] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const languages = {
    en: {
      dashboard: 'Dashboard',
      profile: 'Profile Settings',
      logout: 'Logout',
      menu: 'Menu',
      myCustomers: 'My Customers',
      pipeline: 'Pipeline',
      todaysTasks: "Today\'s Tasks",
      userManagement: 'User Management',
      systemConfig: 'System Config',
      analytics: 'Analytics'
    },
    es: {
      dashboard: 'Panel',
      profile: 'Configuración de Perfil',
      logout: 'Cerrar Sesión',
      menu: 'Menú',
      myCustomers: 'Mis Clientes',
      pipeline: 'Pipeline',
      todaysTasks: 'Tareas de Hoy',
      userManagement: 'Gestión de Usuarios',
      systemConfig: 'Configuración del Sistema',
      analytics: 'Analíticas'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (authUser.role) {
      setUserRole(authUser.role);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    navigate('/login-screen');
  };

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (userRole === 'salesperson') {
      navigate('/salesperson-dashboard');
    } else if (userRole === 'administrator') {
      navigate('/administrator-dashboard');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isAuthPage = location.pathname === '/login-screen' || location.pathname === '/forgot-password-screen';

  if (isAuthPage) {
    return null;
  }

  const t = languages[currentLanguage];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
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
            <span className="text-xl font-semibold text-text-primary font-heading">
              CRM Portal
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {userRole && (
              <Button
                variant="ghost"
                onClick={handleDashboardClick}
                className="text-text-secondary hover:text-text-primary"
              >
                {t.dashboard}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button & Profile */}
          <div className="flex items-center space-x-2">
            {userRole && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="lg:hidden touch-target"
                aria-label={t.menu}
              >
                <Icon name="Menu" size={20} />
              </Button>
            )}

            {/* Profile Dropdown */}
            {userRole && (
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 touch-target"
                >
                  <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-secondary-600" />
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`text-secondary-600 transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </Button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg border border-border animate-scale-in">
                    <div className="py-1">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <Icon name="Settings" size={16} className="mr-3 text-secondary-600" />
                        {t.profile}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200"
                      >
                        <Icon name="LogOut" size={16} className="mr-3" />
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && userRole && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-1100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 w-64 h-full bg-surface border-r border-border z-1100 lg:hidden animate-slide-in-left">
            <div className="p-4">
              <nav className="space-y-2">
                <button
                  onClick={handleDashboardClick}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target"
                >
                  <Icon name="LayoutDashboard" size={18} className="mr-3 text-secondary-600" />
                  {t.dashboard}
                </button>

                {userRole === 'salesperson' && (
                  <>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target">
                      <Icon name="Users" size={18} className="mr-3 text-secondary-600" />
                      {t.myCustomers}
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target">
                      <Icon name="TrendingUp" size={18} className="mr-3 text-secondary-600" />
                      {t.pipeline}
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target">
                      <Icon name="CheckSquare" size={18} className="mr-3 text-secondary-600" />
                      {t.todaysTasks}
                    </button>
                  </>
                )}

                {userRole === 'administrator' && (
                  <>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target">
                      <Icon name="UserCog" size={18} className="mr-3 text-secondary-600" />
                      {t.userManagement}
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target">
                      <Icon name="Settings" size={18} className="mr-3 text-secondary-600" />
                      {t.systemConfig}
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target">
                      <Icon name="BarChart3" size={18} className="mr-3 text-secondary-600" />
                      {t.analytics}
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RoleAdaptiveHeader;