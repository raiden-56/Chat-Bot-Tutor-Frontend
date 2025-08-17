import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// OUTERMOST FIXED LAYOUT - Full Screen
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
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
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
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
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

const EmailVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await authAPI.verifyEmail(email);
      navigate('/login', { state: { email } });
    } catch (error: any) {
      if (error.response?.status === 404) {
        navigate('/registration', { state: { email } });
      } else {
        setError('Something went wrong. Please try again.');
      }
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
            <Typography
              variant="h4"
              component="h1"
              align="center"
              color="primary"
              fontWeight="bold"
              sx={{ mb: 2, fontSize: '2rem' }}
            >
              Verify Email
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Enter your email to get started on your learning adventure!
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                    'Continue'
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

export default EmailVerification;
