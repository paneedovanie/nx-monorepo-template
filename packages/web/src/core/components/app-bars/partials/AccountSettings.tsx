import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  AppRegistration as RegisterIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useAuthContext } from '../../contexts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, clear } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleMenu}
          size="small"
          aria-controls={anchorEl ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {user?.firstName.charAt(0)}
          </Avatar>
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
        {user
          ? [
              <MenuItem
                onClick={() => {
                  navigate('/manage/profile');
                  handleClose();
                }}
                key="1"
              >
                <Avatar /> Profile
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  navigate('/manage/my-account');
                  handleClose();
                }}
                key="2"
              >
                <Avatar /> My account
              </MenuItem>,
              <Divider key="3" />,
              <MenuItem
                onClick={() => {
                  navigate('/manage');
                  handleClose();
                }}
                key="4"
              >
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Manage
              </MenuItem>,
              <MenuItem onClick={clear} key="5">
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem
                onClick={() => {
                  navigate('/login');
                  handleClose();
                }}
                key="1"
              >
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  navigate('/register');
                  handleClose();
                }}
                key="2"
              >
                <ListItemIcon>
                  <RegisterIcon fontSize="small" />
                </ListItemIcon>
                Register
              </MenuItem>,
            ]}
      </Menu>
    </>
  );
};
