import { Breadcrumbs, useTsQueryClient } from '@/core';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UserDetailsCard, UserRolesCard } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const UserViewPage = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const id = params.id as string;

  const { data: userResult, refetch } = tsQueryClient.user.getUser.useQuery(
    ['getUser'],
    {
      params: { id },
    }
  );

  const data = userResult?.body;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'Users',
            to: '/manage/users',
          },
          {
            label: data?.firstName + ' ' + data?.lastName,
          },
        ]}
        sx={{ my: 1 }}
      />
      {!!data && (
        <>
          <UserDetailsCard user={data} onChange={refetch} />
          <UserRolesCard user={data} onChange={refetch} />
        </>
      )}
    </Container>
  );
};
