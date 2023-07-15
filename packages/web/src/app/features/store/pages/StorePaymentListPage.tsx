import { Breadcrumbs, Loading, useTsQueryClient } from '@/core';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PaymentsTable } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StorePaymentListPage = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const storeId = params.storeId as string;

  const { data: storeResult } = tsQueryClient.store.get.useQuery(
    ['getStore', storeId],
    {
      params: {
        id: storeId,
      },
    },
    {
      enabled: !!storeId,
    }
  );

  const store = storeResult?.body;

  if (!store) {
    return <Loading />;
  }

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'Stores',
            to: '/manage/stores',
          },
          {
            label: store.title,
            to: `/manage/stores/${storeId}`,
          },
          {
            label: 'Payments',
          },
        ]}
        sx={{ my: 1 }}
      />
      <PaymentsTable store={store} />
    </Container>
  );
};
