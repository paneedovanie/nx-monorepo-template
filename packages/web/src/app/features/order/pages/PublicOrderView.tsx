import styled from 'styled-components';
import { OrderCard } from './partials';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const PublicOrderView = () => {
  return (
    <Container>
      <OrderCard />
    </Container>
  );
};
