import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LeadCard from './LeadCard';

const KanbanBoard = ({ leads, onCall, onEmail, onScheduleMeeting, onViewDetails, onStageChange, onAddLead }) => {
  const [draggedLead, setDraggedLead] = useState(null);

  const stages = [
    { id: 'new', title: 'New', color: 'blue', icon: 'Plus' },
    { id: 'contacted', title: 'Contacted', color: 'yellow', icon: 'Phone' },
    { id: 'qualified', title: 'Qualified', color: 'green', icon: 'CheckCircle' },
    { id: 'proposal', title: 'Proposal', color: 'purple', icon: 'FileText' },
    { id: 'closed', title: 'Closed', color: 'gray', icon: 'Archive' }
  ];

  const getLeadsByStage = (stageId) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const getStageColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      gray: 'bg-gray-50 border-gray-200'
    };
    return colors[color] || colors.gray;
  };

  const getHeaderColor = (color) => {
    const colors = {
      blue: 'text-blue-700',
      yellow: 'text-yellow-700',
      green: 'text-green-700',
      purple: 'text-purple-700',
      gray: 'text-gray-700'
    };
    return colors[color] || colors.gray;
  };

  const calculateStageValue = (stageId) => {
    const stageLeads = getLeadsByStage(stageId);
    return stageLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.estimatedValue.replace(/[$,]/g, ''));
      return sum + value;
    }, 0);
  };

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    
    if (draggedLead && draggedLead.stage !== targetStage) {
      onStageChange(draggedLead, targetStage);
    }
    
    setDraggedLead(null);
  };

  return (
    <div className="h-full overflow-x-auto">
      <div className="flex space-x-6 min-w-max pb-6">
        {stages.map(stage => {
          const stageLeads = getLeadsByStage(stage.id);
          const stageValue = calculateStageValue(stage.id);
          
          return (
            <div
              key={stage.id}
              className={`flex-shrink-0 w-80 ${getStageColor(stage.color)} border-2 border-dashed rounded-lg`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Stage Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={stage.icon} size={18} className={getHeaderColor(stage.color)} />
                    <h3 className={`font-semibold ${getHeaderColor(stage.color)}`}>
                      {stage.title}
                    </h3>
                    <span className="bg-white text-gray-600 text-xs px-2 py-1 rounded-full">
                      {stageLeads.length}
                    </span>
                  </div>
                  
                  {stage.id === 'new' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Plus"
                      onClick={() => onAddLead(stage.id)}
                      className="text-blue-600 hover:text-blue-700"
                    />
                  )}
                </div>
                
                <div className="text-sm text-gray-600">
                  Pipeline: ${stageValue.toLocaleString()}
                </div>
              </div>

              {/* Stage Content */}
              <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="Inbox" size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No leads in this stage</p>
                  </div>
                ) : (
                  stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead)}
                      onDragEnd={handleDragEnd}
                      className={`transform transition-transform ${
                        draggedLead?.id === lead.id ? 'rotate-2 scale-105 opacity-50' : ''
                      }`}
                    >
                      <LeadCard
                        lead={lead}
                        onCall={onCall}
                        onEmail={onEmail}
                        onScheduleMeeting={onScheduleMeeting}
                        onViewDetails={onViewDetails}
                        onStageChange={onStageChange}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;