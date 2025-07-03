import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ProfileDropdown = ({ userRole, userName = 'User', userEmail = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const languages = {
    en: {
      profile: 'Profile Settings',
      logout: 'Logout',
      viewProfile: 'View Profile',
      account: 'Account'
    },
    es: {
      profile: 'Configuración de Perfil',
      logout: 'Cerrar Sesión',
      viewProfile: 'Ver Perfil',
      account: 'Cuenta'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    navigate('/login-screen');
    setIsOpen(false);
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplayName = (role) => {
    if (role === 'salesperson') return 'Sales';
    if (role === 'administrator') return 'Admin';
    return role;
  };

  const t = languages[currentLanguage];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger */}
      <button
        onClick={handleToggle}
        onKeyDown={(e) => handleKeyDown(e, handleToggle)}
        className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary-50 transition-colors duration-200 touch-target focus-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${t.account} menu`}
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center border-2 border-primary-200">
          {userName ? (
            <span className="text-sm font-medium text-primary-700 font-data">
              {getInitials(userName)}
            </span>
          ) : (
            <Icon name="User" size={16} className="text-primary-600" />
          )}
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-text-primary font-body">
            {userName || 'User'}
          </div>
          {userRole && (
            <div className="text-xs text-text-secondary font-caption">
              {getRoleDisplayName(userRole)}
            </div>
          )}
        </div>

        {/* Chevron */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-secondary-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface rounded-md shadow-lg border border-border animate-scale-in z-1200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center border-2 border-primary-200">
                {userName ? (
                  <span className="text-sm font-medium text-primary-700 font-data">
                    {getInitials(userName)}
                  </span>
                ) : (
                  <Icon name="User" size={18} className="text-primary-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary font-body truncate">
                  {userName || 'User'}
                </div>
                {userEmail && (
                  <div className="text-xs text-text-secondary font-caption truncate">
                    {userEmail}
                  </div>
                )}
                {userRole && (
                  <div className="text-xs text-accent font-caption">
                    {getRoleDisplayName(userRole)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleProfileClick}
              onKeyDown={(e) => handleKeyDown(e, handleProfileClick)}
              className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200 focus-ring"
              role="menuitem"
            >
              <Icon name="Settings" size={16} className="mr-3 text-secondary-600" />
              {t.profile}
            </button>

            <div className="border-t border-border my-1" />

            <button
              onClick={handleLogout}
              onKeyDown={(e) => handleKeyDown(e, handleLogout)}
              className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200 focus-ring"
              role="menuitem"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              {t.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;