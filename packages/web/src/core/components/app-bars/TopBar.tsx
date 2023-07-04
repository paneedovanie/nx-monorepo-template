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
import { RolePermission, app } from '@nx-monorepo-template/global';
import { AccountSettings, Notifications } from './partials';

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
                navigate('/');
              }}
            >
              {app.title}
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
