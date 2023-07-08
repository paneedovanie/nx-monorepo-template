import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography,
  Button,
} from '@mui/material';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items?: {
    label: string;
    to?: string;
    onClick?: () => void;
  }[];
}

export const Breadcrumbs = ({ items, ...props }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" {...props}>
      {items?.map(({ label, to, onClick }, i) => {
        if (to) {
          return (
            <Link
              key={i}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={to}
            >
              {label}
            </Link>
          );
        } else if (onClick) {
          return (
            <Link
              key={i}
              component={Typography}
              underline="hover"
              color="inherit"
              onClick={onClick}
              sx={{ cursor: 'pointer' }}
            >
              {label}
            </Link>
          );
        } else {
          return (
            <Typography key={i} color="primary">
              {label}
            </Typography>
          );
        }
      })}
    </MuiBreadcrumbs>
  );
};
