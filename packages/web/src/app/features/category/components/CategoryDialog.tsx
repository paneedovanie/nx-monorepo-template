import { FormGenerator, FormGeneratorItem, useTsQueryClient } from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '@nx-monorepo-template/global';
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from '@nx-monorepo-template/global';
import { SyntheticEvent, useState } from 'react';

export const CategoryDialog = ({
  data,
  open,
  onClose,
  onSuccess,
}: {
  data?: Category;
  open: boolean;
  onClose: () => void;
  onSuccess?: (data: Category) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const [search, setSearch] = useState<string>();
  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    ['getParentCategories', search],
    {
      query: {
        search,
        type: 'product',
        isRoot: true,
      },
    }
  );
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
  const categories = categoriesResult?.body;

  const initialValues = {
    title: data?.title ?? '',
    type: data?.type ?? 'product',
    description: data?.description ?? '',
    parent: data?.parent?.id,
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
      label: 'Parent',
      name: 'parent',
      component: 'AutoComplete',
      valueKey: 'id',
      labelKey: 'title',
      props: {
        defaultValue: data?.parent,
        options: categories?.list ?? [],
        onInputChange: (event: SyntheticEvent, value: string) => {
          setSearch(value);
        },
      },
    },
  ];

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{data?.id ? 'Update' : 'Create'} Category</DialogTitle>
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
