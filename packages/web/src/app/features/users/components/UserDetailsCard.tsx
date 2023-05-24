import { FormGenerator, useTsQueryClient } from '@/core';
import {
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import {
  UpdateUser,
  User,
  UpdateUserSchema,
} from '@nx-monorepo-template/global';
import { useState } from 'react';

export const UserDetailsCard = ({
  user,
  onChange,
}: {
  user: User;
  onChange: () => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const [editable, setEditable] = useState(false);

  const { mutate } = tsQueryClient.user.updateUser.useMutation({
    onSuccess: () => {
      onChange?.();
      setEditable(false);
    },
  });

  return (
    <Card sx={{ mb: 1 }}>
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
  );
};
