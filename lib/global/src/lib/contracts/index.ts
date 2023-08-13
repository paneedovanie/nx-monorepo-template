import { user } from './user-controller.contract';
import { auth } from './auth-controller.contract';
import { transaction } from './transaction-controller.contract';
import { initContract } from '@ts-rest/core';
import { category } from './category-controller.contract';
import { store } from './store-controller.contract';
import { product } from './product-controller.contract';
import { order } from './order-controller.contract';
import { payment } from './payment-controller.contract';
import { role } from './role-controller.contract';
import { permission } from './permission-controller.contract';
import { statistic } from './statistic-controller.contract';
import { notification } from './notification-controller.contract';
import { storeRating } from './store-rating-controller.contract';
import { tag } from './tag-controller.contract';
import { qrcode } from './qrcode-controller.contract';
import { employee } from './employee-controller.contract';

export const contract = initContract().router({
  user,
  auth,
  transaction,
  category,
  store,
  product,
  order,
  payment,
  role,
  permission,
  statistic,
  notification,
  storeRating,
  tag,
  qrcode,
  employee,
});
