import {
  FormGenerator,
  useTsQueryClient,
  useAuthContext,
  useCartContext,
  usePagination,
  formatCurrency,
  TopBar,
} from '@/core';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CreateOrder, Order, Product } from '@nx-monorepo-template/global';
import { CreateOrderSchema } from '@nx-monorepo-template/global';

const Container = styled(Box)`
  padding: ${({ theme }) => theme.padding.md};
`;

const CheckoutLoader = () => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h4">Checkout</Typography>
      </CardContent>
      <CardContent>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <Typography fontSize={[12, 16]} sx={{ fontWeight: 700 }}>
            Product
          </Typography>
          <Typography
            fontSize={[12, 16]}
            sx={{ flex: 1, textAlign: 'right', fontWeight: 700 }}
          >
            Total Price
          </Typography>
        </Box>
        <Box>
          {Array.from(Array(5)).map((item: Product, i: number) => {
            return (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" animation="wave" sx={{ width: 300 }} />
                <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
              </Box>
            );
          })}
        </Box>
        <Divider sx={{ mt: 1 }} />
      </CardContent>

      <CardContent>
        <Typography
          variant="h6"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          Total Cost:{' '}
          <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export const CheckoutPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { user } = useAuthContext();
  const params = useParams();
  const navigate = useNavigate();
  const { store, cart, length, clear } = useCartContext();
  const { page, perPage } = usePagination();

  const { data, isFetching } = tsQueryClient.product.getAll.useQuery(
    ['getProducts'],
    {
      query: {
        ids: Object.keys(cart) ?? [],
        store: store?.id,
        perPage,
        page,
      },
    },
    {
      enabled: !!length,
    }
  );

  const { mutate } = tsQueryClient.order.create.useMutation({
    onSuccess: (v) => {
      clear();
      if (user) {
        navigate(`/manage/orders/${v.body.id}`);
      } else {
        navigate(`/stores/${store?.id}/orders/${v.body.id}`);
      }
    },
  });

  const products = data?.body;

  const totalCost = useMemo(() => {
    let total = 0;
    products?.list.forEach(({ id, price }: Product) => {
      const totalPrice = price * cart[id];
      total += totalPrice;
    });
    return total;
  }, [cart, products?.list]);

  const taxPercentage = (store?.config?.tax ?? 0) / 100;

  const tax = totalCost * taxPercentage;

  const subTotal = totalCost - tax;

  useEffect(() => {
    if (!length) {
      navigate(`/stores/${params.storeId}`);
    }
  }, [params.storeId, length, navigate]);

  if (!store) {
    navigate(`/stores/${params.storeId}`);
    return null;
  }

  return (
    <>
      <TopBar store={store} />
      <Container component="main">
        {isFetching ? (
          <CheckoutLoader />
        ) : (
          <Card sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="h4">Checkout</Typography>
            </CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.list.map((item, i) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {cart[item.id]} {item.title}
                      </TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                      <TableCell>
                        {formatCurrency(item.price * cart[item.id])}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <CardContent>
              <Typography>Sub Total: {formatCurrency(subTotal)}</Typography>
              <Typography>Tax: {formatCurrency(tax)}</Typography>
              <Typography variant="h6">
                Total Cost: {formatCurrency(totalCost)}
              </Typography>
            </CardContent>
            <CardActions>
              <FormGenerator<Order, CreateOrder>
                initialValues={{
                  items:
                    products?.list.map(
                      ({ id, title, description, price }: Product) => ({
                        title,
                        description,
                        price,
                        count: cart[id],
                      })
                    ) ?? [],
                  user: user?.id,
                  store: store.id,
                  status: 'pending',
                }}
                defaultEnableSubmit
                schema={CreateOrderSchema}
                onSubmit={(v, options) => {
                  mutate({ body: v }, options);
                }}
                successMessage="Order Created"
                onCancel={() => {
                  navigate(`/stores/${store.id}`);
                }}
              />
            </CardActions>
          </Card>
        )}
      </Container>
    </>
  );
};
