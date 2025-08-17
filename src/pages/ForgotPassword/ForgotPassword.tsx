import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const ForgotPassword: React.FC = () => {
  useNoScroll();
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

  return (
    <FullScreenRoot>
      <LeftSide />
      <RightSide>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: 0 }}
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
                  Email Sent! 📧
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  We've sent a password reset link to {email}.
                  Please check your inbox and follow the instructions.
                </Typography>
                <Box textAlign="center">
                  <BackLink to="/login">
                    Back to Login
                  </BackLink>
                </Box>
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
                  Reset Password 🔐
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', margin: 0 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      disabled={loading || !email}
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
              </>
            )}
          </FormPaper>
        </motion.div>
      </RightSide>
    </FullScreenRoot>
  );
};

export default ForgotPassword;
