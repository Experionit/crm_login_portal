import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const RevenueChart = ({ filters, language }) => {
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState('line');
  const [timeframe, setTimeframe] = useState('monthly');
  const [loading, setLoading] = useState(true);

  const languages = {
    en: {
      revenueTrends: 'Revenue Trends',
      revenue: 'Revenue',
      target: 'Target',
      monthly: 'Monthly',
      weekly: 'Weekly',
      daily: 'Daily',
      line: 'Line',
      area: 'Area',
      viewAs: 'View as',
      timeframe: 'Timeframe',
      totalRevenue: 'Total Revenue',
      avgMonthly: 'Avg Monthly',
      growth: 'Growth',
      target: 'Target Achievement'
    },
    es: {
      revenueTrends: 'Tendencias de Ingresos',
      revenue: 'Ingresos',
      target: 'Objetivo',
      monthly: 'Mensual',
      weekly: 'Semanal',
      daily: 'Diario',
      line: 'Línea',
      area: 'Área',
      viewAs: 'Ver como',
      timeframe: 'Período',
      totalRevenue: 'Ingresos Totales',
      avgMonthly: 'Promedio Mensual',
      growth: 'Crecimiento',
      target: 'Cumplimiento de Objetivo'
    }
  };

  const t = languages[language];

  const generateMockData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      period: month,
      revenue: 180000 + (Math.sin(index * 0.5) * 40000) + (Math.random() * 20000),
      target: 200000 + (index * 5000),
      previousYear: 150000 + (Math.sin(index * 0.5) * 35000) + (Math.random() * 15000)
    }));
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 800);
  }, [filters, timeframe]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateSummary = () => {
    if (!data.length) return null;
    
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const avgMonthly = totalRevenue / data.length;
    const totalTarget = data.reduce((sum, item) => sum + item.target, 0);
    const targetAchievement = (totalRevenue / totalTarget) * 100;
    
    return {
      totalRevenue,
      avgMonthly,
      targetAchievement,
      growth: 18.5 // Mock growth percentage
    };
  };

  const summary = calculateSummary();

  const renderChart = () => {
    if (viewType === 'area') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="period" stroke="#64748B" fontSize={12} />
            <YAxis stroke="#64748B" fontSize={12} tickFormatter={formatCurrency} />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
                      <div className="font-medium text-text-primary mb-2">{label}</div>
                      {payload.map((item, index) => (
                        <div key={index} className="flex items-center justify-between space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-text-secondary">{item.name}:</span>
                          </div>
                          <span className="font-medium text-text-primary">
                            {formatCurrency(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#1E40AF" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              name={t.revenue}
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="#059669" 
              fillOpacity={1} 
              fill="url(#colorTarget)" 
              name={t.target}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="period" stroke="#64748B" fontSize={12} />
          <YAxis stroke="#64748B" fontSize={12} tickFormatter={formatCurrency} />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
                    <div className="font-medium text-text-primary mb-2">{label}</div>
                    {payload.map((item, index) => (
                      <div key={index} className="flex items-center justify-between space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-text-secondary">{item.name}:</span>
                        </div>
                        <span className="font-medium text-text-primary">
                          {formatCurrency(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#1E40AF" 
            strokeWidth={3}
            dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
            name={t.revenue}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#059669" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
            name={t.target}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  if (loading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-48 h-6 bg-secondary-200 rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-secondary-200 rounded animate-pulse"></div>
        </div>
        <div className="w-full h-80 bg-secondary-100 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {t.revenueTrends}
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">{t.viewAs}:</span>
            <div className="flex bg-surface-secondary rounded-lg p-1">
              <button
                onClick={() => setViewType('line')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  viewType === 'line' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t.line}
              </button>
              <button
                onClick={() => setViewType('area')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  viewType === 'area' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t.area}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-80 mb-6">
        {renderChart()}
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.totalRevenue}</div>
            <div className="text-lg font-bold text-text-primary">{formatCurrency(summary.totalRevenue)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.avgMonthly}</div>
            <div className="text-lg font-bold text-text-primary">{formatCurrency(summary.avgMonthly)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.growth}</div>
            <div className="text-lg font-bold text-success">+{summary.growth}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary mb-1">{t.target}</div>
            <div className="text-lg font-bold text-text-primary">{summary.targetAchievement.toFixed(1)}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueChart;