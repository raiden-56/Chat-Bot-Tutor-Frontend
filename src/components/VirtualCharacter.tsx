import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import tutorCharacterImage from '../assets/tutor-character.png';
import { Box } from '@mui/material';

interface VirtualCharacterProps {
  size?: 'sm' | 'md' | 'lg';
  animation?: 'idle' | 'talking' | 'celebrating' | 'thinking';
  message?: string;
  className?: string;
}

const VirtualCharacter = ({
  size = 'md',
  animation = 'idle',
  message,
  className = ''
}: VirtualCharacterProps) => {
  const [currentAnimation, setCurrentAnimation] = useState(animation);

  useEffect(() => {
    setCurrentAnimation(animation);
  }, [animation]);

  const sizeClasses = {
    sm: { width: 64, height: 64 },
    md: { width: 96, height: 96 },
    lg: { width: 128, height: 128 }
  };

  const getAnimationVariants = () => {
    switch (currentAnimation) {
      case 'talking':
        return {
          scale: [1, 1.05, 1],
          rotate: [-2, 2, -2, 0],
          transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop" as const
          }
        };
      case 'celebrating':
        return {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
          y: [0, -10, 0],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop" as const
          }
        };
      case 'thinking':
        return {
          scale: [1, 1.02, 1],
          rotate: [0, 3, -3, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop" as const
          }
        };
      default: // idle
        return {
          y: [0, -5, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "loop" as const
          }
        };
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" className={className}>
      <motion.div
        style={{ ...sizeClasses[size], position: 'relative' }}
        animate={getAnimationVariants()}
      >
        <img
          src={tutorCharacterImage}
          alt="AI Tutor Character"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}
        />
        {/* Glow effect */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(33,150,243,0.2)',
            borderRadius: '50%',
            filter: 'blur(16px)',
            zIndex: -1
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </motion.div>

      {/* Speech bubble */}
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          style={{
            marginTop: 16,
            background: '#fff',
            border: '2px solid #2196f3',
            borderRadius: 16,
            padding: '8px 20px',
            boxShadow: '0 4px 16px rgba(33,150,243,0.15)',
            position: 'relative',
            maxWidth: 250
          }}
        >
          <div style={{
            fontSize: 14,
            color: '#1976d2',
            fontWeight: 500,
            textAlign: 'center'
          }}>
            {message}
          </div>
          {/* Speech bubble arrow */}
          <div style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: 16,
            height: 16,
            background: '#fff',
            borderTop: '2px solid #2196f3',
            borderLeft: '2px solid #2196f3'
          }} />
        </motion.div>
      )}
    </Box>
  );
};

export default VirtualCharacter;
