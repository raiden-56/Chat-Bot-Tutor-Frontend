import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Quiz as QuizIcon,
  Assessment as AssessmentIcon,
  ExitToApp as ExitIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Layout from '../../components/Layout/Layout';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import Mascot from '../../components/Mascot/Mascot';
import { useAuth } from '../../contexts/AuthContext';
import { kidsAPI } from '../../services/api';
import { GetKidResponse } from '../../types/api';

const ChildPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '25px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
}));

const ActivityCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
  },
}));

const ChildMode: React.FC = () => {
  const { kidId } = useParams<{ kidId: string }>();
  const navigate = useNavigate();
  const { logout, setChildMode } = useAuth();
  const [kid, setKid] = useState<GetKidResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (kidId) {
      fetchKid(parseInt(kidId));
    }
  }, [kidId]);

  const fetchKid = async (id: number) => {
    try {
      const response = await kidsAPI.getKidById(id);
      setKid(response.data.data);
    } catch (error) {
      console.error('Failed to fetch kid:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setChildMode(false);
    logout();
    navigate('/');
  };

  const activities = [
    {
      title: 'Chat with Tutor',
      description: 'Ask me anything! I love to help you learn! 🤖',
      icon: <ChatIcon sx={{ fontSize: 60 }} />,
      color: 'linear-gradient(135deg, #48dbfb 0%, #00c2f7 100%)',
      action: () => navigate(`/chat/${kidId}`),
    },
    {
      title: 'Take a Quiz',
      description: 'Fun questions to test what you know! 🧠',
      icon: <QuizIcon sx={{ fontSize: 60 }} />,
      color: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      action: () => navigate(`/quiz/${kidId}`),
    },
    {
      title: 'My Progress',
      description: 'See how awesome you are doing! 📈',
      icon: <AssessmentIcon sx={{ fontSize: 60 }} />,
      color: 'linear-gradient(135deg, #1ddde8 0%, #2adea3 100%)',
      action: () => navigate(`/progress/${kidId}`),
    },
  ];

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress size={60} />
        </Box>
      </Layout>
    );
  }

  if (!kid) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography variant="h4" color="white">
            Kid not found
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" component="h1" color="white" fontWeight="bold">
              Hi {kid.name}! 🌟
            </Typography>
            <Typography variant="h5" color="rgba(255,255,255,0.9)">
              Ready to learn something amazing today?
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedButton
              variant="contained"
              startIcon={<ExitIcon />}
              onClick={handleLogout}
              sx={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'rgba(255,255,255,0.3)',
                },
              }}
            >
              Ask Parent to Login
            </AnimatedButton>
          </motion.div>
        </Box>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChildPaper sx={{ mb: 4 }}>
            <Mascot 
              message={`Welcome back, ${kid.name}! What would you like to do today?`}
              emotion="excited"
              size="large"
            />
            <Typography variant="h4" color="primary" fontWeight="bold" mt={2}>
              Your Learning Adventure Awaits! 🚀
            </Typography>
            <Typography variant="h6" color="text.secondary" mt={1}>
              Choose an activity below to start learning and having fun!
            </Typography>
          </ChildPaper>
        </motion.div>

        {/* Activities Grid */}
        <Grid container spacing={4}>
          {activities.map((activity, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
              >
                <ActivityCard onClick={activity.action}>
                  <CardContent sx={{ 
                    background: activity.color,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}>
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      {activity.icon}
                    </motion.div>
                    <Typography variant="h5" fontWeight="bold" mt={2} mb={1}>
                      {activity.title}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      {activity.description}
                    </Typography>
                  </CardContent>
                </ActivityCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Fun Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Box textAlign="center" mt={6}>
            <Typography variant="h6" color="rgba(255,255,255,0.8)">
              Remember: Learning is fun when you're curious! 🌈✨
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default ChildMode;