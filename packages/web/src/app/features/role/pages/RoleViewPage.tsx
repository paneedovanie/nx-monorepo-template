import { Breadcrumbs, FormGenerator, useTsQueryClient } from '@/core';
import {
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import {
  UpdateRole,
  Role,
  UpdateRolePermissions,
  UpdateRolePermissionsSchema,
  Permission,
  UpdateRoleSchema,
} from '@nx-monorepo-template/global';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const RoleViewPage = () => {
  const tsQueryClient = useTsQueryClient();
  const params = useParams();
  const [editable, setEditable] = useState(false);
  const id = params.id as string;

  const { data: roleResult, refetch } = tsQueryClient.role.get.useQuery(
    ['getRole'],
    {
      params: { id },
    }
  );
  const { mutate } = tsQueryClient.role.update.useMutation({
    onSuccess: () => {
      refetch();
      setEditable(false);
    },
  });

  const { mutate: updatePermissions } =
    tsQueryClient.role.updatePermissions.useMutation({
      onSuccess: () => {
        refetch();
      },
    });

  const data = roleResult?.body;

  const { data: permissionsResult } = tsQueryClient.permission.getAll.useQuery(
    ['getPermissions'],
    {
      query: { perPage: -1 },
    }
  );
  const permissions = permissionsResult?.body;
  const rolePermissionsMapper = useMemo(() => {
    const mapper = new Map<string, Permission>();
    data?.permissions?.forEach((permission) => {
      mapper.set(permission.id, permission);
    });
    return mapper;
  }, [data]);

  const groupedPermissions = useMemo(() => {
    const groupedPermissions: { [key: string]: Permission[] } = {};
    if (!permissions) return groupedPermissions;
    for (const permission of permissions.list) {
      if (groupedPermissions[permission.category.title]) {
        groupedPermissions[permission.category.title].push(permission);
      } else {
        groupedPermissions[permission.category.title] = [permission];
      }
    }
    return groupedPermissions;
  }, [permissions]);

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/manage' },
          {
            label: 'Roles',
            to: '/manage/roles',
          },
          {
            label: data?.title ?? 'Unknown',
          },
        ]}
        sx={{ my: 1 }}
      />
      <Card sx={{ mb: 1 }}>
        <CardContent>
          {editable && data ? (
            <>
              <Typography sx={{ mb: 1 }} variant="h5">
                Edit Role
              </Typography>
              <FormGenerator<Role, UpdateRole>
                initialValues={{
                  title: data.title,
                  description: data.description,
                }}
                schema={UpdateRoleSchema}
                onSubmit={(v, options) => {
                  mutate({ params: { id }, body: v }, options);
                }}
                successMessage="Role Updated"
                onCancel={() => setEditable(false)}
                items={[
                  {
                    label: 'Title',
                    name: 'title',
                    component: 'TextField',
                  },
                  {
                    label: 'Description',
                    name: 'description',
                    component: 'TextField',
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
              <AccountCircleIcon
                sx={{
                  height: 150,
                  width: 150,
                  mb: 4,
                }}
              />
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
              <Typography variant="body1">{data?.description}</Typography>
            </div>
          )}
        </CardContent>
      </Card>
      {!!data && (
        <>
          <Typography sx={{ mb: 1 }} variant="h5">
            Permissions
          </Typography>
          <Card>
            <CardContent>
              <FormGenerator<Role, UpdateRolePermissions>
                initialValues={{
                  ids: data?.permissions.map(({ id }) => id) ?? [],
                }}
                schema={UpdateRolePermissionsSchema}
                onSubmit={(v, options) => {
                  updatePermissions({ params: { id }, body: v }, options);
                }}
                successMessage="Role's Permissions Updated"
                items={[
                  {
                    name: 'ids',
                    component: ({ name, onChange }) => {
                      return (
                        <Box>
                          {Object.entries(groupedPermissions).map(
                            ([title, permissions]) => {
                              return (
                                <Box>
                                  <Typography variant="h6">{title}</Typography>
                                  <Box
                                    sx={{
                                      display: 'grid',
                                      gridTemplateColumns: [
                                        '1fr',
                                        null,
                                        '1fr 1fr',
                                        '1fr 1fr 1fr',
                                      ],
                                    }}
                                  >
                                    {permissions.map((permission) => {
                                      return (
                                        <Box
                                          sx={{
                                            mb: 1,
                                            display: 'flex',
                                          }}
                                        >
                                          <Checkbox
                                            name={name}
                                            value={permission.id}
                                            onChange={onChange}
                                            defaultChecked={rolePermissionsMapper.has(
                                              permission.id
                                            )}
                                          />
                                          <Box>
                                            <Typography variant="body1">
                                              {permission.title}
                                            </Typography>
                                            <Typography variant="body2">
                                              {permission.description}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      );
                                    })}
                                  </Box>
                                </Box>
                              );
                            }
                          )}
                        </Box>
                      );
                    },
                  },
                ]}
              />
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};
