import {
  Breadcrumbs,
  FormGenerator,
  Loading,
  QrcodeDialog,
  StarRating,
  Tags,
  usePagination,
  useTsQueryClient,
} from '@/core';
import { Edit as EditIcon, Store as StoreIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import {
  UpdateStore,
  Store,
  UpdateStoreSchema,
  generateColor,
  Tag,
} from '@nx-monorepo-template/global';
import { SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { OtherInformation } from '../components';
import { Link as RouterLink } from 'react-router-dom';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreViewPage = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const id = params.id as string;

  const { search, perPage, page, setSearch } = usePagination();

  const {
    data: storeResult,
    isFetching,
    refetch,
  } = tsQueryClient.store.get.useQuery(
    ['getStore'],
    {
      params: { id },
    },
    {
      cacheTime: 0,
    }
  );

  const data = storeResult?.body;

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
      refetch();
      setEditable(false);
    },
  });

  if (isFetching) return <Loading />;
  else if (!data) {
    navigate('/manage/stores');
    return null;
  }

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          { label: 'Stores', to: '/manage/stores' },
          { label: data.title },
        ]}
        sx={{ my: 1 }}
      />
      <Card sx={{ mb: 1 }}>
        <CardContent>
          {editable && data ? (
            <>
              <Typography sx={{ mb: 1 }} variant="h5">
                Edit Store Profile
              </Typography>
              <FormGenerator<Store, UpdateStore>
                initialValues={{
                  title: data.title,
                  description: data.description,
                  owner: data.owner.id,
                  tags: data.tags.map(({ id }: Tag) => id),
                }}
                schema={UpdateStoreSchema}
                onSubmit={(v, options) => {
                  mutate({ params: { id }, body: v }, options);
                }}
                successMessage="Store Profile Updated"
                onCancel={() => setEditable(false)}
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
                      defaultValue: data?.tags,
                      options: tags?.list ?? [],
                      onInputChange: (event: SyntheticEvent, value: string) => {
                        setSearch(value);
                      },
                    },
                  },
                ]}
              />
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  backgroundColor: generateColor(data.title),
                  borderRadius: '50%',
                  color: 'white',
                  width: 150,
                  height: 150,
                  overflow: 'hidden',
                  mb: 1,
                }}
              >
                {data?.image ? (
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      backgroundImage: `url('${data.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                ) : (
                  <StoreIcon
                    sx={{
                      height: 150,
                      width: 150,
                      mb: 4,
                    }}
                    color="inherit"
                  />
                )}
              </Box>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                onClick={() => setEditable(true)}
              >
                <EditIcon color="warning" />
              </IconButton>
              <Tags tags={data?.tags} />
              <Typography variant="h4">{data?.title}</Typography>
              <StarRating rating={data?.rating ?? 0} />
              <Typography>{data?.description}</Typography>
              <Link
                component={RouterLink}
                target="__blank"
                to={`/stores/${id}/status`}
              >
                Status Page
              </Link>
              <QrcodeDialog
                filename={data?.title + '-qrcode'}
                text={`${window.location.href.replace('/manage', '')}`}
              />
            </div>
          )}
        </CardContent>
      </Card>
      <OtherInformation store={data} />
    </Container>
  );
};
