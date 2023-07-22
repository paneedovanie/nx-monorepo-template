import styled from 'styled-components';
import { OrderCard } from '../components';
import {
  LayoutLoader,
  Loading,
  PageContextProvider,
  TopBar,
  useCartContext,
  usePageContext,
} from '@/core';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)`
  padding: ${({ theme }) => theme.padding.md};
`;

export const PublicOrderViewContent = () => {
  const { store } = useCartContext();
  const { orderQueryResult } = usePageContext();

  const order = orderQueryResult.data?.body;

  if (orderQueryResult.isFetching) {
    return (
      <LayoutLoader
        color={store?.config?.primaryColor}
        sx={{ height: '100vh' }}
      />
    );
  }
  if (!order) {
    return <Typography>404</Typography>;
  }

  return (
    <>
      <TopBar store={store} />
      <Container component="main">
        <OrderCard order={order} onUpdate={orderQueryResult.refetch} />
      </Container>
    </>
  );
};

export const PublicOrderView = () => {
  return (
    <PageContextProvider>
      <PublicOrderViewContent />
    </PageContextProvider>
  );
};
