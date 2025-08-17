import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import { authAPI } from '../../services/api';
import ChatBotTutorImg from '../../assets/ChatBotTutor.png';

const FullScreenRoot = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(90deg, #23a5ff 0%, #12193D 100%)',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: '100vh',
  },
}));

const LeftSide = styled('div')(({ theme }) => ({
  flex: 1,
  height: '100vh',
  backgroundImage: `url(${ChatBotTutorImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    height: '40vh',
    borderRadius: 0,
  },
}));

const RightSide = styled('div')(({ theme }) => ({
  flex: 1,
  height: '100vh',
  background: 'rgba(18,25,61,0.97)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    height: '60vh',
    borderRadius: 0,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(5),
  },
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  padding: theme.spacing(5, 4),
  borderRadius: 32,
  background: 'rgba(18,25,61, 0.98)',
  boxShadow: '0 8px 45px rgba(23,165,255,0.22)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  // Success state
  if (success) {
    return (
      <FullScreenRoot>
        <LeftSide />
        <RightSide>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              margin: 0,
            }}
          >
            <FormPaper elevation={6}>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                color="primary"
                fontWeight="bold"
                sx={{ mb: 2, mt: 2, fontSize: '2rem' }}
              >
                Registration Successful! 🎉
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                We've sent a verification email to {formData.email}. 
                Please check your inbox and follow the instructions to complete your registration.
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
              >
                Redirecting to login page...
              </Typography>
            </FormPaper>
          </motion.div>
        </RightSide>
      </FullScreenRoot>
    );
  }

  // Form
  return (
    <FullScreenRoot>
      <LeftSide />
      <RightSide>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: 0,
          }}
        >
          <FormPaper elevation={6}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              color="primary"
              fontWeight="bold"
              sx={{ mb: 2, mt: 2, fontSize: '2rem' }}
            >
              Create Your Account 🚀
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Fill in your details to join the ChatTutor family!
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
      </RightSide>
    </FullScreenRoot>
  );
};

export default Registration;
