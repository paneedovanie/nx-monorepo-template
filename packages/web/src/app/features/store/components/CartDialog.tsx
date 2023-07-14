import {
  DataTable,
  useTsQueryClient,
  useCartContext,
  usePagination,
  formatCurrency,
} from '@/core';
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Product } from '@nx-monorepo-template/global';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartDialog = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { store, cart, length, add, minus, remove, clear } = useCartContext();
  const { page, perPage, setPerPage, setPage } = usePagination();
  const [open, setOpen] = useState(false);

  const { data } = tsQueryClient.product.getAll.useQuery(
    ['getProducts', length],
    {
      query: {
        ids: Object.keys(cart) ?? [],
        store: store?.id,
        perPage: -1,
        page,
      },
    },
    { enabled: !!Object.keys(cart).length }
  );
  const products = data?.body;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Badge badgeContent={length} color="error">
        <IconButton
          onClick={handleOpen}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <ShoppingCartIcon />
          {/* <Typography sx={{ ml: 1, display: ['none', 'inline'] }}>
          Cart
        </Typography> */}
        </IconButton>
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { maxWidth: 750, width: '100%' } }}
      >
        <DialogTitle
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5">Shopping Cart</Typography>
          <Button color="warning" onClick={clear}>
            Clear
          </Button>
        </DialogTitle>
        <DataTable<Product>
          tableProps={{ size: 'small' }}
          columns={[
            {
              name: 'title',
              label: 'Title',
            },
            {
              name: 'count',
              label: 'Count',
              render: (product) => {
                return <Typography>{cart[product.id]}</Typography>;
              },
            },
            {
              name: 'total',
              label: 'Total',
              render: (product) => {
                return (
                  <Typography>
                    {cart[product.id]
                      ? formatCurrency(cart[product.id] * product.price)
                      : 'N/A'}
                  </Typography>
                );
              },
            },
            {
              name: 'actions',
              label: 'Actions',
              sx: { textAlign: 'right' },
              render: (product) => {
                return (
                  <Box sx={{ textAlign: 'right', minWidth: 'max-content' }}>
                    <IconButton
                      onClick={() => {
                        add(product.id);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        minus(product.id);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        remove(product.id);
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
          pagination={false}
        />

        <DialogActions
          sx={{
            display: ['flex', 'block'],
          }}
        >
          <Button
            variant="contained"
            sx={{ flex: 1 }}
            onClick={handleClose}
            color="secondary"
          >
            Close
          </Button>
          <Button
            sx={{ flex: 1 }}
            variant="contained"
            onClick={() => navigate(`/stores/${store?.id}/checkout`)}
            disabled={!length}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
