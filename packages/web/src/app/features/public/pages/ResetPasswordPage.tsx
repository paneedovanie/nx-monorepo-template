import {
  FormGenerator,
  LayoutLoader,
  useAuthContext,
  useTsQueryClient,
} from '@/core';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  ResetPassword,
  ResetPasswordSchema,
} from '@nx-monorepo-template/global';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { user, isFetching, setToken } = useAuthContext();

  const tsQueryClient = useTsQueryClient();
  const { mutate } = tsQueryClient.auth.resetPassword.useMutation({
    onSuccess: () => {
      navigate('/');
    },
  });

  useEffect(() => {
    const token = query.get('accessToken');
    if (token) {
      setToken(token);
    }
  }, [query, setToken]);

  if (isFetching) {
    return <LayoutLoader sx={{ height: '100vh' }} />;
  }

  if (!user) {
    return <Typography>Expired token</Typography>;
  }

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
            Reset Password
          </Typography>
          <FormGenerator<boolean, ResetPassword>
            initialValues={{
              newPassword: '',
              confirmPassword: '',
            }}
            schema={ResetPasswordSchema}
            onSubmit={(v, options) => {
              mutate({ body: v }, options);
            }}
            successMessage="Change password success"
            items={[
              {
                label: 'New Password',
                name: 'newPassword',
                component: 'TextField',
                props: {
                  type: 'password',
                },
              },
              {
                label: 'Confirm Password',
                name: 'confirmPassword',
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
