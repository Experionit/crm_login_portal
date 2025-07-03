import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SystemConfigurationTab = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('general');

  const languages = {
    en: {
      systemConfiguration: 'System Configuration',
      general: 'General',
      security: 'Security',
      integrations: 'Integrations',
      notifications: 'Notifications',
      backup: 'Backup',
      companyName: 'Company Name',
      timezone: 'Timezone',
      dateFormat: 'Date Format',
      currency: 'Currency',
      language: 'Default Language',
      passwordPolicy: 'Password Policy',
      sessionTimeout: 'Session Timeout',
      twoFactorAuth: 'Two-Factor Authentication',
      ipWhitelist: 'IP Whitelist',
      apiKeys: 'API Keys',
      webhooks: 'Webhooks',
      thirdPartyIntegrations: 'Third-party Integrations',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      pushNotifications: 'Push Notifications',
      autoBackup: 'Auto Backup',
      backupFrequency: 'Backup Frequency',
      retentionPeriod: 'Retention Period',
      save: 'Save Changes',
      enabled: 'Enabled',
      disabled: 'Disabled',
      configure: 'Configure',
      test: 'Test',
      edit: 'Edit',
      delete: 'Delete'
    },
    es: {
      systemConfiguration: 'Configuración del Sistema',
      general: 'General',
      security: 'Seguridad',
      integrations: 'Integraciones',
      notifications: 'Notificaciones',
      backup: 'Respaldo',
      companyName: 'Nombre de la Empresa',
      timezone: 'Zona Horaria',
      dateFormat: 'Formato de Fecha',
      currency: 'Moneda',
      language: 'Idioma Predeterminado',
      passwordPolicy: 'Política de Contraseñas',
      sessionTimeout: 'Tiempo de Sesión',
      twoFactorAuth: 'Autenticación de Dos Factores',
      ipWhitelist: 'Lista Blanca de IP',
      apiKeys: 'Claves API',
      webhooks: 'Webhooks',
      thirdPartyIntegrations: 'Integraciones de Terceros',
      emailNotifications: 'Notificaciones por Email',
      smsNotifications: 'Notificaciones SMS',
      pushNotifications: 'Notificaciones Push',
      autoBackup: 'Respaldo Automático',
      backupFrequency: 'Frecuencia de Respaldo',
      retentionPeriod: 'Período de Retención',
      save: 'Guardar Cambios',
      enabled: 'Habilitado',
      disabled: 'Deshabilitado',
      configure: 'Configurar',
      test: 'Probar',
      edit: 'Editar',
      delete: 'Eliminar'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const configSections = [
    { id: 'general', label: languages[currentLanguage].general, icon: 'Settings' },
    { id: 'security', label: languages[currentLanguage].security, icon: 'Shield' },
    { id: 'integrations', label: languages[currentLanguage].integrations, icon: 'Zap' },
    { id: 'notifications', label: languages[currentLanguage].notifications, icon: 'Bell' },
    { id: 'backup', label: languages[currentLanguage].backup, icon: 'Database' }
  ];

  const integrationData = [
    {
      id: 1,
      name: "Salesforce",
      description: "Customer relationship management platform integration",
      status: "enabled",
      lastSync: "2024-01-15 09:30 AM",
      icon: "Cloud"
    },
    {
      id: 2,
      name: "Microsoft Outlook",
      description: "Email and calendar synchronization",
      status: "enabled",
      lastSync: "2024-01-15 08:45 AM",
      icon: "Mail"
    },
    {
      id: 3,
      name: "Slack",
      description: "Team communication and notifications",
      status: "disabled",
      lastSync: "Never",
      icon: "MessageSquare"
    },
    {
      id: 4,
      name: "Google Workspace",
      description: "Document and calendar integration",
      status: "enabled",
      lastSync: "2024-01-15 07:20 AM",
      icon: "FileText"
    }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.companyName}
          </label>
          <Input
            type="text"
            value="CRM Portal Inc."
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.timezone}
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>UTC-05:00 (Eastern Time)</option>
            <option>UTC-08:00 (Pacific Time)</option>
            <option>UTC+00:00 (GMT)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.dateFormat}
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.currency}
          </label>
          <select className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border">
            <div>
              <h4 className="text-sm font-medium text-text-primary">{t.twoFactorAuth}</h4>
              <p className="text-xs text-text-secondary">Require 2FA for all admin users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border">
            <div>
              <h4 className="text-sm font-medium text-text-primary">{t.sessionTimeout}</h4>
              <p className="text-xs text-text-secondary">Auto logout after inactivity</p>
            </div>
            <select className="px-3 py-1 border border-border rounded-md bg-surface text-text-primary text-sm">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
            </select>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">{t.passwordPolicy}</h4>
          <div className="space-y-3 p-4 bg-surface-secondary rounded-lg border border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">Minimum 8 characters</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">At least one uppercase letter</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">At least one number</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">Special characters required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrationData.map((integration) => (
          <div key={integration.id} className="p-4 bg-surface-secondary rounded-lg border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name={integration.icon} size={20} className="text-primary-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{integration.name}</h4>
                  <p className="text-xs text-text-secondary">{integration.description}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                integration.status === 'enabled' ?'bg-success-100 text-success-700' :'bg-secondary-100 text-secondary-700'
              }`}>
                {t[integration.status]}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
              <span>Last sync: {integration.lastSync}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="Settings">
                {t.configure}
              </Button>
              <Button variant="ghost" size="sm" iconName="TestTube">
                {t.test}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-surface-secondary rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} className="text-primary-600" />
              <h4 className="text-sm font-medium text-text-primary">{t.emailNotifications}</h4>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p className="text-xs text-text-secondary mb-3">Send email notifications for system events</p>
          <Button variant="outline" size="sm" fullWidth>
            {t.configure}
          </Button>
        </div>

        <div className="p-4 bg-surface-secondary rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-accent-600" />
              <h4 className="text-sm font-medium text-text-primary">{t.smsNotifications}</h4>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p className="text-xs text-text-secondary mb-3">Send SMS alerts for critical events</p>
          <Button variant="outline" size="sm" fullWidth>
            {t.configure}
          </Button>
        </div>

        <div className="p-4 bg-surface-secondary rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={20} className="text-warning-600" />
              <h4 className="text-sm font-medium text-text-primary">{t.pushNotifications}</h4>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p className="text-xs text-text-secondary mb-3">Browser push notifications</p>
          <Button variant="outline" size="sm" fullWidth>
            {t.configure}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border">
            <div>
              <h4 className="text-sm font-medium text-text-primary">{t.autoBackup}</h4>
              <p className="text-xs text-text-secondary">Automatically backup system data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.backupFrequency}
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.retentionPeriod}
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
              <option>Forever</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-surface-secondary rounded-lg border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-4">Recent Backups</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface rounded-md border border-border">
              <div>
                <div className="text-sm font-medium text-text-primary">Full System Backup</div>
                <div className="text-xs text-text-secondary">2024-01-15 02:00 AM</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">
                  Success
                </span>
                <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="Download" size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-surface rounded-md border border-border">
              <div>
                <div className="text-sm font-medium text-text-primary">Database Backup</div>
                <div className="text-xs text-text-secondary">2024-01-14 02:00 AM</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">
                  Success
                </span>
                <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="Download" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationsSettings();
      case 'notifications':
        return renderNotificationsSettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  const t = languages[currentLanguage];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          {t.systemConfiguration}
        </h2>
      </div>

      {/* Configuration Sections */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {configSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
                }`}
              >
                <Icon 
                  name={section.icon} 
                  size={18} 
                  className={`mr-3 ${
                    activeSection === section.id ? 'text-primary' : 'text-secondary-600'
                  }`} 
                />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-surface rounded-lg border border-border p-6">
            {renderContent()}
            
            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex justify-end">
                <Button variant="primary" iconName="Save">
                  {t.save}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigurationTab;