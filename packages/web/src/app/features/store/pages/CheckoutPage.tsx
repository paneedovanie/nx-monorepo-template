import {
  DataTable,
  FormGenerator,
  useTsQueryClient,
  useAuthContext,
  useCartContext,
  usePagination,
  formatCurrency,
  Loading,
  TopBar,
  LayoutLoader,
} from '@/core';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
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

  useEffect(() => {
    if (!length) {
      navigate(`/stores/${params.storeId}`);
    }
  }, [params.storeId, length, navigate]);

  if (isFetching) {
    return (
      <LayoutLoader
        color={store?.config?.primaryColor}
        sx={{ height: '100vh' }}
      />
    );
  }

  if (!store) {
    navigate(`/stores/${params.storeId}`);
    return null;
  }

  return (
    <>
      <TopBar store={store} />
      <Container component="main">
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
              {products?.list.map((item: Product, i: number) => {
                return (
                  <Box key={i} sx={{ display: 'flex' }}>
                    <Typography
                      fontSize={[12, 16]}
                      sx={{ maxWidth: [150, 'auto'] }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      fontSize={[12, 16]}
                      sx={{ flex: 1, textAlign: 'right' }}
                    >
                      {formatCurrency(item.price)} x {cart[item.id]} ={' '}
                      {formatCurrency(item.price * cart[item.id])}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Divider sx={{ mt: 1 }} />
          </CardContent>

          <CardContent>
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
      </Container>
    </>
  );
};
