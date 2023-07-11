import {
  CategoryField,
  FormGenerator,
  FormGeneratorItem,
  useTsQueryClient,
} from '@/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  Product,
  CreateProduct,
  UpdateProduct,
  Store,
} from '@nx-monorepo-template/global';
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '@nx-monorepo-template/global';

export const ProductDialog = ({
  data,
  open,
  initialValues,
  store,
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
  store?: Store;
  onClose: () => void;
  onSuccess?: (data: Product) => void;
}) => {
  const tsQueryClient = useTsQueryClient();

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
      label: 'Image',
      name: 'image',
      component: 'FileField',
    },
    {
      label: 'Category',
      name: 'category',
      component: (options) => {
        return (
          <CategoryField
            store={store}
            label="Category"
            size="small"
            onSelect={(v) => {
              options.context?.setFieldValue(options.name, v.id);
            }}
            value={data?.category}
            name={options.name}
            error={!!options.error}
            helperText={options.error}
            sx={{ width: '100%' }}
          />
        );
      },
    },
  ];

  return (
    <Dialog
      onClose={() => {
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
