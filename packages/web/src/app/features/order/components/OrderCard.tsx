import {
  QrcodeDialog,
  formatCurrency,
  useAuthContext,
  usePageContext,
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
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Order, OrderProduct, OrderStatus } from '@nx-monorepo-template/global';
import { useEffect, useMemo, useState } from 'react';
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
  const { orderQueryResult } = usePageContext();
  const tsQueryClient = useTsQueryClient();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [billOpen, setBillOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popup, setPopup] = useState<Window | null>(null);

  const isCustomer = order.user?.id === user?.id;
  const isStoreOwner =
    order.store?.owner?.id === user?.id ||
    !!user?.jobs.find((job) => job.store.id === order.store?.id);

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

  const { data: receiptResult, isFetching: isFetchingReceipt } =
    tsQueryClient.payment.receipt.useQuery(
      ['orderReceipt'],
      {
        params: {
          id: order?.payment?.id,
        },
      },
      {
        enabled: !!order?.payment?.id,
      }
    );

  const receipt = receiptResult?.body;

  const { mutate: createLink } =
    tsQueryClient.payment.createPaymentLink.useMutation({
      onSuccess: ({ body }) => {
        setPopup(window.open(body.redirectUrl));
      },
    });

  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data === 'refresh-order') {
          orderQueryResult.refetch();
          popup?.close();
        }
      },
      false
    );
  }, [popup, orderQueryResult]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const downloadReceipt = () => {
    if (!receipt) {
      return;
    }

    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${receipt.file}`;
    const fileName = `Order_Ref_${order.ref}_receipt.pdf`;
    link.download = fileName;
    link.click();
  };

  const statusColor: Record<
    OrderStatus,
    'default' | 'error' | 'warning' | 'info' | 'success'
  > = {
    [OrderStatus.Pending]: 'default',
    [OrderStatus.Cancelled]: 'error',
    [OrderStatus.Preparing]: 'warning',
    [OrderStatus.Ready]: 'info',
    [OrderStatus.Completed]: 'success',
  };

  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardContent sx={{ position: 'relative' }}>
          {(isStoreOwner || (isCustomer && user && !order?.payment)) && (
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
          )}
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
              <Typography variant="h4" color="primary">
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
                <Chip
                  color={statusColor[order?.status]}
                  label={order?.status}
                  size="small"
                />
              </Typography>
              <Typography>
                <b>Paid:</b>{' '}
                <Typography
                  component="span"
                  color={order?.payment ? 'green' : 'red'}
                >
                  {order?.payment ? 'Yes' : 'No'}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
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
            {order?.items.map((item, i) => {
              return (
                <TableRow>
                  <TableCell>
                    {item.count} {item.title}
                  </TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    {formatCurrency(item.price * item.count)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

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
            <Box>
              {!order.payment && (
                <Button
                  onClick={() =>
                    createLink({
                      body: {
                        orderId: order.id,
                      },
                    })
                  }
                >
                  Pay with Maya
                </Button>
              )}
            </Box>
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
              <Button disabled={isFetchingReceipt} onClick={downloadReceipt}>
                Receipt
              </Button>
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
