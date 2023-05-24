import {
  DataTable,
  FormGenerator,
  useTsQueryClient,
  useAuthContext,
  useCartContext,
  usePagination,
} from '@/core';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CreateOrder, Order, Product } from '@nx-monorepo-template/global';
import { CreateOrderSchema } from '@nx-monorepo-template/global';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const Checkout = () => {
  const tsQueryClient = useTsQueryClient();
  const { user } = useAuthContext();
  const params = useParams();
  const navigate = useNavigate();
  const { cart, length } = useCartContext();
  const { page, perPage } = usePagination();

  const { data } = tsQueryClient.product.getAll.useQuery(
    ['getProducts'],
    {
      query: {
        ids: Object.keys(cart) ?? [],
        store: params.id,
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
      navigate(`/orders/${v.body.id}`);
    },
  });

  const products = data?.body;

  const totalCost = useMemo(() => {
    let total = 0;
    products?.list.forEach(({ id, price }) => {
      const totalPrice = price * cart[id];
      total += totalPrice;
    });
    return total;
  }, [cart, products?.list]);

  useEffect(() => {
    if (!length) {
      navigate(`/stores/${params.id}`);
    }
  }, [params.id, length, navigate]);

  if (!user) {
    navigate(`/stores/${params.id}`);
    return null;
  }

  return (
    <Container>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography variant="h4">Checkout</Typography>
        </CardContent>

        <DataTable<Product>
          columns={[
            {
              name: 'title',
              label: 'Title',
            },
            {
              name: 'price',
              label: 'Unit Price',
            },
            {
              name: 'count',
              label: 'Quantity',
              render: ({ id }) => {
                return cart[id];
              },
            },
            {
              name: 'totalPrice',
              label: 'Price',
              render: ({ id, price }) => {
                return price * cart[id];
              },
            },
          ]}
          data={products?.list}
        />

        <CardContent>
          <Typography variant="h6">Total Cost: {totalCost}</Typography>
        </CardContent>
        <CardActions>
          <FormGenerator<Order, CreateOrder>
            initialValues={{
              items:
                products?.list.map(({ id, title, description, price }) => ({
                  title,
                  description,
                  price,
                  count: cart[id],
                })) ?? [],
              user: user?.id,
              store: params.id as string,
              status: 'pending',
            }}
            schema={CreateOrderSchema}
            onSubmit={(v, options) => {
              mutate({ body: v }, options);
            }}
            successMessage="Order Created"
          />
        </CardActions>
      </Card>
    </Container>
  );
};
