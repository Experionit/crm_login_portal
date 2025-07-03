import React from 'react';

import Button from '../../../components/ui/Button';

const LeadFilters = ({ onFilterChange, activeFilters }) => {
  const sources = ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Trade Show', 'Partner'];
  const assignees = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Robert Wilson'];
  const dealValueRanges = [
    { label: 'Under $10K', value: 'under10k' },
    { label: '$10K - $50K', value: '10k-50k' },
    { label: '$50K - $100K', value: '50k-100k' },
    { label: 'Over $100K', value: 'over100k' }
  ];

  const handleFilterChange = (type, value) => {
    onFilterChange(type, value);
  };

  const isFilterActive = (type, value) => {
    return activeFilters?.some(filter => filter.type === type && filter.value === value);
  };

  const FilterButton = ({ type, value, label, icon, color = 'primary' }) => (
    <Button
      variant={isFilterActive(type, value) ? 'primary' : 'outline'}
      size="sm"
      iconName={icon}
      onClick={() => handleFilterChange(type, value)}
      className="flex-shrink-0"
    >
      {label}
    </Button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Filter Leads</h3>
        {activeFilters?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => onFilterChange('clear')}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Lead Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lead Status</label>
          <div className="flex flex-wrap gap-2">
            <FilterButton type="status" value="hot" label="Hot" icon="Flame" />
            <FilterButton type="status" value="warm" label="Warm" icon="Sun" />
            <FilterButton type="status" value="cold" label="Cold" icon="Snowflake" />
          </div>
        </div>

        {/* Lead Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
          <div className="flex flex-wrap gap-2">
            {sources.map(source => (
              <FilterButton
                key={source}
                type="source"
                value={source}
                label={source}
                icon="Globe"
              />
            ))}
          </div>
        </div>

        {/* Deal Value Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deal Value Range</label>
          <div className="flex flex-wrap gap-2">
            {dealValueRanges.map(range => (
              <FilterButton
                key={range.value}
                type="dealValue"
                value={range.value}
                label={range.label}
                icon="DollarSign"
              />
            ))}
          </div>
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
          <div className="flex flex-wrap gap-2">
            {assignees.map(assignee => (
              <FilterButton
                key={assignee}
                type="assignee"
                value={assignee}
                label={assignee}
                icon="User"
              />
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="flex flex-wrap gap-2">
            <FilterButton type="dateRange" value="today" label="Today" icon="Calendar" />
            <FilterButton type="dateRange" value="thisWeek" label="This Week" icon="Calendar" />
            <FilterButton type="dateRange" value="thisMonth" label="This Month" icon="Calendar" />
            <FilterButton type="dateRange" value="lastMonth" label="Last Month" icon="Calendar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;