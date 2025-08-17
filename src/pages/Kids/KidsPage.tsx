import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { kidsAPI } from '../../services/api';
import KidCard from '../../components/KidCard/KidCard';
import AddKidModal from '../../components/AddKidModal/AddKidModal';
import EditKidModal from '../../components/EditKidModal/EditKidModal';
import { GetKidResponse } from '../../types/api';

// Pastel color palette is used inside KidCard, not here

const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #23a5ff 0%, #23ffd9 100%)',
  color: '#fff',
  borderRadius: '38px',
  fontWeight: 600,
  boxShadow: '0 4px 16px rgba(23,165,255,0.18)',
  '&:hover': { opacity: 0.9 },
}));

const KidsPage: React.FC = () => {
  const [kids, setKids] = useState<GetKidResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [kidToEdit, setKidToEdit] = useState<GetKidResponse | null>(null);

  const fetchKids = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await kidsAPI.getAllKids();
      setKids(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching kids.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKids();
  }, []);

  const handleAddKidSuccess = () => {
    setIsAddModalOpen(false);
    fetchKids();
  };

  const handleEditKidSuccess = () => {
    setIsEditModalOpen(false);
    setKidToEdit(null);
    fetchKids();
  };

  const handleDeleteKid = async (kidId: number) => {
    if (window.confirm('Are you sure you want to delete this kid?')) {
      try {
        await kidsAPI.deleteKid(kidId);
        fetchKids();
      } catch (err: any) {
        alert(err.response?.data?.message || 'Error deleting kid.');
      }
    }
  };

  const handleEditKid = (kid: GetKidResponse) => {
    setKidToEdit(kid);
    setIsEditModalOpen(true);
  };

  return (
    <Box sx={{ px: 2, py: 4, background: 'linear-gradient(90deg, #23a5ff 0%, #1c3879 100%)', minHeight: '100vh' }}>
      <PageHeader>
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>Kids Management</Typography>
        <GradientButton
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Kid
        </GradientButton>
      </PageHeader>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : kids.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 5, color: '#ccc' }}>
          No kids found. Add your first kid!
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {kids.map((kid, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={kid.id}>
              <KidCard
                kid={kid}
                colorIdx={idx % 10}
                onEdit={handleEditKid}
                onDelete={handleDeleteKid}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modals */}
      <AddKidModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddKidSuccess}
      />
      {kidToEdit && (
        <EditKidModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setKidToEdit(null);
          }}
          onSuccess={handleEditKidSuccess}
          kidToEdit={kidToEdit}
        />
      )}
    </Box>
  );
};

export default KidsPage;
