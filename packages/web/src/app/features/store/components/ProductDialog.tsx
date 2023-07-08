import { FormGenerator, FormGeneratorItem, useTsQueryClient } from '@/core';
import {
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { TreeView, TreeItem } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import {
  Product,
  CreateProduct,
  UpdateProduct,
  Category,
  Store,
} from '@nx-monorepo-template/global';
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '@nx-monorepo-template/global';
import { SyntheticEvent } from 'react';

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

  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    ['getCategories'],
    {
      query: {
        store: store?.id,
        perPage: -1,
        type: 'product',
        isRoot: true,
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

  const renderTree = (node: Category, parentActive?: boolean) => {
    return (
      <TreeItem
        key={node.id}
        sx={{ ml: 2 }}
        nodeId={node.id}
        label={node.title}
      >
        {node.children?.map((node) => renderTree(node))}
      </TreeItem>
    );
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
          <>
            <Box sx={{ p: 1 }}>
              <Typography variant="h6">Category</Typography>
            </Box>
            <TreeView
              selected={options.value}
              onNodeSelect={(e: SyntheticEvent, id: string) =>
                options.context?.setFieldValue(options.name, id)
              }
              aria-label="category navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {categories?.list.map((node) => renderTree(node))}
            </TreeView>
          </>
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
