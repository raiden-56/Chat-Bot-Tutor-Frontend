import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { authAPI } from '../../services/api';
import { UserInfoResponse } from '../../types/api';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'rgba(18,25,61,0.97)', // Dark background consistent with Login form
  boxShadow: '0 4px 20px rgba(23,165,255,0.15)', // Subtle blueish shadow
}));

const Navbar: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await authAPI.getUserInfo();
        if (response.data.success) {
          setUserInfo(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch user info');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching user info');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#23a5ff' }}>
          ChatTutor
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : error ? (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          ) : userInfo ? (
            <Typography variant="body1" sx={{ color: '#fff' }}>
              Welcome, {userInfo.username || userInfo.email}!
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ color: '#fff' }}>
              Guest
            </Typography>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
