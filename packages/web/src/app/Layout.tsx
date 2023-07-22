import {
  DashboardRoutes,
  ProfileRoutes,
  PublicRoutes,
  MyAccountRoutes,
  WalletRoutes,
  UsersRoutes,
  CategoryRoutes,
  StoreRoutes,
  OrderRoutes,
  RoleRoutes,
  NotificationRoutes,
  TagRoutes,
  StorePublicRoutes,
} from '@/app/features';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LayoutLoader, Loading, TopBar, useAuthContext } from '@/core';
import Box from '@mui/material/Box';
import { sidebarItems } from './sidebar';

const drawerWidth = 250;

export const Layout = () => {
  const { user, isFetching } = useAuthContext();

  if (isFetching) return <LayoutLoader sx={{ height: '100vh'}} />;

  return (
    <Routes>
      <Route
        path="/manage/*"
        element={
          user ? (
            <>
              <TopBar {...{ drawerWidth }} items={sidebarItems} />
              <Box
                component="main"
                sx={{
                  ml: { lg: drawerWidth + 'px' },
                }}
              >
                <Routes>
                  <Route path="/profile/*" element={<ProfileRoutes />} />
                  <Route path="/my-account/*" element={<MyAccountRoutes />} />
                  <Route path="/wallet/*" element={<WalletRoutes />} />
                  <Route path="/users/*" element={<UsersRoutes />} />
                  <Route path="/categories/*" element={<CategoryRoutes />} />
                  <Route path="/stores/*" element={<StoreRoutes />} />
                  <Route path="/orders/*" element={<OrderRoutes />} />
                  <Route path="/roles/*" element={<RoleRoutes />} />
                  <Route
                    path="/notifications/*"
                    element={<NotificationRoutes />}
                  />
                  <Route path="/tags/*" element={<TagRoutes />} />
                  <Route path="/*" element={<DashboardRoutes />} />
                </Routes>
              </Box>
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/stores/:storeId/*" element={<StorePublicRoutes />} />
      <Route
        path="/*"
        element={
          <>
            <TopBar {...{ drawerWidth }} />
            <Box component="main">
              <PublicRoutes />
            </Box>
          </>
        }
      />
    </Routes>
  );
};
