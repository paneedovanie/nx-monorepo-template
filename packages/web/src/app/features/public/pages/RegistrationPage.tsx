import { FormGenerator, useTsQueryClient } from '@/core';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Register } from '@nx-monorepo-template/global';
import { RegisterSchema } from '@nx-monorepo-template/global';
import { User } from '@nx-monorepo-template/global';

export const RegistrationPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { mutate } = tsQueryClient.auth.register.useMutation();

  return (
    <Box
      sx={{
        p: 3,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card>
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h5">
            Register
          </Typography>
          <FormGenerator<User, Register>
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            schema={RegisterSchema}
            onSubmit={(v, options) => {
              mutate({ body: v }, options);
            }}
            successMessage="Account created"
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
              {
                label: 'Email',
                name: 'email',
                component: 'TextField',
              },
              {
                label: 'Password',
                name: 'password',
                component: 'TextField',
                props: {
                  type: 'password',
                },
              },
            ]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
