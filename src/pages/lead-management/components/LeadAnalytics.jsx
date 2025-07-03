import React from 'react';
import Icon from '../../../components/AppIcon';

const LeadAnalytics = ({ leads }) => {
  const calculateConversionRate = () => {
    const closedWonLeads = leads.filter(lead => lead.stage === 'closed' && lead.status === 'won');
    const totalLeads = leads.length;
    return totalLeads > 0 ? ((closedWonLeads.length / totalLeads) * 100).toFixed(1) : 0;
  };

  const calculateAverageDealCycle = () => {
    const closedLeads = leads.filter(lead => lead.stage === 'closed');
    if (closedLeads.length === 0) return 0;

    const totalDays = closedLeads.reduce((sum, lead) => {
      const created = new Date(lead.createdDate);
      const closed = new Date(lead.closedDate);
      const days = Math.ceil((closed - created) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0);

    return Math.round(totalDays / closedLeads.length);
  };

  const calculatePipelineVelocity = () => {
    const activeLeads = leads.filter(lead => lead.stage !== 'closed');
    const totalValue = activeLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.estimatedValue.replace(/[$,]/g, ''));
      return sum + value;
    }, 0);

    const averageDealCycle = calculateAverageDealCycle();
    return averageDealCycle > 0 ? Math.round(totalValue / averageDealCycle) : 0;
  };

  const getStageDistribution = () => {
    const stages = ['new', 'contacted', 'qualified', 'proposal', 'closed'];
    return stages.map(stage => {
      const stageLeads = leads.filter(lead => lead.stage === stage);
      const percentage = leads.length > 0 ? ((stageLeads.length / leads.length) * 100).toFixed(1) : 0;
      return {
        stage,
        count: stageLeads.length,
        percentage
      };
    });
  };

  const getTopSources = () => {
    const sourceCount = {};
    leads.forEach(lead => {
      sourceCount[lead.source] = (sourceCount[lead.source] || 0) + 1;
    });

    return Object.entries(sourceCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([source, count]) => ({
        source,
        count,
        percentage: leads.length > 0 ? ((count / leads.length) * 100).toFixed(1) : 0
      }));
  };

  const stageDistribution = getStageDistribution();
  const topSources = getTopSources();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Analytics</h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-green-100 rounded-lg mx-auto mb-2">
            <Icon name="TrendingUp" size={24} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{calculateConversionRate()}%</p>
          <p className="text-sm text-gray-600">Conversion Rate</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-lg mx-auto mb-2">
            <Icon name="Clock" size={24} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{calculateAverageDealCycle()}</p>
          <p className="text-sm text-gray-600">Avg. Deal Cycle (days)</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-purple-100 rounded-lg mx-auto mb-2">
            <Icon name="Zap" size={24} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${calculatePipelineVelocity().toLocaleString()}</p>
          <p className="text-sm text-gray-600">Pipeline Velocity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Stage Distribution</h4>
          <div className="space-y-3">
            {stageDistribution.map(({ stage, count, percentage }) => (
              <div key={stage} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-900 capitalize">{stage}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">{count}</span>
                  <span className="text-sm text-gray-500">({percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sources */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Top Lead Sources</h4>
          <div className="space-y-3">
            {topSources.map(({ source, count, percentage }) => (
              <div key={source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-900">{source}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">{count}</span>
                  <span className="text-sm text-gray-500">({percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Indicators</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-green-500" />
            <span className="text-sm text-gray-700">Strong conversion rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-blue-500" />
            <span className="text-sm text-gray-700">Active pipeline growth</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-purple-500" />
            <span className="text-sm text-gray-700">Consistent lead quality</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-orange-500" />
            <span className="text-sm text-gray-700">Diverse lead sources</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadAnalytics;