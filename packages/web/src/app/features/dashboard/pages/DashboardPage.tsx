import {
  Allow,
  BeAStoreOwnerAlert,
  Breadcrumbs,
  DashboardCountWidget,
  useTsQueryClient,
} from '@/core';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import {
  Store as StoreIcon,
  AddShoppingCart as AddShoppingCartIcon,
  AccountBox as AccountIcon,
  Category as CategoryIcon,
  Engineering as EngineeringIcon,
  Wallet as WalletIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RolePermission } from '@nx-monorepo-template/global';

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
      <Breadcrumbs sx={{ my: 1 }} />

      <BeAStoreOwnerAlert />

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
        <Allow permissions={[RolePermission.StoreCreate]}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <DashboardCountWidget
              title="My Stores"
              icon={<StoreIcon />}
              count={dashboard?.myStoresCount}
              onClick={() => navigate('/manage/stores')}
            />
          </Grid>
        </Allow>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DashboardCountWidget
            title="My Orders"
            icon={<StoreIcon />}
            count={dashboard?.myOrdersCount}
            onClick={() => navigate('/manage/orders')}
          />
        </Grid>
        <Allow permissions={[RolePermission.StoreCreate]}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <DashboardCountWidget
              title="My Stores Orders"
              icon={<StoreIcon />}
              count={dashboard?.myStoresOrdersCount}
              onClick={() => navigate('/manage/orders')}
            />
          </Grid>
        </Allow>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          {dashboard?.storesCount !== undefined && (
            <DashboardCountWidget
              title="Stores"
              icon={<StoreIcon />}
              count={dashboard?.storesCount}
              onClick={() => navigate('/manage/stores')}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          {dashboard?.ordersCount !== undefined && (
            <DashboardCountWidget
              title="Orders"
              icon={<AddShoppingCartIcon />}
              count={dashboard?.ordersCount}
              onClick={() => navigate('/manage/orders')}
            />
          )}
        </Grid>
        {dashboard?.usersCount !== undefined && (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <DashboardCountWidget
              title="Users"
              icon={<AccountIcon />}
              count={dashboard?.usersCount}
              onClick={() => navigate('/manage/users')}
            />
          </Grid>
        )}
        {dashboard?.rolesCount !== undefined && (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <DashboardCountWidget
              title="Roles"
              icon={<EngineeringIcon />}
              count={dashboard?.rolesCount}
              onClick={() => navigate('/manage/roles')}
            />
          </Grid>
        )}
        {dashboard?.categoriesCount !== undefined && (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <DashboardCountWidget
              title="Categories"
              icon={<CategoryIcon />}
              count={dashboard?.categoriesCount}
              onClick={() => navigate('/manage/roles')}
            />
          </Grid>
        )}
        {dashboard?.circulatingAmount !== undefined && (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
