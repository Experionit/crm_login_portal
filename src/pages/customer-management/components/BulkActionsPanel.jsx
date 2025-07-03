import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BulkActionsPanel = ({ selectedCustomers, onBulkAction, onClose }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState('');
  const [newTerritory, setNewTerritory] = useState('');
  const [exportFormat, setExportFormat] = useState('csv');

  const handleBulkAction = (action, data = {}) => {
    onBulkAction(action, data);
    setActiveAction(null);
    onClose();
  };

  const territories = [
    'North America - East',
    'North America - West',
    'Europe - North',
    'Europe - South',
    'Asia Pacific',
    'Latin America'
  ];

  const emailTemplates = [
    { id: 'newsletter', name: 'Monthly Newsletter', subject: 'Monthly Product Updates' },
    { id: 'promotion', name: 'Promotional Campaign', subject: 'Special Offer - Limited Time' },
    { id: 'followup', name: 'Follow-up Reminder', subject: 'Following up on our conversation' },
    { id: 'survey', name: 'Customer Survey', subject: 'We value your feedback' }
  ];

  if (selectedCustomers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 text-center">
        <Icon name="Users" size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">Select customers to perform bulk actions</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Bulk Actions ({selectedCustomers.length} selected)
        </h3>
        <Button variant="ghost" iconName="X" onClick={onClose} />
      </div>

      {!activeAction && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="p-4 h-auto flex-col space-y-2"
            onClick={() => setActiveAction('email')}
          >
            <Icon name="Mail" size={24} className="text-blue-600" />
            <span className="font-medium">Email Campaign</span>
            <span className="text-sm text-gray-600">Send bulk emails</span>
          </Button>

          <Button
            variant="outline"
            className="p-4 h-auto flex-col space-y-2"
            onClick={() => setActiveAction('reassign')}
          >
            <Icon name="UserCheck" size={24} className="text-green-600" />
            <span className="font-medium">Reassign Territory</span>
            <span className="text-sm text-gray-600">Change sales territories</span>
          </Button>

          <Button
            variant="outline"
            className="p-4 h-auto flex-col space-y-2"
            onClick={() => setActiveAction('export')}
          >
            <Icon name="Download" size={24} className="text-purple-600" />
            <span className="font-medium">Export Data</span>
            <span className="text-sm text-gray-600">Download customer data</span>
          </Button>
        </div>
      )}

      {activeAction === 'email' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Email Campaign Setup</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                const template = emailTemplates.find(t => t.id === e.target.value);
                setEmailTemplate(template?.subject || '');
              }}
            >
              <option value="">Select a template</option>
              {emailTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Line
            </label>
            <Input
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setActiveAction(null)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => handleBulkAction('email', { subject: emailTemplate })}
              disabled={!emailTemplate}
            >
              Send Email Campaign
            </Button>
          </div>
        </div>
      )}

      {activeAction === 'reassign' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Territory Reassignment</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Territory
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newTerritory}
              onChange={(e) => setNewTerritory(e.target.value)}
            >
              <option value="">Select territory</option>
              {territories.map(territory => (
                <option key={territory} value={territory}>
                  {territory}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <Icon name="AlertTriangle" size={20} className="text-yellow-600 mr-2" />
              <div>
                <p className="text-sm text-yellow-800">
                  This action will reassign {selectedCustomers.length} customers to the selected territory.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setActiveAction(null)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => handleBulkAction('reassign', { territory: newTerritory })}
              disabled={!newTerritory}
            >
              Reassign Territory
            </Button>
          </div>
        </div>
      )}

      {activeAction === 'export' && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Export Customer Data</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                CSV (Comma Separated Values)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                Excel Spreadsheet
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                PDF Report
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <Icon name="Info" size={20} className="text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-blue-800">
                  Exporting {selectedCustomers.length} customer records in {exportFormat.toUpperCase()} format.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setActiveAction(null)}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => handleBulkAction('export', { format: exportFormat })}
            >
              Export Data
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsPanel;