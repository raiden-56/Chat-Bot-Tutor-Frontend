import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { kidsAPI } from '../../services/api';
import { KidRequest } from '../../types/api';
import { SelectChangeEvent } from '@mui/material/Select';

const ModalPaper = styled('div')({
  background: '#f7fafc',
  borderRadius: 32,
  boxShadow: '0 10px 30px rgba(23,165,255,0.15)',
  minWidth: 400
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': { borderRadius: 16, background: '#fff', color: '#363f5e' },
  '& label': { color: '#1c3879' },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 32,
  fontWeight: 600,
  padding: theme.spacing(1.5, 3)
}));

const AddKidModal: React.FC<{ open: boolean; onClose: () => void; onSuccess: () => void; }> = ({
  open, onClose, onSuccess
}) => {
  const [formData, setFormData] = useState<KidRequest>({
    name: '',
    age: 0,
    gender: '',
    school: '',
    standard: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Accepts changes from TextField and Select, type-safe
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await kidsAPI.createKid(formData);
      if (response.data.status_message === "SUCCESS") {
        onSuccess();
        setFormData({
          name: '',
          age: 0,
          gender: '',
          school: '',
          standard: '',
        });
      } else {
        setError(
          response.data.data?.message || 'Failed to add kid.'
        );
      }
    } catch (err: any) {
      setError(
        err.response?.data?.data?.message || 'Error adding kid.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperComponent={ModalPaper as any}>
      <DialogTitle sx={{
        color: '#23a5ff', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center'
      }}>
        Add New Kid
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 8 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth label="Kid's Name" name="name"
            value={formData.name} onChange={handleChange} required
          />
          <StyledTextField
            fullWidth label="Age" name="age" type="number"
            value={formData.age} onChange={handleChange} required inputProps={{ min: 0 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#1c3879' }}>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              label="Gender"
              onChange={handleChange}
              required
              sx={{ borderRadius: 16, background: '#fff', color: '#363f5e' }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <StyledTextField
            fullWidth label="School" name="school"
            value={formData.school} onChange={handleChange} required
          />
          <StyledTextField
            fullWidth label="Standard" name="standard"
            value={formData.standard} onChange={handleChange} required
          />
          <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
            <StyledButton
              onClick={onClose}
              variant="outlined"
              sx={{
                borderColor: '#82B1FF',
                color: '#82B1FF',
                '&:hover': { backgroundColor: 'rgba(41,121,255,0.1)', borderColor: '#82B1FF' }
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: 'linear-gradient(90deg, #23a5ff 0%, #23ffd9 100%)',
                color: '#fff',
              }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Add Kid'}
            </StyledButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddKidModal;
