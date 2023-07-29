import {
  FormGenerator,
  LayoutLoader,
  PageContextProvider,
  theme,
  usePageContext,
  usePagination,
  useTsQueryClient,
} from '@/core';
import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {
  Store,
  Tag,
  UpdateStore,
  UpdateStoreConfig,
  UpdateStoreSchema,
} from '@nx-monorepo-template/global';
import { MuiColorInput } from 'mui-color-input';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreEditPageContent = () => {
  const tsQueryClient = useTsQueryClient();
  const { storeQueryResult } = usePageContext();

  const { search, perPage, page, setSearch } = usePagination();

  const { data: tagsResult } = tsQueryClient.tag.getAll.useQuery(
    ['getTags', search],
    {
      query: {
        search,
        type: 'product',
        perPage,
        page,
      },
    },
    {
      cacheTime: 0,
    }
  );

  const tags = tagsResult?.body;

  const { mutate } = tsQueryClient.store.update.useMutation({
    onSuccess: () => {
      storeQueryResult.refetch();
    },
  });

  const store = storeQueryResult.data?.body;

  const { mutate: updateConfig } = tsQueryClient.store.updateConfig.useMutation(
    {
      onSuccess: () => {
        storeQueryResult.refetch();
      },
    }
  );

  if (storeQueryResult.isFetching) {
    return <LayoutLoader sx={{ height: 500 }} />;
  }
  if (!store) {
    return <Typography>404</Typography>;
  }

  return (
    <Container>
      <Breadcrumbs sx={{ my: 1 }} />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 1 }} variant="h5">
            Edit Store Profile
          </Typography>
          <Card>
            <CardContent>
              <FormGenerator<Store, UpdateStore>
                initialValues={{
                  title: store.title,
                  description: store.description,
                  owner: store.owner.id,
                  tags: store.tags.map(({ id }: Tag) => id),
                }}
                schema={UpdateStoreSchema}
                onSubmit={(v, options) => {
                  mutate({ params: { id: store.id }, body: v }, options);
                }}
                successMessage="Store Profile Updated"
                items={[
                  {
                    label: 'Image',
                    name: 'image',
                    component: 'FileField',
                  },
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
                    label: 'Tags',
                    name: 'tags',
                    valueKey: 'id',
                    labelKey: 'title',
                    component: 'AutoComplete',
                    props: {
                      freeSolo: true,
                      multiple: true,
                      defaultValue: store?.tags,
                      options: tags?.list ?? [],
                      onInputChange: (event: SyntheticEvent, value: string) => {
                        setSearch(value);
                      },
                    },
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 1 }} variant="h5">
            Edit Store Config
          </Typography>
          <Card>
            <CardContent>
              <FormGenerator<Store, UpdateStoreConfig>
                initialValues={{
                  headerTextColor:
                    store.config?.headerTextColor ?? theme.color.white,
                  primaryColor:
                    store.config?.primaryColor ?? theme.color.primary,
                  secondaryColor:
                    store.config?.secondaryColor ?? theme.color.secondary,
                  tax: store.config?.tax ?? 0,
                }}
                successMessage={'Store Config updated'}
                onSubmit={(v, options) => {
                  updateConfig(
                    { params: { id: store.id as string }, body: v },
                    options
                  );
                }}
                items={[
                  {
                    label: 'Primary Color',
                    name: 'primaryColor',
                    component: (options) => {
                      return (
                        <MuiColorInput
                          label={options.label}
                          value={options.value}
                          onChange={(v) =>
                            options.context?.setFieldValue(options.name, v)
                          }
                          size="small"
                          format="hex"
                          sx={{ width: '100%' }}
                        />
                      );
                    },
                  },
                  {
                    label: 'Secondary Color',
                    name: 'secondaryColor',
                    component: (options) => {
                      return (
                        <MuiColorInput
                          label={options.label}
                          value={options.value}
                          onChange={(v) =>
                            options.context?.setFieldValue(options.name, v)
                          }
                          size="small"
                          format="hex"
                          sx={{ width: '100%' }}
                        />
                      );
                    },
                  },
                  {
                    label: 'Header Text Color',
                    name: 'headerTextColor',
                    component: (options) => {
                      return (
                        <MuiColorInput
                          label={options.label}
                          value={options.value}
                          onChange={(v) =>
                            options.context?.setFieldValue(options.name, v)
                          }
                          size="small"
                          format="hex"
                          sx={{ width: '100%' }}
                        />
                      );
                    },
                  },
                  {
                    label: 'Tax',
                    name: 'tax',
                    component: 'TextField',
                    props: {
                      type: 'number',
                    },
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export const StoreEditPage = () => {
  return (
    <PageContextProvider>
      <StoreEditPageContent />
    </PageContextProvider>
  );
};
