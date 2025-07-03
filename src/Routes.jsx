import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginScreen from "pages/login-screen";
import ForgotPasswordScreen from "pages/forgot-password-screen";
import SalespersonDashboard from "pages/salesperson-dashboard";
import UserProfileSettings from "pages/user-profile-settings";
import AdministratorDashboard from "pages/administrator-dashboard";
import CustomerManagement from "pages/customer-management";
import LeadManagement from "pages/lead-management";
import SalesAnalyticsDashboard from "pages/sales-analytics-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/forgot-password-screen" element={<ForgotPasswordScreen />} />
        <Route path="/salesperson-dashboard" element={<SalespersonDashboard />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/administrator-dashboard" element={<AdministratorDashboard />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/lead-management" element={<LeadManagement />} />
        <Route path="/sales-analytics-dashboard" element={<SalesAnalyticsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;