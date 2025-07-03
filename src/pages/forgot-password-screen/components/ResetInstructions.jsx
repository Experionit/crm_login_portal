import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ResetInstructions = ({ email, onResend, isResending }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = {
    en: {
      checkEmail: 'Check Your Email',
      instructionsText: `We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.`,estimatedTime: 'The email should arrive within 5-10 minutes.',notReceived: "Didn\'t receive the email?",checkSpam: 'Check your spam or junk folder',resendLink: 'Resend reset link',contactSupport: 'Contact support if you continue to have issues',backToLogin: 'Back to Login'
    },
    es: {
      checkEmail: 'Revisa tu Correo',
      instructionsText: `Hemos enviado un enlace de restablecimiento de contraseña a tu dirección de correo. Por favor revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.`,
      estimatedTime: 'El correo debería llegar en 5-10 minutos.',notReceived: '¿No recibiste el correo?',checkSpam: 'Revisa tu carpeta de spam o correo no deseado',resendLink: 'Reenviar enlace de restablecimiento',contactSupport: 'Contacta soporte si continúas teniendo problemas',backToLogin: 'Volver al Inicio de Sesión'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = languages[currentLanguage];

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
          <Icon name="Mail" size={32} className="text-success" />
        </div>
      </div>

      {/* Main Message */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary font-heading">
          {t.checkEmail}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {t.instructionsText}
        </p>
        <p className="text-xs text-text-tertiary">
          {t.estimatedTime}
        </p>
      </div>

      {/* Email Display */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-md p-3">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Mail" size={16} className="text-secondary-600" />
          <span className="text-sm font-medium text-text-primary font-data">
            {email}
          </span>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4 pt-4 border-t border-border">
        <p className="text-sm font-medium text-text-primary">
          {t.notReceived}
        </p>
        
        <div className="space-y-3">
          {/* Check Spam */}
          <div className="flex items-center space-x-3 text-left">
            <div className="w-6 h-6 bg-warning-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="AlertTriangle" size={14} className="text-warning-600" />
            </div>
            <span className="text-sm text-text-secondary">
              {t.checkSpam}
            </span>
          </div>

          {/* Resend Link */}
          <div className="flex items-center space-x-3 text-left">
            <div className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="RefreshCw" size={14} className="text-accent-600" />
            </div>
            <button
              onClick={onResend}
              disabled={isResending}
              className="text-sm text-accent hover:text-accent-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isResending ? 'Sending...' : t.resendLink}
            </button>
          </div>

          {/* Contact Support */}
          <div className="flex items-center space-x-3 text-left">
            <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="HelpCircle" size={14} className="text-secondary-600" />
            </div>
            <span className="text-sm text-text-secondary">
              {t.contactSupport}
            </span>
          </div>
        </div>
      </div>

      {/* Back to Login */}
      <div className="pt-4">
        <button
          onClick={() => window.location.href = '/login-screen'}
          className="inline-flex items-center space-x-2 text-sm text-text-secondary hover:text-primary transition-colors duration-200 touch-target"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>{t.backToLogin}</span>
        </button>
      </div>
    </div>
  );
};

export default ResetInstructions;