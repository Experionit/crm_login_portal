import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerProfileModal = ({ customer, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(customer || {});

  if (!isOpen || !customer) return null;

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(customer);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'interactions', label: 'Interactions', icon: 'MessageSquare' },
    { id: 'deals', label: 'Deals', icon: 'DollarSign' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'notes', label: 'Notes', icon: 'Edit3' }
  ];

  const mockInteractions = [
    { id: 1, type: 'call', date: '2024-01-15', summary: 'Discussed product requirements', duration: '30 min' },
    { id: 2, type: 'email', date: '2024-01-10', summary: 'Sent pricing proposal', status: 'read' },
    { id: 3, type: 'meeting', date: '2024-01-08', summary: 'Initial discovery meeting', location: 'Office' },
    { id: 4, type: 'call', date: '2024-01-05', summary: 'Follow-up on demo', duration: '15 min' }
  ];

  const mockDeals = [
    { id: 1, name: 'Enterprise License', value: '$50,000', stage: 'Negotiation', probability: 75 },
    { id: 2, name: 'Professional Services', value: '$25,000', stage: 'Proposal', probability: 60 },
    { id: 3, name: 'Training Package', value: '$10,000', stage: 'Closed Won', probability: 100 }
  ];

  const mockDocuments = [
    { id: 1, name: 'Proposal_TechCorp_2024.pdf', type: 'proposal', date: '2024-01-15', size: '2.5 MB' },
    { id: 2, name: 'Contract_Draft_v2.docx', type: 'contract', date: '2024-01-12', size: '1.8 MB' },
    { id: 3, name: 'Product_Demo_Slides.pptx', type: 'presentation', date: '2024-01-08', size: '5.2 MB' }
  ];

  const mockNotes = [
    { id: 1, date: '2024-01-15', author: 'John Smith', content: 'Customer is very interested in the enterprise features. They want to see a demo of the analytics module.' },
    { id: 2, date: '2024-01-10', author: 'John Smith', content: 'Sent detailed pricing proposal. Waiting for their procurement team to review.' },
    { id: 3, date: '2024-01-08', author: 'John Smith', content: 'Great first meeting. They have a clear need for our solution. Next step is to schedule a technical demo.' }
  ];

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'call': return 'Phone';
      case 'email': return 'Mail';
      case 'meeting': return 'Users';
      default: return 'MessageSquare';
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'proposal': return 'FileText';
      case 'contract': return 'FileCheck';
      case 'presentation': return 'Monitor';
      default: return 'File';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Building" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{customer.company}</h2>
                <p className="text-gray-600">{customer.contactPerson} • {customer.industry}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  <Button variant="primary" onClick={handleSave}>Save</Button>
                </>
              ) : (
                <Button variant="outline" iconName="Edit" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
              <Button variant="ghost" iconName="X" onClick={onClose} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    {isEditing ? (
                      <Input
                        value={editData.company || ''}
                        onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{customer.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    {isEditing ? (
                      <Input
                        value={editData.contactPerson || ''}
                        onChange={(e) => setEditData({ ...editData, contactPerson: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{customer.contactPerson}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editData.email || ''}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{customer.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <Input
                        value={editData.phone || ''}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{customer.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <p className="text-gray-900">{customer.industry}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value</label>
                    <p className="text-gray-900 font-semibold">{customer.dealValue}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'active' ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Activity</label>
                    <p className="text-gray-900">{new Date(customer.lastActivity).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interactions' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Interaction History</h3>
              <div className="space-y-4">
                {mockInteractions.map(interaction => (
                  <div key={interaction.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Icon name={getInteractionIcon(interaction.type)} size={16} className="text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 capitalize">{interaction.type}</h4>
                          <span className="text-sm text-gray-500">{interaction.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{interaction.summary}</p>
                        {interaction.duration && (
                          <p className="text-xs text-gray-500 mt-1">Duration: {interaction.duration}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deals' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Deal Pipeline</h3>
              <div className="space-y-4">
                {mockDeals.map(deal => (
                  <div key={deal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{deal.name}</h4>
                      <span className="text-sm font-semibold text-gray-900">{deal.value}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{deal.stage}</span>
                      <span className="text-sm text-gray-600">{deal.probability}% probability</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Associated Documents</h3>
              <div className="space-y-4">
                {mockDocuments.map(doc => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Icon name={getDocumentIcon(doc.type)} size={20} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.date} • {doc.size}</p>
                      </div>
                      <Button variant="ghost" size="sm" iconName="Download">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Notes & Comments</h3>
              <div className="space-y-4">
                {mockNotes.map(note => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{note.author}</span>
                      <span className="text-sm text-gray-500">{note.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileModal;