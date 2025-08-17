import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
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
  maxWidth: 500,
  margin: '0 auto',
}));

const Registration: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    name: '',
    email: prefilledEmail,
    gender: '',
    role: 'parent',
    phone_number: '',
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
    setLoading(true);
    setError('');

    try {
      await authAPI.sendVerification(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { email: formData.email } });
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
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
              message="Awesome! Check your email!" 
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
                Registration Successful! 🎉
              </Typography>
              
              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
                mb={3}
              >
                We've sent a verification email to {formData.email}. 
                Please check your inbox and follow the instructions to complete your registration.
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
            message="Let's create your account!" 
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
              Create Your Account 🚀
            </Typography>
            
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Fill in your details to join the ChatTutor family!
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
                margin="normal"
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                margin="normal"
                required
                variant="outlined"
                disabled={!!prefilledEmail}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
              />

              <TextField
                fullWidth
                select
                label="Gender"
                value={formData.gender}
                onChange={handleChange('gender')}
                margin="normal"
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleChange('phone_number')}
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
                    'Create Account'
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

export default Registration;