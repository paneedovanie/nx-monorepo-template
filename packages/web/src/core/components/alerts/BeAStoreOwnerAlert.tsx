import { ConfirmDialog, useAuthContext, useTsQueryClient } from '@/core';
import { Alert, Button } from '@mui/material';
import {
  RolePermission,
  checkUserPermission,
} from '@nx-monorepo-template/global';
import { useState } from 'react';

export const BeAStoreOwnerAlert = () => {
  const tsQueryClient = useTsQueryClient();
  const { user, verify } = useAuthContext();
  const [beOwnerDialog, setBeOwnerDialog] = useState(false);

  const { mutate: assignAsStoreOwner } =
    tsQueryClient.user.assignAsStoreOwner.useMutation();

  if (user && checkUserPermission(user, [RolePermission.StoreCreate])) {
    return null;
  }

  return (
    <>
      <Alert
        severity="info"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => setBeOwnerDialog(true)}
          >
            Let's go
          </Button>
        }
      >
        I wanted to be a store owner!
      </Alert>
      <ConfirmDialog
        title="Make me a store owner"
        content="Are you sure you wanted to be a store owner? If you proceed, it will add a store tab on your side bar and you cannot undo this."
        successMessage="You are now a store owner"
        open={beOwnerDialog}
        onClose={() => {
          setBeOwnerDialog(false);
        }}
        onSubmit={(options) => {
          if (user) {
            assignAsStoreOwner(
              {
                params: { id: user.id },
                body: {},
              },
              options
            );
          }
        }}
        onSuccess={() => {
          setBeOwnerDialog(false);
          verify();
        }}
      />
    </>
  );
};
