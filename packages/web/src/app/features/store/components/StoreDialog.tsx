import {
  FormGenerator,
  FormGeneratorItem,
  useTsQueryClient,
  useAuthContext,
} from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Store, CreateStore, UpdateStore } from '@nx-monorepo-template/global';
import {
  CreateStoreSchema,
  UpdateStoreSchema,
} from '@nx-monorepo-template/global';

export const StoreDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data?: Store;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Store) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { user } = useAuthContext();

  const { mutate: create } = tsQueryClient.store.create.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  const { mutate: update } = tsQueryClient.store.update.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  const initialValues = {
    title: data?.title ?? '',
    description: data?.description ?? '',
    owner: data?.owner?.id ?? user?.id ?? '',
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
    {
      label: 'Image',
      name: 'image',
      component: 'FileField',
    },
  ];

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{data?.id ? 'Update' : 'Create'} Store</DialogTitle>
      <DialogContent>
        {data?.id ? (
          <FormGenerator<Store, UpdateStore>
            initialValues={initialValues}
            schema={UpdateStoreSchema}
            successMessage={'Store updated'}
            onSubmit={(v, options) => {
              update({ params: { id: data.id }, body: v }, options);
            }}
            items={items}
          />
        ) : (
          <FormGenerator<Store, CreateStore>
            initialValues={initialValues}
            schema={CreateStoreSchema}
            successMessage={'Store created'}
            onSubmit={(v, options) => {
              create({ body: v }, options);
            }}
            items={items}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
