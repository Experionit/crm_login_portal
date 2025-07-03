import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [recentAlerts, setRecentAlerts] = useState([]);

  const languages = {
    en: {
      quickActions: 'Quick Actions',
      recentAlerts: 'Recent Alerts',
      addUser: 'Add New User',
      systemBackup: 'System Backup',
      viewLogs: 'View System Logs',
      manageRoles: 'Manage Roles',
      securityScan: 'Security Scan',
      exportData: 'Export Data',
      clearAll: 'Clear All',
      viewAll: 'View All',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      critical: 'Critical',
      warning: 'Warning',
      info: 'Info',
      success: 'Success',
      ago: 'ago',
      minutes: 'minutes',
      hours: 'hours',
      days: 'days'
    },
    es: {
      quickActions: 'Acciones Rápidas',
      recentAlerts: 'Alertas Recientes',
      addUser: 'Agregar Usuario',
      systemBackup: 'Respaldo del Sistema',
      viewLogs: 'Ver Registros',
      manageRoles: 'Gestionar Roles',
      securityScan: 'Escaneo de Seguridad',
      exportData: 'Exportar Datos',
      clearAll: 'Limpiar Todo',
      viewAll: 'Ver Todo',
      high: 'Alto',
      medium: 'Medio',
      low: 'Bajo',
      critical: 'Crítico',
      warning: 'Advertencia',
      info: 'Información',
      success: 'Éxito',
      ago: 'hace',
      minutes: 'minutos',
      hours: 'horas',
      days: 'días'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Mock recent alerts data
    const alertsData = [
      {
        id: 1,
        type: 'critical',
        title: 'Failed Login Attempts',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        priority: 'high'
      },
      {
        id: 2,
        type: 'warning',
        title: 'High Memory Usage',
        message: 'Server memory usage has exceeded 85% threshold',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        priority: 'medium'
      },
      {
        id: 3,
        type: 'info',
        title: 'Backup Completed',
        message: 'Daily system backup completed successfully',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        priority: 'low'
      },
      {
        id: 4,
        type: 'success',
        title: 'User Registration',
        message: 'New user account created: john.doe@company.com',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        priority: 'low'
      }
    ];

    setRecentAlerts(alertsData);
  }, []);

  const quickActionItems = [
    {
      id: 'addUser',
      title: languages[currentLanguage].addUser,
      icon: 'UserPlus',
      color: 'primary',
      action: () => console.log('Add user clicked')
    },
    {
      id: 'systemBackup',
      title: languages[currentLanguage].systemBackup,
      icon: 'Database',
      color: 'success',
      action: () => console.log('System backup clicked')
    },
    {
      id: 'viewLogs',
      title: languages[currentLanguage].viewLogs,
      icon: 'FileText',
      color: 'accent',
      action: () => console.log('View logs clicked')
    },
    {
      id: 'manageRoles',
      title: languages[currentLanguage].manageRoles,
      icon: 'Shield',
      color: 'warning',
      action: () => console.log('Manage roles clicked')
    },
    {
      id: 'securityScan',
      title: languages[currentLanguage].securityScan,
      icon: 'Scan',
      color: 'error',
      action: () => console.log('Security scan clicked')
    },
    {
      id: 'exportData',
      title: languages[currentLanguage].exportData,
      icon: 'Download',
      color: 'secondary',
      action: () => console.log('Export data clicked')
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'text-error bg-error-50 border-error-200';
      case 'warning':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'info':
        return 'text-accent bg-accent-50 border-accent-200';
      case 'success':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getActionColor = (color) => {
    const colorMap = {
      primary: "bg-primary-50 text-primary-600 border-primary-200 hover:bg-primary-100",
      success: "bg-success-50 text-success-600 border-success-200 hover:bg-success-100",
      warning: "bg-warning-50 text-warning-600 border-warning-200 hover:bg-warning-100",
      accent: "bg-accent-50 text-accent-600 border-accent-200 hover:bg-accent-100",
      error: "bg-error-50 text-error-600 border-error-200 hover:bg-error-100",
      secondary: "bg-secondary-50 text-secondary-600 border-secondary-200 hover:bg-secondary-100"
    };
    return colorMap[color] || colorMap.primary;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) {
      return `${days} ${t.days} ${t.ago}`;
    } else if (hours > 0) {
      return `${hours} ${t.hours} ${t.ago}`;
    } else {
      return `${minutes} ${t.minutes} ${t.ago}`;
    }
  };

  const handleClearAlerts = () => {
    setRecentAlerts([]);
  };

  const t = languages[currentLanguage];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {t.quickActions}
          </h3>
          <Icon name="Zap" size={20} className="text-accent" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {quickActionItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getActionColor(item.color)}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={item.icon} size={24} />
                <span className="text-sm font-medium text-center">
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {t.recentAlerts}
          </h3>
          <div className="flex items-center space-x-2">
            {recentAlerts.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAlerts}
                className="text-text-secondary hover:text-error"
              >
                {t.clearAll}
              </Button>
            )}
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              {t.viewAll}
            </Button>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentAlerts.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Bell" size={48} className="text-secondary-300 mx-auto mb-3" />
              <p className="text-text-secondary">No recent alerts</p>
            </div>
          ) : (
            recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-sm ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon name={getAlertIcon(alert.type)} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium truncate">
                        {alert.title}
                      </h4>
                      <span className="text-xs opacity-75">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs opacity-90 line-clamp-2">
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {recentAlerts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{recentAlerts.length} alerts</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                  <span>Critical: {recentAlerts.filter(a => a.type === 'critical').length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>Warning: {recentAlerts.filter(a => a.type === 'warning').length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionsPanel;