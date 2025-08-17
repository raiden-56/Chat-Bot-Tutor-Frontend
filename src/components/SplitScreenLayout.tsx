// src/components/SplitScreenLayout.tsx
import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SplitScreenLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  minHeight?: string | number;
  borderRadius?: number | string;
}

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  overflow: 'hidden',
  background: 'transparent',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
    minHeight: '100vh',
  },
}));

const LeftSide = styled(Box)<{ borderRadius: number | string }>(
  ({ theme, borderRadius }) => ({
    flex: 1,
    height: '100vh',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      minHeight: 220,
      height: '40vh',
      borderRadius: borderRadius,
    },
  })
);

const RightSide = styled(Box)<{ borderRadius: number | string }>(
  ({ theme, borderRadius }) => ({
    flex: 1,
    height: '100vh',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius,
    overflow: 'hidden',
    background: 'rgba(18,25,61,0.97)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 320,
      height: '60vh',
      borderRadius: borderRadius,
      paddingBottom: theme.spacing(4),
    },
  })
);

export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({
  left,
  right,
  borderRadius = 0,
}) => (
  <Wrapper>
    <LeftSide borderRadius={borderRadius}>{left}</LeftSide>
    <RightSide borderRadius={borderRadius}>{right}</RightSide>
  </Wrapper>
);
