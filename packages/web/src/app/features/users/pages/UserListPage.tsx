import { Breadcrumbs, DataTable, useTsQueryClient } from '@/core';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useState } from 'react';
import { User } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const UserListPage = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const { data } = tsQueryClient.user.getUsers.useQuery(
    ['getUsers', perPage, page],
    {
      query: {
        perPage,
        page,
      },
    }
  );
  const users = data?.body;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'Users',
          },
        ]}
        sx={{ my: 1 }}
      />
      <Card>
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h5">
            Users
          </Typography>
        </CardContent>
        <DataTable<User>
          columns={[
            {
              name: 'uniqueCode',
              label: 'Unique Code',
            },
            {
              name: 'firstName',
              label: 'First Name',
            },
            {
              name: 'lastName',
              label: 'Last Name',
            },
            {
              name: 'roles',
              label: 'Roles',
              render: ({ roles }) => {
                return roles.map(({ title }) => title).join(', ');
              },
            },
            {
              name: 'createdAt',
              label: 'Created At',
              render: ({ createdAt }) => {
                return (
                  <Typography variant="caption">
                    {format(new Date(createdAt), 'MM-dd-Y hh:mm a')}
                  </Typography>
                );
              },
            },
            {
              name: 'actions',
              label: 'Actions',
              sx: {
                textAlign: 'right',
              },
              render: ({ id }) => {
                return (
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/manage/users/${id}`)}
                    >
                      <EyeIcon />
                    </IconButton>
                  </Box>
                );
              },
            },
          ]}
          perPage={perPage}
          page={page}
          count={users?.count}
          data={users?.list}
          onPage={setPage}
          onPerPage={setPerPage}
        />
      </Card>
    </Container>
  );
};
