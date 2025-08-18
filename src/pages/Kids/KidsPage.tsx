import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  LinearProgress
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Chat,
  Quiz,
  TrendingUp
} from '@mui/icons-material';
import VirtualCharacter from '../../components/VirtualCharacter';
import { kidsAPI } from '../../services/api';
import { GetKidResponse, KidRequest } from '../../types/api';

const Kids = () => {
  const [kids, setKids] = useState<GetKidResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedKid, setSelectedKid] = useState<GetKidResponse | null>(null);
  const [newKid, setNewKid] = useState<KidRequest>({
    name: '',
    age: 0,
    gender: '',
    school: '',
    standard: ''
  });

  useEffect(() => {
    const fetchKids = async () => {
      try {
        const response = await kidsAPI.getAllKids();
        setKids(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching kids:", error);
        setLoading(false);
      }
    };

    fetchKids();
  }, []);

  const handleAddKid = () => {
    setSelectedKid(null);
    setNewKid({ name: '', age: 0, gender: '', school: '', standard: '' });
    setOpenDialog(true);
  };

  const handleEditKid = (kid: GetKidResponse) => {
    setSelectedKid(kid);
    setNewKid({
      name: kid.name,
      age: kid.age,
      gender: kid.gender,
      school: kid.school,
      standard: kid.standard
    });
    setOpenDialog(true);
  };

  const handleSaveKid = async () => {
    try {
      if (selectedKid) {
        await kidsAPI.updateKid(selectedKid.id, newKid);
        setKids(kids.map(kid => 
          kid.id === selectedKid.id 
            ? { ...selectedKid, ...newKid }
            : kid
        ));
      } else {
        const response = await kidsAPI.createKid(newKid);
        const createdKid = response.data.data;
        setKids([...kids, createdKid]);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving kid:", error);
    }
  };

  const handleDeleteKid = async (kidId: number) => {
    try {
      await kidsAPI.deleteKid(kidId);
      setKids(kids.filter(kid => kid.id !== kidId));
    } catch (error) {
      console.error("Error deleting kid:", error);
    }
  };

  const KidCard = ({ kid }: { kid: GetKidResponse }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="card-interactive h-full relative overflow-hidden">
        {/* Action Buttons */}
        <Box className="absolute top-2 right-2 z-10 flex gap-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton 
              size="small" 
              onClick={() => handleEditKid(kid)}
              sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton 
              size="small" 
              onClick={() => handleDeleteKid(kid.id)}
              sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'error.main', color: 'white' } }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </motion.div>
        </Box>

        <CardContent sx={{ pb: 2 }}>
          {/* Kid Info */}
          <Box className="flex items-center gap-3 mb-4">
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: 'primary.main',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              {kid.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6" className="font-bold">
                {kid.name}
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Age {kid.age} • {kid.standard}
              </Typography>
              <Typography variant="caption" className="text-muted-foreground">
                {kid.school}
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={4}>
              <Box className="text-center">
                <Typography variant="h6" className="font-bold text-primary">
                  {0} {/* Placeholder */}
                </Typography>
                <Typography variant="caption" className="text-muted-foreground">
                  Quizzes
                </Typography>
              </Box>
            </Grid>
            <Grid size={4}>
              <Box className="text-center">
                <Typography variant="h6" className="font-bold text-success">
                  {0}% {/* Placeholder */}
                </Typography>
                <Typography variant="caption" className="text-muted-foreground">
                  Avg Score
                </Typography>
              </Box>
            </Grid>
            <Grid size={4}>
              <Box className="text-center">
                <Typography variant="h6" className="font-bold text-warning">
                  {0}h {/* Placeholder */}
                </Typography>
                <Typography variant="caption" className="text-muted-foreground">
                  Study Time
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Progress Bar */}
          <Box className="mb-3">
            <Box className="flex justify-between items-center mb-1">
              <Typography variant="body2" className="font-medium">
                Learning Progress
              </Typography>
              <Typography variant="body2" className="text-primary font-bold">
                {0}% {/* Placeholder */}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={0} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)'
                }
              }}
            />
          </Box>

          {/* Achievements */}
          <Box className="mb-4">
            <Typography variant="body2" className="font-medium mb-2">
              Recent Achievements
            </Typography>
            <Box className="flex flex-wrap gap-1">
              {/* Placeholder */}
            </Box>
          </Box>

          {/* Action Buttons */}
          <Grid container spacing={1}>
            <Grid size={4}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Chat />}
                fullWidth
                sx={{ fontSize: '0.75rem' }}
              >
                Chat
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Quiz />}
                fullWidth
                sx={{ fontSize: '0.75rem' }}
              >
                Quiz
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<TrendingUp />}
                fullWidth
                sx={{ fontSize: '0.75rem' }}
              >
                Progress
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="flex items-center justify-between mb-8">
          <Box>
            <Typography variant="h3" className="font-bold text-foreground mb-2">
              Your Kids 👨‍👩‍👧‍👦
            </Typography>
            <Typography variant="h6" className="text-muted-foreground">
              Manage and track your children's learning progress
            </Typography>
          </Box>
          <VirtualCharacter 
            size="lg" 
            animation="talking" 
            message="Let's check on the kids!"
          />
        </Box>
      </motion.div>

      {/* Add Kid Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Box className="mb-6">
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={handleAddKid}
            className="btn-hero"
            sx={{
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0, #1976d2)',
              }
            }}
          >
            Add New Kid
          </Button>
        </Box>
      </motion.div>

      {/* Kids Grid */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {kids.map((kid, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={kid.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <KidCard kid={kid} />
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Add/Edit Kid Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedKid ? 'Edit Kid' : 'Add New Kid'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={newKid.name}
                onChange={(e) => setNewKid({ ...newKid, name: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={newKid.age}
                onChange={(e) => setNewKid({ ...newKid, age: parseInt(e.target.value) })}
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Grade/Standard"
                value={newKid.standard}
                onChange={(e) => setNewKid({ ...newKid, standard: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="School Name"
                value={newKid.school}
                onChange={(e) => setNewKid({ ...newKid, school: e.target.value })}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveKid}
            variant="contained"
            disabled={!newKid.name || !newKid.age || !newKid.school || !newKid.standard}
          >
            {selectedKid ? 'Update' : 'Add Kid'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Kids;