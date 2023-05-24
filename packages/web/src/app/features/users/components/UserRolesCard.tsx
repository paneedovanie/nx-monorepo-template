import { DataTable, useTsQueryClient } from '@/core';
import {
  RemoveRedEye as EyeIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { UserRoleDialog } from './UserRoleDialog';
import { User } from '@nx-monorepo-template/global';
import { useNavigate } from 'react-router-dom';

export const UserRolesCard = ({
  user,
  onChange,
}: {
  user: User;
  onChange?: () => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: unassignRole } = tsQueryClient.user.unassignRole.useMutation({
    onSuccess: () => {
      onChange?.();
    },
  });

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Roles</Typography>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Add
        </Button>
      </CardContent>
      <DataTable
        columns={[
          {
            label: 'Title',
            name: 'title',
          },
          {
            label: 'Description',
            name: 'description',
          },
          {
            name: 'permissions',
            label: 'Permissions',
            render: ({ permissions }) => {
              return permissions.length;
            },
          },
          {
            name: 'actions',
            label: 'Actions',
            sx: {
              textAlign: 'right',
            },
            render: ({ id }) => {
              return (
                <Box sx={{ textAlign: 'right' }}>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/manage/roles/${id}`)}
                  >
                    <EyeIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      unassignRole({
                        params: { id: user.id },
                        body: { roleId: id },
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            },
          },
        ]}
        data={user.roles}
        pagination={false}
      />
      <UserRoleDialog
        data={user}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          onChange?.();
          setDialogOpen(false);
        }}
      />
    </Card>
  );
};
