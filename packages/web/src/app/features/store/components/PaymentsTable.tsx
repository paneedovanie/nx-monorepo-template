import { DataTable, useTsQueryClient, usePagination } from '@/core';
import { Box, IconButton, Typography } from '@mui/material';
import { Order, Store } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';

export const PaymentsTable = ({ store }: { store: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, setPage, setPerPage } = usePagination();

  const { data } = tsQueryClient.order.getAll.useQuery(
    ['getPayments', perPage, page],
    {
      query: {
        storeIds: [store.id],
        isPaid: true,
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
        <Typography variant="h5">Filters here</Typography>
      </Box>
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
