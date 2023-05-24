import { FormGenerator, useTsQueryClient } from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  User,
  UpdateUserRoleSchema,
  UpdateUserRole,
} from '@nx-monorepo-template/global';
import { SyntheticEvent, useMemo, useState } from 'react';

export const UserRoleDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data: User;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: User) => void;
}) => {
  const tsQueryClient = useTsQueryClient();

  const [search, setSearch] = useState<string>();
  const { data: rolesResult } = tsQueryClient.role.getAll.useQuery(
    ['getRoles'],
    {
      query: {
        search,
      },
    }
  );
  const roles = rolesResult?.body;

  const rolesIdSet = useMemo(
    () => new Set(data.roles.map(({ id }) => id)),
    [data]
  );

  const { mutate } = tsQueryClient.user.assignRole.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add User Role</DialogTitle>
      <DialogContent>
        <FormGenerator<User, UpdateUserRole>
          initialValues={{ roleId: '' }}
          schema={UpdateUserRoleSchema}
          successMessage={'User role updated'}
          onSubmit={(v, options) => {
            mutate(
              {
                params: { id: data.id },
                body: v,
              },
              options
            );
          }}
          items={[
            {
              label: 'Role',
              name: 'roleId',
              component: 'AutoComplete',
              valueKey: 'id',
              labelKey: 'title',
              props: {
                options:
                  roles?.list.filter(({ id }) => !rolesIdSet.has(id)) ?? [],
                onInputChange: (event: SyntheticEvent, value: string) => {
                  setSearch(value);
                },
              },
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
};
