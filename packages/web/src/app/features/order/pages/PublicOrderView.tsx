import styled from 'styled-components';
import { OrderCard } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const PublicOrderView = () => {
  return (
    <Container>
      <OrderCard isPublic={true} />
    </Container>
  );
};
