import {
  Box,
  Card,
  CardContent,
  Grid,
  GridProps,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';

export const DashboardCountWidget = ({
  title,
  icon,
  count,
  onClick,
  ...props
}: GridProps & {
  title: string;
  icon: ReactNode;
  count?: number;
  onClick?: () => void;
}) => {
  return (
    <Card sx={{ cursor: onClick ? 'pointer' : 'unset' }} onClick={onClick}>
      <CardContent>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">{title}</Typography>
              <ArrowForwardIosIcon
                color="primary"
                sx={{ height: '100%', fontSize: 14 }}
              />
            </Box>
            {icon}
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h3">{count ?? 'N/A'}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
