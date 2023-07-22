import {
  Breadcrumbs,
  LayoutLoader,
  PageContextProvider,
  usePageContext,
} from '@/core';
import styled from 'styled-components';
import { OrdersTable } from '../components';
import { Typography } from '@mui/material';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreOrderListPageContent = () => {
  const { storeQueryResult } = usePageContext();
  const store = storeQueryResult.data?.body;

  if (storeQueryResult.isFetching) {
    return <LayoutLoader />;
  }
  if (!store) {
    return <Typography>404</Typography>;
  }

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <OrdersTable store={store} />
    </Container>
  );
};

export const StoreOrderListPage = () => {
  return (
    <PageContextProvider>
      <StoreOrderListPageContent />
    </PageContextProvider>
  );
};
