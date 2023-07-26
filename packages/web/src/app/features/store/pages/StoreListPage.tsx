import {
  Breadcrumbs,
  DataTable,
  useTsQueryClient,
  usePagination,
  Allow,
  ConfirmDialog,
} from '@/core';
import {
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  RemoveRedEye as EyeIcon,
  Delete as DeleteIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useState } from 'react';
import {
  RolePermission,
  Store,
  generateColor,
} from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { StoreDialog } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreListPage = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { search, page, perPage, setPerPage, setPage } = usePagination(
    {},
    {
      query: true,
    }
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Store>();
  const [unrestricted, setUnrestricted] = useState(false);

  const {
    data,
    isFetching,
    refetch: refetchStores,
  } = tsQueryClient.store.getAll.useQuery(
    ['getStores', search, perPage, page, unrestricted],
    {
      query: { search, perPage, page, unrestricted },
    },
    {
      onSuccess: () => {
        setDialogOpen(false);
      },
    }
  );

  const stores = data?.body;

  const { mutate: deleteStore } = tsQueryClient.store.delete.useMutation({
    onSuccess: () => {
      refetchStores();
    },
  });

  return (
    <Container>
      <Breadcrumbs
        items={[{ label: 'Dashboard', to: '/manage' }, { label: 'Stores' }]}
        sx={{ my: 1 }}
      />
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        disableGutters
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h5">Stores</Typography>
          <Allow permissions={[RolePermission.OrderGetAllUnrestricted]}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                value={unrestricted}
                onChange={(e) => {
                  setUnrestricted(e.target.checked);
                }}
              />
              <Typography>All</Typography>
            </Box>
          </Allow>
        </Box>
        <Allow permissions={[RolePermission.StoreCreate]}>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add
          </Button>
        </Allow>
      </Toolbar>
      <Card>
        <DataTable<Store>
          columns={[
            {
              name: 'image',
              label: 'Image',
              render: (store) => {
                return (
                  <Box
                    sx={{
                      borderRadius: '50%',
                      backgroundColor: generateColor(store.title),
                      color: 'white',
                      width: 30,
                      height: 30,
                      overflow: 'hidden',
                    }}
                  >
                    {store.image ? (
                      <img
                        src={store.image}
                        alt="store"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <StoreIcon
                        sx={{ width: 30, height: 30 }}
                        color="inherit"
                      />
                    )}
                  </Box>
                );
              },
            },
            {
              name: 'title',
              label: 'Title',
            },
            {
              name: 'description',
              label: 'Description',
            },
            {
              name: 'owner',
              label: 'Owner',
              display: unrestricted,
              render: (store) => {
                return store.owner?.firstName + ' ' + store.owner?.lastName;
              },
            },
            {
              name: 'actions',
              label: 'Actions',
              sx: {
                textAlign: 'right',
              },
              render: (store) => {
                return (
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/manage/stores/${store.id}`)}
                    >
                      <EyeIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedItem(store);
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
          count={stores?.count}
          data={stores?.list}
          onPage={setPage}
          onPerPage={setPerPage}
          isLoading={isFetching}
        />
      </Card>
      <StoreDialog
        data={selectedItem}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          refetchStores();
        }}
      />
      <ConfirmDialog
        title="Delete Store"
        content="Are you sure to delete this store?"
        successMessage="Store successfully deleted"
        open={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false);
        }}
        onSubmit={(options) => {
          if (selectedItem) {
            deleteStore(
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
