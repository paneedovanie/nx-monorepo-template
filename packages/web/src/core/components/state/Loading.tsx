import { theme } from '@/core/constant';
import { Box, BoxProps, Typography } from '@mui/material';
import styled from 'styled-components';
import { LoadingSvg } from '../svgs';

type Size = 'small' | 'medium' | 'large';

const FadeInFromNone = styled(Typography)`
  animation: fadeInFromNone 1.5s infinite;

  @keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    50% {
      display: block;
      opacity: 1;
    }

    99% {
      display: block;
      opacity: 0;
    }

    100% {
      display: none;
      opacity: 0;
    }
  }
`;

interface LoadingProps extends BoxProps {
  size?: Size;
  text?: string;
}

export const Loading = ({
  size = 'medium',
  text = 'Loading...',
  ...props
}: LoadingProps) => {
  const sizeValue: Record<Size, number> = {
    small: 250,
    medium: 500,
    large: 750,
  };

  return (
    <Box
      {...props}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        ...props.sx,
      }}
    >
      <Box
        height={sizeValue[size]}
        sx={{
          position: 'relative',
        }}
      >
        <LoadingSvg color={theme.color.primary} width="100%" />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <FadeInFromNone variant="h6" sx={{ fontWeight: 'bold' }}>
            {text}
          </FadeInFromNone>
        </Box>
      </Box>
    </Box>
  );
};
