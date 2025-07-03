import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import KanbanBoard from './components/KanbanBoard';
import LeadFilters from './components/LeadFilters';
import LeadProfilePanel from './components/LeadProfilePanel';
import LeadAnalytics from './components/LeadAnalytics';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock lead data
  const mockLeads = [
    {
      id: 1,
      company: 'TechStart Inc.',
      contactPerson: 'Alice Johnson',
      email: 'alice@techstart.com',
      phone: '+1 (555) 123-4567',
      stage: 'new',
      status: 'hot',
      estimatedValue: '$45,000',
      leadScore: 85,
      source: 'Website',
      nextAction: 'Schedule discovery call',
      nextActionDate: '2024-01-20T10:00:00',
      stageDate: '2024-01-15T09:00:00',
      createdDate: '2024-01-15T09:00:00',
      assignedTo: 'John Smith',
      qualificationNotes: [
        { text: 'Budget confirmed, decision maker identified', date: '2024-01-15T10:30:00' }
      ]
    },
    {
      id: 2,
      company: 'Global Solutions',
      contactPerson: 'Mark Thompson',
      email: 'mark@globalsolutions.com',
      phone: '+1 (555) 234-5678',
      stage: 'contacted',
      status: 'warm',
      estimatedValue: '$75,000',
      leadScore: 72,
      source: 'Referral',
      nextAction: 'Send product demo',
      nextActionDate: '2024-01-18T14:00:00',
      stageDate: '2024-01-10T11:00:00',
      createdDate: '2024-01-08T09:00:00',
      assignedTo: 'Sarah Johnson',
      qualificationNotes: [
        { text: 'Interested in enterprise features', date: '2024-01-10T15:00:00' }
      ]
    },
    {
      id: 3,
      company: 'Innovation Labs',
      contactPerson: 'Sarah Chen',
      email: 'sarah@innovationlabs.com',
      phone: '+1 (555) 345-6789',
      stage: 'qualified',
      status: 'hot',
      estimatedValue: '$120,000',
      leadScore: 90,
      source: 'Trade Show',
      nextAction: 'Prepare proposal',
      nextActionDate: '2024-01-22T09:00:00',
      stageDate: '2024-01-05T10:00:00',
      createdDate: '2024-01-01T09:00:00',
      assignedTo: 'Mike Chen',
      qualificationNotes: [
        { text: 'Strong technical requirements match', date: '2024-01-05T11:00:00' },
        { text: 'Timeline confirmed for Q1 implementation', date: '2024-01-06T14:00:00' }
      ]
    },
    {
      id: 4,
      company: 'Enterprise Corp',
      contactPerson: 'David Wilson',
      email: 'david@enterprise.com',
      phone: '+1 (555) 456-7890',
      stage: 'proposal',
      status: 'warm',
      estimatedValue: '$200,000',
      leadScore: 78,
      source: 'Cold Call',
      nextAction: 'Follow up on proposal',
      nextActionDate: '2024-01-19T11:00:00',
      stageDate: '2024-01-01T09:00:00',
      createdDate: '2023-12-15T09:00:00',
      assignedTo: 'Emily Davis',
      qualificationNotes: [
        { text: 'Proposal submitted, awaiting feedback', date: '2024-01-12T16:00:00' }
      ]
    },
    {
      id: 5,
      company: 'Startup XYZ',
      contactPerson: 'Jennifer Lee',
      email: 'jennifer@startupxyz.com',
      phone: '+1 (555) 567-8901',
      stage: 'closed',
      status: 'won',
      estimatedValue: '$35,000',
      leadScore: 95,
      source: 'Email Campaign',
      nextAction: 'Onboarding kickoff',
      nextActionDate: '2024-01-25T10:00:00',
      stageDate: '2024-01-12T15:00:00',
      createdDate: '2023-12-20T09:00:00',
      closedDate: '2024-01-12T15:00:00',
      assignedTo: 'Robert Wilson',
      qualificationNotes: [
        { text: 'Contract signed, payment confirmed', date: '2024-01-12T15:30:00' }
      ]
    },
    {
      id: 6,
      company: 'Digital Agency',
      contactPerson: 'Robert Brown',
      email: 'robert@digitalagency.com',
      phone: '+1 (555) 678-9012',
      stage: 'contacted',
      status: 'cold',
      estimatedValue: '$25,000',
      leadScore: 45,
      source: 'Social Media',
      nextAction: 'Qualification call',
      nextActionDate: '2024-01-24T13:00:00',
      stageDate: '2024-01-12T10:00:00',
      createdDate: '2024-01-12T10:00:00',
      assignedTo: 'John Smith',
      qualificationNotes: [
        { text: 'Initial interest expressed', date: '2024-01-12T14:00:00' }
      ]
    },
    {
      id: 7,
      company: 'Manufacturing Plus',
      contactPerson: 'Lisa Anderson',
      email: 'lisa@manufacturing.com',
      phone: '+1 (555) 789-0123',
      stage: 'qualified',
      status: 'warm',
      estimatedValue: '$85,000',
      leadScore: 68,
      source: 'Partner',
      nextAction: 'Technical demonstration',
      nextActionDate: '2024-01-21T10:00:00',
      stageDate: '2024-01-08T09:00:00',
      createdDate: '2024-01-01T09:00:00',
      assignedTo: 'Sarah Johnson',
      qualificationNotes: [
        { text: 'Technical requirements gathering completed', date: '2024-01-08T11:00:00' }
      ]
    },
    {
      id: 8,
      company: 'Retail Solutions',
      contactPerson: 'Michael Davis',
      email: 'michael@retail.com',
      phone: '+1 (555) 890-1234',
      stage: 'new',
      status: 'warm',
      estimatedValue: '$60,000',
      leadScore: 55,
      source: 'Website',
      nextAction: 'Initial contact call',
      nextActionDate: '2024-01-17T15:00:00',
      stageDate: '2024-01-14T11:00:00',
      createdDate: '2024-01-14T11:00:00',
      assignedTo: 'Mike Chen',
      qualificationNotes: []
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
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  useEffect(() => {
    let filtered = leads;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply active filters
    activeFilters.forEach(filter => {
      switch (filter.type) {
        case 'status':
          filtered = filtered.filter(lead => lead.status === filter.value);
          break;
        case 'source':
          filtered = filtered.filter(lead => lead.source === filter.value);
          break;
        case 'assignee':
          filtered = filtered.filter(lead => lead.assignedTo === filter.value);
          break;
        case 'dealValue':
          filtered = filtered.filter(lead => {
            const value = parseFloat(lead.estimatedValue.replace(/[$,]/g, ''));
            switch (filter.value) {
              case 'under10k':
                return value < 10000;
              case '10k-50k':
                return value >= 10000 && value < 50000;
              case '50k-100k':
                return value >= 50000 && value < 100000;
              case 'over100k':
                return value >= 100000;
              default:
                return true;
            }
          });
          break;
        case 'dateRange':
          const now = new Date();
          const leadDate = new Date(lead.createdDate);
          switch (filter.value) {
            case 'today':
              filtered = filtered.filter(lead => {
                const leadDate = new Date(lead.createdDate);
                return leadDate.toDateString() === now.toDateString();
              });
              break;
            case 'thisWeek':
              const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
              filtered = filtered.filter(lead => new Date(lead.createdDate) >= weekStart);
              break;
            case 'thisMonth':
              const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
              filtered = filtered.filter(lead => new Date(lead.createdDate) >= monthStart);
              break;
            case 'lastMonth':
              const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
              const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
              filtered = filtered.filter(lead => {
                const leadDate = new Date(lead.createdDate);
                return leadDate >= lastMonthStart && leadDate <= lastMonthEnd;
              });
              break;
          }
          break;
      }
    });

    setFilteredLeads(filtered);
  }, [searchTerm, activeFilters, leads]);

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

  const handleCall = (lead) => {
    console.log('Calling lead:', lead);
    // Implement call functionality
  };

  const handleEmail = (lead) => {
    console.log('Emailing lead:', lead);
    // Implement email functionality
  };

  const handleScheduleMeeting = (lead) => {
    console.log('Scheduling meeting with lead:', lead);
    // Implement meeting scheduling
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setShowProfilePanel(true);
  };

  const handleStageChange = (lead, direction) => {
    const stages = ['new', 'contacted', 'qualified', 'proposal', 'closed'];
    const currentStageIndex = stages.indexOf(lead.stage);
    
    let newStageIndex;
    if (direction === 'next') {
      newStageIndex = Math.min(currentStageIndex + 1, stages.length - 1);
    } else if (direction === 'previous') {
      newStageIndex = Math.max(currentStageIndex - 1, 0);
    } else {
      newStageIndex = stages.indexOf(direction);
    }
    
    if (newStageIndex !== currentStageIndex && newStageIndex >= 0) {
      const updatedLead = {
        ...lead,
        stage: stages[newStageIndex],
        stageDate: new Date().toISOString()
      };
      
      setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
      
      // Log activity
      console.log(`Lead ${lead.company} moved to ${stages[newStageIndex]} stage`);
    }
  };

  const handleUpdateLead = (updatedLead) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
    setSelectedLead(updatedLead);
  };

  const handleAddLead = (stage = 'new') => {
    console.log('Adding new lead to stage:', stage);
    // Implement add lead functionality
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading lead data...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
                <p className="text-sm text-gray-600">
                  Track and manage your sales pipeline
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="BarChart3"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                Analytics
              </Button>
              <Button
                variant="outline"
                iconName="Plus"
                onClick={() => handleAddLead()}
              >
                Add Lead
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            {filteredLeads.length} of {leads.length} leads
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <LeadFilters
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />
        </div>

        {/* Analytics Panel */}
        {showAnalytics && (
          <div className="mb-8">
            <LeadAnalytics leads={filteredLeads} />
          </div>
        )}

        {/* Kanban Board */}
        <div className="relative">
          <KanbanBoard
            leads={filteredLeads}
            onCall={handleCall}
            onEmail={handleEmail}
            onScheduleMeeting={handleScheduleMeeting}
            onViewDetails={handleViewDetails}
            onStageChange={handleStageChange}
            onAddLead={handleAddLead}
          />
        </div>

        {/* Lead Profile Panel */}
        <LeadProfilePanel
          lead={selectedLead}
          isOpen={showProfilePanel}
          onClose={() => setShowProfilePanel(false)}
          onUpdate={handleUpdateLead}
          onCall={handleCall}
          onEmail={handleEmail}
          onScheduleMeeting={handleScheduleMeeting}
        />
      </div>
    </div>
  );
};

export default LeadManagement;