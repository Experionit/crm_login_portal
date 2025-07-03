import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const dropdownRef = useRef(null);

  const languages = {
    en: {
      notifications: 'Notifications',
      markAllRead: 'Mark all as read',
      noNotifications: 'No new notifications',
      viewAll: 'View all notifications'
    },
    es: {
      notifications: 'Notificaciones',
      markAllRead: 'Marcar todo como leído',
      noNotifications: 'No hay notificaciones nuevas',
      viewAll: 'Ver todas las notificaciones'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        title: "New lead assigned",
        message: "John Smith from TechCorp has been assigned to you",
        time: new Date(Date.now() - 300000),
        isRead: false,
        type: "lead"
      },
      {
        id: 2,
        title: "Meeting reminder",
        message: "Call with Sarah Johnson in 30 minutes",
        time: new Date(Date.now() - 600000),
        isRead: false,
        type: "meeting"
      },
      {
        id: 3,
        title: "Task overdue",
        message: "Follow-up with ABC Corp is overdue",
        time: new Date(Date.now() - 3600000),
        isRead: true,
        type: "task"
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.ceil(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'lead': return 'UserPlus';
      case 'meeting': return 'Calendar';
      case 'task': return 'CheckSquare';
      default: return 'Bell';
    }
  };

  const t = languages[currentLanguage];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200 touch-target"
        aria-label={t.notifications}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-lg border border-border z-1200 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">{t.notifications}</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-primary hover:text-primary-700 transition-colors duration-200"
              >
                {t.markAllRead}
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-text-secondary">
                <Icon name="Bell" size={24} className="mx-auto mb-2 text-text-tertiary" />
                <p className="text-sm">{t.noNotifications}</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border hover:bg-secondary-50 transition-colors duration-200 ${
                    !notification.isRead ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-md ${
                      notification.type === 'lead' ? 'bg-success-100 text-success-600' :
                      notification.type === 'meeting'? 'bg-warning-100 text-warning-600' : 'bg-accent-100 text-accent-600'
                    }`}>
                      <Icon name={getNotificationIcon(notification.type)} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-text-tertiary mt-1">
                        {formatTime(notification.time)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <button className="w-full text-sm text-primary hover:text-primary-700 transition-colors duration-200">
                {t.viewAll}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;