import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionFAB = ({ onAddLead, onScheduleAppointment, onQuickNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-scale-in">
          <Button
            variant="primary"
            size="sm"
            iconName="UserPlus"
            onClick={() => handleAction(onAddLead)}
            className="shadow-lg whitespace-nowrap"
          >
            Add Lead
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="Calendar"
            onClick={() => handleAction(onScheduleAppointment)}
            className="shadow-lg whitespace-nowrap"
          >
            Schedule
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="FileText"
            onClick={() => handleAction(onQuickNote)}
            className="shadow-lg whitespace-nowrap"
          >
            Quick Note
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={toggleExpanded}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center touch-target ${
          isExpanded ? 'rotate-45' : ''
        }`}
        aria-label="Quick actions"
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActionFAB;