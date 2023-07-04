import { Route, Routes } from 'react-router-dom';
import { TagListPage } from './pages';

export const TagRoutes = () => (
  <Routes>
    <Route path="*" element={<TagListPage />} />
  </Routes>
);
