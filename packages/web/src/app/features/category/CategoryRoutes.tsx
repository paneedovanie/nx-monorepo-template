import { Route, Routes } from 'react-router-dom';
import { CategoryListPage } from './pages';

export const CategoryRoutes = () => (
  <Routes>
    <Route path="*" element={<CategoryListPage />} />
  </Routes>
);
