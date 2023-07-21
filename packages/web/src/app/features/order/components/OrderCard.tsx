import { QrcodeDialog, formatCurrency, useAuthContext } from '@/core';
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
import { Order, OrderProduct } from '@nx-monorepo-template/global';
import { useMemo, useState } from 'react';
import { BillDialog, PayDialog, StatusDialog } from '.';

export const OrderCard = ({
  order,
  onUpdate,
}: {
  order: Order;
  onUpdate?: () => void;
}) => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [billOpen, setBillOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const { user } = useAuthContext();

  const isCustomer = order.user?.id === user?.id;
  const isStoreOwner = order.store?.owner?.id === user?.id;

  const totalCost = useMemo(() => {
    let total = 0;
    order?.items.forEach(({ price, count }: OrderProduct) => {
      const totalPrice = price * count;
      total += totalPrice;
    });
    return total;
  }, [order?.items]);

  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm="auto"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Box sx={{ cursor: 'pointer', maxWidth: 150 }}>
                <QrcodeDialog
                  imageProps={{
                    style: {
                      width: '100%',
                      height: 'auto',
                    },
                  }}
                  filename={'order-ref-' + order?.ref + '-qrcode'}
                  text={window.location.href}
                  store={order.store}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Typography variant="h5" sx={{ mb: 1 }}>
                #{order?.ref}
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
                      setBillOpen(true);
                    }}
                  >
                    Bill
                  </Button>
                )}
              </Typography>
            </Grid>
          </Grid>
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
            {order?.items.map((item, i) => {
              return (
                <Box key={i} sx={{ display: 'flex' }}>
                  <Typography fontSize={[12, 16]}>{item.title}</Typography>
                  <Typography
                    fontSize={[12, 16]}
                    sx={{ flex: 1, textAlign: 'right' }}
                  >
                    {formatCurrency(item.price)} x {item.count} ={' '}
                    {formatCurrency(item.price * item.count)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Divider sx={{ mt: 1 }} />
        </CardContent>

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
      {isCustomer && (
        <PayDialog
          data={order}
          open={paymentOpen}
          onClose={() => {
            setPaymentOpen(false);
          }}
          onSuccess={() => {
            onUpdate?.();
            setPaymentOpen(false);
          }}
        />
      )}
      {isStoreOwner && (
        <BillDialog
          data={order}
          open={billOpen}
          onClose={() => {
            setBillOpen(false);
          }}
          onSuccess={() => {
            onUpdate?.();
            setBillOpen(false);
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
          onUpdate?.();
          setStatusOpen(false);
        }}
      />
    </>
  );
};
