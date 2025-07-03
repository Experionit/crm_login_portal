import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProductPerformanceChart = ({ filters, language }) => {
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState('bar');
  const [loading, setLoading] = useState(true);

  const languages = {
    en: {
      productPerformance: 'Product Performance',
      topProducts: 'Top Performing Products',
      revenue: 'Revenue',
      units: 'Units Sold',
      margin: 'Margin',
      growth: 'Growth',
      viewAs: 'View as',
      bar: 'Bar Chart',
      pie: 'Pie Chart',
      product: 'Product',
      totalRevenue: 'Total Revenue',
      totalUnits: 'Total Units',
      avgMargin: 'Average Margin',
      bestPerformer: 'Best Performer'
    },
    es: {
      productPerformance: 'Rendimiento de Productos',
      topProducts: 'Productos de Mejor Rendimiento',
      revenue: 'Ingresos',
      units: 'Unidades Vendidas',
      margin: 'Margen',
      growth: 'Crecimiento',
      viewAs: 'Ver como',
      bar: 'Gráfico de Barras',
      pie: 'Gráfico Circular',
      product: 'Producto',
      totalRevenue: 'Ingresos Totales',
      totalUnits: 'Unidades Totales',
      avgMargin: 'Margen Promedio',
      bestPerformer: 'Mejor Rendimiento'
    }
  };

  const t = languages[language];

  const mockProductData = [
    {
      name: 'CRM Pro',
      revenue: 847500,
      units: 1250,
      margin: 68,
      growth: 15.2,
      color: '#1E40AF'
    },
    {
      name: 'Analytics Suite',
      revenue: 625000,
      units: 890,
      margin: 72,
      growth: 22.8,
      color: '#0EA5E9'
    },
    {
      name: 'Mobile App',
      revenue: 456000,
      units: 2100,
      margin: 45,
      growth: 8.5,
      color: '#059669'
    },
    {
      name: 'Enterprise Bundle',
      revenue: 1200000,
      units: 340,
      margin: 78,
      growth: 12.1,
      color: '#7C3AED'
    },
    {
      name: 'API Services',
      revenue: 289000,
      units: 560,
      margin: 82,
      growth: 35.7,
      color: '#DC2626'
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setData(mockProductData);
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
    const totalUnits = data.reduce((sum, item) => sum + item.units, 0);
    const avgMargin = data.reduce((sum, item) => sum + item.margin, 0) / data.length;
    const bestPerformer = data.reduce((max, item) => item.revenue > max.revenue ? item : max, data[0]);
    
    return {
      totalRevenue,
      totalUnits,
      avgMargin,
      bestPerformer: bestPerformer.name
    };
  };

  const summary = calculateSummary();

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="name" 
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
                      <span className="text-text-secondary">{t.units}:</span>
                      <span className="font-medium text-text-primary">{formatNumber(data.units)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.margin}:</span>
                      <span className="font-medium text-text-primary">{data.margin}%</span>
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

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                  <div className="font-medium text-text-primary mb-2">{data.name}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.revenue}:</span>
                      <span className="font-medium text-text-primary">{formatCurrency(data.revenue)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.units}:</span>
                      <span className="font-medium text-text-primary">{formatNumber(data.units)}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="text-text-secondary">{t.margin}:</span>
                      <span className="font-medium text-text-primary">{data.margin}%</span>
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
          <Icon name="Package" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {t.productPerformance}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">{t.viewAs}:</span>
          <div className="flex bg-surface-secondary rounded-lg p-1">
            <button
              onClick={() => setViewType('bar')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'bar' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t.bar}
            </button>
            <button
              onClick={() => setViewType('pie')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'pie' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t.pie}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-96 mb-6">
        {viewType === 'bar' ? renderBarChart() : renderPieChart()}
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.totalRevenue}</div>
            <div className="text-lg font-bold text-text-primary">{formatCurrency(summary.totalRevenue)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.totalUnits}</div>
            <div className="text-lg font-bold text-text-primary">{formatNumber(summary.totalUnits)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.avgMargin}</div>
            <div className="text-lg font-bold text-text-primary">{summary.avgMargin.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.bestPerformer}</div>
            <div className="text-lg font-bold text-primary">{summary.bestPerformer}</div>
          </div>
        </div>
      )}

      {/* Detailed Product List */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-text-secondary font-medium">{t.product}</th>
              <th className="text-right py-2 text-text-secondary font-medium">{t.revenue}</th>
              <th className="text-right py-2 text-text-secondary font-medium">{t.units}</th>
              <th className="text-right py-2 text-text-secondary font-medium">{t.margin}</th>
              <th className="text-right py-2 text-text-secondary font-medium">{t.growth}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index} className="border-b border-border">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="font-medium text-text-primary">{product.name}</span>
                  </div>
                </td>
                <td className="text-right py-3 font-medium text-text-primary">
                  {formatCurrency(product.revenue)}
                </td>
                <td className="text-right py-3 text-text-secondary">
                  {formatNumber(product.units)}
                </td>
                <td className="text-right py-3 text-text-secondary">
                  {product.margin}%
                </td>
                <td className="text-right py-3">
                  <span className="text-success font-medium">+{product.growth}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPerformanceChart;