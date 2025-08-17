import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const drawerWidth = 240;

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: 'linear-gradient(90deg, #23a5ff 0%, #12193D 100%)',
  color: '#fff',
}));

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  // Adjust margin for sidebar and app bar
  marginLeft: `${drawerWidth}px`,
  marginTop: '64px', // Standard AppBar height
  [theme.breakpoints.down('sm')]: { // Adjust for smaller screens if sidebar is not permanent
    marginLeft: 0,
  },
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Root>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <MainContent>
        <Toolbar /> {/* This Toolbar pushes content below the AppBar */}
        {children}
      </MainContent>
    </Root>
  );
};

export default Layout;