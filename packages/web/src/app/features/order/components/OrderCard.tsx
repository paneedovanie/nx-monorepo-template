import { QrcodeDialog, formatCurrency, useAuthContext } from '@/core';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Order, OrderProduct, OrderStatus } from '@nx-monorepo-template/global';
import { useMemo, useState } from 'react';
import { BillDialog, PayDialog, StatusDialog } from '.';
import { format } from 'date-fns';
import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
  const taxPercentage = (order.tax ?? 0) / 100;

  const tax = totalCost * taxPercentage;

  const subTotal = totalCost - tax;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardContent sx={{ position: 'relative' }}>
          {isStoreOwner ||
            (isCustomer && user && !order?.payment && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            ))}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {!(
              [OrderStatus.Completed, OrderStatus.Cancelled] as string[]
            ).includes(order?.status) &&
              isStoreOwner && (
                <MenuItem
                  onClick={() => {
                    setStatusOpen(true);
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  Update Status
                </MenuItem>
              )}
            {!order.payment && isCustomer && !!order.user && (
              <MenuItem
                onClick={() => {
                  setPaymentOpen(true);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <PaymentIcon fontSize="small" />
                </ListItemIcon>
                Pay
              </MenuItem>
            )}
            {!order.payment && isStoreOwner && (
              <MenuItem
                onClick={() => {
                  setBillOpen(true);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <PaymentIcon fontSize="small" />
                </ListItemIcon>
                Bill
              </MenuItem>
            )}
          </Menu>
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
              <Typography variant="h4">
                {order.store?.title ?? 'Deleted'}
              </Typography>
              <Typography variant="h5">#{order?.ref}</Typography>
              <Typography
                variant="caption"
                sx={{ textTransform: 'Capitalize' }}
              >
                Created Date:{' '}
                {format(new Date(order.createdAt), 'MMMM dd, Y - hh:mm a')}
              </Typography>
              <Typography sx={{ textTransform: 'Capitalize', flex: 1 }}>
                <b>Status:</b>{' '}
                <span style={{ textTransform: 'capitalize', flex: 1 }}>
                  {order?.status}
                </span>
              </Typography>
              <Typography>
                <b>Paid:</b> {order?.payment ? 'Yes' : 'No'}
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
            <Typography>Sub Total: {formatCurrency(subTotal)}</Typography>
            <Typography>Tax: {formatCurrency(tax)}</Typography>
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
