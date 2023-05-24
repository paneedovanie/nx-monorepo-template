import { Route, Routes } from 'react-router-dom';
import { MyAccountPage } from './pages';

export const MyAccountRoutes = () => (
  <Routes>
    <Route path="/" element={<MyAccountPage />} />
  </Routes>
);
