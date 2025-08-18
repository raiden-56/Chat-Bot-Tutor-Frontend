import React from 'react';
import { Paper, styled } from '@mui/material';
import ChatBotTutorImg from '../../assets/ChatBotTutor.png';

// OUTERMOST FIXED LAYOUT - Full Screen
export const FullScreenRoot = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: '#FFFFFF', // White background
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: '100vh',
  },
}));

export const LeftSide = styled('div')(({ theme }) => ({
  flex: 1,
  height: '100vh',
  backgroundImage: `url(${ChatBotTutorImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    height: '40vh',
    borderRadius: 0,
  },
}));

export const RightSide = styled('div')(({ theme }) => ({
  flex: 1,
  height: '100vh',
  background: '#FFFFFF', // White background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    height: '60vh',
    borderRadius: 0,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(5),
  },
}));

export const FormPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 420,
  padding: theme.spacing(5, 4),
  borderRadius: 16, // Reduced border radius
  background: '#FFFFFF', // White background
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // Subtle shadow
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const BackLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// TextField styling for auth forms
export const textFieldSx = {
  mb: 2,
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(0,0,0,0.03)',
    color: '#212121',
    '& fieldset': {
      borderColor: '#2196F3',
    },
    '&:hover fieldset': {
      borderColor: '#1976D2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976D2',
    },
  },
  input: { color: '#212121' },
  label: { color: '#757575' },
};

// Button styling for auth forms
export const buttonSx = {
  py: 1.5,
  borderRadius: '25px',
  fontWeight: 600,
  fontSize: '1rem',
  backgroundColor: '#2196F3',
  color: '#FFF',
};