import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import theme from './theme/theme';

// Pages
import EmailVerification from './pages/EmailVerification/EmailVerification';
import Registration from './pages/Registration/Registration';
import ConfirmRegistration from './pages/Registration/ConfirmRegistration';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SetPassword from './pages/SetPassword/SetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import ChildMode from './pages/ChildMode/ChildMode';
import Chat from './pages/Chat/Chat';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/" replace />;
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
              path="/child/:kidId" 
              element={
                <ProtectedRoute>
                  <ChildMode />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat/:kidId" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
