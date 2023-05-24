import NoDataSvg from '@/assets/no-data.svg';
import { Box, BoxProps, Typography } from '@mui/material';

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
        <img src={NoDataSvg} alt="loading" height="100%" width="100%" />
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
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
