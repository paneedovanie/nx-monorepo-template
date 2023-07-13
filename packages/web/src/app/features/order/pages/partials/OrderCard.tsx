import {
  DataTable,
  Loading,
  QrcodeDialog,
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
import { BillDialog, PayDialog, StatusDialog } from '../../components';

export const OrderCard = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const { user } = useAuthContext();

  const { data, isFetching, refetch } = tsQueryClient.order.get.useQuery(
    ['getOrder', params.orderId],
    {
      params: { id: params.orderId as string },
    }
  );

  const order = data?.body;
  const isCustomer = order?.user?.id === user?.id;
  const isStoreOwner = order?.store?.owner?.id === user?.id;

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
    <>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md="auto">
              <Box sx={{ cursor: 'pointer' }}>
                <QrcodeDialog
                  filename={'order-ref-' + order?.ref + '-qrcode'}
                  text={window.location.href}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md="auto">
              <Typography variant="h5" sx={{ mb: 1 }}>
                Ref #: {order?.ref}
              </Typography>
              <Typography sx={{ textTransform: 'Capitalize' }}>
                Status: {order?.status}
                {order?.status !== 'completed' && isStoreOwner && (
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
                {!order.payment && isCustomer && !!order.user && (
                  <Button
                    onClick={() => {
                      setPaymentOpen(true);
                    }}
                  >
                    Pay
                  </Button>
                )}
                {!order.payment && isStoreOwner && (
                  <Button
                    onClick={() => {
                      setPaymentOpen(true);
                    }}
                  >
                    Bill
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
          pagination={false}
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
    </>
  );
};
