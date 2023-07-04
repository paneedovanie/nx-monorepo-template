import { Route, Routes } from 'react-router-dom';
import { NotificationListPage } from './pages';

export const NotificationRoutes = () => (
  <Routes>
    <Route path="*" element={<NotificationListPage />} />
  </Routes>
);
