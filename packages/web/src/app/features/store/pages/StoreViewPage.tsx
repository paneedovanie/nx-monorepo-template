import { Breadcrumbs, FormGenerator, Loading, useTsQueryClient } from '@/core';
import { Edit as EditIcon, Store as StoreIcon } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import {
  UpdateStore,
  Store,
  UpdateStoreSchema,
} from '@nx-monorepo-template/global';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { OtherInformation } from '../components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreViewPage = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const id = params.id as string;

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

  const { mutate } = tsQueryClient.store.update.useMutation({
    onSuccess: () => {
      refetch();
      setEditable(false);
    },
  });

  if (isFetching) return <Loading />;
  if (!data) {
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
                Edit Profile
              </Typography>
              <FormGenerator<Store, UpdateStore>
                initialValues={{
                  title: data.title,
                  description: data.description,
                  owner: data.owner.id,
                }}
                schema={UpdateStoreSchema}
                onSubmit={(v, options) => {
                  mutate({ params: { id }, body: v }, options);
                }}
                successMessage="Profile Updated"
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
              {data?.image ? (
                <img src={data?.image} alt="store" height={150} width={150} />
              ) : (
                <StoreIcon
                  sx={{
                    height: 150,
                    width: 150,
                    mb: 4,
                  }}
                />
              )}
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
              <Typography variant="h4">{data?.title}</Typography>
            </div>
          )}
        </CardContent>
      </Card>
      <OtherInformation store={data} />
    </Container>
  );
};
