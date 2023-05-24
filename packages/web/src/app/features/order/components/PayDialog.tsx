import { FormGenerator, useTsQueryClient } from '@/core';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {
  Order,
  Transaction,
  Pay,
  OrderProduct,
} from '@nx-monorepo-template/global';
import { PaySchema } from '@nx-monorepo-template/global';
import { useMemo } from 'react';

export const PayDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data: Order;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Transaction) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { data: balanceResult } = tsQueryClient.transaction.balance.useQuery(
    ['getBalance'],
    {},
    {}
  );
  const balance = balanceResult?.body;

  const totalCost = useMemo(() => {
    let total = 0;
    data?.items.forEach(({ price, count }: OrderProduct) => {
      const totalPrice = price * count;
      total += totalPrice;
    });
    return total;
  }, [data?.items]);

  const change = (balance?.balance ?? 0) - totalCost;

  const { mutate } = tsQueryClient.transaction.pay.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: ['100%', null, 320] } }}
    >
      <DialogTitle>Pay</DialogTitle>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Account Balance:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">
                {balance?.balance ?? 'Fetching...'}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Total Cost:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">{totalCost}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Change:</Typography>
            </TableCell>
            <TableCell>
              <Typography color={change < 0 ? 'error' : 'success'} variant="h4">
                {change}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DialogActions>
        <FormGenerator<Transaction, Pay>
          initialValues={{
            orderId: data.id,
          }}
          schema={PaySchema}
          successMessage={'Payment created'}
          onSubmit={(v, options) => {
            mutate({ body: v }, options);
          }}
        />
      </DialogActions>
    </Dialog>
  );
};
