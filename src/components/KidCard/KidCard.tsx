import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { GetKidResponse } from '../../types/api';

const pastelColors = [
  '#b3ffec', '#c2d6fc', '#ffe4e1', '#ffeecb', '#e3daff',
  '#fad5e5', '#bdf3c3', '#ffe5e4', '#daf3ff', '#fff0cb'
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '24px',
  boxShadow: '0 2px 18px rgba(23,165,255,0.13)',
  color: '#363f5e',
  position: 'relative',
}));

const NameAvatar = styled(Avatar)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 56,
  height: 56,
  fontSize: 24,
  fontWeight: 700,
  margin: '0 auto',
  background: bgcolor,
  color: '#fff',
  boxShadow: '0 2px 12px rgba(41,121,255,0.13)',
}));

interface KidCardProps {
  kid: GetKidResponse;
  colorIdx: number;
  onEdit: (kid: GetKidResponse) => void;
  onDelete: (kidId: number) => void;
}

const KidCard: React.FC<KidCardProps> = ({ kid, colorIdx, onEdit, onDelete }) => {
  const initials = kid.name
    ? kid.name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <StyledCard sx={{ background: pastelColors[colorIdx % pastelColors.length], minHeight: 320, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ pb: 2, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          <NameAvatar bgcolor={pastelColors[colorIdx % pastelColors.length]}>{initials}</NameAvatar>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{kid.name}</Typography>
        <Typography variant="body2">Age: {kid.age}</Typography>
        <Typography variant="body2">Gender: {kid.gender}</Typography>
        <Typography variant="body2">School: {kid.school || 'N/A'}</Typography>
        <Typography variant="body2">Standard: {kid.standard || 'N/A'}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2, pt: 0 }}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEdit(kid)}
          sx={{
            bgcolor: '#23a5ff',
            color: '#fff',
            textTransform: 'none',
            borderRadius: 32,
            px: 2,
            mx: 1,
            fontWeight: 500,
            '&:hover': { bgcolor: '#1c3879' }
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(kid.id)}
          sx={{
            bgcolor: '#ff5353',
            color: '#fff',
            textTransform: 'none',
            borderRadius: 32,
            px: 2,
            mx: 1,
            fontWeight: 500,
            '&:hover': { bgcolor: '#d32f2f' }
          }}
        >
          Delete
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default KidCard;
