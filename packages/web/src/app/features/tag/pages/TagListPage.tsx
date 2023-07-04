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
import { Tag } from '@nx-monorepo-template/global';
import { useSearchParams } from 'react-router-dom';
import { TagDialog } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const TagListPage = () => {
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
  const [selectedItem, setSelectedItem] = useState<Tag>();

  const { data, refetch: refetchTags } = tsQueryClient.tag.getAll.useQuery(
    ['getTags', query.get('parent'), perPage, page],
    {
      query: {
        search,
        type: 'product',
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
  const { mutate: deleteTag } = tsQueryClient.tag.delete.useMutation({
    onSuccess: () => {
      refetchTags();
    },
  });

  const tags = data?.body;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          ...(query.get('parent')
            ? [
                {
                  label: 'Tags',
                  to: '/manage/tags',
                },
                { label: 'Sub-tags' },
              ]
            : [
                {
                  label: 'Tags',
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
            Tags
          </Typography>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add
          </Button>
        </CardContent>
        <DataTable<Tag>
          columns={[
            {
              name: 'title',
              label: 'Title',
            },
            {
              name: 'actions',
              label: 'Actions',
              sx: {
                textAlign: 'right',
              },
              render: (tag) => {
                return (
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedItem(tag);
                        setDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() =>
                        deleteTag({
                          params: { id: tag.id },
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
          count={tags?.count}
          data={tags?.list}
          onPage={setPage}
          onPerPage={setPerPage}
        />
      </Card>
      <TagDialog
        data={selectedItem}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          refetchTags();
          setSelectedItem(undefined);
        }}
      />
    </Container>
  );
};
