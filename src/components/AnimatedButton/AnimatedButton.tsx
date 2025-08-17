import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledButton = styled(motion(Button))(({ theme }) => ({
  borderRadius: '25px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: '12px 24px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: `0 4px 15px ${theme.palette.primary.light}`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    boxShadow: `0 6px 20px ${theme.palette.primary.light}`,
  },
}));

interface AnimatedButtonProps extends Omit<ButtonProps, 'component'> {
  children: React.ReactNode;
  animationType?: 'bounce' | 'pulse' | 'wiggle';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  animationType = 'bounce',
  ...props
}) => {
  const getAnimation = () => {
    switch (animationType) {
      case 'pulse':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 0.3 }
        };
      case 'wiggle':
        return {
          rotate: [0, -3, 3, 0],
          transition: { duration: 0.4 }
        };
      default:
        return {
          y: [0, -3, 0],
          transition: { duration: 0.3 }
        };
    }
  };

  return (
    <StyledButton
      whileHover={getAnimation()}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default AnimatedButton;