import {
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useNotificationContext } from '../../contexts';
import {
  Notifications as NotificationsIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { getNotificationMessages } from '@nx-monorepo-template/global';
import { Link, useNavigate } from 'react-router-dom';
import { useTsQueryClient } from '@/core';

export const Notifications = () => {
  const navigate = useNavigate();
  const notification = useNotificationContext();
  const tsQueryClient = useTsQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          aria-label="notifications"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenu}
        >
          <Badge badgeContent={notification.all} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notification.items.map((item, i) => {
          const messages = getNotificationMessages(item);
          return (
            <MenuItem
              onClick={async () => {
                navigate(messages.to);
                await tsQueryClient.notification.read.mutation({
                  params: { id: item.id },
                  body: {},
                });
                notification.refetch();
              }}
              key={i}
            >
              <ListItemIcon>
                <FiberManualRecordIcon
                  sx={{ fontSize: 10 }}
                  color={item.opened ? 'inherit' : 'error'}
                />
              </ListItemIcon>
              {messages.description}
            </MenuItem>
          );
        })}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/manage/notifications">See more</Link>
        </Box>
      </Menu>
    </>
  );
};
