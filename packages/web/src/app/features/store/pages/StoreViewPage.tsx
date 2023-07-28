import {
  Breadcrumbs,
  DashboardCountWidget,
  LayoutLoader,
  PageContextProvider,
  useEventContext,
  usePageContext,
  useTsQueryClient,
} from '@/core';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StoreDetailsCard, StoreRatingsCard } from '../components';
import {
  Category as CategoryIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Inventory as InventoryIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { BarChart } from '@mui/x-charts';
import { Event, StoreDashboardEvent } from '@nx-monorepo-template/global';
import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreViewPageContent = () => {
  const navigate = useNavigate();
  const tsQueryClient = useTsQueryClient();
  const { storeQueryResult } = usePageContext();
  const [dashboard, setDashboard] = useState<
    Omit<StoreDashboardEvent, 'storeId'>
  >({
    categoriesCount: 0,
    productsCount: 0,
    ordersCount: 0,
    paymentsCount: 0,
  });
  const fromValue = new Date();
  fromValue.setDate(fromValue.getDate() - 30);
  const [from, setFrom] = useState(fromValue);
  const [to, setTo] = useState(new Date());
  const { socket } = useEventContext();

  const store = storeQueryResult.data?.body;

  const onDashboard = useCallback(
    (e: StoreDashboardEvent) => {
      if (store?.id === e.storeId) {
        setDashboard({
          categoriesCount: e.categoriesCount,
          productsCount: e.productsCount,
          ordersCount: e.ordersCount,
          paymentsCount: e.paymentsCount,
        });
      }
    },
    [store]
  );
  const { data: storeOrdersPerDayResult } =
    tsQueryClient.statistic.storeOrdersPerDay.useQuery(
      ['storeOrdersPerDay', from, to],
      {
        query: {
          storeId: store?.id ?? '',
          from: from.toISOString(),
          to: to.toISOString(),
        },
      },
      {
        enabled: !!store,
      }
    );

  const storeOrdersPerDay = storeOrdersPerDayResult?.body;

  useEffect(() => {
    socket?.on(Event.StoreDashboard, onDashboard);
    if (store?.id) {
      socket?.emit(Event.StoreDashboard, store?.id);
    }
  }, [socket, socket?.connected, store?.id, onDashboard]);

  if (storeQueryResult.isFetching) {
    return <LayoutLoader sx={{ height: 500 }} />;
  }
  if (!store) {
    return <Typography>404</Typography>;
  }

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <Grid container sx={{ mb: 1 }} spacing={1}>
        <Grid item xs={12} md={6} lg={4} order={1}>
          <StoreDetailsCard
            store={store}
            onUpdate={storeQueryResult.refetch}
            sx={{ minHeight: '100%', height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8} order={[6, 6, 2]}>
          <StoreRatingsCard
            store={store}
            sx={{ minHeight: '100%', height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} order={[2, 2, 3]}>
          <DashboardCountWidget
            title="Categories"
            icon={<CategoryIcon color="primary" />}
            count={dashboard.categoriesCount}
            onClick={() => navigate(`/manage/stores/${store.id}/categories`)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} order={[3, 3, 4]}>
          <DashboardCountWidget
            title="Products"
            icon={<InventoryIcon color="primary" />}
            count={dashboard.productsCount}
            onClick={() => navigate(`/manage/stores/${store.id}/products`)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} order={[4, 4, 5]}>
          <DashboardCountWidget
            title="Orders"
            icon={<AddShoppingCartIcon color="primary" />}
            count={dashboard.ordersCount}
            onClick={() => navigate(`/manage/stores/${store.id}/orders`)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} order={[5, 5, 6]}>
          <DashboardCountWidget
            title="Payments"
            icon={<PaymentIcon color="primary" />}
            count={dashboard.paymentsCount}
            onClick={() => navigate(`/manage/stores/${store.id}/payments`)}
          />
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: ['block', null, 'flex'],
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h5">Orders Per Day</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="From"
                type="date"
                size="small"
                onChange={(e) => {
                  const tempValue = new Date(e.target.value);
                  if (tempValue < to) {
                    setFrom(new Date(e.target.value));
                  }
                }}
              />
              <TextField
                label="to"
                type="date"
                size="small"
                onChange={(e) => {
                  const tempValue = new Date(e.target.value);
                  if (tempValue > from) {
                    setTo(new Date(e.target.value));
                  }
                }}
              />
            </Box>
          </Box>
          {storeOrdersPerDay && (
            <BarChart
              xAxis={[
                {
                  data:
                    storeOrdersPerDay?.map(({ date }) =>
                      format(new Date(date), 'dd')
                    ) ?? [],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: storeOrdersPerDay?.map(({ count }) => +count) ?? [],
                },
              ]}
              height={300}
              sx={{ width: '100%' }}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export const StoreViewPage = () => {
  return (
    <PageContextProvider>
      <StoreViewPageContent />
    </PageContextProvider>
  );
};
