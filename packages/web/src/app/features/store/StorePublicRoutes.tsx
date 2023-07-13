import { Route, Routes } from 'react-router-dom';
import { CheckoutPage, PublicStoreViewPage, StoreStatusPage } from './pages';
import { CartContextProvider } from '@/core';
import { PublicOrderView } from '../order';

export const StorePublicRoutes = () => (
  <CartContextProvider>
    <Routes>
      <Route path="/" element={<PublicStoreViewPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders/:orderId" element={<PublicOrderView />} />
      <Route path="/status" element={<StoreStatusPage />} />
    </Routes>
  </CartContextProvider>
);
