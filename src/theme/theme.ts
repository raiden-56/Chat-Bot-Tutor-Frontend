import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',    // Solid blue for primary actions
      light: '#64B5F6',   // Light blue
      dark: '#1976D2',    // Deep blue
    },
    secondary: {
      main: '#FF4081',    // Pink accent for kid-friendly highlights
      light: '#FF80AB',   // Light pink
      dark: '#C51162',    // Deep pink
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#FFFFFF',   // White for cards/paper
    },
    text: {
      primary: '#212121', // Dark text on light backgrounds
      secondary: '#757575', // Medium gray for secondary text
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
    h1: { fontWeight: 700, fontSize: '2.8rem', color: '#212121' },
    h2: { fontWeight: 700, fontSize: '2.2rem', color: '#212121' },
    h3: { fontWeight: 600, fontSize: '1.75rem', color: '#2196F3' },
    h4: { fontWeight: 600, fontSize: '1.5rem', color: '#2196F3' },
    h5: { fontWeight: 600, fontSize: '1.25rem', color: '#2196F3' },
    h6: { fontWeight: 600, fontSize: '1rem', color: '#2196F3' },
    body1: { fontSize: '1rem', lineHeight: 1.7, color: '#212121' },
    body2: { fontSize: '0.9rem', lineHeight: 1.5, color: '#757575' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          backgroundColor: '#2196F3',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          color: '#FFF',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#1976D2',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
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
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#757575',
          '&.Mui-focused': {
            color: '#2196F3'
          }
        }
      }
    },
  },
});

export default theme;
