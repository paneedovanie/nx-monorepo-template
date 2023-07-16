import {
  DataTable,
  useTsQueryClient,
  usePagination,
  formatCurrency,
} from '@/core';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import { Box, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { Store, Order, OrderProduct } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { BaseSyntheticEvent, useState } from 'react';

export const OrdersTable = ({ store }: { store: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, order, setPage, setPerPage, setOrder } =
    usePagination();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data, isLoading } = tsQueryClient.order.getAll.useQuery(
    ['getOrders', perPage, page, startDate, endDate, order?.by, order?.dir],
    {
      query: {
        storeIds: [store.id],
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
        isLoading={isLoading}
        columns={[
          {
            name: 'ref',
            label: 'Reference No.',
            sortable: true,
          },
          {
            name: 'store.title',
            label: 'Store',
            sortable: true,
            render: ({ store }) => {
              return store.title;
            },
          },
          {
            name: 'items',
            label: 'Total Items',
            sortable: true,
            render: ({ items }) => {
              const reducer = (curr: number, item: OrderProduct) => {
                return curr + item.count;
              };
              return formatCurrency(items.reduce(reducer, 0));
            },
          },
          {
            name: 'cost',
            label: 'Total Cost',
            render: ({ items }) => {
              const reducer = (curr: number, item: OrderProduct) => {
                return curr + item.count * item.price;
              };
              return formatCurrency(items.reduce(reducer, 0));
            },
          },
          {
            name: 'status',
            label: 'Status',
            sortable: true,
            render: ({ status }) => {
              return status;
            },
          },
          {
            name: 'paid',
            label: 'Paid',
            render: ({ payment }) => {
              return payment ? 'Paid' : 'No';
            },
          },
          {
            name: 'createdAt',
            label: 'Created At',
            sortable: true,
            render: ({ createdAt }) => {
              return (
                <Typography variant="caption">
                  {format(new Date(createdAt), 'MM-dd-Y hh:mm a')}
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
                    onClick={() =>
                      navigate(`/manage/stores/${store.id}/orders/${id}`)
                    }
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
