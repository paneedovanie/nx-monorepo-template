import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage } from './pages';
import { useAuthContext } from '@/core';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export const PublicRoutes = () => {
  const { user } = useAuthContext();
  const storeId = localStorage.getItem('storeId');

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <RegistrationPage /> : <Navigate to="/" />}
      />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="*"
        element={
          !user && !!storeId ? (
            <Navigate to={`/stores/${storeId}`} />
          ) : (
            <HomePage />
          )
        }
      />
    </Routes>
  );
};
