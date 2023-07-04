import { FormGenerator, formatCurrency, useTsQueryClient } from '@/core';
import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  DialogContent,
} from '@mui/material';
import {
  Order,
  Payment,
  CreatePayment,
  OrderProduct,
} from '@nx-monorepo-template/global';
import { CreatePaymentSchema } from '@nx-monorepo-template/global';
import { useMemo, useState } from 'react';

export const BillDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data: Order;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Payment) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const [amountPaid, setAmountPaid] = useState(0);

  const totalCost = useMemo(() => {
    let total = 0;
    data?.items.forEach(({ price, count }: OrderProduct) => {
      const totalPrice = price * count;
      total += totalPrice;
    });
    return total;
  }, [data?.items]);

  const change = useMemo(() => amountPaid - totalCost, [amountPaid, totalCost]);

  const { mutate } = tsQueryClient.payment.create.useMutation({
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
      <DialogTitle>Bill</DialogTitle>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Total Cost:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">{formatCurrency(totalCost)}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Change:</Typography>
            </TableCell>
            <TableCell>
              <Typography color={change < 0 ? 'error' : 'success'} variant="h4">
                {formatCurrency(change)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DialogContent>
        <FormGenerator<Payment, CreatePayment>
          initialValues={{
            order: data.id,
            type: 'cash',
            amountPaid: 0,
            totalCost,
          }}
          schema={CreatePaymentSchema}
          successMessage={'Payment created'}
          onSubmit={(v, options) => {
            mutate({ body: v }, options);
          }}
          items={[
            {
              label: 'Amount Paid',
              name: 'amountPaid',
              component: 'TextField',
              props: {
                type: 'number',
              },
            },
          ]}
          onChange={(v) => {
            setAmountPaid(v.amountPaid ?? 0);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
