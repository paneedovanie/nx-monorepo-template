import { Breadcrumbs, DataTable, useTsQueryClient } from '@/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useState } from 'react';
import { Role, User } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { RoleDialog } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const RoleListPage = () => {
  const tsQueryClient = useTsQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const { data, refetch } = tsQueryClient.role.getAll.useQuery(
    ['getRoles', perPage, page],
    {
      query: {
        perPage,
        page,
      },
    },
    {
      onSuccess: () => {
        setDialogOpen(false);
      },
    }
  );
  const roles = data?.body;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'roles',
          },
        ]}
        sx={{ my: 1 }}
      />
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ mb: 1 }} variant="h5">
            Roles
          </Typography>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add
          </Button>
        </CardContent>
        <DataTable<Role>
          columns={[
            {
              name: 'title',
              label: 'Title',
            },
            {
              name: 'description',
              label: 'Description',
            },
            {
              name: 'permissions',
              label: 'Permissions',
              render: ({ permissions }) => {
                return permissions.length;
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
                      onClick={() => navigate(`/manage/roles/${id}`)}
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
          count={roles?.count}
          data={roles?.list}
          onPage={setPage}
          onPerPage={setPerPage}
        />
      </Card>
      <RoleDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          refetch();
        }}
      />
    </Container>
  );
};
