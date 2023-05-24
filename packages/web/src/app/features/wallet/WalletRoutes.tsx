import { Route, Routes } from 'react-router-dom';
import { WalletPage } from './pages';

export const WalletRoutes = () => (
  <Routes>
    <Route path="*" element={<WalletPage />} />
  </Routes>
);
