import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const EmailVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      await authAPI.verifyEmail(email);
      // Email exists, redirect to login with prefilled email
      navigate('/login', { state: { email } });
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Email not found, redirect to registration
        navigate('/registration', { state: { email } });
      } else {
        setError('Something went wrong. Please try again.');
      }
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
            message="Hi there! Let's get started!" 
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
              Welcome to ChatTutor! 🎓
            </Typography>
            
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Enter your email to get started on your learning adventure!
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                  },
                }}
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
                    'Continue'
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

export default EmailVerification;