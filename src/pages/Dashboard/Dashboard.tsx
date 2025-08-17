import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Quiz as QuizIcon,
  Chat as ChatIcon,
  Assessment as AssessmentIcon,
  ExitToApp as ExitIcon,
  ChildCare as ChildIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Layout from '../../components/Layout/Layout';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import Mascot from '../../components/Mascot/Mascot';
import { useAuth } from '../../hooks/useAuth';
import { kidsAPI } from '../../services/api';
import { GetKidResponse, KidRequest } from '../../types/api';

const DashboardPaper = styled(Paper)(() => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  height: '100%',
}));

const KidCard = styled(Card)(() => ({
  borderRadius: '15px',
  background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
}));

const ActionCard = styled(Card)(() => ({
  borderRadius: '15px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
}));

const Dashboard: React.FC = () => {
  const { user, logout, setChildMode } = useAuth();
  const navigate = useNavigate();
  const [kids, setKids] = useState<GetKidResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKid, setSelectedKid] = useState<GetKidResponse | null>(null);
  const [showAddKidDialog, setShowAddKidDialog] = useState(false);
  const [newKidData, setNewKidData] = useState<KidRequest>({
    name: '',
    age: 0,
    gender: '',
    school: '',
    standard: '',
  });
  const [error, setError] = useState('');
  const [addingKid, setAddingKid] = useState(false);

  useEffect(() => {
    fetchKids();
  }, []);

  const fetchKids = async () => {
    try {
      const response = await kidsAPI.getAllKids();
      setKids(response.data.data);
    } catch (error) {
      console.error('Failed to fetch kids:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKid = async () => {
    setAddingKid(true);
    setError('');

    try {
      await kidsAPI.createKid(newKidData);
      setShowAddKidDialog(false);
      setNewKidData({
        name: '',
        age: 0,
        gender: '',
        school: '',
        standard: '',
      });
      fetchKids();
    } catch (error: { response: { data: { message: string } } }) {
      setError(error.response?.data?.message || 'Failed to add kid');
    } finally {
      setAddingKid(false);
    }
  };

  const handleKidSelect = (kid: GetKidResponse) => {
    setSelectedKid(kid);
  };

  const handleChildModeToggle = () => {
    if (selectedKid) {
      setChildMode(true);
      navigate(`/child/${selectedKid.id}`);
    }
  };

  const actionCards = [
    {
      title: 'Chat with Tutor',
      description: 'Interactive learning with our AI tutor',
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #48dbfb 0%, #00c2f7 100%)',
      action: () => selectedKid && navigate(`/chat/${selectedKid.id}`),
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge with fun quizzes',
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      action: () => selectedKid && navigate(`/quiz/${selectedKid.id}`),
    },
    {
      title: 'View Progress',
      description: 'Track learning achievements',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(135deg, #1ddde8 0%, #2adea3 100%)',
      action: () => selectedKid && navigate(`/progress/${selectedKid.id}`),
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
            <Typography variant="h3" component="h1" color="white" fontWeight="bold">
              Welcome back, {user?.name}! 👋
            </Typography>
            <Typography variant="h6" color="rgba(255,255,255,0.8)">
              Ready to help your kids learn today?
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
              onClick={logout}
              sx={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.3)',
                },
              }}
            >
              Logout
            </AnimatedButton>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {/* Kids Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <DashboardPaper>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    Your Kids 👨‍👩‍👧‍👦
                  </Typography>
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => setShowAddKidDialog(true)}
                  >
                    <AddIcon />
                  </Fab>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <AnimatePresence>
                    {kids.map((kid, index) => (
                      <motion.div
                        key={kid.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <KidCard
                          onClick={() => handleKidSelect(kid)}
                          sx={{
                            border: selectedKid?.id === kid.id ? '3px solid #48dbfb' : 'none',
                          }}
                        >
                          <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}>
                                <ChildIcon />
                              </Avatar>
                              <Box>
                                <Typography variant="h6" fontWeight="bold" color="white">
                                  {kid.name}
                                </Typography>
                                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                                  Age {kid.age} • {kid.standard}
                                </Typography>
                                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                                  {kid.school}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </KidCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {kids.length === 0 && (
                    <Box textAlign="center" py={4}>
                      <Mascot message="Add your first kid to get started!" size="small" />
                      <Typography variant="body1" color="text.secondary" mt={2}>
                        Click the + button to add a child
                      </Typography>
                    </Box>
                  )}
                </Box>
              </DashboardPaper>
            </motion.div>
          </Grid>

          {/* Actions Section */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DashboardPaper>
                <Typography variant="h5" fontWeight="bold" color="primary" mb={3}>
                  Learning Activities 🎓
                </Typography>

                {selectedKid ? (
                  <>
                    <Box mb={3} p={2} bgcolor="rgba(72, 219, 251, 0.1)" borderRadius="10px">
                      <Typography variant="h6" color="secondary" fontWeight="bold">
                        Selected: {selectedKid.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Choose an activity below or hand over to child mode
                      </Typography>
                    </Box>

                    <Grid container spacing={3} mb={3}>
                      {actionCards.map((card, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <ActionCard onClick={card.action}>
                              <CardContent sx={{ textAlign: 'center', background: card.color }}>
                                <Box color="white" mb={2}>
                                  {card.icon}
                                </Box>
                                <Typography variant="h6" fontWeight="bold" color="white" mb={1}>
                                  {card.title}
                                </Typography>
                                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                                  {card.description}
                                </Typography>
                              </CardContent>
                            </ActionCard>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>

                    <Box textAlign="center">
                      <AnimatedButton
                        variant="contained"
                        size="large"
                        startIcon={<PersonIcon />}
                        onClick={handleChildModeToggle}
                        sx={{
                          background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
                          fontSize: '1.2rem',
                          py: 2,
                          px: 4,
                        }}
                      >
                        Hand Over to {selectedKid.name} 🎮
                      </AnimatedButton>
                    </Box>
                  </>
                ) : (
                  <Box textAlign="center" py={8}>
                    <Mascot message="Select a kid to start learning!" emotion="thinking" />
                    <Typography variant="h6" color="text.secondary" mt={2}>
                      Choose a child from the left panel to begin
                    </Typography>
                  </Box>
                )}
              </DashboardPaper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Add Kid Dialog */}
        <Dialog
          open={showAddKidDialog}
          onClose={() => setShowAddKidDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" fontWeight="bold" color="primary">
              Add New Kid 👶
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                fullWidth
                label="Name"
                value={newKidData.name}
                onChange={(e) => setNewKidData(prev => ({ ...prev, name: e.target.value }))}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={newKidData.age || ''}
                onChange={(e) => setNewKidData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                variant="outlined"
              />
              <TextField
                fullWidth
                select
                label="Gender"
                value={newKidData.gender}
                onChange={(e) => setNewKidData(prev => ({ ...prev, gender: e.target.value }))}
                variant="outlined"
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="School"
                value={newKidData.school}
                onChange={(e) => setNewKidData(prev => ({ ...prev, school: e.target.value }))}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Standard/Grade"
                value={newKidData.standard}
                onChange={(e) => setNewKidData(prev => ({ ...prev, standard: e.target.value }))}
                variant="outlined"
              />
              {error && (
                <Alert severity="error">{error}</Alert>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <AnimatedButton
              onClick={() => setShowAddKidDialog(false)}
              variant="outlined"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              onClick={handleAddKid}
              variant="contained"
              disabled={addingKid || !newKidData.name}
            >
              {addingKid ? <CircularProgress size={24} /> : 'Add Kid'}
            </AnimatedButton>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default Dashboard;