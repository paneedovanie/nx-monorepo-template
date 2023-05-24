import { Route, Routes } from 'react-router-dom';
import { UserListPage, UserViewPage } from './pages';

export const UsersRoutes = () => (
  <Routes>
    <Route path=":id" element={<UserViewPage />} />
    <Route path="*" element={<UserListPage />} />
  </Routes>
);
