import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage } from './pages';
import { Checkout, PublicStoreViewPage, StoreStatusPage } from '../store';
import { CartContextProvider, useAuthContext } from '@/core';
import { PublicOrderView } from '../order';

export const PublicRoutes = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <RegistrationPage /> : <Navigate to="/" />}
      />
      <Route
        path="/stores/:id/*"
        element={
          <CartContextProvider>
            <Routes>
              <Route path="/" element={<PublicStoreViewPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders/:id" element={<PublicOrderView />} />
              <Route path="/status" element={<StoreStatusPage />} />
            </Routes>
          </CartContextProvider>
        }
      />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
