import { Box, BoxProps, Typography } from '@mui/material';
import { NoDataSvg } from '../svgs';
import { theme } from '@/core';

type Size = 'small' | 'medium' | 'large';

interface EmptyProps extends BoxProps {
  size?: Size;
  text?: string;
}

export const Empty = ({
  size = 'medium',
  text = 'No data',
  ...props
}: EmptyProps) => {
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
        <NoDataSvg color={theme.color.primary} width="100%" />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
