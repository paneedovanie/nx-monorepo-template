import {
  DataTable,
  useTsQueryClient,
  usePagination,
  Breadcrumbs,
  Allow,
  formatCurrency,
} from '@/core';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Order,
  OrderProduct,
  RolePermission,
} from '@nx-monorepo-template/global';
import { format } from 'date-fns';
import { BaseSyntheticEvent, useState } from 'react';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const OrderList = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const [unrestricted, setUnrestricted] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { perPage, page, order, setPage, setPerPage, setOrder } = usePagination(
    {},
    { query: true }
  );

  const { data } = tsQueryClient.order.getAll.useQuery(
    [
      'getOrders',
      perPage,
      page,
      order?.by,
      order?.dir,
      unrestricted,
      startDate,
      endDate,
    ],
    {
      query: {
        perPage,
        page,
        orderBy: order?.by,
        orderDir: order?.dir,
        unrestricted,
        startDate,
        endDate,
      },
    }
  );

  const orders = data?.body;

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
            <Typography variant="h5">Orders</Typography>
            <Allow permissions={[RolePermission.OrderGetAllUnrestricted]}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  value={unrestricted}
                  onChange={(e) => {
                    setUnrestricted(e.target.checked);
                  }}
                />
                <Typography>All</Typography>
              </Box>
            </Allow>
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
          </Box>
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
                return store?.title ?? 'Deleted';
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
                return formatCurrency(items.reduce(reducer, 0));
              },
            },
            {
              name: 'status',
              label: 'Status',
              sortable: true,
              render: ({ status }) => {
                return (
                  <span style={{ textTransform: 'capitalize' }}>{status}</span>
                );
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
              name: 'user',
              label: 'User',
              display: unrestricted,
              render: (order) => {
                return order.user?.firstName
                  ? order.user?.firstName + ' ' + order.user?.lastName
                  : 'Unauthenticated';
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
          onSort={setOrder}
        />
      </Card>
    </Container>
  );
};
