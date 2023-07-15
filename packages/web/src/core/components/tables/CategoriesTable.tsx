import {
  DataTable,
  useTsQueryClient,
  usePagination,
  Breadcrumbs,
  ConfirmDialog,
} from '@/core';
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Category, Store } from '@nx-monorepo-template/global';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Dispatch, SetStateAction, useState } from 'react';
import { CategoryDialog } from './partials';

export const CategoriesTablePartial = ({
  store,
  breadcrumbs,
  setBreadcrumbs,
  showChildren,
}: {
  store?: Store;
  breadcrumbs: Category[];
  setBreadcrumbs: Dispatch<SetStateAction<Category[]>>;
  showChildren?: (parent: Category) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { page, perPage, setPage, setPerPage } = usePagination();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Category>();
  const parent = breadcrumbs?.[breadcrumbs.length - 1];

  const { data, refetch: refetchCategories } =
    tsQueryClient.category.getAll.useQuery(
      ['getCategories', perPage, page, parent?.id],
      {
        query: {
          store: store?.id,
          type: 'product',
          parent: parent?.id,
          isRoot: parent?.id ? undefined : true,
          perPage,
          page,
        },
      }
    );
  const { mutate: deleteCategory } = tsQueryClient.category.delete.useMutation({
    onSuccess: () => {
      refetchCategories();
    },
  });

  const categories = data?.body;

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
        disableGutters
      >
        <Breadcrumbs
          items={[
            {
              label: 'Root',
              onClick: () => {
                setBreadcrumbs([]);
              },
            },
            ...breadcrumbs.map((item, i) => ({
              label: item.title,
              onClick:
                i === breadcrumbs.length - 1
                  ? undefined
                  : () => {
                      const temp = [...breadcrumbs];
                      temp?.splice(i + 1);
                      setBreadcrumbs(temp);
                    },
            })),
          ]}
          sx={{ my: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => {
            setSelectedItem(undefined);
            setDialogOpen(true);
          }}
        >
          Add
        </Button>
      </Toolbar>
      <DataTable<Category>
        columns={[
          {
            name: 'title',
            label: 'Title',
          },
          {
            name: 'description',
            label: 'Description',
          },
          {
            name: 'store',
            label: 'Store',
            display: !store,
            render: (category) => {
              return category.store?.title ?? 'None';
            },
          },
          {
            name: 'children',
            label: 'Sub Categories',
            render: (category) => {
              return (
                <Typography
                  color="primary"
                  onClick={() => showChildren?.(category)}
                  sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {category.children?.length ?? 0}{' '}
                </Typography>
              );
            },
          },
          {
            name: 'actions',
            label: 'Actions',
            sx: {
              textAlign: 'right',
            },
            render: (category) => {
              return (
                <Box sx={{ textAlign: 'right' }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedItem(category);
                      setDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedItem(category);
                      setConfirmDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            },
          },
        ]}
        perPage={perPage}
        page={page}
        count={categories?.count}
        data={categories?.list}
        onPage={setPage}
        onPerPage={setPerPage}
      />
      <CategoryDialog
        data={selectedItem}
        open={dialogOpen}
        parent={parent}
        store={store}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          refetchCategories();
          setDialogOpen(false);
        }}
      />
      <ConfirmDialog
        title="Delete Category"
        content="Are you sure to delete this category?"
        successMessage="Category successfully deleted"
        open={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false);
        }}
        onSubmit={(options) => {
          if (selectedItem) {
            deleteCategory(
              {
                params: { id: selectedItem.id },
                body: {},
              },
              options
            );
          }
        }}
        onSuccess={() => {
          setConfirmDialogOpen(false);
        }}
      />
    </>
  );
};

export const CategoriesTable = ({ store }: { store?: Store }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);

  return (
    <CategoriesTablePartial
      store={store}
      breadcrumbs={breadcrumbs}
      setBreadcrumbs={setBreadcrumbs}
      showChildren={(c) => setBreadcrumbs((v) => [...v, c])}
    />
  );
};
