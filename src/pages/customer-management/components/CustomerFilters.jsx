import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerFilters = ({ onFilterChange, activeFilters, onSaveSearch, savedSearches }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
    'Education', 'Construction', 'Automotive', 'Real Estate', 'Other'
  ];

  const dealStages = [
    'Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'
  ];

  const locations = [
    'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'
  ];

  const handleFilterChange = (type, value) => {
    onFilterChange(type, value);
  };

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      onSaveSearch(searchName.trim(), activeFilters);
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  const isFilterActive = (type, value) => {
    return activeFilters.some(filter => filter.type === type && filter.value === value);
  };

  const FilterButton = ({ type, value, label, icon }) => (
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <FilterButton type="status" value="active" label="Active" icon="CheckCircle" />
        <FilterButton type="status" value="inactive" label="Inactive" icon="XCircle" />
        <FilterButton type="dealValue" value="high" label="High Value" icon="DollarSign" />
        <FilterButton type="activity" value="recent" label="Recent Activity" icon="Clock" />
        <FilterButton type="interaction" value="overdue" label="Overdue Follow-up" icon="AlertCircle" />
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          iconName={showAdvancedFilters ? 'ChevronUp' : 'ChevronDown'}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          Advanced Filters
        </Button>
        
        <div className="flex items-center space-x-2">
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => onFilterChange('clear')}
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Save"
            onClick={() => setShowSaveDialog(true)}
            disabled={activeFilters.length === 0}
          >
            Save Search
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <div className="flex flex-wrap gap-1">
                {industries.map(industry => (
                  <Button
                    key={industry}
                    variant={isFilterActive('industry', industry) ? 'primary' : 'outline'}
                    size="xs"
                    onClick={() => handleFilterChange('industry', industry)}
                    className="text-xs"
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>

            {/* Deal Stage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deal Stage</label>
              <div className="flex flex-wrap gap-1">
                {dealStages.map(stage => (
                  <Button
                    key={stage}
                    variant={isFilterActive('dealStage', stage) ? 'primary' : 'outline'}
                    size="xs"
                    onClick={() => handleFilterChange('dealStage', stage)}
                    className="text-xs"
                  >
                    {stage}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="flex flex-wrap gap-1">
                {locations.map(location => (
                  <Button
                    key={location}
                    variant={isFilterActive('location', location) ? 'primary' : 'outline'}
                    size="xs"
                    onClick={() => handleFilterChange('location', location)}
                    className="text-xs"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches */}
      {savedSearches?.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Saved Searches</label>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                iconName="Search"
                onClick={() => search.filters.forEach(filter => handleFilterChange(filter.type, filter.value))}
              >
                {search.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Save Search Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Save Search</h3>
            <Input
              placeholder="Enter search name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveSearch}
                disabled={!searchName.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFilters;