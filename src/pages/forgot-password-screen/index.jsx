import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationCard from '../../components/ui/AuthenticationCard';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetInstructions from './components/ResetInstructions';

const ForgotPasswordScreen = () => {
  const [currentStep, setCurrentStep] = useState('form'); // 'form' or 'instructions'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  const languages = {
    en: {
      resetPassword: 'Reset Your Password',
      resetSubtitle: 'Enter your email address and we\'ll send you a link to reset your password.',
      emailSent: 'Password reset link has been sent to your email address.',
      invalidEmail: 'No account found with this email address.',
      rateLimited: 'Too many reset attempts. Please wait 15 minutes before trying again.',
      networkError: 'Network error. Please check your connection and try again.',
      resendSuccess: 'Reset link has been sent again.',
      resendError: 'Failed to resend reset link. Please try again.'
    },
    es: {
      resetPassword: 'Restablecer tu Contraseña',
      resetSubtitle: 'Ingresa tu dirección de correo y te enviaremos un enlace para restablecer tu contraseña.',
      emailSent: 'El enlace de restablecimiento de contraseña ha sido enviado a tu correo.',
      invalidEmail: 'No se encontró cuenta con esta dirección de correo.',
      rateLimited: 'Demasiados intentos de restablecimiento. Por favor espera 15 minutos antes de intentar nuevamente.',
      networkError: 'Error de red. Por favor verifica tu conexión e intenta nuevamente.',
      resendSuccess: 'El enlace de restablecimiento ha sido enviado nuevamente.',
      resendError: 'Error al reenviar el enlace de restablecimiento. Por favor intenta nuevamente.'
    }
  };

  // Mock valid email addresses for demonstration
  const validEmails = [
    'john.smith@company.com',
    'sarah.johnson@company.com',
    'admin@company.com',
    'sales@company.com',
    'manager@company.com'
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const simulatePasswordReset = async (email) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if email exists in our mock database
    if (!validEmails.includes(email.toLowerCase())) {
      throw new Error('invalid_email');
    }
    
    // Simulate rate limiting (check localStorage for recent attempts)
    const lastAttempt = localStorage.getItem('lastResetAttempt');
    const now = Date.now();
    
    if (lastAttempt && (now - parseInt(lastAttempt)) < 900000) { // 15 minutes
      throw new Error('rate_limited');
    }
    
    // Store attempt timestamp
    localStorage.setItem('lastResetAttempt', now.toString());
    
    return { success: true };
  };

  const handlePasswordReset = async (email) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await simulatePasswordReset(email);
      setSubmittedEmail(email);
      setSuccess(t.emailSent);
      setCurrentStep('instructions');
    } catch (err) {
      switch (err.message) {
        case 'invalid_email':
          setError(t.invalidEmail);
          break;
        case 'rate_limited':
          setError(t.rateLimited);
          break;
        default:
          setError(t.networkError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    
    try {
      await simulatePasswordReset(submittedEmail);
      setSuccess(t.resendSuccess);
    } catch (err) {
      setError(t.resendError);
    } finally {
      setIsResending(false);
    }
  };

  const t = languages[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationCard
        title={currentStep === 'form' ? t.resetPassword : ''}
        subtitle={currentStep === 'form' ? t.resetSubtitle : ''}
        showLogo={true}
      >
        {currentStep === 'form' ? (
          <ForgotPasswordForm
            onSubmit={handlePasswordReset}
            isLoading={isLoading}
            error={error}
            success={success}
          />
        ) : (
          <ResetInstructions
            email={submittedEmail}
            onResend={handleResendEmail}
            isResending={isResending}
          />
        )}
      </AuthenticationCard>
    </div>
  );
};

export default ForgotPasswordScreen;