import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import theme from './theme/theme';

// Layout
import Layout from './components/Layout/Layout';

// Pages (existing, kept)
import EmailVerification from './pages/EmailVerification/EmailVerification';
import Registration from './pages/Registration/Registration';
import ConfirmRegistration from './pages/Registration/ConfirmRegistration';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SetPassword from './pages/SetPassword/SetPassword';

// New/Re-created Pages
import Dashboard from './pages/Dashboard/Dashboard';
import KidsPage from './pages/Kids/KidsPage';
import ProfilePage from './pages/Profile/ProfilePage';


// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<EmailVerification />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/confirm-registration" element={<ConfirmRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/set-password" element={<SetPassword />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/kids" 
              element={
                <ProtectedRoute>
                  <KidsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect any unknown routes to login if not authenticated, or dashboard if authenticated */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;