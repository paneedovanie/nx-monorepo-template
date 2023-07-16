import { Breadcrumbs, CategoriesTable } from '@/core';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const CategoryListPage = () => {
  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <CategoriesTable />
    </Container>
  );
};
