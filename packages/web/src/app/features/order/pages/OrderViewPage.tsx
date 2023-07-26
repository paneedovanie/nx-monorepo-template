import styled from 'styled-components';
import { OrderCard, OrderCardLoader } from '../components';
import {
  Breadcrumbs,
  LayoutLoader,
  PageContextProvider,
  usePageContext,
} from '@/core';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)`
  padding: ${({ theme }) => theme.padding.md};
`;

export const OrderViewPageContent = () => {
  const { orderQueryResult } = usePageContext();

  const order = orderQueryResult.data?.body;

  if (orderQueryResult.isFetching) {
    return (
      <Container>
        <Breadcrumbs sx={{ my: 1 }} />
        <OrderCardLoader />
      </Container>
    );
  }
  if (!order) {
    return <Typography>404</Typography>;
  }

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <OrderCard order={order} onUpdate={orderQueryResult.refetch} />
    </Container>
  );
};

export const OrderViewPage = () => {
  return (
    <PageContextProvider>
      <OrderViewPageContent />
    </PageContextProvider>
  );
};
