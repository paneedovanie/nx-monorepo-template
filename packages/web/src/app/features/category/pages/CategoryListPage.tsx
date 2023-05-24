import {
  Breadcrumbs,
  DataTable,
  useTsQueryClient,
  usePagination,
} from '@/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { useState } from 'react';
import { Category } from '@nx-monorepo-template/global';
import { Link, useSearchParams } from 'react-router-dom';
import { CategoryDialog } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const CategoryListPage = () => {
  const tsQueryClient = useTsQueryClient();
  const [query] = useSearchParams();
  const { search, page, perPage, setPerPage, setPage } = usePagination(
    {
      page: +(query.get('page') ?? 1),
      perPage: +(query.get('perPage') ?? 5),
    },
    {
      query: true,
    }
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Category>();

  const { data, refetch: refetchCategories } =
    tsQueryClient.category.getAll.useQuery(
      ['getCategories', query.get('parent'), perPage, page],
      {
        query: {
          search,
          type: 'product',
          parent: query.get('parent') ?? undefined,
          perPage,
          page,
        },
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
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
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          ...(query.get('parent')
            ? [
                {
                  label: 'Categories',
                  to: '/manage/categories',
                },
                { label: 'Sub-categories' },
              ]
            : [
                {
                  label: 'Categories',
                },
              ]),
        ]}
        sx={{ my: 1 }}
      />
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ mb: 1 }} variant="h5">
            Categories
          </Typography>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add
          </Button>
        </CardContent>
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
              name: 'parent',
              label: 'Parent',
              render: ({ id, parent }) => {
                return parent?.title ?? 'None';
              },
            },
            {
              name: 'children',
              label: 'Children',
              render: ({ id, children }) => {
                return children?.length ? (
                  <Link to={`/manage/categories?parent=${id}&page=1`}>
                    {children?.length}
                  </Link>
                ) : (
                  0
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
                      onClick={() =>
                        deleteCategory({
                          params: { id: category.id },
                          body: {},
                        })
                      }
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
      </Card>
      <CategoryDialog
        data={selectedItem}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          refetchCategories();
        }}
      />
    </Container>
  );
};
