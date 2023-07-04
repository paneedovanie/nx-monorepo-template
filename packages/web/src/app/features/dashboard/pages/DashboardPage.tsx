import { Breadcrumbs, useTsQueryClient } from '@/core';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Grid,
  GridProps,
  Typography,
} from '@mui/material';
import {
  Store as StoreIcon,
  AddShoppingCart as AddShoppingCartIcon,
  AccountBox as AccountIcon,
  Category as CategoryIcon,
  Engineering as EngineeringIcon,
  Wallet as WalletIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useState } from 'react';

const DashboardCountWidget = ({
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
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} {...props}>
      <Card sx={{ cursor: onClick ? 'pointer' : 'unset' }} onClick={onClick}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography variant="h6">{title}</Typography>
              {icon}
            </Grid>
            <Grid item>
              <Typography variant="h3">{count ?? 'N/A'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const DashboardPage = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const [unrestricted, setUnrestricted] = useState(false);

  const { data } = tsQueryClient.statistic.dashboard.useQuery(
    ['dashboard', unrestricted],
    {
      query: {
        unrestricted,
      },
    },
    {
      refetchInterval: 5000,
    }
  );

  const dashboard = data?.body;

  return (
    <Box sx={{ p: 1, height: '100vh' }}>
      <Breadcrumbs
        items={[{ label: 'Dashboard', to: '/manage' }]}
        sx={{ my: 1 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          value={unrestricted}
          onChange={(e) => {
            setUnrestricted(e.target.checked);
          }}
        />
        <Typography>All</Typography>
      </Box>
      <Grid container spacing={1} sx={{ width: '100%' }}>
        <DashboardCountWidget
          title="My Stores"
          icon={<StoreIcon />}
          count={dashboard?.myStoresCount}
          onClick={() => navigate('/manage/stores')}
        />
        <DashboardCountWidget
          title="My Orders"
          icon={<StoreIcon />}
          count={dashboard?.myOrdersCount}
          onClick={() => navigate('/manage/orders')}
        />
        <DashboardCountWidget
          title="My Stores Orders"
          icon={<StoreIcon />}
          count={dashboard?.myStoresOrdersCount}
          onClick={() => navigate('/manage/orders')}
        />
        {dashboard?.storesCount !== undefined && (
          <DashboardCountWidget
            title="Stores"
            icon={<StoreIcon />}
            count={dashboard?.storesCount}
            onClick={() => navigate('/manage/stores')}
          />
        )}
        {dashboard?.ordersCount !== undefined && (
          <DashboardCountWidget
            title="Orders"
            icon={<AddShoppingCartIcon />}
            count={dashboard?.ordersCount}
            onClick={() => navigate('/manage/orders')}
          />
        )}
        {dashboard?.usersCount !== undefined && (
          <DashboardCountWidget
            title="Users"
            icon={<AccountIcon />}
            count={dashboard?.usersCount}
            onClick={() => navigate('/manage/users')}
          />
        )}
        {dashboard?.rolesCount !== undefined && (
          <DashboardCountWidget
            title="Roles"
            icon={<EngineeringIcon />}
            count={dashboard?.rolesCount}
            onClick={() => navigate('/manage/roles')}
          />
        )}
        {dashboard?.categoriesCount !== undefined && (
          <DashboardCountWidget
            title="Categories"
            icon={<CategoryIcon />}
            count={dashboard?.categoriesCount}
            onClick={() => navigate('/manage/roles')}
          />
        )}
        {dashboard?.circulatingAmount !== undefined && (
          <DashboardCountWidget
            title="Circulating Amount"
            icon={<WalletIcon />}
            count={dashboard?.circulatingAmount}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={4}
          />
        )}
      </Grid>
    </Box>
  );
};
