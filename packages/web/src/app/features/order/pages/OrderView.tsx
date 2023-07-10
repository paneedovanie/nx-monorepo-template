import { Breadcrumbs } from '@/core';
import styled from 'styled-components';
import { OrderCard } from './partials';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const OrderView = () => {
  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          { label: 'Orders', to: '/manage/orders' },
          { label: 'Order' },
        ]}
        sx={{ my: 1 }}
      />
      <OrderCard />
    </Container>
  );
};
