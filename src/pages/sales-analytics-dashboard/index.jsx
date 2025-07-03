import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import PerformanceMetrics from './components/PerformanceMetrics';
import SalesPipelineChart from './components/SalesPipelineChart';
import RevenueChart from './components/RevenueChart';
import ProductPerformanceChart from './components/ProductPerformanceChart';
import GeographicDistributionChart from './components/GeographicDistributionChart';
import FilterPanel from './components/FilterPanel';
import GoalTrackingWidget from './components/GoalTrackingWidget';
import ExportReportButton from './components/ExportReportButton';
import Icon from '../../components/AppIcon';


const SalesAnalyticsDashboard = () => {
  const { user, userProfile } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filters, setFilters] = useState({
    dateRange: '30days',
    territory: 'all',
    productLine: 'all',
    customerSegment: 'all',
    salesRep: 'all'
  });
  const [activeView, setActiveView] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);

  const languages = {
    en: {
      salesAnalytics: 'Sales Analytics Dashboard',
      overview: 'Overview',
      pipeline: 'Pipeline',
      products: 'Products',
      geographic: 'Geographic',
      goals: 'Goals',
      welcome: 'Welcome back',
      dataInsights: 'Data-driven insights for sales performance',
      filters: 'Filters',
      export: 'Export Report',
      lastUpdated: 'Last updated',
      viewDetails: 'View Details',
      minutes: 'minutes ago',
      monthlyRevenue: 'Monthly Revenue',
      quotaAttainment: 'Quota Attainment',
      conversionRate: 'Conversion Rate',
      yearOverYear: 'Year-over-Year Growth',
      salesPipeline: 'Sales Pipeline',
      revenueTrends: 'Revenue Trends',
      topProducts: 'Top Products',
      salesByRegion: 'Sales by Region',
      goalProgress: 'Goal Progress',
      teamPerformance: 'Team Performance',
      individualMetrics: 'Individual Metrics'
    },
    es: {
      salesAnalytics: 'Panel de Análisis de Ventas',
      overview: 'Resumen',
      pipeline: 'Pipeline',
      products: 'Productos',
      geographic: 'Geográfico',
      goals: 'Objetivos',
      welcome: 'Bienvenido de nuevo',
      dataInsights: 'Perspectivas basadas en datos para el rendimiento de ventas',
      filters: 'Filtros',
      export: 'Exportar Informe',
      lastUpdated: 'Última actualización',
      viewDetails: 'Ver Detalles',
      minutes: 'minutos atrás',
      monthlyRevenue: 'Ingresos Mensuales',
      quotaAttainment: 'Cumplimiento de Cuota',
      conversionRate: 'Tasa de Conversión',
      yearOverYear: 'Crecimiento Interanual',
      salesPipeline: 'Pipeline de Ventas',
      revenueTrends: 'Tendencias de Ingresos',
      topProducts: 'Productos Principales',
      salesByRegion: 'Ventas por Región',
      goalProgress: 'Progreso de Objetivos',
      teamPerformance: 'Rendimiento del Equipo',
      individualMetrics: 'Métricas Individuales'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const viewTabs = [
    {
      id: 'overview',
      label: languages[currentLanguage].overview,
      icon: 'BarChart3'
    },
    {
      id: 'pipeline',
      label: languages[currentLanguage].pipeline,
      icon: 'TrendingUp'
    },
    {
      id: 'products',
      label: languages[currentLanguage].products,
      icon: 'Package'
    },
    {
      id: 'geographic',
      label: languages[currentLanguage].geographic,
      icon: 'MapPin'
    },
    {
      id: 'goals',
      label: languages[currentLanguage].goals,
      icon: 'Target'
    }
  ];

  const renderTabContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <PerformanceMetrics 
              filters={filters}
              userRole={userProfile?.role}
              language={currentLanguage}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesPipelineChart 
                filters={filters}
                language={currentLanguage}
              />
              <RevenueChart 
                filters={filters}
                language={currentLanguage}
              />
            </div>
          </div>
        );
      case 'pipeline':
        return (
          <div className="space-y-6">
            <SalesPipelineChart 
              filters={filters}
              language={currentLanguage}
              detailed={true}
            />
          </div>
        );
      case 'products':
        return (
          <div className="space-y-6">
            <ProductPerformanceChart 
              filters={filters}
              language={currentLanguage}
            />
          </div>
        );
      case 'geographic':
        return (
          <div className="space-y-6">
            <GeographicDistributionChart 
              filters={filters}
              language={currentLanguage}
            />
          </div>
        );
      case 'goals':
        return (
          <div className="space-y-6">
            <GoalTrackingWidget 
              filters={filters}
              userRole={userProfile?.role}
              language={currentLanguage}
            />
          </div>
        );
      default:
        return null;
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={24} className="text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary font-heading">
                    {t.salesAnalytics}
                  </h1>
                  <p className="text-text-secondary font-caption">
                    {t.dataInsights}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm text-text-secondary">
                  {t.lastUpdated} 5 {t.minutes}
                </div>
                <ExportReportButton 
                  filters={filters}
                  activeView={activeView}
                  language={currentLanguage}
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <FilterPanel 
              filters={filters}
              onFilterChange={handleFilterChange}
              userRole={userProfile?.role}
              language={currentLanguage}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className={`-mb-px flex space-x-8 ${isMobile ? 'overflow-x-auto' : ''}`}>
                {viewTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeView === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }`}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={18} 
                      className={activeView === tab.id ? 'text-primary' : 'text-secondary-600'} 
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

export default SalesAnalyticsDashboard;