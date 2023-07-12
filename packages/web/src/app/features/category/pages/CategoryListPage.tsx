import { Breadcrumbs } from '@/core';
import styled from 'styled-components';
import { CategoriesTable } from '../../../shared';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const CategoryListPage = () => {
  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'Categories',
          },
        ]}
        sx={{ my: 1 }}
      />
      <CategoriesTable />
    </Container>
  );
};
