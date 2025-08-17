import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2979FF',    // Vibrant blue for primary actions
      light: '#82B1FF',   // Light blue
      dark: '#1565C0',    // Deep blue
    },
    secondary: {
      main: '#00E5FF',    // Cyan accent for highlights
      light: '#67FFF1',
      dark: '#009EB5',
    },
    background: {
      default: '#0A1532', // Deep navy for background
      paper: '#12193D',   // Slightly lighter for cards/paper
    },
    text: {
      primary: '#FFFFFF', // White text on dark backgrounds
      secondary: '#B3D1FF', // Soft blue for secondary text
    },
    error: {
      main: '#FF1744',
    },
    success: {
      main: '#00E676',
    },
    info: {
      main: '#2962FF',
    },
    warning: {
      main: '#FFA000',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.8rem', color: '#FFFFFF' },
    h2: { fontWeight: 700, fontSize: '2.2rem', color: '#FFFFFF' },
    h3: { fontWeight: 600, fontSize: '1.75rem', color: '#2979FF' },
    h4: { fontWeight: 600, fontSize: '1.5rem', color: '#2979FF' },
    h5: { fontWeight: 600, fontSize: '1.25rem', color: '#2979FF' },
    h6: { fontWeight: 600, fontSize: '1rem', color: '#2979FF' },
    body1: { fontSize: '1rem', lineHeight: 1.7, color: '#FFFFFF' },
    body2: { fontSize: '0.9rem', lineHeight: 1.5, color: '#B3D1FF' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '12px 32px',
          fontSize: '1.1rem',
          fontWeight: 600,
          background: 'linear-gradient(90deg, #2979FF 0%, #00E5FF 100%)',
          boxShadow: '0 4px 20px rgba(0,255,255,0.07)',
          color: '#FFF',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            background: 'linear-gradient(90deg, #00E5FF 0%, #2979FF 100%)',
            boxShadow: '0 8px 30px rgba(0,255,255,0.18)',
            transform: 'translateY(-3px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          background: 'rgba(18,25,61, 0.95)',
          boxShadow: '0 8px 32px rgba(0, 229, 255, 0.09)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(41,121,255,0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '18px',
            background: 'rgba(41,121,255,0.06)',
            color: '#FFF',
            '& fieldset': {
              borderColor: '#2979FF',
            },
            '&:hover fieldset': {
              borderColor: '#00E5FF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00E5FF',
            },
          },
        },
      },
    },
  },
});

export default theme;
