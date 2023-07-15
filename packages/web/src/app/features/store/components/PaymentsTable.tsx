import {
  DataTable,
  useTsQueryClient,
  usePagination,
  formatCurrency,
} from '@/core';
import { Box, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { Order, Store } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import { BaseSyntheticEvent, useState } from 'react';
import { format } from 'date-fns';

export const PaymentsTable = ({ store }: { store: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, order, setPage, setPerPage, setOrder } =
    usePagination();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data } = tsQueryClient.order.getAll.useQuery(
    ['getPayments', perPage, page, startDate, endDate, order?.by, order?.dir],
    {
      query: {
        storeIds: [store.id],
        isPaid: true,
        perPage,
        page,
        startDate,
        endDate,
        orderBy: order?.by,
        orderDir: order?.dir,
      },
    }
  );

  const orders = data?.body;

  return (
    <>
      <Toolbar
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        disableGutters
      >
        <TextField
          type="date"
          label="Start Date"
          onChange={(e: BaseSyntheticEvent) => setStartDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="End Date"
          onChange={(e: BaseSyntheticEvent) => setEndDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Toolbar>
      <DataTable<Order>
        columns={[
          {
            name: 'ref',
            label: 'Order Ref No.',
          },
          {
            name: 'amountPaid',
            label: 'Amount Paid',
            render: ({ payment }) => {
              return formatCurrency(payment.amountPaid);
            },
          },
          {
            name: 'totalCost',
            label: 'Total Cost',
            render: ({ payment }) => {
              return formatCurrency(payment.totalCost);
            },
          },
          {
            name: 'change',
            label: 'Change',
            render: ({ payment }) => {
              return formatCurrency(payment.change);
            },
          },
          {
            name: 'payment.createdAt',
            label: 'Created At',
            sortable: true,
            render: ({ payment }) => {
              return (
                <Typography variant="caption">
                  {format(new Date(payment.createdAt), 'MM-dd-Y hh:mm a')}
                </Typography>
              );
            },
          },
          {
            name: 'actions',
            label: 'Actions',
            sx: {
              textAlign: 'right',
            },
            render: ({ id }) => {
              return (
                <Box sx={{ textAlign: 'right' }}>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/manage/orders/${id}`)}
                  >
                    <EyeIcon />
                  </IconButton>
                </Box>
              );
            },
          },
        ]}
        perPage={perPage}
        page={page}
        count={orders?.count}
        data={orders?.list}
        onPage={setPage}
        onPerPage={setPerPage}
        onSort={setOrder}
      />
    </>
  );
};
