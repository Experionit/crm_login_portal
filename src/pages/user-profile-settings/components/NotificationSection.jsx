import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSection = ({ isActive, onSave, onCancel, hasUnsavedChanges, setHasUnsavedChanges }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newLeads: true,
      appointmentReminders: true,
      taskDeadlines: true,
      systemUpdates: false,
      weeklyReports: true,
      marketingEmails: false
    },
    push: {
      newLeads: true,
      appointmentReminders: true,
      taskDeadlines: true,
      systemAlerts: true,
      chatMessages: true
    },
    inApp: {
      newLeads: true,
      appointmentReminders: true,
      taskDeadlines: true,
      systemAlerts: true,
      chatMessages: true,
      activityUpdates: false
    }
  });
  const [originalSettings, setOriginalSettings] = useState({});

  const languages = {
    en: {
      notificationPreferences: 'Notification Preferences',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      inAppNotifications: 'In-App Notifications',
      newLeads: 'New Leads',
      appointmentReminders: 'Appointment Reminders',
      taskDeadlines: 'Task Deadlines',
      systemUpdates: 'System Updates',
      systemAlerts: 'System Alerts',
      weeklyReports: 'Weekly Reports',
      marketingEmails: 'Marketing Emails',
      chatMessages: 'Chat Messages',
      activityUpdates: 'Activity Updates',
      save: 'Save Changes',
      cancel: 'Cancel',
      settingsSaved: 'Notification preferences saved successfully'
    },
    es: {
      notificationPreferences: 'Preferencias de Notificación',
      emailNotifications: 'Notificaciones por Correo',
      pushNotifications: 'Notificaciones Push',
      inAppNotifications: 'Notificaciones en la App',
      newLeads: 'Nuevos Clientes Potenciales',
      appointmentReminders: 'Recordatorios de Citas',
      taskDeadlines: 'Fechas Límite de Tareas',
      systemUpdates: 'Actualizaciones del Sistema',
      systemAlerts: 'Alertas del Sistema',
      weeklyReports: 'Reportes Semanales',
      marketingEmails: 'Correos de Marketing',
      chatMessages: 'Mensajes de Chat',
      activityUpdates: 'Actualizaciones de Actividad',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      settingsSaved: 'Preferencias de notificación guardadas exitosamente'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setOriginalSettings(JSON.parse(JSON.stringify(notificationSettings)));
  }, []);

  useEffect(() => {
    const hasChanges = JSON.stringify(notificationSettings) !== JSON.stringify(originalSettings);
    setHasUnsavedChanges(hasChanges);
  }, [notificationSettings, originalSettings, setHasUnsavedChanges]);

  const handleToggle = (category, setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSave = () => {
    setOriginalSettings(JSON.parse(JSON.stringify(notificationSettings)));
    onSave(notificationSettings);
  };

  const handleCancel = () => {
    setNotificationSettings(JSON.parse(JSON.stringify(originalSettings)));
    onCancel();
  };

  const NotificationToggle = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-text-primary font-body">{label}</span>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-ring ${
          checked ? 'bg-primary' : 'bg-secondary-300'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const NotificationSection = ({ title, icon, category, settings }) => (
    <div className="bg-surface-secondary rounded-lg p-6 border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center">
          <Icon name={icon} size={18} className="text-primary-600" />
        </div>
        <h4 className="text-md font-medium text-text-primary font-heading">{title}</h4>
      </div>
      
      <div className="space-y-1">
        {Object.entries(settings).map(([key, value]) => (
          <NotificationToggle
            key={key}
            label={t[key]}
            checked={value}
            onChange={() => handleToggle(category, key)}
          />
        ))}
      </div>
    </div>
  );

  const t = languages[currentLanguage];

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-2">
          {t.notificationPreferences}
        </h3>
        <p className="text-sm text-text-secondary font-caption">
          Customize how and when you receive notifications.
        </p>
      </div>

      <div className="space-y-6">
        <NotificationSection
          title={t.emailNotifications}
          icon="Mail"
          category="email"
          settings={notificationSettings.email}
        />

        <NotificationSection
          title={t.pushNotifications}
          icon="Smartphone"
          category="push"
          settings={notificationSettings.push}
        />

        <NotificationSection
          title={t.inAppNotifications}
          icon="Bell"
          category="inApp"
          settings={notificationSettings.inApp}
        />
      </div>

      {/* Action Buttons */}
      {hasUnsavedChanges && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="primary"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            className="sm:w-auto"
          >
            {t.save}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            iconName="X"
            iconPosition="left"
            className="sm:w-auto"
          >
            {t.cancel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationSection;