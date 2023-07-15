import {
  Breadcrumbs,
  DataTable,
  useTsQueryClient,
  usePagination,
} from '@/core';
import {
  Box,
  Button,
  Card,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import {
  Notification,
  getNotificationMessages,
} from '@nx-monorepo-template/global';
import { RemoveRedEye as EyeIcon } from '@mui/icons-material';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const NotificationListPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { search, page, perPage, order, setPerPage, setPage, setOrder } =
    usePagination(
      {},
      {
        query: true,
      }
    );

  const { data, refetch } = tsQueryClient.notification.getAll.useQuery(
    ['getNotifications', search, perPage, page, order?.by, order?.dir],
    {
      query: {
        search,
        perPage,
        page,
        orderBy: order?.by ?? 'createdAt',
        orderDir: order?.dir ?? 'DESC',
      },
    }
  );

  const notifications = data?.body;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'Notifications',
          },
        ]}
        sx={{ my: 1 }}
      />
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        disableGutters
      >
        <Typography sx={{ mb: 1 }} variant="h5">
          Notifications
        </Typography>
        <Button
          variant="contained"
          onClick={async () => {
            await tsQueryClient.notification.readAll.mutation({
              body: {},
            });
            refetch();
          }}
        >
          Read All
        </Button>
      </Toolbar>
      <Card>
        <DataTable<Notification>
          columns={[
            {
              name: 'title',
              label: 'Title',
              render: (v) => {
                const messages = getNotificationMessages(v);
                return messages.title;
              },
            },
            {
              name: 'description',
              label: 'Description',
              render: (v) => {
                const messages = getNotificationMessages(v);
                return messages.description;
              },
            },
            {
              name: 'opened',
              label: 'Opened',
              sortable: true,
              render: (v) => {
                return (
                  <Typography variant="body2">
                    {v.opened ? 'Yes' : 'No'}
                  </Typography>
                );
              },
            },
            {
              name: 'createdAt',
              label: 'Created At',
              sortable: true,
            },
            {
              name: 'actions',
              label: 'Actions',
              sx: {
                textAlign: 'right',
              },
              render: (item) => {
                return (
                  <Box sx={{ textAlign: 'right' }}>
                    {!item.opened && (
                      <IconButton
                        size="small"
                        onClick={async () => {
                          await tsQueryClient.notification.read.mutation({
                            params: { id: item.id },
                            body: {},
                          });
                          refetch();
                        }}
                      >
                        <EyeIcon />
                      </IconButton>
                    )}
                  </Box>
                );
              },
            },
          ]}
          perPage={perPage}
          page={page}
          count={notifications?.count}
          data={notifications?.list}
          onPage={setPage}
          onPerPage={setPerPage}
          onSort={setOrder}
        />
      </Card>
    </Container>
  );
};
