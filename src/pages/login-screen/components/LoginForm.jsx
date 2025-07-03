import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'salesperson',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, authError, clearError } = useAuth();

  const languages = {
    en: {
      email: 'Email Address',
      password: 'Password',
      role: 'Select Role',
      salesperson: 'Salesperson',
      administrator: 'Administrator',
      signIn: 'Sign In',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot Password?',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      roleRequired: 'Please select a role',
      invalidEmail: 'Please enter a valid email address',
      invalidCredentials: 'Invalid email or password',
      systemError: 'System error. Please try again later.',
      signingIn: 'Signing In...',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      connectionError: 'Cannot connect to authentication service. Please check your internet connection.'
    },
    es: {
      email: 'Dirección de Correo',
      password: 'Contraseña',
      role: 'Seleccionar Rol',
      salesperson: 'Vendedor',
      administrator: 'Administrador',
      signIn: 'Iniciar Sesión',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      emailRequired: 'El correo es requerido',
      passwordRequired: 'La contraseña es requerida',
      roleRequired: 'Por favor selecciona un rol',
      invalidEmail: 'Por favor ingresa un correo válido',
      invalidCredentials: 'Correo o contraseña inválidos',
      systemError: 'Error del sistema. Intenta más tarde.',
      signingIn: 'Iniciando Sesión...',
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
      connectionError: 'No se puede conectar al servicio. Revisa tu conexión.'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Clear any previous auth errors
    clearError();

    // Load remembered user if available
    const rememberedUser = localStorage.getItem('rememberUser');
    if (rememberedUser) {
      try {
        const userData = JSON.parse(rememberedUser);
        setFormData(prev => ({
          ...prev,
          email: userData?.email || '',
          role: userData?.role || 'salesperson',
          rememberMe: true
        }));
      } catch (error) {
        localStorage.removeItem('rememberUser');
      }
    }
  }, [clearError]);

  const validateForm = () => {
    const newErrors = {};
    const t = languages[currentLanguage];

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    }

    if (!formData.role) {
      newErrors.role = t.roleRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear auth error when user modifies form
    if (authError) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const result = await signIn(formData.email, formData.password);

      if (result?.success && result?.data?.user) {
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberUser', JSON.stringify({
            email: formData.email,
            role: formData.role
          }));
        } else {
          localStorage.removeItem('rememberUser');
        }

        // Wait a moment for user profile to load, then navigate based on role
        setTimeout(() => {
          // For development preview mode, navigate based on selected role
          // In production, this should be based on actual user role from database
          if (formData.role === 'administrator') {
            navigate('/administrator-dashboard');
          } else {
            navigate('/salesperson-dashboard');
          }
        }, 500);
      }
    } catch (error) {
      const t = languages[currentLanguage];
      setErrors({ general: t.systemError });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password-screen');
  };

  const t = languages[currentLanguage];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {(authError || errors.general) && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-md">
          <div className="flex items-center">
            <Icon name="AlertCircle" size={20} className="text-error mr-3 flex-shrink-0" />
            <p className="text-sm text-error font-medium">{authError || errors.general}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          {t.email}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t.email}
          disabled={isLoading}
          required
          className={`w-full ${errors.email ? 'border-error focus:border-error focus:ring-error' : ''}`}
        />
        {errors.email && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-text-primary">
          {t.password}
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t.password}
            disabled={isLoading}
            required
            className={`w-full pr-12 ${errors.password ? 'border-error focus:border-error focus:ring-error' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200 touch-target"
            aria-label={showPassword ? t.hidePassword : t.showPassword}
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Role Selection - For Development Preview Mode */}
      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-text-primary">
          {t.role}
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          disabled={isLoading}
          className={`w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 ${
            errors.role ? 'border-error focus:border-error focus:ring-error' : ''
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <option value="">{t.role}</option>
          <option value="salesperson">{t.salesperson}</option>
          <option value="administrator">{t.administrator}</option>
        </select>
        {errors.role && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.role}
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">{t.rememberMe}</span>
        </label>

        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={isLoading}
          className="text-sm text-accent hover:text-accent-700 transition-colors duration-200 focus-ring rounded"
        >
          {t.forgotPassword}
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading}
        loading={isLoading}
        className="touch-target"
      >
        {isLoading ? t.signingIn : t.signIn}
      </Button>

      {/* Supabase Test Credentials Info */}
      <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-md">
        <h4 className="text-sm font-medium text-text-primary mb-2">Supabase Test Credentials:</h4>
        <div className="space-y-2 text-xs text-text-secondary font-data">
          <div>
            <strong>Salesperson:</strong> sales@crm.com / Sales123!
          </div>
          <div>
            <strong>Administrator:</strong> admin@crm.com / Admin123!
          </div>
          <div className="mt-2 text-accent">
            <strong>Note:</strong> These accounts are created via Supabase Auth and stored in the database with proper role-based access control.
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;