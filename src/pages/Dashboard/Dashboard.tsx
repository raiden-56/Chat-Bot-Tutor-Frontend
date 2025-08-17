import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { kidsAPI } from '../../services/api'; // To get kids count
import ChildCareIcon from '@mui/icons-material/ChildCare';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(18,25,61,0.97)', // Dark background consistent with other components
  color: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 45px rgba(23,165,255,0.22)',
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: 'linear-gradient(90deg, #23a5ff 0%, #23ffd9 100%)',
  color: '#fff',
  borderRadius: '38px',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  '&:hover': {
    opacity: 0.9,
  },
}));

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [kidsCount, setKidsCount] = useState<number | null>(null);
  const [loadingKidsCount, setLoadingKidsCount] = useState(true);
  const [errorKidsCount, setErrorKidsCount] = useState<string | null>(null);

  useEffect(() => {
    const fetchKidsCount = async () => {
      setLoadingKidsCount(true);
      setErrorKidsCount(null);
      try {
        const response = await kidsAPI.getAllKids();
        if (response.data.success) {
          setKidsCount(response.data.data.length);
        } else {
          setErrorKidsCount(response.data.message || 'Failed to fetch kids count.');
        }
      } catch (err: any) {
        setErrorKidsCount(err.response?.data?.message || 'Error fetching kids count.');
      } finally {
        setLoadingKidsCount(false);
      }
    };
    fetchKidsCount();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', mb: 4 }}>
        Welcome to Your Dashboard!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={6}>
            <Typography variant="h5" gutterBottom sx={{ color: '#23a5ff' }}>
              Your Kids
            </Typography>
            {loadingKidsCount ? (
              <CircularProgress color="inherit" />
            ) : errorKidsCount ? (
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{errorKidsCount}</Alert>
            ) : (
              <>
                <ChildCareIcon sx={{ fontSize: 60, color: '#82B1FF', mb: 2 }} />
                <Typography variant="h3" sx={{ color: '#fff', mb: 1 }}>
                  {kidsCount !== null ? kidsCount : 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ color: '#ccc' }}>
                  {kidsCount === 1 ? 'kid registered' : 'kids registered'}
                </Typography>
                <StyledButton onClick={() => navigate('/kids')}>
                  Manage Kids
                </StyledButton>
              </>
            )}
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper elevation={6}>
            <Typography variant="h5" gutterBottom sx={{ color: '#23a5ff' }}>
              Quick Actions
            </Typography>
            <Typography variant="body1" sx={{ color: '#ccc', mb: 2 }}>
              What would you like to do next?
            </Typography>
            <StyledButton onClick={() => navigate('/profile')}>
              View Profile
            </StyledButton>
            {/* Add more quick action buttons here */}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;