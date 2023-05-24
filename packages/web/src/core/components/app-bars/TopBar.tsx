import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { ReactNode, useState } from 'react';
import { app, useMedia } from '@/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RolePermission } from '@nx-monorepo-template/global';

export const TopBar = ({
  drawerWidth,
  items,
}: {
  drawerWidth: number;
  items?: {
    icon: ReactNode;
    label: string;
    to: string;
    permissions?: RolePermission[];
  }[];
}) => {
  const navigate = useNavigate();
  const media = useMedia();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState(true);
  const { user, clear, checkPermission } = useAuthContext();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 1300 }}>
        <Toolbar>
          {location.pathname.substring(0, 7) === '/manage' && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: ['inline', null, null, 'none'] }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', display: 'inline' }}
              onClick={() => {
                navigate('/');
              }}
            >
              {app.title}
            </Typography>
          </Box>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user
                ? [
                    <MenuItem
                      key={1}
                      onClick={() => {
                        navigate('/orders');
                        handleClose();
                      }}
                    >
                      Orders
                    </MenuItem>,
                    <MenuItem
                      key={2}
                      onClick={() => {
                        navigate('/manage');
                        handleClose();
                      }}
                    >
                      Manage
                    </MenuItem>,
                    <MenuItem
                      key={3}
                      onClick={() => {
                        navigate('/manage/profile');
                        handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>,
                    <MenuItem
                      key={4}
                      onClick={() => {
                        navigate('/manage/my-account');
                        handleClose();
                      }}
                    >
                      My account
                    </MenuItem>,
                    <MenuItem key={5} onClick={clear}>
                      Logout
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key={1}
                      onClick={() => {
                        navigate('/login');
                        handleClose();
                      }}
                    >
                      Login
                    </MenuItem>,
                    <MenuItem
                      key={2}
                      onClick={() => {
                        navigate('/register');
                        handleClose();
                      }}
                    >
                      Register
                    </MenuItem>,
                  ]}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {items && (
        <Drawer
          variant={media.lg ? 'permanent' : 'temporary'}
          onClose={toggleSidebar}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open={openSidebar}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => {
                navigate('/');
              }}
            >
              {app.title}
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {items
              .filter(({ permissions }) => checkPermission(permissions))
              .map(({ label, icon, to }, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  selected={to === location.pathname}
                >
                  <ListItemButton
                    component={Link}
                    to={to}
                    onClick={() => setOpenSidebar(false)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Drawer>
      )}
    </>
  );
};
