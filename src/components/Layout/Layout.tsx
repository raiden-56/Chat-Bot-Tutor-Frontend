import React from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const LayoutContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(72, 219, 251, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 202, 87, 0.2) 0%, transparent 50%)
    `,
    zIndex: 0,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <ContentContainer maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Layout;