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
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ReactNode, useState } from 'react';
import { useMedia } from '@/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RolePermission, Store, app } from '@nx-monorepo-template/global';
import { AccountSettings, Notifications } from './partials';
import { theme } from '@/core';

export const TopBar = ({
  store,
  drawerWidth = 250,
  items,
}: {
  store?: Store;
  drawerWidth?: number;
  items?: {
    icon: ReactNode;
    label: string;
    to: string;
    permissions?: RolePermission[];
  }[];
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const media = useMedia();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(true);
  const { checkPermission } = useAuthContext();

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
              sx={{
                cursor: 'pointer',
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: [150, 'auto'],
              }}
              onClick={() => {
                if (!user && !!store) {
                  navigate(`/stores/${store.id}`);
                } else {
                  navigate('/');
                }
              }}
            >
              {store ? store.title : app.title}
            </Typography>
          </Box>
          <div>
            {user && <Notifications />}
            <AccountSettings />
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
                if (!user && !!store) {
                  navigate(`/stores/${store.id}`);
                } else {
                  navigate('/');
                }
              }}
            >
              {app.title}
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {items
              .filter(({ permissions }) => checkPermission(permissions))
              .map(({ label, icon, to }, index) => {
                const escapeRegExp = (string: string) => {
                  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
                };
                const regexPattern = new RegExp(
                  `^${escapeRegExp(to)}(\/[^\/]+)*$`
                );
                const isActive =
                  to !== '/manage'
                    ? regexPattern.test(location.pathname)
                    : location.pathname === '/manage';
                const activeStyle = {
                  bgcolor: `${theme.color.primary} !important`,
                  color: theme.color.white,
                  '.MuiListItemIcon-root': {
                    color: theme.color.white,
                  },
                };
                const hoverStyle = {
                  bgcolor: `${theme.color.secondary}`,
                };
                return (
                  <ListItem key={index} disablePadding selected={isActive}>
                    <ListItemButton
                      component={Link}
                      to={to}
                      onClick={() => setOpenSidebar(false)}
                      sx={
                        isActive
                          ? activeStyle
                          : {
                              '&:hover': hoverStyle,
                            }
                      }
                    >
                      <ListItemIcon color="primary">{icon}</ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </Drawer>
      )}
    </>
  );
};
