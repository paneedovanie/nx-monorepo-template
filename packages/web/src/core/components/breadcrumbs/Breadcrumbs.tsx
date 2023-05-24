import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography,
} from '@mui/material';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items?: {
    label: string;
    to?: string;
  }[];
}

export const Breadcrumbs = ({ items, ...props }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" {...props}>
      {items?.map(({ label, to }, i) =>
        to ? (
          <Link
            key={i}
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
          >
            {label}
          </Link>
        ) : (
          <Typography key={i} color="primary">
            {label}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
};
