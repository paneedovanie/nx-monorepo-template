import {
  Breadcrumbs,
  CategoriesTable,
  LayoutLoader,
  Loading,
  PageContextProvider,
  usePageContext,
} from '@/core';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreCategoryListPageContent = () => {
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
      <CategoriesTable store={store} />
    </Container>
  );
};

export const StoreCategoryListPage = () => {
  return (
    <PageContextProvider>
      <StoreCategoryListPageContent />
    </PageContextProvider>
  );
};
