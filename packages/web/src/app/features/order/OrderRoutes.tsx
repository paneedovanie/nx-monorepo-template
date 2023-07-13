import { Route, Routes } from 'react-router-dom';
import { OrderList, OrderView } from './pages';

export const OrderRoutes = () => (
  <Routes>
    <Route path="/:orderId" element={<OrderView />} />
    <Route path="/*" element={<OrderList />} />
  </Routes>
);
