import { Route, Routes } from 'react-router-dom';
import { OrderListPage, OrderViewPage } from './pages';

export const OrderRoutes = () => (
  <Routes>
    <Route path="/:orderId" element={<OrderViewPage />} />
    <Route path="/*" element={<OrderListPage />} />
  </Routes>
);
