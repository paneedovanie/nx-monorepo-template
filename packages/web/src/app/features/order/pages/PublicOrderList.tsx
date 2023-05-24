import {
  DataTable,
  useTsQueryClient,
  useAuthContext,
  usePagination,
} from '@/core';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Order, OrderProduct } from '@nx-monorepo-template/global';
import { format } from 'date-fns';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const PublicOrderList = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { perPage, page, setPage, setPerPage } = usePagination();

  const { data } = tsQueryClient.order.getAll.useQuery(
    ['getOrders', perPage, page],
    {
      query: {
        userIds: [user?.id as string],
        perPage,
        page,
      },
    }
  );

  const orders = data?.body;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h5">
            Orders
          </Typography>
        </CardContent>
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
                      onClick={() => navigate(`/orders/${id}`)}
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
      </Card>
    </Container>
  );
};
