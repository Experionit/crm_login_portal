import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const RoleSpecificSection = ({ isActive, userRole, onSave, onCancel, hasUnsavedChanges, setHasUnsavedChanges }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [salespersonSettings, setSalespersonSettings] = useState({
    territory: 'Northeast Region',
    quota: '150000',
    mobileSync: true,
    offlineMode: true,
    autoCheckIn: false,
    leadNotifications: true
  });
  const [adminSettings, setAdminSettings] = useState({
    systemNotifications: true,
    auditLogs: true,
    userManagementAlerts: true,
    backupNotifications: false,
    securityAlerts: true,
    maintenanceMode: false
  });
  const [originalSettings, setOriginalSettings] = useState({});

  const languages = {
    en: {
      salespersonSettings: 'Salesperson Settings',
      adminSettings: 'Administrator Settings',
      territory: 'Sales Territory',
      quota: 'Annual Quota ($)',
      mobileSync: 'Mobile Sync',
      offlineMode: 'Offline Mode',
      autoCheckIn: 'Auto Check-in',
      leadNotifications: 'Lead Notifications',
      systemNotifications: 'System Notifications',
      auditLogs: 'Audit Logs',
      userManagementAlerts: 'User Management Alerts',
      backupNotifications: 'Backup Notifications',
      securityAlerts: 'Security Alerts',
      maintenanceMode: 'Maintenance Mode',
      save: 'Save Changes',
      cancel: 'Cancel',
      settingsSaved: 'Role-specific settings saved successfully'
    },
    es: {
      salespersonSettings: 'Configuración de Vendedor',
      adminSettings: 'Configuración de Administrador',
      territory: 'Territorio de Ventas',
      quota: 'Cuota Anual ($)',
      mobileSync: 'Sincronización Móvil',
      offlineMode: 'Modo Sin Conexión',
      autoCheckIn: 'Check-in Automático',
      leadNotifications: 'Notificaciones de Clientes Potenciales',
      systemNotifications: 'Notificaciones del Sistema',
      auditLogs: 'Registros de Auditoría',
      userManagementAlerts: 'Alertas de Gestión de Usuarios',
      backupNotifications: 'Notificaciones de Respaldo',
      securityAlerts: 'Alertas de Seguridad',
      maintenanceMode: 'Modo de Mantenimiento',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      settingsSaved: 'Configuración específica del rol guardada exitosamente'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    if (userRole === 'salesperson') {
      setOriginalSettings({ ...salespersonSettings });
    } else {
      setOriginalSettings({ ...adminSettings });
    }
  }, [userRole]);

  useEffect(() => {
    const currentSettings = userRole === 'salesperson' ? salespersonSettings : adminSettings;
    const hasChanges = JSON.stringify(currentSettings) !== JSON.stringify(originalSettings);
    setHasUnsavedChanges(hasChanges);
  }, [salespersonSettings, adminSettings, originalSettings, userRole, setHasUnsavedChanges]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (userRole === 'salesperson') {
      setSalespersonSettings(prev => ({ ...prev, [name]: value }));
    } else {
      setAdminSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleToggle = (setting) => {
    if (userRole === 'salesperson') {
      setSalespersonSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
    } else {
      setAdminSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
    }
  };

  const handleSave = () => {
    const currentSettings = userRole === 'salesperson' ? salespersonSettings : adminSettings;
    setOriginalSettings({ ...currentSettings });
    onSave(currentSettings);
  };

  const handleCancel = () => {
    if (userRole === 'salesperson') {
      setSalespersonSettings({ ...originalSettings });
    } else {
      setAdminSettings({ ...originalSettings });
    }
    onCancel();
  };

  const ToggleSwitch = ({ label, checked, onChange }) => (
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

  const t = languages[currentLanguage];

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-2">
          {userRole === 'salesperson' ? t.salespersonSettings : t.adminSettings}
        </h3>
        <p className="text-sm text-text-secondary font-caption">
          Configure role-specific preferences and settings.
        </p>
      </div>

      {userRole === 'salesperson' ? (
        <div className="space-y-6">
          {/* Territory and Quota Settings */}
          <div className="bg-surface-secondary rounded-lg p-6 border border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center">
                <Icon name="MapPin" size={18} className="text-primary-600" />
              </div>
              <h4 className="text-md font-medium text-text-primary font-heading">
                Territory & Quota
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary font-body mb-2">
                  {t.territory}
                </label>
                <Input
                  type="text"
                  name="territory"
                  value={salespersonSettings.territory}
                  onChange={handleInputChange}
                  placeholder={t.territory}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary font-body mb-2">
                  {t.quota}
                </label>
                <Input
                  type="number"
                  name="quota"
                  value={salespersonSettings.quota}
                  onChange={handleInputChange}
                  placeholder={t.quota}
                />
              </div>
            </div>
          </div>

          {/* Mobile App Settings */}
          <div className="bg-surface-secondary rounded-lg p-6 border border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center">
                <Icon name="Smartphone" size={18} className="text-primary-600" />
              </div>
              <h4 className="text-md font-medium text-text-primary font-heading">
                Mobile App Preferences
              </h4>
            </div>
            
            <div className="space-y-1">
              <ToggleSwitch
                label={t.mobileSync}
                checked={salespersonSettings.mobileSync}
                onChange={() => handleToggle('mobileSync')}
              />
              <ToggleSwitch
                label={t.offlineMode}
                checked={salespersonSettings.offlineMode}
                onChange={() => handleToggle('offlineMode')}
              />
              <ToggleSwitch
                label={t.autoCheckIn}
                checked={salespersonSettings.autoCheckIn}
                onChange={() => handleToggle('autoCheckIn')}
              />
              <ToggleSwitch
                label={t.leadNotifications}
                checked={salespersonSettings.leadNotifications}
                onChange={() => handleToggle('leadNotifications')}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* System Administration Settings */}
          <div className="bg-surface-secondary rounded-lg p-6 border border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center">
                <Icon name="Settings" size={18} className="text-primary-600" />
              </div>
              <h4 className="text-md font-medium text-text-primary font-heading">
                System Administration
              </h4>
            </div>
            
            <div className="space-y-1">
              <ToggleSwitch
                label={t.systemNotifications}
                checked={adminSettings.systemNotifications}
                onChange={() => handleToggle('systemNotifications')}
              />
              <ToggleSwitch
                label={t.auditLogs}
                checked={adminSettings.auditLogs}
                onChange={() => handleToggle('auditLogs')}
              />
              <ToggleSwitch
                label={t.userManagementAlerts}
                checked={adminSettings.userManagementAlerts}
                onChange={() => handleToggle('userManagementAlerts')}
              />
              <ToggleSwitch
                label={t.backupNotifications}
                checked={adminSettings.backupNotifications}
                onChange={() => handleToggle('backupNotifications')}
              />
              <ToggleSwitch
                label={t.securityAlerts}
                checked={adminSettings.securityAlerts}
                onChange={() => handleToggle('securityAlerts')}
              />
              <ToggleSwitch
                label={t.maintenanceMode}
                checked={adminSettings.maintenanceMode}
                onChange={() => handleToggle('maintenanceMode')}
              />
            </div>
          </div>
        </div>
      )}

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

export default RoleSpecificSection;