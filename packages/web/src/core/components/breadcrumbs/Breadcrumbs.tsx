import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography,
} from '@mui/material';
import { usePageContext } from '../contexts';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items?: {
    label: string;
    to?: string;
    onClick?: () => void;
  }[];
}

export const Breadcrumbs = ({ items, ...props }: BreadcrumbsProps) => {
  const location = useLocation();
  const params = useParams();
  const paths = location.pathname.substring(1).split('/');
  const { storeQueryResult, orderQueryResult } = usePageContext();

  const queryResult: Record<string, string | undefined> = {
    storeId: storeQueryResult?.data?.body.title,
    orderId: orderQueryResult?.data?.body.ref.toString(),
  };

  const getTitle = (path: string) => {
    for (const key in params) {
      if (key !== '*' && params[key] === path) {
        return queryResult[key];
      }
    }
    return;
  };

  if (items) {
    return (
      <MuiBreadcrumbs aria-label="breadcrumb" {...props}>
        {items.map(({ to, label, onClick }, i) => {
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
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" {...props}>
      {paths.map((path, i) => {
        const label =
          i === 0
            ? 'Dashboard'
            : getTitle(path) ??
              path.charAt(0).toUpperCase() + path.substring(1);
        let completePath = '';

        for (let j = 0; j < i + 1; j++) {
          completePath += '/' + paths[j];
        }

        if (i < paths.length - 1) {
          return (
            <Link
              key={i}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={completePath}
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
