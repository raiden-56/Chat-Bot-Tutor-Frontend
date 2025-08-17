import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Layout from '../../components/Layout/Layout';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import Mascot from '../../components/Mascot/Mascot';
import { useAuth } from '../../contexts/AuthContext';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  maxWidth: 400,
  margin: '0 auto',
}));

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const prefilledEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    email: prefilledEmail,
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        gap={4}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Mascot 
            message="Welcome back, friend!" 
            emotion="happy"
            size="large"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FormPaper elevation={0}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="center"
              color="primary"
              fontWeight="bold"
            >
              Welcome Back! 👋
            </Typography>
            
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Sign in to continue your learning journey!
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                margin="normal"
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                margin="normal"
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>
                  {error}
                </Alert>
              )}

              <Box mt={3}>
                <AnimatedButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  animationType="bounce"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign In'
                  )}
                </AnimatedButton>
              </Box>

              <Box mt={2} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Forgot your password?{' '}
                  <ForgotPasswordLink to="/forgot-password">
                    Reset it here
                  </ForgotPasswordLink>
                </Typography>
              </Box>
            </form>
          </FormPaper>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default Login;