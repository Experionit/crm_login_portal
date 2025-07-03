import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, activeFilters = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      searchPlaceholder: 'Search customers...',
      filters: 'Filters',
      allStatus: 'All Status',
      hot: 'Hot',
      warm: 'Warm',
      cold: 'Cold',
      recentContact: 'Recent Contact',
      overdue: 'Overdue Tasks',
      clearFilters: 'Clear All'
    },
    es: {
      searchPlaceholder: 'Buscar clientes...',
      filters: 'Filtros',
      allStatus: 'Todos los Estados',
      hot: 'Caliente',
      warm: 'Tibio',
      cold: 'Frío',
      recentContact: 'Contacto Reciente',
      overdue: 'Tareas Vencidas',
      clearFilters: 'Limpiar Todo'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterToggle = (filterType, filterValue) => {
    onFilter(filterType, filterValue);
  };

  const clearAllFilters = () => {
    onFilter('clear');
  };

  const t = languages[currentLanguage];

  const filterOptions = [
    { type: 'status', value: 'hot', label: t.hot },
    { type: 'status', value: 'warm', label: t.warm },
    { type: 'status', value: 'cold', label: t.cold },
    { type: 'activity', value: 'recent', label: t.recentContact },
    { type: 'activity', value: 'overdue', label: t.overdue }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} className="text-text-tertiary" />
        </div>
        <Input
          type="search"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          iconName="Filter"
          onClick={() => setShowFilters(!showFilters)}
          className={activeFilters.length > 0 ? 'text-primary' : ''}
        >
          {t.filters}
          {activeFilters.length > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFilters.length}
            </span>
          )}
        </Button>

        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-error hover:text-error"
          >
            {t.clearFilters}
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filterOptions.map((option) => {
              const isActive = activeFilters.some(
                filter => filter.type === option.type && filter.value === option.value
              );
              
              return (
                <button
                  key={`${option.type}-${option.value}`}
                  onClick={() => handleFilterToggle(option.type, option.value)}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors duration-200 touch-target ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-surface text-text-secondary border-border hover:bg-secondary-50'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;