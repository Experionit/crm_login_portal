import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';


const SalesPipelineChart = ({ filters, language, detailed = false }) => {
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState('funnel');
  const [loading, setLoading] = useState(true);

  const languages = {
    en: {
      salesPipeline: 'Sales Pipeline',
      pipelineStages: 'Pipeline Stages',
      conversionRates: 'Conversion Rates',
      leads: 'Leads',
      qualified: 'Qualified',
      proposal: 'Proposal',
      negotiation: 'Negotiation',
      closed: 'Closed Won',
      totalValue: 'Total Value',
      avgDealSize: 'Avg Deal Size',
      conversionRate: 'Conversion Rate',
      viewAs: 'View as',
      funnel: 'Funnel',
      bar: 'Bar Chart',
      deals: 'deals',
      value: 'Value',
      count: 'Count',
      stage: 'Stage'
    },
    es: {
      salesPipeline: 'Pipeline de Ventas',
      pipelineStages: 'Etapas del Pipeline',
      conversionRates: 'Tasas de Conversión',
      leads: 'Prospectos',
      qualified: 'Cualificados',
      proposal: 'Propuesta',
      negotiation: 'Negociación',
      closed: 'Cerrado Ganado',
      totalValue: 'Valor Total',
      avgDealSize: 'Tamaño Promedio',
      conversionRate: 'Tasa de Conversión',
      viewAs: 'Ver como',
      funnel: 'Embudo',
      bar: 'Gráfico de Barras',
      deals: 'tratos',
      value: 'Valor',
      count: 'Cantidad',
      stage: 'Etapa'
    }
  };

  const t = languages[language];

  const mockPipelineData = [
    {
      stage: t.leads,
      count: 347,
      value: 8675000,
      color: '#0EA5E9',
      conversionRate: 100
    },
    {
      stage: t.qualified,
      count: 198,
      value: 4950000,
      color: '#3B82F6',
      conversionRate: 57
    },
    {
      stage: t.proposal,
      count: 124,
      value: 3100000,
      color: '#1E40AF',
      conversionRate: 36
    },
    {
      stage: t.negotiation,
      count: 67,
      value: 1675000,
      color: '#1E3A8A',
      conversionRate: 19
    },
    {
      stage: t.closed,
      count: 42,
      value: 1050000,
      color: '#059669',
      conversionRate: 12
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setData(mockPipelineData);
      setLoading(false);
    }, 800);
  }, [filters, language]);

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

  const renderFunnel = () => (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
                    <div className="font-medium text-text-primary mb-1">{data.stage}</div>
                    <div className="text-sm text-text-secondary space-y-1">
                      <div>{data.count} {t.deals}</div>
                      <div>{formatCurrency(data.value)}</div>
                      <div>{data.conversionRate}% {t.conversionRate}</div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Funnel
            dataKey="count"
            data={data}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );

  const renderBarChart = () => (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="stage" 
            stroke="#64748B"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#64748B" fontSize={12} />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
                    <div className="font-medium text-text-primary mb-1">{label}</div>
                    <div className="text-sm text-text-secondary space-y-1">
                      <div>{data.count} {t.deals}</div>
                      <div>{formatCurrency(data.value)}</div>
                      <div>{data.conversionRate}% {t.conversionRate}</div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="#1E40AF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
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
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {t.salesPipeline}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">{t.viewAs}:</span>
          <div className="flex bg-surface-secondary rounded-lg p-1">
            <button
              onClick={() => setViewType('funnel')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'funnel' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t.funnel}
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

      {viewType === 'funnel' ? renderFunnel() : renderBarChart()}

      {detailed && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((stage, index) => (
            <div key={index} className="bg-surface-secondary rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <h4 className="font-medium text-text-primary">{stage.stage}</h4>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">{t.count}:</span>
                  <span className="font-medium text-text-primary">{formatNumber(stage.count)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">{t.value}:</span>
                  <span className="font-medium text-text-primary">{formatCurrency(stage.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">{t.conversionRate}:</span>
                  <span className="font-medium text-text-primary">{stage.conversionRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesPipelineChart;