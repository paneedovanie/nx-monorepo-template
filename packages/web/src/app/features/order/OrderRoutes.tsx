import { Route, Routes } from 'react-router-dom';
import { OrderView } from './pages';

export const OrderRoutes = () => (
  <Routes>
    <Route path="/:id" element={<OrderView />} />
  </Routes>
);
