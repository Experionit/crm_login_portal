import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import TaskCard from './components/TaskCard';
import CustomerCard from './components/CustomerCard';
import QuickActionFAB from './components/QuickActionFAB';
import SearchAndFilter from './components/SearchAndFilter';
import NotificationBell from './components/NotificationBell';

const SalespersonDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const languages = {
    en: {
      welcome: 'Welcome back',
      todaysOverview: "Today\'s Overview",
      priorityTasks: 'Priority Tasks',
      myCustomers: 'My Customers',
      viewAll: 'View All',
      noTasks: 'No priority tasks for today',
      noCustomers: 'No customers found',
      appointments: 'Appointments',
      activeLeads: 'Active Leads',
      pipelineValue: 'Pipeline Value',
      monthlyTarget: 'Monthly Target',
      menu: 'Menu'
    },
    es: {
      welcome: 'Bienvenido de vuelta',
      todaysOverview: 'Resumen de Hoy',
      priorityTasks: 'Tareas Prioritarias',
      myCustomers: 'Mis Clientes',
      viewAll: 'Ver Todo',
      noTasks: 'No hay tareas prioritarias para hoy',
      noCustomers: 'No se encontraron clientes',
      appointments: 'Citas',
      activeLeads: 'Leads Activos',
      pipelineValue: 'Valor del Pipeline',
      monthlyTarget: 'Objetivo Mensual',
      menu: 'Menú'
    }
  };

  // Mock data
  const mockMetrics = [
    {
      title: 'appointments',
      value: '8',
      subtitle: '3 upcoming today',
      icon: 'Calendar',
      color: 'primary',
      trend: 'up',
      trendValue: '+2 from yesterday'
    },
    {
      title: 'activeLeads',
      value: '24',
      subtitle: '6 hot prospects',
      icon: 'Users',
      color: 'success',
      trend: 'up',
      trendValue: '+5 this week'
    },
    {
      title: 'pipelineValue',
      value: '$125K',
      subtitle: 'Weighted forecast',
      icon: 'TrendingUp',
      color: 'accent',
      trend: 'up',
      trendValue: '+12% this month'
    },
    {
      title: 'monthlyTarget',
      value: '78%',
      subtitle: '$98K of $125K',
      icon: 'Target',
      color: 'warning',
      trend: 'up',
      trendValue: 'On track'
    }
  ];

  const mockTasks = [
    {
      id: 1,
      title: "Follow up on proposal",
      customer: "TechCorp Solutions",
      dueTime: new Date(Date.now() + 3600000),
      priority: "high",
      isOverdue: false
    },
    {
      id: 2,
      title: "Demo presentation",
      customer: "Global Industries",
      dueTime: new Date(Date.now() + 7200000),
      priority: "medium",
      isOverdue: false
    },
    {
      id: 3,
      title: "Contract negotiation",
      customer: "StartupXYZ",
      dueTime: new Date(Date.now() - 1800000),
      priority: "high",
      isOverdue: true
    },
    {
      id: 4,
      title: "Product demo call",
      customer: "Enterprise Corp",
      dueTime: new Date(Date.now() + 10800000),
      priority: "low",
      isOverdue: false
    }
  ];

  const mockCustomers = [
    {
      id: 1,
      name: "John Smith",
      company: "TechCorp Solutions",
      status: "hot",
      lastContact: new Date(Date.now() - 86400000),
      nextAction: "Send proposal follow-up",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Global Industries",
      status: "warm",
      lastContact: new Date(Date.now() - 172800000),
      nextAction: "Schedule demo",
      email: "sarah.j@global.com",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      name: "Mike Chen",
      company: "StartupXYZ",
      status: "hot",
      lastContact: new Date(Date.now() - 259200000),
      nextAction: "Contract review meeting",
      email: "mike@startupxyz.com",
      phone: "+1 (555) 345-6789"
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "Enterprise Corp",
      status: "cold",
      lastContact: new Date(Date.now() - 604800000),
      nextAction: "Quarterly check-in",
      email: "emily.davis@enterprise.com",
      phone: "+1 (555) 456-7890"
    },
    {
      id: 5,
      name: "Robert Wilson",
      company: "Innovation Labs",
      status: "warm",
      lastContact: new Date(Date.now() - 345600000),
      nextAction: "Product roadmap discussion",
      email: "robert@innovationlabs.com",
      phone: "+1 (555) 567-8901"
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check authentication
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (!authUser.role || authUser.role !== 'salesperson') {
      navigate('/login-screen');
      return;
    }

    setFilteredCustomers(mockCustomers);
  }, [navigate]);

  useEffect(() => {
    let filtered = mockCustomers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply active filters
    activeFilters.forEach(filter => {
      if (filter.type === 'status') {
        filtered = filtered.filter(customer => customer.status === filter.value);
      }
      if (filter.type === 'activity' && filter.value === 'recent') {
        const threeDaysAgo = new Date(Date.now() - 259200000);
        filtered = filtered.filter(customer => new Date(customer.lastContact) > threeDaysAgo);
      }
    });

    setFilteredCustomers(filtered);
  }, [searchTerm, activeFilters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (type, value) => {
    if (type === 'clear') {
      setActiveFilters([]);
      return;
    }

    const existingFilterIndex = activeFilters.findIndex(
      filter => filter.type === type && filter.value === value
    );

    if (existingFilterIndex >= 0) {
      setActiveFilters(prev => prev.filter((_, index) => index !== existingFilterIndex));
    } else {
      setActiveFilters(prev => [...prev, { type, value }]);
    }
  };

  const handleTaskComplete = (taskId) => {
    console.log('Task completed:', taskId);
  };

  const handleCall = (contact) => {
    console.log('Calling:', contact);
  };

  const handleEmail = (contact) => {
    console.log('Emailing:', contact);
  };

  const handleAddNote = (customer) => {
    console.log('Adding note for:', customer);
  };

  const handleViewDetails = (customerId) => {
    console.log('Viewing details for customer:', customerId);
  };

  const handleAddLead = () => {
    console.log('Adding new lead');
  };

  const handleScheduleAppointment = () => {
    console.log('Scheduling appointment');
  };

  const handleQuickNote = () => {
    console.log('Creating quick note');
  };

  const t = languages[currentLanguage];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Mobile Header */}
      <div className="lg:hidden bg-surface border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-text-primary">
              {t.welcome}, Sales Rep
            </h1>
            <p className="text-sm text-text-secondary">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <NotificationBell />
            <Button
              variant="ghost"
              size="sm"
              iconName="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
              aria-label={t.menu}
            />
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-surface border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary font-heading">
              {t.welcome}, Sales Representative
            </h1>
            <p className="text-text-secondary">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <NotificationBell />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Metrics Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
            {t.todaysOverview}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMetrics.map((metric, index) => (
              <MetricsCard
                key={index}
                title={t[metric.title]}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                color={metric.color}
                trend={metric.trend}
                trendValue={metric.trendValue}
              />
            ))}
          </div>
        </section>

        {/* Priority Tasks */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary font-heading">
              {t.priorityTasks}
            </h2>
            <Button variant="ghost" size="sm">
              {t.viewAll}
            </Button>
          </div>
          
          {mockTasks.length === 0 ? (
            <div className="bg-surface rounded-lg border border-border p-8 text-center">
              <Icon name="CheckSquare" size={48} className="mx-auto mb-4 text-text-tertiary" />
              <p className="text-text-secondary">{t.noTasks}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockTasks.slice(0, 4).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleTaskComplete}
                  onCall={handleCall}
                  onEmail={handleEmail}
                />
              ))}
            </div>
          )}
        </section>

        {/* Customer List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary font-heading">
              {t.myCustomers}
            </h2>
            <Button variant="ghost" size="sm">
              {t.viewAll}
            </Button>
          </div>

          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            activeFilters={activeFilters}
          />

          {filteredCustomers.length === 0 ? (
            <div className="bg-surface rounded-lg border border-border p-8 text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-text-tertiary" />
              <p className="text-text-secondary">{t.noCustomers}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCustomers.slice(0, 6).map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onCall={handleCall}
                  onEmail={handleEmail}
                  onAddNote={handleAddNote}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Quick Action FAB */}
      <QuickActionFAB
        onAddLead={handleAddLead}
        onScheduleAppointment={handleScheduleAppointment}
        onQuickNote={handleQuickNote}
      />
    </div>
  );
};

export default SalespersonDashboard;