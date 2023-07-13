import styled from 'styled-components';
import { OrderCard } from './partials';
import { TopBar, useCartContext } from '@/core';
import { Box } from '@mui/material';

const Container = styled(Box)`
  padding: ${({ theme }) => theme.padding.md};
`;

export const PublicOrderView = () => {
  const { store } = useCartContext();
  return (
    <>
      <TopBar store={store} />
      <Container component="main">
        <OrderCard />
      </Container>
    </>
  );
};
