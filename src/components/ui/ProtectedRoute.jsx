import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, fallback = null }) => {
  const { user, userProfile, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show fallback or redirect
  if (!user) {
    if (fallback) {
      return fallback;
    }
    
    // Rocket Platform Development Mode: Show preview with login prompt
    return (
      <div className="min-h-screen bg-surface">
        {/* Preview Mode Banner */}
        <div className="bg-warning-100 border-b border-warning-200 px-4 py-2">
          <div className="flex items-center justify-center">
            <p className="text-sm text-warning-800 font-medium">
              🚀 Preview Mode - Please sign in to access full functionality
            </p>
          </div>
        </div>
        
        {/* Preview Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-60px)] px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-primary">Authentication Required</h2>
              <p className="text-text-secondary">
                This page requires authentication. Please sign in to continue.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/login-screen'}
                className="w-full bg-accent text-accent-foreground hover:bg-accent-600 font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Sign In
              </button>
              
              <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-md text-left">
                <h4 className="text-sm font-medium text-text-primary mb-2">Test Credentials:</h4>
                <div className="space-y-1 text-xs text-text-secondary">
                  <div><strong>Salesperson:</strong> sales@crm.com / Sales123!</div>
                  <div><strong>Administrator:</strong> admin@crm.com / Admin123!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check role-based access if required
  if (requiredRole && userProfile?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-primary">Access Denied</h2>
            <p className="text-text-secondary">
              You do not have permission to access this page. Required role: {requiredRole}
            </p>
          </div>
          
          <button
            onClick={() => {
              // Navigate to appropriate dashboard based on user role
              if (userProfile?.role === 'administrator') {
                window.location.href = '/administrator-dashboard';
              } else {
                window.location.href = '/salesperson-dashboard';
              }
            }}
            className="bg-accent text-accent-foreground hover:bg-accent-600 font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role (if specified)
  return children;
};

export default ProtectedRoute;