import { FormGenerator, useTsQueryClient } from '@/core';
import { Card, CardContent, Typography } from '@mui/material';
import { User } from '@nx-monorepo-template/global';
import { ChangePassword, LoginResponse } from '@nx-monorepo-template/global';
import { ChangePasswordSchema } from '@nx-monorepo-template/global';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const MyAccountPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { mutate: resendVerifyEmail } =
    tsQueryClient.auth.resendVerifyEmail.useMutation();
  const { mutate: changePassword } =
    tsQueryClient.auth.changePassword.useMutation();

  return (
    <Container>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h5">
            Resend Verify Email
          </Typography>
          <FormGenerator<LoginResponse>
            successMessage="Email Verification Resent"
            onSubmit={(v, options) => {
              resendVerifyEmail({}, options);
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h5">
            Change Password
          </Typography>
          <FormGenerator<User, ChangePassword>
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            schema={ChangePasswordSchema}
            onSubmit={(v, options) => changePassword({ body: v }, options)}
            successMessage="Password Updated"
            items={[
              {
                label: 'Current Password',
                name: 'currentPassword',
                component: 'TextField',
                props: {
                  type: 'password',
                },
              },
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
    </Container>
  );
};
