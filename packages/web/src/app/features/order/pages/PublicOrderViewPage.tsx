import styled from 'styled-components';
import { OrderCard, OrderCardLoader } from '../components';
import {
  PageContextProvider,
  TopBar,
  useCartContext,
  usePageContext,
} from '@/core';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)`
  padding: ${({ theme }) => theme.padding.md};
`;

export const PublicOrderViewPageContent = () => {
  const { store } = useCartContext();
  const { orderQueryResult } = usePageContext();

  const order = orderQueryResult.data?.body;

  if (orderQueryResult.isFetching) {
    return (
      <>
        <TopBar store={store} />
        <Container>
          <OrderCardLoader />
        </Container>
      </>
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

export const PublicOrderViewPage = () => {
  return (
    <PageContextProvider>
      <PublicOrderViewPageContent />
    </PageContextProvider>
  );
};
