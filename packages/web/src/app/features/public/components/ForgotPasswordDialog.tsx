import { useTsQueryClient, FormGenerator } from '@/core';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import {
  ForgotPassword,
  ForgotPasswordSchema,
} from '@nx-monorepo-template/global';
import { useState } from 'react';

export const ForgotPasswordDialog = () => {
  const tsQueryClient = useTsQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate } = tsQueryClient.auth.forgotPassword.useMutation({
    onSuccess: () => {
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Forgot Password</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { maxWidth: 350, width: '100%' } }}
      >
        <DialogTitle
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5">Forgot Password</Typography>
        </DialogTitle>

        <DialogContent>
          <FormGenerator<boolean, ForgotPassword>
            initialValues={{
              email: '',
            }}
            schema={ForgotPasswordSchema}
            onSubmit={(v, options) => {
              mutate({ body: v }, options);
            }}
            successMessage="Reset pasword email was sent to your email"
            items={[
              {
                label: 'Email',
                name: 'email',
                component: 'TextField',
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
