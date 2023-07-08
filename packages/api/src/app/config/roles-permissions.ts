export const roles = [
  {
    title: 'Superadmin',
    description: 'Root user of the system',
  },
  {
    title: 'User',
    description: 'User of the system',
  },
];

const AuthPermissions = {
  title: 'Auth',
  description: 'Auth related permissions',
  permissions: [
    {
      code: 'auth.change_password',
      title: 'Change Password',
      description: 'Allow to change password',
      roles: ['Superadmin', 'User'],
    },
  ],
};

const UserPermissions = {
  title: 'User',
  description: 'User related permissions',
  permissions: [
    {
      code: 'user.create',
      title: 'Create User',
      description: 'Allow to create user',
      roles: ['Superadmin'],
    },
    {
      code: 'user.get',
      title: 'Get User',
      description: 'Allow to get user',
      roles: ['Superadmin'],
    },
    {
      code: 'user.get_all',
      title: 'Get All Users',
      description: 'Allow to get all users',
      roles: ['Superadmin'],
    },
    {
      code: 'user.update',
      title: 'Update User',
      description: 'Allow to update user',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'user.update.unrestricted',
      title: 'Update User Unrestricted',
      description: 'Allow to update all user',
      roles: ['Superadmin'],
    },
  ],
};

const TransactionPermissions = {
  title: 'Transaction',
  description: 'Transaction related permissions',
  permissions: [
    {
      code: 'transaction.balance',
      title: 'Balance',
      description: 'Allow to check balance',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'transaction.generate',
      title: 'Generate',
      description: 'Allow to generate money',
      roles: ['Superadmin'],
    },
    {
      code: 'transaction.transfer',
      title: 'Transfer',
      description: 'Allow to transfer money',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'transaction.get_transactions',
      title: 'Get All Transactions',
      description: 'Allow to get all transactions',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'transaction.get_transactions_unrestricted',
      title: 'Get All Transactions Unrestricted',
      description: 'Allow to get all transactions of all users',
      roles: ['Superadmin'],
    },
  ],
};

const CategoryPermissions = {
  title: 'Category',
  description: 'Category related permissions',
  permissions: [
    {
      code: 'category.create',
      title: 'Create Category',
      description: 'Allow to create category',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'category.get',
      title: 'Get Category',
      description: 'Allow to get category',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'category.get_all',
      title: 'Get All Categories',
      description: 'Allow to get all categories',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'category.update',
      title: 'Update Category',
      description: 'Allow to update category',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'category.delete',
      title: 'Delete Category',
      description: 'Allow to delete category',
      roles: ['Superadmin', 'User'],
    },
  ],
};

const StorePermissions = {
  title: 'Store',
  description: 'Store related permissions',
  permissions: [
    {
      code: 'store.create',
      title: 'Create Store',
      description: 'Allow to create store',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'store.get',
      title: 'Get Store',
      description: 'Allow to get store',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'store.get_all',
      title: 'Get All Stores',
      description: 'Allow to get all stores',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'store.get_all_unrestricted',
      title: 'Get All Stores Unrestricted',
      description: 'Allow to get all stores of all users',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'store.update',
      title: 'Update Store',
      description: 'Allow to update store',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'store.update_unrestricted',
      title: 'Update Store Unrestricted',
      description: 'Allow to update store unrestricted',
      roles: ['Superadmin'],
    },
    {
      code: 'store.delete',
      title: 'Delete Store',
      description: 'Allow to delete store',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'store.delete_unrestricted',
      title: 'Delete Store Unrestricted',
      description: 'Allow to delete store unrestricted',
      roles: ['Superadmin'],
    },
  ],
};

const ProductPermissions = {
  title: 'Product',
  description: 'Product related permissions',
  permissions: [
    {
      code: 'product.create',
      title: 'Create Product',
      description: 'Allow to create product',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'product.get',
      title: 'Get Product',
      description: 'Allow to get product',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'product.get_all',
      title: 'Get All Categories',
      description: 'Allow to get all categories',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'product.update',
      title: 'Update Product',
      description: 'Allow to update product',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'product.delete',
      title: 'Delete Product',
      description: 'Allow to delete product',
      roles: ['Superadmin', 'User'],
    },
  ],
};

const OrderPermissions = {
  title: 'Order',
  description: 'Order related permissions',
  permissions: [
    {
      code: 'order.create',
      title: 'Create Order',
      description: 'Allow to create order',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'order.get',
      title: 'Get Order',
      description: 'Allow to get order',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'order.get_all',
      title: 'Get All Orders',
      description: 'Allow to get all categories',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'order.get_all_unrestricted',
      title: 'Get All Orders Unrestricted',
      description: 'Allow to get all categories unrestricted',
      roles: ['Superadmin'],
    },
    {
      code: 'order.update',
      title: 'Update Order',
      description: 'Allow to update order',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'order.update_unrestricted',
      title: 'Update Order Unrestricted',
      description: 'Allow to update order unrestricted',
      roles: ['Superadmin'],
    },
    {
      code: 'order.delete',
      title: 'Delete Order',
      description: 'Allow to delete order',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'order.delete_unrestricted',
      title: 'Delete Order Unrestricted',
      description: 'Allow to delete order unrestricted',
      roles: ['Superadmin'],
    },
  ],
};

const PaymentPermissions = {
  title: 'Payment',
  description: 'Payment related permissions',
  permissions: [
    {
      code: 'payment.create',
      title: 'Create Payment',
      description: 'Allow to create payment',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'payment.get',
      title: 'Get Payment',
      description: 'Allow to get payment',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'payment.get_all',
      title: 'Get All Payments',
      description: 'Allow to get all categories',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'payment.update',
      title: 'Update Payment',
      description: 'Allow to update payment',
      roles: ['Superadmin', 'User'],
    },
    {
      code: 'payment.delete',
      title: 'Delete Payment',
      description: 'Allow to delete payment',
      roles: ['Superadmin'],
    },
  ],
};

const RolePermissions = {
  title: 'Role',
  description: 'Role related permissions',
  permissions: [
    {
      code: 'role.create',
      title: 'Create Role',
      description: 'Allow to create role',
      roles: ['Superadmin'],
    },
    {
      code: 'role.get',
      title: 'Get Role',
      description: 'Allow to get role',
      roles: ['Superadmin'],
    },
    {
      code: 'role.get_all',
      title: 'Get All Roles',
      description: 'Allow to get all categories',
      roles: ['Superadmin'],
    },
    {
      code: 'role.update',
      title: 'Update Role',
      description: 'Allow to update role',
      roles: ['Superadmin'],
    },
    {
      code: 'role.delete',
      title: 'Delete Role',
      description: 'Allow to delete role',
      roles: ['Superadmin'],
    },
  ],
};

export const permissions = [
  AuthPermissions,
  UserPermissions,
  TransactionPermissions,
  CategoryPermissions,
  StorePermissions,
  ProductPermissions,
  OrderPermissions,
  PaymentPermissions,
  RolePermissions,
];
