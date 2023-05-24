import { FormGenerator, FormGeneratorItem, useTsQueryClient } from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Role, CreateRole, UpdateRole } from '@nx-monorepo-template/global';
import {
  CreateRoleSchema,
  UpdateRoleSchema,
} from '@nx-monorepo-template/global';

export const RoleDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data?: Role;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Role) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { mutate: create } = tsQueryClient.role.create.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });
  const { mutate: update } = tsQueryClient.role.update.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  const initialValues = {
    title: data?.title ?? '',
    description: data?.description ?? '',
  };

  const items: FormGeneratorItem[] = [
    {
      label: 'Title',
      name: 'title',
      component: 'TextField',
    },
    {
      label: 'Description',
      name: 'description',
      component: 'TextField',
      props: {
        multiline: true,
        rows: 2,
      },
    },
  ];

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{data?.id ? 'Update' : 'Create'} Role</DialogTitle>
      <DialogContent>
        {data?.id ? (
          <FormGenerator<Role, UpdateRole>
            initialValues={initialValues}
            schema={UpdateRoleSchema}
            successMessage={'Role updated'}
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
          <FormGenerator<Role, CreateRole>
            initialValues={initialValues}
            schema={CreateRoleSchema}
            successMessage={'Role created'}
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
