import {
  DataTable,
  useTsQueryClient,
  usePagination,
  formatCurrency,
  ConfirmDialog,
} from '@/core';
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Product, Store, generateColor } from '@nx-monorepo-template/global';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { ProductDialog } from './ProductDialog';

export const ProductsTable = ({ store }: { store?: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const { page, perPage, setPage, setPerPage } = usePagination();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product>();

  const { data, refetch: refetchProducts } =
    tsQueryClient.product.getAll.useQuery(
      ['getProducts', perPage, page],
      {
        query: {
          store: store?.id,
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
  const products = data?.body;

  const { mutate: deleteProduct } = tsQueryClient.product.delete.useMutation({
    onSuccess: () => {
      refetchProducts();
    },
  });

  return (
    <>
      <Toolbar
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        disableGutters
      >
        <Typography variant="h5">Filters here</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedItem(undefined);
            setDialogOpen(true);
          }}
        >
          Add
        </Button>
      </Toolbar>
      <DataTable<Product>
        columns={[
          {
            name: 'image',
            label: 'Image',
            render: (product) => {
              return (
                <Box
                  sx={{
                    borderRadius: '50%',
                    backgroundColor: generateColor(product.title),
                    color: 'white',
                    width: 30,
                    height: 30,
                    overflow: 'hidden',
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt="store"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <InventoryIcon
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
            name: 'price',
            label: 'Price',
            render: ({ price }) => {
              return formatCurrency(price);
            },
          },
          {
            name: 'actions',
            label: 'Actions',
            sx: {
              textAlign: 'right',
            },
            render: (product) => {
              return (
                <Box sx={{ textAlign: 'right' }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedItem(product);
                      setDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedItem(product);
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
        count={products?.count}
        data={products?.list}
        onPage={setPage}
        onPerPage={setPerPage}
      />
      <ProductDialog
        store={store}
        data={selectedItem}
        initialValues={{ store: store?.id }}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          refetchProducts();
        }}
      />
      <ConfirmDialog
        title="Delete Product"
        content="Are you sure to delete this product?"
        successMessage="Product successfully deleted"
        open={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false);
        }}
        onSubmit={(options) => {
          if (selectedItem) {
            deleteProduct(
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
    </>
  );
};
