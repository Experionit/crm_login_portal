import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { resetPassword, authError, clearError } = useAuth();

  const validateEmail = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');
    clearError();

    try {
      const result = await resetPassword(email);

      if (result?.success) {
        setSuccessMessage('Password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.');
        setEmail(''); // Clear form on success
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    
    // Clear errors when user starts typing
    if (errors.email) {
      setErrors({});
    }
    if (authError) {
      clearError();
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login-screen');
  };

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

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-success-50 border border-success-200 rounded-md">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={20} className="text-success mr-3 flex-shrink-0" />
            <p className="text-sm text-success font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
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
        <p className="text-xs text-text-secondary">
          Enter the email address associated with your account and we will send you a link to reset your password.
        </p>
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
        {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
      </Button>

      {/* Back to Login */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleBackToLogin}
          disabled={isLoading}
          className="text-sm text-accent hover:text-accent-700 transition-colors duration-200 focus-ring rounded"
        >
          ← Back to Login
        </button>
      </div>

      {/* Supabase Info */}
      <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-md">
        <h4 className="text-sm font-medium text-text-primary mb-2">Password Reset via Supabase:</h4>
        <div className="space-y-1 text-xs text-text-secondary">
          <p>• Reset emails are sent through Supabase Auth</p>
          <p>• Check your spam/junk folder if you do not receive the email</p>
          <p>• The reset link will expire after 1 hour for security</p>
          <p>• You can request a new reset link if needed</p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;