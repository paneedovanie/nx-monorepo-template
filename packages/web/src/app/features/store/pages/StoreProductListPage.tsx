import {
  Breadcrumbs,
  LayoutLoader,
  PageContextProvider,
  usePageContext,
} from '@/core';
import styled from 'styled-components';
import { ProductsTable } from '../components';
import { Typography } from '@mui/material';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreProductListPageContent = () => {
  const { storeQueryResult } = usePageContext();

  const store = storeQueryResult.data?.body;

  if (storeQueryResult.isFetching) {
    return <LayoutLoader />;
  }
  if (!store) {
    <Typography>404</Typography>;
  }

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <ProductsTable store={store} />
    </Container>
  );
};

export const StoreProductListPage = () => {
  return (
    <PageContextProvider>
      <StoreProductListPageContent />
    </PageContextProvider>
  );
};
