import { Route, Routes } from 'react-router-dom';
import { ProfilePage } from './pages';

export const ProfileRoutes = () => (
  <Routes>
    <Route path="/" element={<ProfilePage />} />
  </Routes>
);
