import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, userRole, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const languages = {
    en: {
      filters: 'Filters',
      dateRange: 'Date Range',
      territory: 'Territory',
      productLine: 'Product Line',
      customerSegment: 'Customer Segment',
      salesRep: 'Sales Rep',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      thisYear: 'This Year',
      lastYear: 'Last Year',
      all: 'All',
      north: 'North',
      south: 'South',
      east: 'East',
      west: 'West',
      enterprise: 'Enterprise',
      smb: 'SMB',
      midmarket: 'Mid-Market',
      software: 'Software',
      hardware: 'Hardware',
      services: 'Services',
      clearFilters: 'Clear Filters',
      applyFilters: 'Apply Filters'
    },
    es: {
      filters: 'Filtros',
      dateRange: 'Rango de Fechas',
      territory: 'Territorio',
      productLine: 'Línea de Productos',
      customerSegment: 'Segmento de Cliente',
      salesRep: 'Representante de Ventas',
      last7Days: 'Últimos 7 Días',
      last30Days: 'Últimos 30 Días',
      last90Days: 'Últimos 90 Días',
      thisYear: 'Este Año',
      lastYear: 'Año Pasado',
      all: 'Todos',
      north: 'Norte',
      south: 'Sur',
      east: 'Este',
      west: 'Oeste',
      enterprise: 'Empresa',
      smb: 'PyME',
      midmarket: 'Mercado Medio',
      software: 'Software',
      hardware: 'Hardware',
      services: 'Servicios',
      clearFilters: 'Limpiar Filtros',
      applyFilters: 'Aplicar Filtros'
    }
  };

  const t = languages[language];

  const filterOptions = {
    dateRange: [
      { value: '7days', label: t.last7Days },
      { value: '30days', label: t.last30Days },
      { value: '90days', label: t.last90Days },
      { value: 'thisYear', label: t.thisYear },
      { value: 'lastYear', label: t.lastYear }
    ],
    territory: [
      { value: 'all', label: t.all },
      { value: 'north', label: t.north },
      { value: 'south', label: t.south },
      { value: 'east', label: t.east },
      { value: 'west', label: t.west }
    ],
    productLine: [
      { value: 'all', label: t.all },
      { value: 'software', label: t.software },
      { value: 'hardware', label: t.hardware },
      { value: 'services', label: t.services }
    ],
    customerSegment: [
      { value: 'all', label: t.all },
      { value: 'enterprise', label: t.enterprise },
      { value: 'midmarket', label: t.midmarket },
      { value: 'smb', label: t.smb }
    ],
    salesRep: [
      { value: 'all', label: t.all },
      { value: 'john_doe', label: 'John Doe' },
      { value: 'jane_smith', label: 'Jane Smith' },
      { value: 'mike_johnson', label: 'Mike Johnson' },
      { value: 'sarah_wilson', label: 'Sarah Wilson' }
    ]
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateRange: '30days',
      territory: 'all',
      productLine: 'all',
      customerSegment: 'all',
      salesRep: 'all'
    };
    
    Object.keys(clearedFilters).forEach(key => {
      onFilterChange(key, clearedFilters[key]);
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== '30days').length;
  };

  const FilterSelect = ({ filterKey, label, options, disabled = false }) => (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-text-secondary">
        {label}
      </label>
      <select
        value={filters[filterKey] || 'all'}
        onChange={(e) => onFilterChange(filterKey, e.target.value)}
        disabled={disabled}
        className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-text-secondary" />
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {t.filters}
          </h3>
          {getActiveFiltersCount() > 0 && (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              {getActiveFiltersCount()}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="md:hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
          >
            {t.clearFilters}
          </Button>
        </div>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <FilterSelect 
            filterKey="dateRange"
            label={t.dateRange}
            options={filterOptions.dateRange}
          />
          
          <FilterSelect 
            filterKey="territory"
            label={t.territory}
            options={filterOptions.territory}
          />
          
          <FilterSelect 
            filterKey="productLine"
            label={t.productLine}
            options={filterOptions.productLine}
          />
          
          <FilterSelect 
            filterKey="customerSegment"
            label={t.customerSegment}
            options={filterOptions.customerSegment}
          />
          
          <FilterSelect 
            filterKey="salesRep"
            label={t.salesRep}
            options={filterOptions.salesRep}
            disabled={userRole === 'salesperson'}
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.dateRange === '7days' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('dateRange', '7days')}
            >
              {t.last7Days}
            </Button>
            <Button
              variant={filters.dateRange === '30days' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('dateRange', '30days')}
            >
              {t.last30Days}
            </Button>
            <Button
              variant={filters.dateRange === '90days' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('dateRange', '90days')}
            >
              {t.last90Days}
            </Button>
            <Button
              variant={filters.dateRange === 'thisYear' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('dateRange', 'thisYear')}
            >
              {t.thisYear}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;