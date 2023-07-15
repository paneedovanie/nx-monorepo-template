import {
  Breadcrumbs,
  DashboardCountWidget,
  Loading,
  useEventContext,
  useSocket,
  useTsQueryClient,
} from '@/core';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StoreDetailsCard, StoreRatingsCard } from '../components';
import {
  Category as CategoryIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Inventory as InventoryIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import {
  EStoreEvent,
  Event,
  StoreDashboardEvent,
} from '@nx-monorepo-template/global';
import { useEffect, useState } from 'react';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreViewPage = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<StoreDashboardEvent>({
    categoriesCount: 0,
    productsCount: 0,
    ordersCount: 0,
    paymentsCount: 0,
  });
  const { socket } = useEventContext();
  const id = params.storeId as string;

  const {
    data: storeResult,
    isFetching,
    refetch,
  } = tsQueryClient.store.get.useQuery(
    ['getStore', id],
    {
      params: { id },
    },
    {
      onSuccess: () => {
        socket?.emit(Event.StoreDashboard, id);
      },
    }
  );

  const store = storeResult?.body;

  useEffect(() => {
    socket?.on(Event.StoreDashboard, setDashboard);
  }, [socket, socket?.connected]);

  if (isFetching) return <Loading />;
  else if (!store) {
    navigate('/manage/stores');
    return null;
  }

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          { label: 'Stores', to: '/manage/stores' },
          { label: store.title },
        ]}
        sx={{ my: 1 }}
      />
      <Grid container sx={{ mb: 1 }} spacing={1}>
        <Grid item xs={12} md={6} lg={4} order={1}>
          <StoreDetailsCard
            store={store}
            onUpdate={refetch}
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
    </Container>
  );
};
