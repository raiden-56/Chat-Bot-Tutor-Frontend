import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import tutorCharacterImage from '../assets/tutor-character.png';

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
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
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
    <div className={`character-container flex flex-col items-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={getAnimationVariants()}
      >
        <img
          src={tutorCharacterImage}
          alt="AI Tutor Character"
          className="w-full h-full object-contain drop-shadow-lg"
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-full blur-xl -z-10"
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
          className="mt-4 bg-white border-2 border-primary rounded-xl px-4 py-2 shadow-lg relative max-w-xs"
        >
          <div className="text-sm text-foreground font-medium text-center">
            {message}
          </div>
          {/* Speech bubble arrow */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-primary rotate-45" />
        </motion.div>
      )}
    </div>
  );
};

export default VirtualCharacter;