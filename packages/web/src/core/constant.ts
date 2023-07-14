import { Shadows, createTheme } from '@mui/material/styles';

const color = {
  primary: '#31525B',
  secondary: '#B3DEE5',
  accent: '#0072c6',
  black: '#000000',
  white: '#FFFFFF',
};

const font = {
  size: {
    sm: '10px',
    md: '12px',
    lg: '14px',
    xl: '20px',
  },
};

const defaultSize = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

export const theme = {
  color,
  font,
  margin: defaultSize,
  padding: defaultSize,
  radius: defaultSize,
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: color.primary,
    },
    secondary: {
      main: color.secondary,
    },
  },
  shadows: Array(25).fill('none') as Shadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export const isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
