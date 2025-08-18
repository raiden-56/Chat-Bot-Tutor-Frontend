import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, CircularProgress, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { authAPI } from '../../services/api';
import { UserInfoResponse } from '../../types/api';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: '#FFFFFF', // White background
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // Subtle shadow
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
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#2196F3', fontWeight: 'bold' }}>
          ChatTutor
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {loading ? (
            <CircularProgress size={20} color="primary" />
          ) : error ? (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          ) : userInfo ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: '#2196F3', width: 35, height: 35 }}>
                {(userInfo.name || userInfo.username || userInfo.email || 'U').charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>
                {userInfo.name || userInfo.username || userInfo.email}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: '#212121' }}>
              Guest
            </Typography>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
