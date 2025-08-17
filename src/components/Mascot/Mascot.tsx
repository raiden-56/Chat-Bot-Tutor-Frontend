import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MascotContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const MascotBody = styled(motion.div)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  position: 'relative',
  cursor: 'pointer',
  boxShadow: `0 8px 32px ${theme.palette.primary.light}`,
}));

const MascotEye = styled(motion.div)(({ theme }) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#fff',
  position: 'absolute',
  top: 35,
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#333',
    top: 6,
    left: 6,
  },
}));

const MascotMouth = styled(motion.div)(({ theme }) => ({
  width: 30,
  height: 15,
  borderRadius: '0 0 30px 30px',
  backgroundColor: theme.palette.primary.light,
  position: 'absolute',
  bottom: 30,
  left: '50%',
  transform: 'translateX(-50%)',
}));

const SpeechBubble = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: -60,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.background.paper,
  padding: '12px 16px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  maxWidth: 200,
  textAlign: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: `8px solid ${theme.palette.background.paper}`,
  },
}));

interface MascotProps {
  message?: string;
  emotion?: 'happy' | 'excited' | 'thinking' | 'celebrating';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const Mascot: React.FC<MascotProps> = ({ 
  message, 
  emotion = 'happy', 
  size = 'medium',
  onClick 
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const sizeMap = {
    small: 80,
    medium: 120,
    large: 160,
  };

  const mascotSize = sizeMap[size];

  const getEmotionAnimation = () => {
    switch (emotion) {
      case 'excited':
        return {
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.6, repeat: Infinity, repeatDelay: 1 }
        };
      case 'celebrating':
        return {
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
          transition: { duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }
        };
      case 'thinking':
        return {
          rotate: [0, 3, -3, 0],
          transition: { duration: 2, repeat: Infinity }
        };
      default:
        return {
          y: [0, -5, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
    }
  };

  return (
    <MascotContainer>
      <AnimatePresence>
        {showMessage && message && (
          <SpeechBubble
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="body2" color="primary" fontWeight="bold">
              {message}
            </Typography>
          </SpeechBubble>
        )}
      </AnimatePresence>

      <MascotBody
        animate={getEmotionAnimation()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{ width: mascotSize, height: mascotSize }}
      >
        <MascotEye
          style={{ left: mascotSize * 0.25 }}
          animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
          transition={{ duration: 0.1 }}
        />
        <MascotEye
          style={{ right: mascotSize * 0.25 }}
          animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
          transition={{ duration: 0.1 }}
        />
        <MascotMouth
          animate={emotion === 'happy' || emotion === 'excited' ? 
            { scaleX: [1, 1.2, 1] } : 
            {}
          }
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        />
      </MascotBody>
    </MascotContainer>
  );
};

export default Mascot;