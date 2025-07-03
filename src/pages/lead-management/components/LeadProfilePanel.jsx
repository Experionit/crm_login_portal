import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LeadProfilePanel = ({ lead, isOpen, onClose, onUpdate, onCall, onEmail, onScheduleMeeting }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(lead || {});
  const [newNote, setNewNote] = useState('');

  if (!isOpen || !lead) return null;

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(lead);
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedLead = {
        ...lead,
        notes: [
          ...(lead.notes || []),
          {
            id: Date.now(),
            text: newNote,
            date: new Date().toISOString(),
            author: 'Current User'
          }
        ]
      };
      onUpdate(updatedLead);
      setNewNote('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 text-red-800';
      case 'warm':
        return 'bg-yellow-100 text-yellow-800';
      case 'cold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const mockActivities = [
    { id: 1, type: 'call', date: '2024-01-15T10:30:00', summary: 'Initial outreach call - discussed needs' },
    { id: 2, type: 'email', date: '2024-01-12T14:15:00', summary: 'Sent product information and pricing' },
    { id: 3, type: 'meeting', date: '2024-01-10T09:00:00', summary: 'Discovery meeting scheduled' },
    { id: 4, type: 'note', date: '2024-01-08T16:45:00', summary: 'Lead qualification completed' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call': return 'Phone';
      case 'email': return 'Mail';
      case 'meeting': return 'Users';
      case 'note': return 'FileText';
      default: return 'Activity';
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Lead Details</h2>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
              </>
            ) : (
              <Button variant="outline" size="sm" iconName="Edit" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>
        </div>
      </div>

      {/* Lead Information */}
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Building" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{lead.company}</h3>
            <p className="text-sm text-gray-600">{lead.contactPerson}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">{lead.stage}</span>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            onClick={() => onCall(lead)}
            className="flex-1"
          >
            Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            onClick={() => onEmail(lead)}
            className="flex-1"
          >
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            onClick={() => onScheduleMeeting(lead)}
            className="flex-1"
          >
            Meet
          </Button>
        </div>

        {/* Lead Details */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            {isEditing ? (
              <Input
                type="email"
                value={editData.email || ''}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            ) : (
              <p className="text-sm text-gray-900">{lead.email}</p>
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
              <p className="text-sm text-gray-900">{lead.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
            <p className="text-sm font-medium text-gray-900">{lead.estimatedValue}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lead Score</label>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getLeadScoreColor(lead.leadScore)}`}>
                {lead.leadScore}/100
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${lead.leadScore >= 80 ? 'bg-green-500' : lead.leadScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${lead.leadScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <p className="text-sm text-gray-900">{lead.source}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Next Action</label>
            <p className="text-sm text-gray-900">{lead.nextAction}</p>
            {lead.nextActionDate && (
              <p className="text-xs text-gray-600 mt-1">
                Due: {formatDate(lead.nextActionDate)}
              </p>
            )}
          </div>
        </div>

        {/* Qualification Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Qualification Notes</label>
          <div className="space-y-2">
            {lead.qualificationNotes?.map((note, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-900">{note.text}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(note.date)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity History */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
          <div className="space-y-3">
            {mockActivities.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <Icon name={getActivityIcon(activity.type)} size={12} className="text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.summary}</p>
                  <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Add Note</label>
          <div className="space-y-2">
            <Input
              placeholder="Enter your note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="resize-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="w-full"
            >
              Add Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadProfilePanel;