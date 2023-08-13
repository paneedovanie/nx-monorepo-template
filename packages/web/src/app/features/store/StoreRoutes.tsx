import { Route, Routes } from 'react-router-dom';
import {
  StoreCategoryListPage,
  StoreEditPage,
  StoreEmployeeListPage,
  StoreListPage,
  StoreOrderListPage,
  StoreOrderViewPage,
  StorePaymentListPage,
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
          <Route path="/edit" element={<StoreEditPage />} />
          <Route path="/categories" element={<StoreCategoryListPage />} />
          <Route path="/products" element={<StoreProductListPage />} />
          <Route
            path="/orders/*"
            element={
              <Routes>
                <Route path="/" element={<StoreOrderListPage />} />
                <Route path="/:orderId" element={<StoreOrderViewPage />} />
              </Routes>
            }
          />
          <Route path="/payments" element={<StorePaymentListPage />} />
          <Route path="/employees" element={<StoreEmployeeListPage />} />
        </Routes>
      }
    />
    <Route path="*" element={<StoreListPage />} />
  </Routes>
);
