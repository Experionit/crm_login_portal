import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerCard = ({ customer, onCall, onEmail, onAddNote, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'hot':
        return 'bg-error-50 text-error-700 border-error-200';
      case 'warm':
        return 'bg-warning-50 text-warning-700 border-warning-200';
      case 'cold':
        return 'bg-accent-50 text-accent-700 border-accent-200';
      default:
        return 'bg-secondary-50 text-secondary-700 border-secondary-200';
    }
  };

  const formatLastContact = (date) => {
    const now = new Date();
    const contactDate = new Date(date);
    const diffTime = Math.abs(now - contactDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:shadow-elevation-1 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-semibold text-text-primary">{customer.name}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(customer.status)}`}>
              {customer.status}
            </span>
          </div>
          <p className="text-sm text-text-secondary mb-1">{customer.company}</p>
          <div className="flex items-center text-xs text-text-tertiary mb-2">
            <Icon name="Calendar" size={12} className="mr-1" />
            <span>Last contact: {formatLastContact(customer.lastContact)}</span>
          </div>
          {customer.nextAction && (
            <div className="flex items-center text-xs text-accent-600">
              <Icon name="Target" size={12} className="mr-1" />
              <span>{customer.nextAction}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => onViewDetails(customer.id)}
          className="p-2 text-text-tertiary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200 touch-target"
          aria-label="View details"
        >
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="xs"
          iconName="Phone"
          onClick={() => onCall(customer)}
          className="flex-1"
        >
          Call
        </Button>
        <Button
          variant="ghost"
          size="xs"
          iconName="Mail"
          onClick={() => onEmail(customer)}
          className="flex-1"
        >
          Email
        </Button>
        <Button
          variant="ghost"
          size="xs"
          iconName="FileText"
          onClick={() => onAddNote(customer)}
          className="flex-1"
        >
          Note
        </Button>
      </div>
    </div>
  );
};

export default CustomerCard;