import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SecuritySection = ({ isActive, onSave, onCancel, hasUnsavedChanges, setHasUnsavedChanges }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});
  const [activeSessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on MacBook',
      location: 'Boston, MA',
      lastActive: '2 days ago',
      current: false
    }
  ]);

  const languages = {
    en: {
      securitySettings: 'Security Settings',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      twoFactorAuth: 'Two-Factor Authentication',
      twoFactorDesc: 'Add an extra layer of security to your account',
      enable: 'Enable',
      disable: 'Disable',
      activeSessions: 'Active Sessions',
      currentSession: 'Current Session',
      terminateSession: 'Terminate',
      terminateAll: 'Terminate All Other Sessions',
      save: 'Save Changes',
      cancel: 'Cancel',
      show: 'Show',
      hide: 'Hide',
      passwordRequired: 'Current password is required',
      newPasswordRequired: 'New password is required',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordUpdated: 'Password updated successfully',
      sessionTerminated: 'Session terminated successfully'
    },
    es: {
      securitySettings: 'Configuración de Seguridad',
      changePassword: 'Cambiar Contraseña',
      currentPassword: 'Contraseña Actual',
      newPassword: 'Nueva Contraseña',
      confirmPassword: 'Confirmar Nueva Contraseña',
      twoFactorAuth: 'Autenticación de Dos Factores',
      twoFactorDesc: 'Agrega una capa extra de seguridad a tu cuenta',
      enable: 'Habilitar',
      disable: 'Deshabilitar',
      activeSessions: 'Sesiones Activas',
      currentSession: 'Sesión Actual',
      terminateSession: 'Terminar',
      terminateAll: 'Terminar Todas las Otras Sesiones',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      show: 'Mostrar',
      hide: 'Ocultar',
      passwordRequired: 'La contraseña actual es obligatoria',
      newPasswordRequired: 'La nueva contraseña es obligatoria',
      passwordMismatch: 'Las contraseñas no coinciden',
      passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
      passwordUpdated: 'Contraseña actualizada exitosamente',
      sessionTerminated: 'Sesión terminada exitosamente'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const hasChanges = Object.values(passwordData).some(value => value !== '');
    setHasUnsavedChanges(hasChanges);
  }, [passwordData, setHasUnsavedChanges]);

  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = t.passwordRequired;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = t.newPasswordRequired;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = t.passwordTooShort;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }

    return newErrors;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordSave = () => {
    const newErrors = validatePassword();
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate password update
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      onSave({ type: 'password', data: passwordData });
    } else {
      setErrors(newErrors);
    }
  };

  const handlePasswordCancel = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    onCancel();
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    onSave({ type: 'twoFactor', enabled: !twoFactorEnabled });
  };

  const handleTerminateSession = (sessionId) => {
    // Simulate session termination
    console.log('Terminating session:', sessionId);
  };

  const handleTerminateAllSessions = () => {
    // Simulate terminating all other sessions
    console.log('Terminating all other sessions');
  };

  const t = languages[currentLanguage];

  if (!isActive) return null;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-2">
          {t.securitySettings}
        </h3>
        <p className="text-sm text-text-secondary font-caption">
          Manage your account security and authentication settings.
        </p>
      </div>

      {/* Change Password Section */}
      <div className="bg-surface-secondary rounded-lg p-6 border border-border">
        <h4 className="text-md font-medium text-text-primary font-heading mb-4">
          {t.changePassword}
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary font-body mb-2">
              {t.currentPassword} *
            </label>
            <div className="relative">
              <Input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder={t.currentPassword}
                className={`pr-10 ${errors.currentPassword ? 'border-error' : ''}`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 touch-target"
              >
                <Icon name={showPasswords.current ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-xs text-error font-caption">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary font-body mb-2">
              {t.newPassword} *
            </label>
            <div className="relative">
              <Input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder={t.newPassword}
                className={`pr-10 ${errors.newPassword ? 'border-error' : ''}`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 touch-target"
              >
                <Icon name={showPasswords.new ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-error font-caption">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary font-body mb-2">
              {t.confirmPassword} *
            </label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder={t.confirmPassword}
                className={`pr-10 ${errors.confirmPassword ? 'border-error' : ''}`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 touch-target"
              >
                <Icon name={showPasswords.confirm ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-error font-caption">{errors.confirmPassword}</p>
            )}
          </div>

          {hasUnsavedChanges && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                variant="primary"
                onClick={handlePasswordSave}
                iconName="Save"
                iconPosition="left"
                className="sm:w-auto"
              >
                {t.save}
              </Button>
              <Button
                variant="outline"
                onClick={handlePasswordCancel}
                iconName="X"
                iconPosition="left"
                className="sm:w-auto"
              >
                {t.cancel}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-surface-secondary rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-md font-medium text-text-primary font-heading mb-1">
              {t.twoFactorAuth}
            </h4>
            <p className="text-sm text-text-secondary font-caption">
              {t.twoFactorDesc}
            </p>
          </div>
          <Button
            variant={twoFactorEnabled ? 'danger' : 'primary'}
            onClick={handleTwoFactorToggle}
            iconName={twoFactorEnabled ? 'Shield' : 'ShieldCheck'}
            iconPosition="left"
          >
            {twoFactorEnabled ? t.disable : t.enable}
          </Button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-surface-secondary rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-text-primary font-heading">
            {t.activeSessions}
          </h4>
          <Button
            variant="outline"
            onClick={handleTerminateAllSessions}
            iconName="LogOut"
            iconPosition="left"
            size="sm"
          >
            {t.terminateAll}
          </Button>
        </div>

        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-surface rounded-md border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Icon name="Monitor" size={20} className="text-secondary-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary font-body">
                      {session.device}
                    </span>
                    {session.current && (
                      <span className="px-2 py-1 text-xs bg-success-100 text-success-700 rounded-full font-caption">
                        {t.currentSession}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-text-secondary font-caption">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTerminateSession(session.id)}
                  iconName="X"
                  iconPosition="left"
                >
                  {t.terminateSession}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;