import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const GeographicDistributionChart = ({ filters, language }) => {
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState('pie');
  const [loading, setLoading] = useState(true);

  const languages = {
    en: {
      geographicDistribution: 'Geographic Distribution',
      salesByRegion: 'Sales by Region',
      revenue: 'Revenue',
      deals: 'Deals',
      growth: 'Growth',
      marketShare: 'Market Share',
      viewAs: 'View as',
      pie: 'Pie Chart',
      bar: 'Bar Chart',
      region: 'Region',
      totalRevenue: 'Total Revenue',
      totalDeals: 'Total Deals',
      avgDealSize: 'Average Deal Size',
      topRegion: 'Top Region',
      customers: 'Customers',
      avgCustomerValue: 'Avg Customer Value'
    },
    es: {
      geographicDistribution: 'Distribución Geográfica',
      salesByRegion: 'Ventas por Región',
      revenue: 'Ingresos',
      deals: 'Tratos',
      growth: 'Crecimiento',
      marketShare: 'Participación de Mercado',
      viewAs: 'Ver como',
      pie: 'Gráfico Circular',
      bar: 'Gráfico de Barras',
      region: 'Región',
      totalRevenue: 'Ingresos Totales',
      totalDeals: 'Tratos Totales',
      avgDealSize: 'Tamaño Promedio de Trato',
      topRegion: 'Región Principal',
      customers: 'Clientes',
      avgCustomerValue: 'Valor Promedio de Cliente'
    }
  };

  const t = languages[language];

  const mockGeographicData = [
    {
      region: 'North America',
      revenue: 1250000,
      deals: 342,
      customers: 128,
      growth: 12.5,
      marketShare: 35.2,
      color: '#1E40AF'
    },
    {
      region: 'Europe',
      revenue: 980000,
      deals: 287,
      customers: 95,
      growth: 18.7,
      marketShare: 27.6,
      color: '#0EA5E9'
    },
    {
      region: 'Asia Pacific',
      revenue: 760000,
      deals: 198,
      customers: 73,
      growth: 25.3,
      marketShare: 21.4,
      color: '#059669'
    },
    {
      region: 'Latin America',
      revenue: 420000,
      deals: 145,
      customers: 52,
      growth: 15.8,
      marketShare: 11.8,
      color: '#D97706'
    },
    {
      region: 'Middle East & Africa',
      revenue: 165000,
      deals: 78,
      customers: 28,
      growth: 22.1,
      marketShare: 4.6,
      color: '#DC2626'
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setData(mockGeographicData);
      setLoading(false);
    }, 800);
  }, [filters]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const calculateSummary = () => {
    if (!data.length) return null;
    
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalDeals = data.reduce((sum, item) => sum + item.deals, 0);
    const totalCustomers = data.reduce((sum, item) => sum + item.customers, 0);
    const avgDealSize = totalRevenue / totalDeals;
    const avgCustomerValue = totalRevenue / totalCustomers;
    const topRegion = data.reduce((max, item) => item.revenue > max.revenue ? item : max, data[0]);
    
    return {
      totalRevenue,
      totalDeals,
      avgDealSize,
      avgCustomerValue,
      topRegion: topRegion.region,
      totalCustomers
    };
  };

  const summary = calculateSummary();

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ region, marketShare }) => `${region}: ${marketShare}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="revenue"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
                  <div className="font-medium text-text-primary mb-2">{data.region}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.revenue}:</span>
                      <span className="font-medium text-text-primary">{formatCurrency(data.revenue)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.deals}:</span>
                      <span className="font-medium text-text-primary">{formatNumber(data.deals)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.customers}:</span>
                      <span className="font-medium text-text-primary">{formatNumber(data.customers)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.marketShare}:</span>
                      <span className="font-medium text-text-primary">{data.marketShare}%</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.growth}:</span>
                      <span className="font-medium text-success">+{data.growth}%</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="region" 
          stroke="#64748B"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis stroke="#64748B" fontSize={12} tickFormatter={formatCurrency} />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
                  <div className="font-medium text-text-primary mb-2">{label}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.revenue}:</span>
                      <span className="font-medium text-text-primary">{formatCurrency(data.revenue)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.deals}:</span>
                      <span className="font-medium text-text-primary">{formatNumber(data.deals)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.customers}:</span>
                      <span className="font-medium text-text-primary">{formatNumber(data.customers)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.growth}:</span>
                      <span className="font-medium text-success">+{data.growth}%</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="revenue" fill="#1E40AF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  if (loading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-48 h-6 bg-secondary-200 rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-secondary-200 rounded animate-pulse"></div>
        </div>
        <div className="w-full h-96 bg-secondary-100 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {t.geographicDistribution}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">{t.viewAs}:</span>
          <div className="flex bg-surface-secondary rounded-lg p-1">
            <button
              onClick={() => setViewType('pie')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'pie' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t.pie}
            </button>
            <button
              onClick={() => setViewType('bar')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'bar' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t.bar}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-96 mb-6">
        {viewType === 'pie' ? renderPieChart() : renderBarChart()}
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border mb-6">
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.totalRevenue}</div>
            <div className="text-lg font-bold text-text-primary">{formatCurrency(summary.totalRevenue)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.totalDeals}</div>
            <div className="text-lg font-bold text-text-primary">{formatNumber(summary.totalDeals)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.avgDealSize}</div>
            <div className="text-lg font-bold text-text-primary">{formatCurrency(summary.avgDealSize)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.topRegion}</div>
            <div className="text-lg font-bold text-primary">{summary.topRegion}</div>
          </div>
        </div>
      )}

      {/* Detailed Regional Performance */}
      <div className="space-y-4">
        {data.map((region, index) => (
          <div key={index} className="bg-surface-secondary rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: region.color }}
                />
                <h4 className="font-medium text-text-primary">{region.region}</h4>
              </div>
              <div className="text-sm text-success font-medium">
                +{region.growth}%
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-text-secondary">{t.revenue}</div>
                <div className="font-medium text-text-primary">{formatCurrency(region.revenue)}</div>
              </div>
              <div>
                <div className="text-text-secondary">{t.deals}</div>
                <div className="font-medium text-text-primary">{formatNumber(region.deals)}</div>
              </div>
              <div>
                <div className="text-text-secondary">{t.customers}</div>
                <div className="font-medium text-text-primary">{formatNumber(region.customers)}</div>
              </div>
              <div>
                <div className="text-text-secondary">{t.marketShare}</div>
                <div className="font-medium text-text-primary">{region.marketShare}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicDistributionChart;