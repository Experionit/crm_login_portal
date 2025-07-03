import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetricsWidget = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      systemMetrics: 'System Metrics',
      totalUsers: 'Total Users',
      activeSessions: 'Active Sessions',
      systemHealth: 'System Health',
      recentActivity: 'Recent Activity',
      viewDetails: 'View Details',
      excellent: 'Excellent',
      good: 'Good',
      warning: 'Warning',
      critical: 'Critical'
    },
    es: {
      systemMetrics: 'Métricas del Sistema',
      totalUsers: 'Usuarios Totales',
      activeSessions: 'Sesiones Activas',
      systemHealth: 'Salud del Sistema',
      recentActivity: 'Actividad Reciente',
      viewDetails: 'Ver Detalles',
      excellent: 'Excelente',
      good: 'Bueno',
      warning: 'Advertencia',
      critical: 'Crítico'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const metricsData = [
    {
      id: 1,
      title: languages[currentLanguage].totalUsers,
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      id: 2,
      title: languages[currentLanguage].activeSessions,
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: "Activity",
      color: "success"
    },
    {
      id: 3,
      title: languages[currentLanguage].systemHealth,
      value: "98.5%",
      change: "-0.2%",
      changeType: "negative",
      icon: "Shield",
      color: "warning"
    },
    {
      id: 4,
      title: languages[currentLanguage].recentActivity,
      value: "342",
      change: "+18%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "accent"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary-50 text-primary-600 border-primary-200",
      success: "bg-success-50 text-success-600 border-success-200",
      warning: "bg-warning-50 text-warning-600 border-warning-200",
      accent: "bg-accent-50 text-accent-600 border-accent-200"
    };
    return colorMap[color] || colorMap.primary;
  };

  const t = languages[currentLanguage];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric) => (
        <div
          key={metric.id}
          className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(metric.color)}`}>
              <Icon name={metric.icon} size={24} />
            </div>
            <button className="text-text-secondary hover:text-text-primary transition-colors duration-200">
              <Icon name="MoreHorizontal" size={20} />
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary font-caption">
              {metric.title}
            </h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-text-primary font-heading">
                {metric.value}
              </span>
              <div className={`flex items-center text-sm font-medium ${
                metric.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={metric.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                  className="mr-1" 
                />
                {metric.change}
              </div>
            </div>
          </div>

          <button className="w-full mt-4 text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
            {t.viewDetails}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SystemMetricsWidget;