import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import { authAPI } from '../../services/api';
import ChatBotTutorImg from '../../assets/ChatBotTutor.png';

const useNoScroll = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);
};

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
  maxWidth: 420,
  padding: theme.spacing(5, 4),
  borderRadius: 32,
  background: 'rgba(18,25,61, 0.98)',
  boxShadow: '0 8px 45px rgba(23,165,255,0.22)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const BackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SetPassword: React.FC = () => {
  useNoScroll();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract values from URL query
  const emailParam = searchParams.get('email') || '';
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
      await authAPI.setPassword({
        invitation_token: token,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { email: emailParam } });
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to set password. Please try again.');
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
                  All Set! 🎉
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Your password has been set successfully.
                  You can now log in with your new password.
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
                  Set New Password 🔑
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Choose a strong password for your account.
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', margin: 0 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={emailParam}
                    disabled
                    margin="normal"
                    variant="outlined"
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        background: 'rgba(41,121,255,0.08)',
                        color: '#fff',
                      },
                      input: { color: '#fff' },
                      label: { color: '#82B1FF' },
                    }}
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
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        background: 'rgba(41,121,255,0.08)',
                        color: '#fff',
                      },
                      input: { color: '#fff' },
                      label: { color: '#82B1FF' },
                    }}
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
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        background: 'rgba(41,121,255,0.08)',
                        color: '#fff',
                      },
                      input: { color: '#fff' },
                      label: { color: '#82B1FF' },
                    }}
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
                      sx={{
                        py: 1.5,
                        borderRadius: '38px',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(90deg, #23a5ff 0%, #23ffd9 100%)',
                        color: '#fff',
                      }}
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

export default SetPassword;
