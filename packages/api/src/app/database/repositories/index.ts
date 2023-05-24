export * from './user.repository';
export * from './credential.repository';
export * from './transaction.repository';
export * from './role.repository';
export * from './category.repository';
export * from './store.repository';
export * from './product.repository';
export * from './order.repository';
export * from './payment.repository';
export * from './permission.repository';

import { UserRepository } from './user.repository';
import { CredentialRepository } from './credential.repository';
import { TransactionRepository } from './transaction.repository';
import { RoleRepository } from './role.repository';
import { CategoryRepository } from './category.repository';
import { StoreRepository } from './store.repository';
import { ProductRepository } from './product.repository';
import { OrderRepository } from './order.repository';
import { PaymentRepository } from './payment.repository';
import { PermissionRepository } from './permission.repository';

export default [
  UserRepository,
  CredentialRepository,
  TransactionRepository,
  RoleRepository,
  CategoryRepository,
  StoreRepository,
  ProductRepository,
  OrderRepository,
  PaymentRepository,
  PermissionRepository,
];
