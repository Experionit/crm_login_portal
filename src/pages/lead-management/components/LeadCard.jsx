import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeadCard = ({ lead, onCall, onEmail, onScheduleMeeting, onViewDetails, onStageChange }) => {
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
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysInStage = (stageDate) => {
    const now = new Date();
    const stageDateTime = new Date(stageDate);
    const diffTime = Math.abs(now - stageDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1" onClick={() => onViewDetails(lead)}>
            {lead.company}
          </h3>
          <p className="text-xs text-gray-600">{lead.contactPerson}</p>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>
      </div>

      {/* Lead Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Deal Value</span>
          <span className="text-sm font-medium text-gray-900">{lead.estimatedValue}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Lead Score</span>
          <span className={`text-sm font-medium ${getLeadScoreColor(lead.leadScore)}`}>
            {lead.leadScore}/100
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Source</span>
          <span className="text-xs text-gray-900">{lead.source}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Days in Stage</span>
          <span className="text-xs text-gray-900">{getDaysInStage(lead.stageDate)} days</span>
        </div>
      </div>

      {/* Next Action */}
      <div className="border-t border-gray-100 pt-3 mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} className="text-gray-400" />
          <span className="text-xs text-gray-600">Next: {lead.nextAction}</span>
        </div>
        {lead.nextActionDate && (
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="Calendar" size={14} className="text-gray-400" />
            <span className="text-xs text-gray-600">Due: {formatDate(lead.nextActionDate)}</span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="xs"
            iconName="Phone"
            onClick={(e) => {
              e.stopPropagation();
              onCall(lead);
            }}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          />
          <Button
            variant="ghost"
            size="xs"
            iconName="Mail"
            onClick={(e) => {
              e.stopPropagation();
              onEmail(lead);
            }}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          />
          <Button
            variant="ghost"
            size="xs"
            iconName="Calendar"
            onClick={(e) => {
              e.stopPropagation();
              onScheduleMeeting(lead);
            }}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          />
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="xs"
            iconName="ChevronLeft"
            onClick={(e) => {
              e.stopPropagation();
              onStageChange(lead, 'previous');
            }}
            className="text-gray-600 hover:text-gray-700"
          />
          <Button
            variant="ghost"
            size="xs"
            iconName="ChevronRight"
            onClick={(e) => {
              e.stopPropagation();
              onStageChange(lead, 'next');
            }}
            className="text-gray-600 hover:text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadCard;