import { DataTable, useTsQueryClient, usePagination } from '@/core';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { Store, Order, OrderProduct } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const OrdersTable = ({ store }: { store: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, setPage, setPerPage } = usePagination();

  const { data } = tsQueryClient.order.getAll.useQuery(
    ['getOrders', perPage, page],
    {
      query: {
        storeIds: [store.id],
        perPage,
        page,
      },
    }
  );

  const orders = data?.body;
  return (
    <>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">Filters Here</Typography>
      </Box>
      <DataTable<Order>
        columns={[
          {
            name: 'ref',
            label: 'Reference No.',
          },
          {
            name: 'store',
            label: 'Store',
            render: ({ store }) => {
              return store.title;
            },
          },
          {
            name: 'items',
            label: 'Total Items',
            render: ({ items }) => {
              const reducer = (curr: number, item: OrderProduct) => {
                return curr + item.count;
              };
              return items.reduce(reducer, 0);
            },
          },
          {
            name: 'cost',
            label: 'Total Cost',
            render: ({ items }) => {
              const reducer = (curr: number, item: OrderProduct) => {
                return curr + item.count * item.price;
              };
              return items.reduce(reducer, 0);
            },
          },
          {
            name: 'status',
            label: 'Status',
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
