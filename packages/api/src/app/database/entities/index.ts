export * from './user.entity';
export * from './credential.entity';
export * from './transaction.entity';
export * from './category.entity';
export * from './permission.entity';
export * from './role.entity';
export * from './store.entity';
export * from './product.entity';
export * from './order.entity';
export * from './payment.entity';
export * from './notification.entity';
export * from './store-rating.entity';
export * from './tag.entity';
export * from './employee.entity';

import { CategoryEntity } from './category.entity';
import { CredentialEntity } from './credential.entity';
import { EmployeeEntity } from './employee.entity';
import { NotificationEntity } from './notification.entity';
import { OrderEntity } from './order.entity';
import { PaymentEntity } from './payment.entity';
import { PermissionEntity } from './permission.entity';
import { ProductEntity } from './product.entity';
import { RoleEntity } from './role.entity';
import { StoreRatingEntity } from './store-rating.entity';
import { StoreEntity } from './store.entity';
import { TagEntity } from './tag.entity';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from './user.entity';

export default [
  UserEntity,
  CredentialEntity,
  TransactionEntity,
  CategoryEntity,
  PermissionEntity,
  RoleEntity,
  StoreEntity,
  ProductEntity,
  OrderEntity,
  PaymentEntity,
  NotificationEntity,
  StoreRatingEntity,
  TagEntity,
  EmployeeEntity,
];
