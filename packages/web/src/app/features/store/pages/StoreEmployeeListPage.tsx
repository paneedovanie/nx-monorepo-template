import {
  Breadcrumbs,
  ConfirmDialog,
  DataTable,
  PageContextProvider,
  useTsQueryClient,
} from '@/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useState } from 'react';
import { Employee } from '@nx-monorepo-template/global';
import { EmployeeDialog } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreEmployeeListPageContent = () => {
  const tsQueryClient = useTsQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Employee>();

  const { data, isFetching, refetch } = tsQueryClient.employee.getAll.useQuery(
    ['getEmployees', perPage, page],
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
  const employees = data?.body;

  const { mutate: deleteEmployee } = tsQueryClient.employee.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ mb: 1 }} variant="h5">
            Employees
          </Typography>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add
          </Button>
        </CardContent>
        <DataTable<Employee>
          columns={[
            {
              name: 'user.firstName',
              label: 'First Name',
              render: ({ user }) => {
                return user.firstName;
              },
            },
            {
              name: 'user.lastName',
              label: 'Last Name',
              render: ({ user }) => {
                return user.lastName;
              },
            },
            {
              name: 'role',
              label: 'Roles',
              render: ({ roles }) => {
                return roles.map((item) => item.title).join(', ');
              },
            },
            // {
            //   name: 'permissions',
            //   label: 'Permissions',
            //   render: ({ permissions }) => {
            //     return permissions.length;
            //   },
            // },
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
              render: (employee) => {
                return (
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedItem(employee);
                        setConfirmDialogOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                );
              },
            },
          ]}
          perPage={perPage}
          page={page}
          count={employees?.count}
          data={employees?.list}
          onPage={setPage}
          onPerPage={setPerPage}
          isLoading={isFetching}
        />
      </Card>
      <EmployeeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          refetch();
        }}
      />
      <ConfirmDialog
        title="Delete Employee"
        content="Are you sure to delete this employee?"
        successMessage="Employee successfully deleted"
        open={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false);
        }}
        onSubmit={(options) => {
          if (selectedItem) {
            deleteEmployee(
              {
                params: { id: selectedItem.id },
                body: {},
              },
              options
            );
          }
        }}
        onSuccess={() => {
          setConfirmDialogOpen(false);
        }}
      />
    </Container>
  );
};

export const StoreEmployeeListPage = () => {
  return (
    <PageContextProvider>
      <StoreEmployeeListPageContent />
    </PageContextProvider>
  );
};
