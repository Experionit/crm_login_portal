import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsTab = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dateRange, setDateRange] = useState('7days');
  const [activeMetric, setActiveMetric] = useState('users');

  const languages = {
    en: {
      analytics: 'Analytics & Reports',
      dateRange: 'Date Range',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      thisYear: 'This Year',
      userActivity: 'User Activity',
      systemPerformance: 'System Performance',
      salesMetrics: 'Sales Metrics',
      exportReport: 'Export Report',
      totalLogins: 'Total Logins',
      activeUsers: 'Active Users',
      newRegistrations: 'New Registrations',
      sessionDuration: 'Avg Session Duration',
      responseTime: 'Response Time',
      uptime: 'System Uptime',
      errorRate: 'Error Rate',
      dataTransfer: 'Data Transfer',
      dailyLogins: 'Daily Logins',
      userGrowth: 'User Growth',
      roleDistribution: 'Role Distribution',
      administrator: 'Administrator',
      salesperson: 'Salesperson',
      minutes: 'minutes',
      hours: 'hours'
    },
    es: {
      analytics: 'Analíticas e Informes',
      dateRange: 'Rango de Fechas',
      last7Days: 'Últimos 7 Días',
      last30Days: 'Últimos 30 Días',
      last90Days: 'Últimos 90 Días',
      thisYear: 'Este Año',
      userActivity: 'Actividad de Usuarios',
      systemPerformance: 'Rendimiento del Sistema',
      salesMetrics: 'Métricas de Ventas',
      exportReport: 'Exportar Informe',
      totalLogins: 'Total de Accesos',
      activeUsers: 'Usuarios Activos',
      newRegistrations: 'Nuevos Registros',
      sessionDuration: 'Duración Promedio de Sesión',
      responseTime: 'Tiempo de Respuesta',
      uptime: 'Tiempo de Actividad',
      errorRate: 'Tasa de Errores',
      dataTransfer: 'Transferencia de Datos',
      dailyLogins: 'Accesos Diarios',
      userGrowth: 'Crecimiento de Usuarios',
      roleDistribution: 'Distribución de Roles',
      administrator: 'Administrador',
      salesperson: 'Vendedor',
      minutes: 'minutos',
      hours: 'horas'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const userActivityData = [
    { date: '2024-01-09', logins: 45, newUsers: 8 },
    { date: '2024-01-10', logins: 52, newUsers: 12 },
    { date: '2024-01-11', logins: 38, newUsers: 6 },
    { date: '2024-01-12', logins: 61, newUsers: 15 },
    { date: '2024-01-13', logins: 48, newUsers: 9 },
    { date: '2024-01-14', logins: 55, newUsers: 11 },
    { date: '2024-01-15', logins: 67, newUsers: 18 }
  ];

  const systemPerformanceData = [
    { time: '00:00', responseTime: 120, uptime: 99.9 },
    { time: '04:00', responseTime: 95, uptime: 99.8 },
    { time: '08:00', responseTime: 180, uptime: 99.7 },
    { time: '12:00', responseTime: 220, uptime: 99.9 },
    { time: '16:00', responseTime: 165, uptime: 99.8 },
    { time: '20:00', responseTime: 140, uptime: 99.9 }
  ];

  const roleDistributionData = [
    { name: languages[currentLanguage].salesperson, value: 75, color: '#0EA5E9' },
    { name: languages[currentLanguage].administrator, value: 25, color: '#1E40AF' }
  ];

  const analyticsMetrics = [
    {
      id: 'totalLogins',
      title: languages[currentLanguage].totalLogins,
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'LogIn',
      color: 'primary'
    },
    {
      id: 'activeUsers',
      title: languages[currentLanguage].activeUsers,
      value: '189',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'success'
    },
    {
      id: 'newRegistrations',
      title: languages[currentLanguage].newRegistrations,
      value: '47',
      change: '+23.1%',
      changeType: 'positive',
      icon: 'UserPlus',
      color: 'accent'
    },
    {
      id: 'sessionDuration',
      title: languages[currentLanguage].sessionDuration,
      value: '24m',
      change: '-2.3%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'warning'
    }
  ];

  const systemMetrics = [
    {
      id: 'responseTime',
      title: languages[currentLanguage].responseTime,
      value: '145ms',
      change: '+5.2%',
      changeType: 'negative',
      icon: 'Zap',
      color: 'warning'
    },
    {
      id: 'uptime',
      title: languages[currentLanguage].uptime,
      value: '99.8%',
      change: '+0.1%',
      changeType: 'positive',
      icon: 'Shield',
      color: 'success'
    },
    {
      id: 'errorRate',
      title: languages[currentLanguage].errorRate,
      value: '0.2%',
      change: '-0.1%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      color: 'error'
    },
    {
      id: 'dataTransfer',
      title: languages[currentLanguage].dataTransfer,
      value: '2.4GB',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'Database',
      color: 'primary'
    }
  ];

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

  const t = languages[currentLanguage];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          {t.analytics}
        </h2>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7days">{t.last7Days}</option>
            <option value="30days">{t.last30Days}</option>
            <option value="90days">{t.last90Days}</option>
            <option value="year">{t.thisYear}</option>
          </select>
          <Button variant="outline" iconName="Download">
            {t.exportReport}
          </Button>
        </div>
      </div>

      {/* Metrics Tabs */}
      <div className="flex space-x-1 bg-surface-secondary p-1 rounded-lg border border-border">
        <button
          onClick={() => setActiveMetric('users')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeMetric === 'users' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          {t.userActivity}
        </button>
        <button
          onClick={() => setActiveMetric('system')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeMetric === 'system' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          {t.systemPerformance}
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(activeMetric === 'users' ? analyticsMetrics : systemMetrics).map((metric) => (
          <div
            key={metric.id}
            className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(metric.color)}`}>
                <Icon name={metric.icon} size={24} />
              </div>
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

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary font-caption">
                {metric.title}
              </h3>
              <span className="text-2xl font-bold text-text-primary font-heading">
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        {activeMetric === 'users' && (
          <>
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
                {t.dailyLogins}
              </h3>
              <div className="w-full h-64" aria-label="Daily Logins Bar Chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748B"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="logins" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
                {t.userGrowth}
              </h3>
              <div className="w-full h-64" aria-label="User Growth Line Chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748B"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="newUsers" 
                      stroke="#0EA5E9" 
                      strokeWidth={3}
                      dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* System Performance Charts */}
        {activeMetric === 'system' && (
          <>
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
                {t.responseTime}
              </h3>
              <div className="w-full h-64" aria-label="Response Time Line Chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={systemPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="#D97706" 
                      strokeWidth={3}
                      dot={{ fill: '#D97706', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
                {t.uptime}
              </h3>
              <div className="w-full h-64" aria-label="System Uptime Line Chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={systemPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                    <YAxis 
                      stroke="#64748B" 
                      fontSize={12}
                      domain={[99.5, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="uptime" 
                      stroke="#059669" 
                      strokeWidth={3}
                      dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Role Distribution */}
      {activeMetric === 'users' && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
            {t.roleDistribution}
          </h3>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2 h-64" aria-label="Role Distribution Pie Chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-4">
              {roleDistributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-text-primary">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-text-primary">
                      {item.value}%
                    </div>
                    <div className="text-xs text-text-secondary">
                      {Math.round((item.value / 100) * 1247)} users
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTab;