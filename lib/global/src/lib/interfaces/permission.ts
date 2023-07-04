import { z } from 'zod';
import {
  GetPermissionsResponseSchema,
  PermissionSchema,
  GetPermissionsOptionsSchema,
} from '../schemas';

export type Permission = z.infer<typeof PermissionSchema>;

export type GetPermissionsResponse = z.infer<
  typeof GetPermissionsResponseSchema
>;

export type GetPermissionsOptions = z.infer<typeof GetPermissionsOptionsSchema>;

export enum RolePermission {
  AuthChangePassword = 'auth.change_password',

  UserCreate = 'user.create',
  UserGet = 'user.get',
  UserUpdate = 'user.update',
  UserUpdateUnrestricted = 'user.update.unrestricted',
  UserGetAll = 'user.get_all',

  TransactionBalance = 'transaction.balance',
  TransactionGenerate = 'transaction.generate',
  TransactionTransfer = 'transaction.transfer',
  TransactionGetTransactions = 'transaction.get_transactions',

  CategoryCreate = 'category.create',
  CategoryGet = 'category.get',
  CategoryUpdate = 'category.update',
  CategoryDelete = 'category.delete',
  CategoryGetAll = 'category.get_all',

  StoreCreate = 'store.create',
  StoreGet = 'store.get',
  StoreUpdate = 'store.update',
  StoreUpdateUnrestricted = 'store.update_unrestricted',
  StoreDelete = 'store.delete',
  StoreDeleteUnrestricted = 'store.delete_unrestricted',
  StoreGetAll = 'store.get_all',
  StoreGetAllUnrestricted = 'store.get_all_unrestricted',

  ProductCreate = 'product.create',
  ProductGet = 'product.get',
  ProductUpdate = 'product.update',
  ProductDelete = 'product.delete',
  ProductGetAll = 'product.get_all',

  OrderCreate = 'order.create',
  OrderGet = 'order.get',
  OrderUpdate = 'order.update',
  OrderUpdateUnrestricted = 'order.update_unrestricted',
  OrderDelete = 'order.delete',
  OrderDeleteUnrestricted = 'order.delete_unrestricted',
  OrderGetAll = 'order.get_all',
  OrderGetAllUnrestricted = 'order.get_all_unrestricted',

  PaymentCreate = 'payment.create',
  PaymentGet = 'payment.get',
  PaymentUpdate = 'payment.update',
  PaymentDelete = 'payment.delete',
  PaymentGetAll = 'payment.get_all',

  RoleCreate = 'role.create',
  RoleGet = 'role.get',
  RoleUpdate = 'role.update',
  RoleDelete = 'role.delete',
  RoleGetAll = 'role.get_all',
}
