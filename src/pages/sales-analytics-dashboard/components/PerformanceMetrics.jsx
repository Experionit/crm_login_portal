import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ filters, userRole, language }) => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const languages = {
    en: {
      monthlyRevenue: 'Monthly Revenue',
      quotaAttainment: 'Quota Attainment',
      conversionRate: 'Conversion Rate',
      yearOverYear: 'Year-over-Year Growth',
      totalRevenue: 'Total Revenue',
      newLeads: 'New Leads',
      dealsWon: 'Deals Won',
      averageDealSize: 'Average Deal Size',
      salesCycle: 'Sales Cycle',
      customerAcquisition: 'Customer Acquisition',
      teamQuota: 'Team Quota Achievement',
      individualQuota: 'Individual Quota Achievement',
      vsLastPeriod: 'vs last period',
      days: 'days'
    },
    es: {
      monthlyRevenue: 'Ingresos Mensuales',
      quotaAttainment: 'Cumplimiento de Cuota',
      conversionRate: 'Tasa de Conversión',
      yearOverYear: 'Crecimiento Interanual',
      totalRevenue: 'Ingresos Totales',
      newLeads: 'Nuevos Prospectos',
      dealsWon: 'Tratos Ganados',
      averageDealSize: 'Tamaño Promedio de Trato',
      salesCycle: 'Ciclo de Ventas',
      customerAcquisition: 'Adquisición de Clientes',
      teamQuota: 'Cumplimiento de Cuota del Equipo',
      individualQuota: 'Cumplimiento de Cuota Individual',
      vsLastPeriod: 'vs período anterior',
      days: 'días'
    }
  };

  const t = languages[language];

  // Mock data - in real app, this would come from API
  const mockMetrics = {
    administrator: [
      {
        id: 'totalRevenue',
        title: t.totalRevenue,
        value: '$2,847,250',
        change: '+12.5%',
        changeType: 'positive',
        icon: 'DollarSign',
        color: 'primary',
        trend: [2.1, 2.3, 2.2, 2.5, 2.7, 2.4, 2.8]
      },
      {
        id: 'teamQuota',
        title: t.teamQuota,
        value: '87%',
        change: '+5.2%',
        changeType: 'positive',
        icon: 'Target',
        color: 'success',
        trend: [75, 78, 82, 85, 84, 86, 87]
      },
      {
        id: 'conversionRate',
        title: t.conversionRate,
        value: '24.8%',
        change: '+3.1%',
        changeType: 'positive',
        icon: 'TrendingUp',
        color: 'accent',
        trend: [21, 22, 23, 24, 23, 25, 24.8]
      },
      {
        id: 'yearOverYear',
        title: t.yearOverYear,
        value: '+18.2%',
        change: '+2.3%',
        changeType: 'positive',
        icon: 'Calendar',
        color: 'warning',
        trend: [12, 14, 15, 16, 17, 18, 18.2]
      }
    ],
    salesperson: [
      {
        id: 'monthlyRevenue',
        title: t.monthlyRevenue,
        value: '$127,500',
        change: '+8.7%',
        changeType: 'positive',
        icon: 'DollarSign',
        color: 'primary',
        trend: [110, 115, 120, 125, 118, 122, 127.5]
      },
      {
        id: 'individualQuota',
        title: t.individualQuota,
        value: '92%',
        change: '+4.1%',
        changeType: 'positive',
        icon: 'Target',
        color: 'success',
        trend: [85, 87, 88, 89, 90, 91, 92]
      },
      {
        id: 'dealsWon',
        title: t.dealsWon,
        value: '23',
        change: '+15.0%',
        changeType: 'positive',
        icon: 'CheckCircle',
        color: 'accent',
        trend: [18, 19, 20, 21, 20, 22, 23]
      },
      {
        id: 'averageDealSize',
        title: t.averageDealSize,
        value: '$5,543',
        change: '-2.3%',
        changeType: 'negative',
        icon: 'Package',
        color: 'warning',
        trend: [5800, 5700, 5600, 5650, 5500, 5600, 5543]
      }
    ]
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const roleMetrics = userRole === 'administrator' ? mockMetrics.administrator : mockMetrics.salesperson;
      setMetrics(roleMetrics);
      setLoading(false);
    }, 800);
  }, [filters, userRole]);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary-50 text-primary-600 border-primary-200",
      success: "bg-success-50 text-success-600 border-success-200",
      warning: "bg-warning-50 text-warning-600 border-warning-200",
      accent: "bg-accent-50 text-accent-600 border-accent-200",
      error: "bg-error-50 text-error-600 border-error-200"
    };
    return colorMap[color] || colorMap.primary;
  };

  const renderSparkline = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="60" height="20" className="ml-auto">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getSparklineColor = (color) => {
    const colorMap = {
      primary: "#1E40AF",
      success: "#059669",
      warning: "#D97706",
      accent: "#0EA5E9",
      error: "#DC2626"
    };
    return colorMap[color] || colorMap.primary;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-surface rounded-lg border border-border p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary-200 rounded-lg"></div>
              <div className="w-16 h-4 bg-secondary-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-24 h-4 bg-secondary-200 rounded"></div>
              <div className="w-32 h-8 bg-secondary-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(metric.color)}`}>
              <Icon name={metric.icon} size={24} />
            </div>
            <div className="flex items-center space-x-2">
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

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary font-caption">
              {metric.title}
            </h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-text-primary font-heading">
                {metric.value}
              </span>
              {metric.trend && renderSparkline(metric.trend, getSparklineColor(metric.color))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs text-text-secondary">
              {metric.change} {t.vsLastPeriod}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;