import styled from 'styled-components';

import {
  DataTable,
  Loading,
  formatCurrency,
  useAuthContext,
  useTsQueryClient,
} from '@/core';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { OrderProduct } from '@nx-monorepo-template/global';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Inventory as InventoryIcon } from '@mui/icons-material';
import { Breadcrumbs } from '@/core';
import { BillDialog, PayDialog, StatusDialog } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const OrderView = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const { user } = useAuthContext();

  const { data, isFetching, refetch } = tsQueryClient.order.get.useQuery(
    ['getOrder', params.id],
    {
      params: { id: params.id as string },
    }
  );

  const order = data?.body;
  const isCustomer = order?.user.id === user?.id;

  const totalCost = useMemo(() => {
    let total = 0;
    order?.items.forEach(({ price, count }: OrderProduct) => {
      const totalPrice = price * count;
      total += totalPrice;
    });
    return total;
  }, [order?.items]);

  if (isFetching) return <Loading />;

  if (!order) {
    navigate('/orders');
    return null;
  }

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          { label: 'Orders', to: '/manage/orders' },
          { label: 'Order' },
        ]}
        sx={{ my: 1 }}
      />
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Order</Typography>
              <Typography variant="caption">
                Reference No.: {order?.ref}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ textTransform: 'Capitalize' }}>
                Status: {order?.status}{' '}
                {order?.status !== 'completed' && !isCustomer && (
                  <Button
                    onClick={() => {
                      setStatusOpen(true);
                    }}
                  >
                    Change
                  </Button>
                )}
              </Typography>
              <Typography>
                Paid: {order?.payment ? 'Yes' : 'No'}
                {!order.payment && (
                  <Button
                    onClick={() => {
                      setPaymentOpen(true);
                    }}
                  >
                    {isCustomer ? 'Pay' : 'Bill'}
                  </Button>
                )}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <DataTable<OrderProduct>
          columns={[
            {
              name: 'image',
              label: 'Image',
              render: ({ image }) => {
                return image ? (
                  <img src={image} alt="store" width={30} height={30} />
                ) : (
                  <InventoryIcon sx={{ width: 30, height: 30 }} />
                );
              },
            },
            {
              name: 'title',
              label: 'Title',
            },
            {
              name: 'price',
              label: 'Unit Price',
              render: ({ price }) => {
                return formatCurrency(price);
              },
            },
            {
              name: 'count',
              label: 'Quantity',
            },
            {
              name: 'totalPrice',
              label: 'Price',
              render: ({ price, count }) => {
                return formatCurrency(price * count);
              },
            },
          ]}
          data={order?.items}
        />

        <CardActions>
          <Box>
            <Typography variant="h6">
              Total Cost: {formatCurrency(totalCost)}
            </Typography>
            {!order.payment && isCustomer && (
              <Typography variant="caption">
                Please pay to the shop's cashier or using your account wallet.
              </Typography>
            )}
          </Box>
        </CardActions>
      </Card>
      {order?.payment && (
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}
            >
              Payment
              <Chip
                label={order?.payment.type === 'cash' ? 'Cash' : 'Online'}
                color="primary"
                size="small"
              />
            </Typography>
            <Typography>
              Amount Paid: {formatCurrency(order?.payment.amountPaid)}
            </Typography>
            <Typography>
              Total Cost: {formatCurrency(order?.payment.totalCost)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>
              Change: {formatCurrency(order?.payment.change)}
            </Typography>
          </CardContent>
        </Card>
      )}
      {isCustomer ? (
        <PayDialog
          data={order}
          open={paymentOpen}
          onClose={() => {
            setPaymentOpen(false);
          }}
          onSuccess={() => {
            refetch();
            setPaymentOpen(false);
          }}
        />
      ) : (
        <BillDialog
          data={order}
          open={paymentOpen}
          onClose={() => {
            setPaymentOpen(false);
          }}
          onSuccess={() => {
            refetch();
            setPaymentOpen(false);
          }}
        />
      )}
      <StatusDialog
        data={order}
        open={statusOpen}
        onClose={() => {
          setStatusOpen(false);
        }}
        onSuccess={() => {
          refetch();
          setStatusOpen(false);
        }}
      />
    </Container>
  );
};
