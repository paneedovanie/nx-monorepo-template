import {
  DataTable,
  useTsQueryClient,
  useAuthContext,
  useCartContext,
  usePagination,
  formatCurrency,
} from '@/core';
import {
  Badge,
  Box,
  Button,
  CardContent,
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
import { useNavigate, useParams } from 'react-router-dom';

export const CartDialog = ({ storeId }: { storeId: string }) => {
  const tsQueryClient = useTsQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { cart, length, add, minus, remove, clear } = useCartContext();
  const { page, perPage, setPerPage, setPage } = usePagination();
  const [open, setOpen] = useState(false);

  const { data } = tsQueryClient.product.getAll.useQuery(
    ['getProducts', length],
    {
      query: {
        ids: Object.keys(cart) ?? [],
        store: storeId,
        perPage,
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Shopping Cart</Typography>
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
              name: 'description',
              label: 'Description',
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
        />
        {!user && (
          <CardContent>
            <Typography variant="caption">Please login to checkout</Typography>
          </CardContent>
        )}

        <DialogActions>
          <Button onClick={handleClose} autoFocus color="error">
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/stores/${id}/checkout`)}
            autoFocus
            disabled={!length}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
