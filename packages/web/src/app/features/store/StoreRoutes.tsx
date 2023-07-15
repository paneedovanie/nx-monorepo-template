import { Route, Routes } from 'react-router-dom';
import {
  StoreCategoryListPage,
  StoreListPage,
  StoreOrderListPage,
  StorePaymentListPage,
  StorePreparationPage,
  StoreProductListPage,
  StoreViewPage,
} from './pages';

export const StoreRoutes = () => (
  <Routes>
    <Route
      path="/:storeId/*"
      element={
        <Routes>
          <Route path="/" element={<StoreViewPage />} />
          <Route path="/categories" element={<StoreCategoryListPage />} />
          <Route path="/products" element={<StoreProductListPage />} />
          <Route path="/orders" element={<StoreOrderListPage />} />
          <Route path="/payments" element={<StorePaymentListPage />} />
        </Routes>
      }
    />
    <Route path="*" element={<StoreListPage />} />
  </Routes>
);
