import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { authAPI, usersAPI } from '../../services/api';
import { UserInfoResponse, UpdateUserRequest } from '../../types/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(18,25,61,0.97)',
  color: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 45px rgba(23,165,255,0.22)',
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: 'auto',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    background: 'rgba(41,121,255,0.08)',
    color: '#fff',
  },
  input: { color: '#fff' },
  label: { color: '#82B1FF' },
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

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserRequest>({
    username: '',
    email: '', // Assuming email can be updated, though often it's not
  });
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.getUserInfo();
      if (response.data.success) {
        setUserInfo(response.data.data);
        setFormData({
          username: response.data.data.username || '',
          email: response.data.data.email || '',
        });
      } else {
        setError(response.data.message || 'Failed to fetch user info.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching user info.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);
    try {
      // Assuming the API has a way to identify the current user for update,
      // or that the user ID is part of the UserInfoResponse and can be used.
      // For now, I'll assume `usersAPI.updateUserById` needs a userId.
      // If the backend handles current user update without ID, this part needs adjustment.
      // For simplicity, I'll assume `userInfo.id` is available and required.
      if (!userInfo?.id) {
        setUpdateError('User ID not found for update.');
        setUpdating(false);
        return;
      }
      const response = await usersAPI.updateUserById(userInfo.id, formData);
      if (response.data.success) {
        setUpdateSuccess('Profile updated successfully!');
        setIsEditing(false);
        fetchUserInfo(); // Refresh info after update
      } else {
        setUpdateError(response.data.message || 'Failed to update profile.');
      }
    } catch (err: any) {
      setUpdateError(err.response?.data?.message || 'Error updating profile.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', mb: 4, textAlign: 'center' }}>
        Your Profile
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : userInfo ? (
        <StyledPaper elevation={6}>
          {updateError && <Alert severity="error" sx={{ mb: 2 }}>{updateError}</Alert>}
          {updateSuccess && <Alert severity="success" sx={{ mb: 2 }}>{updateSuccess}</Alert>}

          {!isEditing ? (
            <Box>
              <Typography variant="h6" sx={{ color: '#23a5ff', mb: 1 }}>
                Username: <span style={{ color: '#fff' }}>{userInfo.username || 'N/A'}</span>
              </Typography>
              <Typography variant="h6" sx={{ color: '#23a5ff', mb: 2 }}>
                Email: <span style={{ color: '#fff' }}>{userInfo.email || 'N/A'}</span>
              </Typography>
              <StyledButton onClick={() => setIsEditing(true)}>
                Edit Profile
              </StyledButton>
            </Box>
          ) : (
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <StyledTextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <StyledTextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <StyledButton
                  variant="outlined"
                  onClick={() => {
                    setIsEditing(false);
                    setUpdateError(null);
                    setUpdateSuccess(null);
                    // Reset form data to original if cancelled
                    setFormData({
                      username: userInfo.username || '',
                      email: userInfo.email || '',
                    });
                  }}
                  sx={
                    {
                      borderColor: '#82B1FF',
                      color: '#82B1FF',
                      '&:hover': {
                        backgroundColor: 'rgba(41,121,255,0.1)',
                        borderColor: '#82B1FF',
                      },
                    }
                  }
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  type="submit"
                  variant="contained"
                  disabled={updating}
                >
                  {updating ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                </StyledButton>
              </Box>
            </Box>
          )}
        </StyledPaper>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 5, color: '#ccc' }}>
          User information not available.
        </Typography>
      )}
    </Box>
  );
};

export default ProfilePage;