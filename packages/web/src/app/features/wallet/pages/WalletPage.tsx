import {
  Breadcrumbs,
  DataTable,
  FormGenerator,
  useTsQueryClient,
  useAuthContext,
  usePagination,
} from '@/core';
import { Card, CardContent, Typography } from '@mui/material';
import {
  CreateTransaction,
  RolePermission,
  Transaction,
} from '@nx-monorepo-template/global';
import { CreateTransactionSchema } from '@nx-monorepo-template/global';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useState } from 'react';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const WalletPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { user, checkPermission } = useAuthContext();
  const [balance, setBalance] = useState(0);

  const { perPage, page, setPage, setPerPage } = usePagination();

  const { data, refetch: refetchTransactions } =
    tsQueryClient.transaction.getAll.useQuery(['getTransactions'], {
      query: {
        userIds: [user?.id as string],
        perPage,
        page,
      },
    });

  const transactions = data?.body;

  tsQueryClient.transaction.balance.useQuery(
    ['getBalance'],
    {},
    {
      refetchInterval: 5000,
      onSuccess: (v) => {
        if (balance !== v.body.balance) {
          setBalance(v.body.balance);
          refetchTransactions();
        }
      },
      refetchOnMount: true,
    }
  );

  const { mutate } = tsQueryClient.transaction.transfer.useMutation();

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'Wallet',
          },
        ]}
        sx={{ my: 1 }}
      />
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography>Wallet Balance</Typography>
          <Typography variant="h3">{balance}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h5">
            Transfer
          </Typography>
          <FormGenerator<Transaction, CreateTransaction>
            initialValues={{ receiver: '', amount: 0 }}
            successMessage="Transaction Created"
            onSubmit={(v, options) => {
              mutate(
                {
                  body: v,
                },
                options
              );
            }}
            schema={CreateTransactionSchema}
            items={[
              {
                label: 'Receiver',
                name: 'receiver',
                component: 'TextField',
              },
              {
                label: 'Amount',
                name: 'amount',
                component: 'TextField',
                props: {
                  type: 'number',
                },
              },
            ]}
          />
        </CardContent>
      </Card>
      {checkPermission([RolePermission.TransactionGenerate]) && (
        <Card sx={{ mb: 1 }}>
          <CardContent>
            <Typography sx={{ mb: 1 }} variant="h5">
              Generate
            </Typography>
            <FormGenerator<Transaction, CreateTransaction>
              initialValues={{ receiver: '', amount: 0 }}
              successMessage="Transaction Created"
              onSubmit={(v, options) => {
                mutate(
                  {
                    body: v,
                  },
                  options
                );
              }}
              schema={CreateTransactionSchema}
              items={[
                {
                  label: 'Receiver',
                  name: 'receiver',
                  component: 'TextField',
                },
                {
                  label: 'Amount',
                  name: 'amount',
                  component: 'TextField',
                  props: {
                    type: 'number',
                  },
                },
              ]}
            />
          </CardContent>
        </Card>
      )}
      <Card>
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h5">
            History
          </Typography>
        </CardContent>
        <DataTable
          columns={[
            {
              name: 'details',
              label: 'Details',
              render: ({ sender, receiver, amount, createdAt }) => {
                const isSender = user?.id === sender?.id;
                const otherParty =
                  (isSender ? receiver?.firstName : sender?.firstName) ??
                  'System';

                return (
                  <Typography>
                    {isSender ? 'Sent' : 'Received'} {amount}{' '}
                    {isSender ? 'to' : 'from'} {otherParty}
                  </Typography>
                );
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
          ]}
          perPage={perPage}
          page={page}
          count={transactions?.count}
          data={transactions?.list}
          onPage={setPage}
          onPerPage={setPerPage}
        />
      </Card>
    </Container>
  );
};
