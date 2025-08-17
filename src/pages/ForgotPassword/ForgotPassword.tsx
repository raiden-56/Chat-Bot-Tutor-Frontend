import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { authAPI } from '../../services/api';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  maxWidth: 400,
  margin: '0 auto',
}));

const BackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.forgotPassword({ email });
      setSuccess(true);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
              message="Check your email!" 
              emotion="celebrating"
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
                Email Sent! 📧
              </Typography>
              
              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
                mb={3}
              >
                We've sent a password reset link to {email}. 
                Please check your inbox and follow the instructions.
              </Typography>
              
              <Box textAlign="center">
                <BackLink to="/login">
                  Back to Login
                </BackLink>
              </Box>
            </FormPaper>
          </motion.div>
        </Box>
      </Layout>
    );
  }

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
            message="Don't worry, I'll help!" 
            emotion="thinking"
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
              Reset Password 🔐
            </Typography>
            
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Enter your email address and we'll send you a link to reset your password.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  disabled={loading || !email}
                  animationType="bounce"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Send Reset Link'
                  )}
                </AnimatedButton>
              </Box>

              <Box mt={2} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{' '}
                  <BackLink to="/login">
                    Back to Login
                  </BackLink>
                </Typography>
              </Box>
            </form>
          </FormPaper>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default ForgotPassword;