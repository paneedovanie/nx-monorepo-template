import { FormGenerator } from '@/core';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { ApiRouteResponse } from '@nx-monorepo-template/global';
import { MutationOptions } from 'react-query';

export const ConfirmDialog = ({
  title,
  content,
  successMessage,
  open,
  onClose,
  onSubmit,
  onSuccess,
}: {
  title: string;
  content: string;
  successMessage: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (
    options: MutationOptions<
      ApiRouteResponse<unknown>,
      { status: number; body: unknown },
      { body?: any }
    >
  ) => void;
  onSuccess?: () => void;
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 1 }}>{content}</Typography>
        <FormGenerator
          successMessage={successMessage}
          onSubmit={(v, options) => {
            onSubmit({
              ...options,
              onSuccess: (...v) => {
                options.onSuccess?.(...v);
                onSuccess?.();
              },
            });
          }}
          defaultEnableSubmit
        />
      </DialogContent>
    </Dialog>
  );
};
