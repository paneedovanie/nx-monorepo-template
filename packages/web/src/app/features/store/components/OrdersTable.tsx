import {
  DataTable,
  useTsQueryClient,
  usePagination,
  formatCurrency,
} from '@/core';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Store,
  Order,
  OrderProduct,
  OrderStatus,
} from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { BaseSyntheticEvent, useState } from 'react';

export const OrdersTable = ({ store }: { store: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, order, setPage, setPerPage, setOrder } =
    usePagination();
  const [ref, setRef] = useState<string>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [status, setStatus] = useState<string>('');
  const [paid, setPaid] = useState<string>('');

  const statusOptions = [
    { label: 'Clear', value: '' },
    ...Object.values(OrderStatus).map((status) => ({
      label: status.charAt(0).toUpperCase() + status.substring(1),
      value: status,
    })),
  ];

  const paidOptions = [
    { label: 'Clear', value: '' },
    { label: 'Paid', value: 'paid' },
    { label: 'Unpaid', value: 'unpaid' },
  ];

  const { data, isLoading } = tsQueryClient.order.getAll.useQuery(
    [
      'getOrders',
      perPage,
      page,
      startDate,
      endDate,
      order?.by,
      order?.dir,
      ref,
      status,
      paid,
    ],
    {
      query: {
        storeIds: [store.id],
        perPage,
        page,
        startDate,
        endDate,
        orderBy: order?.by,
        orderDir: order?.dir,
        ref,
        status: status === '' ? undefined : status,
        isPaid: paid === '' ? undefined : paid === 'paid' ? true : false,
      },
    }
  );

  const orders = data?.body;

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: ['column', null, 'row'],
          alignItems: 'center',
          gap: 1,
        }}
        disableGutters
      >
        <TextField
          label="Ref"
          onChange={(e: BaseSyntheticEvent) =>
            setRef(e.target.value === '' ? undefined : e.target.value)
          }
          size="small"
        />
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
        <FormControl sx={{ maxWidth: 169, width: '100%' }}>
          <InputLabel id="status-label" size="small">
            Status
          </InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            size="small"
            onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
          >
            {statusOptions.map((item, i) => (
              <MenuItem value={item.value} key={i}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ maxWidth: 169, width: '100%' }}>
          <InputLabel id="paid-label" size="small">
            Paid
          </InputLabel>
          <Select
            labelId="paid-label"
            label="Paid"
            size="small"
            onChange={(e: SelectChangeEvent) => setPaid(e.target.value)}
          >
            {paidOptions.map((item, i) => (
              <MenuItem value={item.value} key={i}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
      <DataTable<Order>
        isLoading={isLoading}
        columns={[
          {
            name: 'ref',
            label: 'Reference No.',
            sortable: true,
          },
          // {
          //   name: 'store.title',
          //   label: 'Store',
          //   sortable: true,
          //   render: ({ store }) => {
          //     return store.title;
          //   },
          // },
          {
            name: 'items',
            label: 'Total Items',
            sortable: true,
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
            sx: { textTransform: 'capitalize' },
            render: ({ status }) => {
              return (
                <Typography
                  variant="body2"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {status}
                </Typography>
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
