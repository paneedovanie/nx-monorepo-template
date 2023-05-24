import { Card, CardContent, IconButton, Typography } from '@mui/material';
import styled from 'styled-components';
import {
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { FormGenerator, useTsQueryClient, useAuthContext } from '@/core';
import { UpdateUserSchema } from '@nx-monorepo-template/global';
import { User } from '@nx-monorepo-template/global';
import { UpdateUser } from '@nx-monorepo-template/global';
import { useState } from 'react';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const ProfilePage = () => {
  const tsQueryClient = useTsQueryClient();
  const { user, setUser } = useAuthContext();
  const [editable, setEditable] = useState(false);

  const { mutate } = tsQueryClient.user.updateUser.useMutation({
    onSuccess: (v) => {
      setUser((u) => ({ ...u, ...v.body, roles: u?.roles ?? [] }));
      setEditable(false);
    },
  });

  return (
    <Container>
      <Card>
        <CardContent>
          {editable && user ? (
            <>
              <Typography sx={{ mb: 1 }} variant="h5">
                Edit Profile
              </Typography>
              <FormGenerator<User, UpdateUser>
                initialValues={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                }}
                schema={UpdateUserSchema}
                onSubmit={(v, options) => {
                  mutate({ params: { id: user.id }, body: v }, options);
                }}
                successMessage="Profile Updated"
                onCancel={() => setEditable(false)}
                items={[
                  {
                    label: 'First Name',
                    name: 'firstName',
                    component: 'TextField',
                  },
                  {
                    label: 'Last Name',
                    name: 'lastName',
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
              <Typography variant="h4">
                {user?.firstName + ' ' + user?.lastName}
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
