import {
  FormGenerator,
  FormGeneratorItem,
  usePageContext,
  useTsQueryClient,
} from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  Employee,
  CreateEmployee,
  UpdateEmployee,
} from '@nx-monorepo-template/global';
import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
} from '@nx-monorepo-template/global';
import { useMemo } from 'react';

export const EmployeeDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data?: Employee;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Employee) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { storeQueryResult } = usePageContext();

  const { data: rolesResult } = tsQueryClient.role.getAll.useQuery(
    ['getRoles'],
    {
      query: {
        isEmployee: true,
      },
    }
  );
  const roles = rolesResult?.body;

  const rolesIdSet = useMemo(
    () => new Set(data?.roles.map(({ id }) => id)),
    [data]
  );

  const { mutate: create } = tsQueryClient.employee.create.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });
  const { mutate: update } = tsQueryClient.employee.update.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  const store = storeQueryResult?.data?.body;

  const initialValues = {
    uniqueCode: data?.user?.uniqueCode ?? '',
    store: store?.id ?? '',
    role: roles?.list.find((item) => item.title === 'Cashier')?.id ?? '',
  };

  const items: FormGeneratorItem[] = [
    {
      label: 'Unique Code',
      name: 'uniqueCode',
      component: 'TextField',
    },

    {
      label: 'Role',
      name: 'role',
      component: 'AutoComplete',
      valueKey: 'id',
      labelKey: 'title',
      props: {
        options: roles?.list.filter(({ id }) => !rolesIdSet.has(id)) ?? [],
      },
    },
  ];

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{data?.id ? 'Update' : 'Create'} Employee</DialogTitle>
      <DialogContent>
        {data?.id ? (
          <FormGenerator<Employee, UpdateEmployee>
            initialValues={initialValues}
            schema={UpdateEmployeeSchema}
            successMessage={'Employee updated'}
            onSubmit={(v, options) => {
              update(
                {
                  params: { id: data.id },
                  body: v,
                },
                options
              );
            }}
            items={items}
          />
        ) : (
          <FormGenerator<Employee, CreateEmployee>
            initialValues={initialValues}
            schema={CreateEmployeeSchema}
            successMessage={'Employee created'}
            onSubmit={(v, options) => {
              create(
                {
                  body: v,
                },
                options
              );
            }}
            items={items}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
