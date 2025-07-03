import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CustomerTable from './components/CustomerTable';
import CustomerFilters from './components/CustomerFilters';
import CustomerProfileModal from './components/CustomerProfileModal';
import BulkActionsPanel from './components/BulkActionsPanel';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const navigate = useNavigate();

  // Mock customer data
  const mockCustomers = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      contactPerson: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      industry: 'Technology',
      dealValue: '$50,000',
      lastActivity: '2024-01-15',
      status: 'active',
      website: 'techcorp.com',
      location: 'North America',
      dealStage: 'Negotiation'
    },
    {
      id: 2,
      company: 'Global Industries',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@global.com',
      phone: '+1 (555) 234-5678',
      industry: 'Manufacturing',
      dealValue: '$75,000',
      lastActivity: '2024-01-12',
      status: 'active',
      website: 'globalindustries.com',
      location: 'Europe',
      dealStage: 'Proposal'
    },
    {
      id: 3,
      company: 'StartupXYZ',
      contactPerson: 'Mike Chen',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 345-6789',
      industry: 'Technology',
      dealValue: '$25,000',
      lastActivity: '2024-01-10',
      status: 'active',
      website: 'startupxyz.com',
      location: 'North America',
      dealStage: 'Qualification'
    },
    {
      id: 4,
      company: 'Enterprise Corp',
      contactPerson: 'Emily Davis',
      email: 'emily.davis@enterprise.com',
      phone: '+1 (555) 456-7890',
      industry: 'Finance',
      dealValue: '$100,000',
      lastActivity: '2024-01-08',
      status: 'inactive',
      website: 'enterprise.com',
      location: 'Asia Pacific',
      dealStage: 'Prospecting'
    },
    {
      id: 5,
      company: 'Innovation Labs',
      contactPerson: 'Robert Wilson',
      email: 'robert@innovationlabs.com',
      phone: '+1 (555) 567-8901',
      industry: 'Healthcare',
      dealValue: '$60,000',
      lastActivity: '2024-01-14',
      status: 'active',
      website: 'innovationlabs.com',
      location: 'Europe',
      dealStage: 'Negotiation'
    },
    {
      id: 6,
      company: 'Retail Masters',
      contactPerson: 'Lisa Anderson',
      email: 'lisa@retailmasters.com',
      phone: '+1 (555) 678-9012',
      industry: 'Retail',
      dealValue: '$30,000',
      lastActivity: '2024-01-06',
      status: 'active',
      website: 'retailmasters.com',
      location: 'North America',
      dealStage: 'Closed Won'
    },
    {
      id: 7,
      company: 'Education Plus',
      contactPerson: 'David Thompson',
      email: 'david@educationplus.com',
      phone: '+1 (555) 789-0123',
      industry: 'Education',
      dealValue: '$40,000',
      lastActivity: '2024-01-05',
      status: 'pending',
      website: 'educationplus.com',
      location: 'Latin America',
      dealStage: 'Proposal'
    },
    {
      id: 8,
      company: 'Auto Dynamics',
      contactPerson: 'Jennifer Lee',
      email: 'jennifer@autodynamics.com',
      phone: '+1 (555) 890-1234',
      industry: 'Automotive',
      dealValue: '$85,000',
      lastActivity: '2024-01-13',
      status: 'active',
      website: 'autodynamics.com',
      location: 'North America',
      dealStage: 'Negotiation'
    }
  ];

  useEffect(() => {
    // Check authentication
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (!authUser.role || authUser.role !== 'salesperson') {
      navigate('/login-screen');
      return;
    }

    // Load initial data
    setIsLoading(true);
    setTimeout(() => {
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setIsLoading(false);
    }, 1000);

    // Load saved searches
    const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    setSavedSearches(saved);
  }, [navigate]);

  useEffect(() => {
    let filtered = customers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply active filters
    activeFilters.forEach(filter => {
      switch (filter.type) {
        case 'status':
          filtered = filtered.filter(customer => customer.status === filter.value);
          break;
        case 'industry':
          filtered = filtered.filter(customer => customer.industry === filter.value);
          break;
        case 'dealStage':
          filtered = filtered.filter(customer => customer.dealStage === filter.value);
          break;
        case 'location':
          filtered = filtered.filter(customer => customer.location === filter.value);
          break;
        case 'dealValue':
          if (filter.value === 'high') {
            filtered = filtered.filter(customer => {
              const value = parseFloat(customer.dealValue.replace(/[$,]/g, ''));
              return value >= 50000;
            });
          }
          break;
        case 'activity':
          if (filter.value === 'recent') {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            filtered = filtered.filter(customer => 
              new Date(customer.lastActivity) > threeDaysAgo
            );
          }
          break;
        case 'interaction':
          if (filter.value === 'overdue') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            filtered = filtered.filter(customer => 
              new Date(customer.lastActivity) < oneWeekAgo
            );
          }
          break;
      }
    });

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [searchTerm, activeFilters, customers]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (type, value) => {
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

  const handleSaveSearch = (name, filters) => {
    const newSearch = { name, filters };
    const updatedSearches = [...savedSearches, newSearch];
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  const handleCall = (customer) => {
    console.log('Calling customer:', customer);
    // Implement call functionality
  };

  const handleEmail = (customer) => {
    console.log('Emailing customer:', customer);
    // Implement email functionality
  };

  const handleScheduleMeeting = (customer) => {
    console.log('Scheduling meeting with:', customer);
    // Implement meeting scheduling
  };

  const handleAddNote = (customer) => {
    console.log('Adding note for:', customer);
    // Implement note adding functionality
  };

  const handleViewProfile = (customer) => {
    setSelectedCustomer(customer);
    setShowProfileModal(true);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    setSelectedCustomer(updatedCustomer);
  };

  const handleBulkAction = (action, data) => {
    console.log('Bulk action:', action, 'Data:', data, 'Selected:', selectedCustomers);
    
    switch (action) {
      case 'email':
        // Implement bulk email functionality
        break;
      case 'reassign':
        // Implement territory reassignment
        break;
      case 'export':
        // Implement data export
        break;
    }
    
    setSelectedCustomers([]);
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId);
      } else {
        return [...prev, customerId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(customer => customer.id));
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const startIndex = (currentPage - 1) * customersPerPage;
  const endIndex = startIndex + customersPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading customer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                iconName="ArrowLeft"
                onClick={() => navigate('/salesperson-dashboard')}
              >
                Back to Dashboard
              </Button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                <p className="text-sm text-gray-600">
                  Manage your customer relationships and track interactions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="Plus"
                onClick={() => console.log('Add new customer')}
              >
                Add Customer
              </Button>
              {selectedCustomers.length > 0 && (
                <Button
                  variant="primary"
                  iconName="Settings"
                  onClick={() => setShowBulkActions(true)}
                >
                  Bulk Actions ({selectedCustomers.length})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Customer Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="Users" size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Accounts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="MessageSquare" size={24} className="text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent Interactions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => {
                    const threeDaysAgo = new Date();
                    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                    return new Date(c.lastActivity) > threeDaysAgo;
                  }).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon name="DollarSign" size={24} className="text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${customers.reduce((sum, c) => sum + parseFloat(c.dealValue.replace(/[$,]/g, '')), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedCustomers.length === filteredCustomers.length ? 'primary' : 'outline'}
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedCustomers.length === filteredCustomers.length ? 'Deselect All' : 'Select All'}
              </Button>
              <span className="text-sm text-gray-600">
                {filteredCustomers.length} of {customers.length} customers
              </span>
            </div>
          </div>
          
          <CustomerFilters
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            onSaveSearch={handleSaveSearch}
            savedSearches={savedSearches}
          />
        </div>

        {/* Customer Table */}
        <div className="mb-6">
          <CustomerTable
            customers={currentCustomers}
            onCall={handleCall}
            onEmail={handleEmail}
            onScheduleMeeting={handleScheduleMeeting}
            onAddNote={handleAddNote}
            onViewProfile={handleViewProfile}
            selectedCustomers={selectedCustomers}
            onCustomerSelect={handleCustomerSelect}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronLeft"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronRight"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} customers
            </div>
          </div>
        )}

        {/* Bulk Actions Panel */}
        {showBulkActions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
              <BulkActionsPanel
                selectedCustomers={selectedCustomers}
                onBulkAction={handleBulkAction}
                onClose={() => setShowBulkActions(false)}
              />
            </div>
          </div>
        )}

        {/* Customer Profile Modal */}
        <CustomerProfileModal
          customer={selectedCustomer}
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onUpdate={handleUpdateCustomer}
        />
      </div>
    </div>
  );
};

export default CustomerManagement;