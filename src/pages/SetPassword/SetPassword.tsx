import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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

const SetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authAPI.setPassword({
        invitation_token: token,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to set password. Please try again.');
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
              message="Password set successfully!" 
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
                All Set! 🎉
              </Typography>
              
              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
                mb={3}
              >
                Your password has been set successfully. 
                You can now log in with your new password.
              </Typography>
              
              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                Redirecting to login page...
              </Typography>
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
            message="Let's set your new password!" 
            emotion="excited"
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
              Set New Password 🔑
            </Typography>
            
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Choose a strong password for your account.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                margin="normal"
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
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
                  disabled={loading || !formData.password || !formData.confirmPassword}
                  animationType="bounce"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Set Password'
                  )}
                </AnimatedButton>
              </Box>
            </form>
          </FormPaper>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default SetPassword;