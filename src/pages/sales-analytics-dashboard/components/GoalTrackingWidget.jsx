import React, { useState, useEffect } from 'react';

import Icon from '../../../components/AppIcon';

const GoalTrackingWidget = ({ filters, userRole, language }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const languages = {
    en: {
      goalTracking: 'Goal Tracking',
      progressToGoals: 'Progress to Goals',
      individual: 'Individual Goals',
      team: 'Team Goals',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
      revenue: 'Revenue',
      deals: 'Deals',
      calls: 'Calls',
      meetings: 'Meetings',
      target: 'Target',
      achieved: 'Achieved',
      progress: 'Progress',
      onTrack: 'On Track',
      behindTarget: 'Behind Target',
      exceeded: 'Exceeded',
      daysRemaining: 'Days Remaining',
      projectedCompletion: 'Projected Completion',
      currentPace: 'Current Pace'
    },
    es: {
      goalTracking: 'Seguimiento de Objetivos',
      progressToGoals: 'Progreso hacia Objetivos',
      individual: 'Objetivos Individuales',
      team: 'Objetivos del Equipo',
      monthly: 'Mensual',
      quarterly: 'Trimestral',
      yearly: 'Anual',
      revenue: 'Ingresos',
      deals: 'Tratos',
      calls: 'Llamadas',
      meetings: 'Reuniones',
      target: 'Objetivo',
      achieved: 'Alcanzado',
      progress: 'Progreso',
      onTrack: 'En Camino',
      behindTarget: 'Detrás del Objetivo',
      exceeded: 'Superado',
      daysRemaining: 'Días Restantes',
      projectedCompletion: 'Finalización Proyectada',
      currentPace: 'Ritmo Actual'
    }
  };

  const t = languages[language];

  const mockGoals = {
    administrator: [
      {
        id: 'team-revenue',
        title: `${t.team} ${t.revenue}`,
        period: t.quarterly,
        target: 3000000,
        achieved: 2250000,
        progress: 75,
        status: 'onTrack',
        daysRemaining: 25,
        projectedCompletion: 105,
        color: '#1E40AF',
        trend: [45, 52, 58, 65, 68, 72, 75]
      },
      {
        id: 'team-deals',
        title: `${t.team} ${t.deals}`,
        period: t.monthly,
        target: 150,
        achieved: 128,
        progress: 85.3,
        status: 'onTrack',
        daysRemaining: 8,
        projectedCompletion: 98,
        color: '#0EA5E9',
        trend: [65, 70, 75, 78, 82, 84, 85.3]
      },
      {
        id: 'new-customers',
        title: 'New Customers',
        period: t.quarterly,
        target: 200,
        achieved: 145,
        progress: 72.5,
        status: 'behindTarget',
        daysRemaining: 25,
        projectedCompletion: 87,
        color: '#D97706',
        trend: [55, 60, 62, 65, 68, 70, 72.5]
      }
    ],
    salesperson: [
      {
        id: 'individual-revenue',
        title: `${t.individual} ${t.revenue}`,
        period: t.monthly,
        target: 125000,
        achieved: 118500,
        progress: 94.8,
        status: 'exceeded',
        daysRemaining: 8,
        projectedCompletion: 108,
        color: '#059669',
        trend: [78, 82, 85, 88, 91, 93, 94.8]
      },
      {
        id: 'individual-deals',
        title: `${t.individual} ${t.deals}`,
        period: t.monthly,
        target: 25,
        achieved: 22,
        progress: 88,
        status: 'onTrack',
        daysRemaining: 8,
        projectedCompletion: 96,
        color: '#1E40AF',
        trend: [72, 75, 78, 80, 84, 86, 88]
      },
      {
        id: 'calls-made',
        title: `${t.calls} Made`,
        period: t.monthly,
        target: 200,
        achieved: 156,
        progress: 78,
        status: 'behindTarget',
        daysRemaining: 8,
        projectedCompletion: 85,
        color: '#DC2626',
        trend: [65, 68, 70, 72, 75, 76, 78]
      }
    ]
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const roleGoals = userRole === 'administrator' ? mockGoals.administrator : mockGoals.salesperson;
      setGoals(roleGoals);
      setLoading(false);
    }, 800);
  }, [filters, userRole]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'onTrack':
        return 'text-success';
      case 'behindTarget':
        return 'text-warning';
      case 'exceeded':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'onTrack':
        return t.onTrack;
      case 'behindTarget':
        return t.behindTarget;
      case 'exceeded':
        return t.exceeded;
      default:
        return '';
    }
  };

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

  const renderProgressBar = (progress, color) => (
    <div className="w-full bg-surface-secondary rounded-full h-2">
      <div 
        className="h-2 rounded-full transition-all duration-300"
        style={{ 
          width: `${Math.min(progress, 100)}%`, 
          backgroundColor: color 
        }}
      />
    </div>
  );

  const renderSparkline = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 80;
      const y = 30 - ((value - min) / range) * 30;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="80" height="30" className="ml-auto">
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

  if (loading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="w-48 h-6 bg-secondary-200 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-surface-secondary rounded-lg p-4 border border-border animate-pulse">
              <div className="w-32 h-4 bg-secondary-200 rounded mb-3"></div>
              <div className="w-24 h-8 bg-secondary-200 rounded mb-4"></div>
              <div className="w-full h-2 bg-secondary-200 rounded mb-3"></div>
              <div className="w-16 h-4 bg-secondary-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Target" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary font-heading">
          {t.goalTracking}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-surface-secondary rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-text-primary">{goal.title}</h4>
                <p className="text-sm text-text-secondary">{goal.period}</p>
              </div>
              <div className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                {getStatusText(goal.status)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{t.target}:</span>
                <span className="font-medium text-text-primary">
                  {typeof goal.target === 'number' && goal.target > 1000 
                    ? formatCurrency(goal.target) 
                    : formatNumber(goal.target)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{t.achieved}:</span>
                <span className="font-medium text-text-primary">
                  {typeof goal.achieved === 'number' && goal.achieved > 1000 
                    ? formatCurrency(goal.achieved) 
                    : formatNumber(goal.achieved)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{t.progress}:</span>
                  <span className="font-bold text-text-primary">{goal.progress}%</span>
                </div>
                {renderProgressBar(goal.progress, goal.color)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-xs text-text-secondary">
                  {goal.daysRemaining} {t.daysRemaining}
                </div>
                <div className="text-xs text-text-secondary">
                  {t.projectedCompletion}: {goal.projectedCompletion}%
                </div>
              </div>

              {goal.trend && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-text-secondary">{t.currentPace}</span>
                  {renderSparkline(goal.trend, goal.color)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Team Performance Overview (for administrators) */}
      {userRole === 'administrator' && (
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-lg font-semibold text-text-primary font-heading mb-4">
            {t.team} Performance Overview
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-secondary rounded-lg p-4 border border-border">
              <h5 className="font-medium text-text-primary mb-3">Top Performers</h5>
              <div className="space-y-2">
                {['Sarah Johnson', 'Mike Chen', 'Emma Davis'].map((name, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{name}</span>
                    <span className="text-sm font-medium text-success">
                      {108 - (index * 5)}% {t.progress}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-secondary rounded-lg p-4 border border-border">
              <h5 className="font-medium text-text-primary mb-3">Needs Attention</h5>
              <div className="space-y-2">
                {['John Smith', 'Lisa Wong'].map((name, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{name}</span>
                    <span className="text-sm font-medium text-warning">
                      {72 - (index * 8)}% {t.progress}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalTrackingWidget;