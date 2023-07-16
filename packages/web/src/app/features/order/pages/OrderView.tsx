import styled from 'styled-components';
import { OrderCard } from '../components';
import {
  Breadcrumbs,
  Loading,
  PageContextProvider,
  usePageContext,
} from '@/core';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)`
  padding: ${({ theme }) => theme.padding.md};
`;

export const OrderViewContent = () => {
  const { orderQueryResult } = usePageContext();

  const order = orderQueryResult.data?.body;

  if (orderQueryResult.isFetching) {
    return <Loading />;
  }
  if (!order) {
    return <Typography>404</Typography>;
  }

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <OrderCard order={order} />
    </Container>
  );
};

export const OrderView = () => {
  return (
    <PageContextProvider>
      <OrderViewContent />
    </PageContextProvider>
  );
};
