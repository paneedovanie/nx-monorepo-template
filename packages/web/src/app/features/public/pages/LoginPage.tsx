import { FormGenerator, useTsQueryClient } from '@/core';
import { useAuthContext } from '@/core/components/contexts/AuthContext';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Login, LoginResponse } from '@nx-monorepo-template/global';
import { LoginSchema } from '@nx-monorepo-template/global';

export const LoginPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { setToken, verify } = useAuthContext();
  const { mutate } = tsQueryClient.auth.login.useMutation({
    onSuccess: (v) => {
      setToken(v.body.accessToken);
      verify();
    },
  });

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
            Login
          </Typography>
          <FormGenerator<LoginResponse, Login>
            initialValues={{
              email: '',
              password: '',
            }}
            schema={LoginSchema}
            onSubmit={(v, options) => {
              mutate({ body: v }, options);
            }}
            successMessage="Login success"
            items={[
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
