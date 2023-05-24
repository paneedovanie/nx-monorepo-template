import { FormGenerator, FormGeneratorItem, useTsQueryClient } from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  Product,
  CreateProduct,
  UpdateProduct,
  Category,
} from '@nx-monorepo-template/global';
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '@nx-monorepo-template/global';
import { SyntheticEvent, useState } from 'react';

export const ProductDialog = ({
  data,
  open,
  initialValues,
  onClose,
  onSuccess,
}: {
  data?: Product;
  open: boolean;
  initialValues?: {
    title?: string;
    description?: string;
    store?: string;
    price?: number;
    category?: string;
  };
  onClose: () => void;
  onSuccess?: (data: Product) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const [search, setSearch] = useState<string>();
  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    ['getCategories'],
    {
      query: {
        isRoot: false,
        search,
        type: 'product',
      },
    }
  );

  const categories = categoriesResult?.body;

  const { mutate: create } = tsQueryClient.product.create.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });
  const { mutate: update } = tsQueryClient.product.update.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
    },
  });

  const value = {
    title: data?.title ?? initialValues?.title ?? '',
    description: data?.description ?? initialValues?.description ?? '',
    store: data?.store?.id ?? initialValues?.store ?? '',
    price: data?.price ?? initialValues?.price ?? 0,
    category: data?.category?.id ?? initialValues?.category ?? '',
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
      label: 'Price',
      name: 'price',
      component: 'TextField',
      props: {
        type: 'number',
      },
    },
    {
      label: 'Category',
      name: 'category',
      component: 'AutoComplete',
      valueKey: 'id',
      labelKey: 'title',
      props: {
        getOptionLabel: (option: Category) =>
          `${option.title} (Parent: ${option.parent?.title ?? 'None'})`,
        defaultValue: data?.category,
        options: categories?.list ?? [],
        onInputChange: (event: SyntheticEvent, value: string) => {
          setSearch(value);
        },
      },
    },
    {
      label: 'Image',
      name: 'image',
      component: 'FileField',
    },
  ];

  return (
    <Dialog
      onClose={() => {
        setSearch(undefined);
        onClose();
      }}
      open={open}
    >
      <DialogTitle>{data?.id ? 'Update' : 'Create'} Product</DialogTitle>
      <DialogContent>
        {data?.id ? (
          <FormGenerator<Product, UpdateProduct>
            initialValues={value}
            schema={UpdateProductSchema}
            successMessage={'Product updated'}
            onSubmit={(v, options) => {
              update({ params: { id: data.id }, body: v }, options);
            }}
            items={items}
          />
        ) : (
          <FormGenerator<Product, CreateProduct>
            initialValues={value}
            schema={CreateProductSchema}
            successMessage={'Product created'}
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
