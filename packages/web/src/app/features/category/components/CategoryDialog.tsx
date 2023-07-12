import { FormGenerator, FormGeneratorItem, useTsQueryClient } from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  Category,
  CreateCategory,
  Store,
  UpdateCategory,
} from '@nx-monorepo-template/global';
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from '@nx-monorepo-template/global';

export const CategoryDialog = ({
  data,
  store,
  parent,
  open,
  onClose,
  onSuccess,
}: {
  data?: Category;
  store: Store;
  parent?: Category;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Category) => void;
}) => {
  console.log('open', open);
  const tsQueryClient = useTsQueryClient();

  const { mutate: create } = tsQueryClient.category.create.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });
  const { mutate: update } = tsQueryClient.category.update.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  const initialValues = {
    title: data?.title ?? '',
    type: data?.type ?? 'product',
    description: data?.description ?? '',
    parent: parent?.id,
    store: store?.id,
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
      <DialogTitle>{data?.id ? 'Update' : 'Create'} aCategory</DialogTitle>
      <DialogContent>
        {data?.id ? (
          <FormGenerator<Category, UpdateCategory>
            initialValues={initialValues}
            schema={UpdateCategorySchema}
            successMessage={'Category updated'}
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
          <FormGenerator<Category, CreateCategory>
            initialValues={initialValues}
            schema={CreateCategorySchema}
            successMessage={'Category created'}
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
