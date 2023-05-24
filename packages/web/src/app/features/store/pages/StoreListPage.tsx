import {
  Breadcrumbs,
  DataTable,
  useTsQueryClient,
  usePagination,
} from '@/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import {
  RemoveRedEye as EyeIcon,
  Delete as DeleteIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useState } from 'react';
import { Store } from '@nx-monorepo-template/global';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [selectedItem] = useState<Store>();

  const { data, refetch: refetchStores } = tsQueryClient.store.getAll.useQuery(
    ['getStores', search, perPage, page],
    {
      query: { search, perPage, page },
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
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ mb: 1 }} variant="h5">
            Stores
          </Typography>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add
          </Button>
        </CardContent>
        <DataTable<Store>
          columns={[
            {
              name: 'image',
              label: 'Image',
              render: (store) => {
                return store.image ? (
                  <img src={store.image} alt="store" width={30} height={30} />
                ) : (
                  <StoreIcon sx={{ width: 30, height: 30 }} />
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
                      onClick={() =>
                        deleteStore({ params: { id: store.id }, body: {} })
                      }
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
    </Container>
  );
};
