import styled from 'styled-components';
import { OrderCard } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const OrderView = () => {
  return (
    <Container>
      <OrderCard />
    </Container>
  );
};
