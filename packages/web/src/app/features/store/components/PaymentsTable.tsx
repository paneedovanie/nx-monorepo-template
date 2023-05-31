import { DataTable, useTsQueryClient, usePagination } from '@/core';
import { Box, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { Order, Store } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import { BaseSyntheticEvent, useState } from 'react';

export const PaymentsTable = ({ store }: { store: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, setPage, setPerPage } = usePagination();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data } = tsQueryClient.order.getAll.useQuery(
    ['getPayments', perPage, page, startDate, endDate],
    {
      query: {
        storeIds: [store.id],
        isPaid: true,
        perPage,
        page,
        startDate,
        endDate,
      },
    }
  );

  const orders = data?.body;

  return (
    <>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              return payment.amountPaid;
            },
          },
          {
            name: 'totalCost',
            label: 'Total Cost',
            render: ({ payment }) => {
              return payment.totalCost;
            },
          },
          {
            name: 'change',
            label: 'Change',
            render: ({ payment }) => {
              return payment.change;
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
      />
    </>
  );
};
