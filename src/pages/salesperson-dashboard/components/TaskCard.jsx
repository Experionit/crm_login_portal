import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, onComplete, onCall, onEmail }) => {
  const priorityColors = {
    high: 'bg-error-50 text-error-700 border-error-200',
    medium: 'bg-warning-50 text-warning-700 border-warning-200',
    low: 'bg-success-50 text-success-700 border-success-200'
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:shadow-elevation-1 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-sm font-semibold text-text-primary">{task.title}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          <p className="text-sm text-text-secondary mb-2">{task.customer}</p>
          <div className="flex items-center text-xs text-text-tertiary">
            <Icon name="Clock" size={12} className="mr-1" />
            <span>{formatTime(task.dueTime)}</span>
            {task.isOverdue && (
              <span className="ml-2 text-error-600 font-medium">Overdue</span>
            )}
          </div>
        </div>
        <button
          onClick={() => onComplete(task.id)}
          className="p-2 text-text-tertiary hover:text-success-600 hover:bg-success-50 rounded-md transition-colors duration-200 touch-target"
          aria-label="Mark as complete"
        >
          <Icon name="Check" size={16} />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="xs"
          iconName="Phone"
          onClick={() => onCall(task.customer)}
          className="flex-1"
        >
          Call
        </Button>
        <Button
          variant="ghost"
          size="xs"
          iconName="Mail"
          onClick={() => onEmail(task.customer)}
          className="flex-1"
        >
          Email
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;