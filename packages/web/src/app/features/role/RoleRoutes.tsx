import { Route, Routes } from 'react-router-dom';
import { RoleListPage, RoleViewPage } from './pages';

export const RoleRoutes = () => (
  <Routes>
    <Route path=":id" element={<RoleViewPage />} />
    <Route path="*" element={<RoleListPage />} />
  </Routes>
);
