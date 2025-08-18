import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';

import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import { authAPI } from '../../services/api';
import { FullScreenRoot, LeftSide, RightSide, FormPaper, textFieldSx, buttonSx } from '../../components/AuthStyles/AuthStyles';
import useNoScroll from '../../hooks/useNoScroll';
import { styled } from '@mui/material/styles';

// If you want to use custom styles:
const BackLink = styled(Link)({
  textDecoration: 'underline',
  color: '#1976d2',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    color: '#115293',
  },
});

// MAIN COMPONENT
const ConfirmRegistration: React.FC = () => {
  useNoScroll();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailParam = searchParams.get('email') || '';
  const tokenParam = searchParams.get('token') || '';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await authAPI.createUser({
        password: formData.password,
        token: tokenParam,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { email: emailParam } });
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to confirm registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            {success ? (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  color="primary"
                  fontWeight="bold"
                  sx={{ mb: 2, fontSize: '2rem' }}
                >
                  Registration Confirmed! 🎉
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Your account is now ready. You can log in with your new password.
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Redirecting to login page...
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  color="primary"
                  fontWeight="bold"
                  sx={{ mb: 2, fontSize: '2rem' }}
                >
                  Complete Your Registration
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Set your password to activate your account.
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', margin: 0 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={emailParam}
                    margin="normal"
                    variant="outlined"
                    disabled
                    sx={textFieldSx}
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    margin="normal"
                    required
                    variant="outlined"
                    sx={textFieldSx}
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
                    sx={textFieldSx}
                  />
                  {error && (
                    <Alert severity="error" sx={{ mt: 1, borderRadius: '8px' }}>
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
                      sx={buttonSx}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Set Password'
                      )}
                    </AnimatedButton>
                  </Box>
                </form>
                <Box mt={3} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    <BackLink to="/login">
                      Back to Login
                    </BackLink>
                  </Typography>
                </Box>
              </>
            )}
          </FormPaper>
        </motion.div>
      </RightSide>
    </FullScreenRoot>
  );
};

export default ConfirmRegistration;
