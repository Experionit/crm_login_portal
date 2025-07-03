import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginCard from './components/LoginCard';
import LoginForm from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';
import LoginFooter from './components/LoginFooter';

const LoginScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authUser = localStorage.getItem('authUser');
    const authToken = localStorage.getItem('authToken');
    
    if (authUser && authToken) {
      const user = JSON.parse(authUser);
      // Redirect to appropriate dashboard based on role
      if (user.role === 'salesperson') {
        navigate('/salesperson-dashboard');
      } else if (user.role === 'administrator') {
        navigate('/administrator-dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <LoginHeader />

          {/* Login Card */}
          <LoginCard>
            <LoginForm />
          </LoginCard>

          {/* Footer */}
          <div className="mt-8">
            <LoginFooter />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent opacity-10 rounded-full blur-3xl" />
    </div>
  );
};

export default LoginScreen;