import {
  Breadcrumbs,
  LayoutLoader,
  PageContextProvider,
  usePageContext,
} from '@/core';
import styled from 'styled-components';
import { OrderCard } from '../../order';
import { Typography } from '@mui/material';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreOrderViewPageContent = () => {
  const { orderQueryResult } = usePageContext();
  const order = orderQueryResult.data?.body;

  if (orderQueryResult.isFetching) {
    return <LayoutLoader />;
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

export const StoreOrderViewPage = () => {
  return (
    <PageContextProvider>
      <StoreOrderViewPageContent />
    </PageContextProvider>
  );
};
