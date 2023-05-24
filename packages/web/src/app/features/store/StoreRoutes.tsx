import { Route, Routes } from 'react-router-dom';
import { StoreListPage, StoreViewPage } from './pages';

export const StoreRoutes = () => (
  <Routes>
    <Route path=":id" element={<StoreViewPage />} />
    <Route path="*" element={<StoreListPage />} />
  </Routes>
);
