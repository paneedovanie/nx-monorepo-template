import {
  Dashboard as DashboardIcon,
  Wallet as WalletIcon,
  AccountBox as AccountIcon,
  Category as CategoryIcon,
  Store as StoreIcon,
  Engineering as EngineeringIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from '@mui/icons-material';
import { RolePermission } from '@nx-monorepo-template/global';

export const sidebarItems = [
  {
    icon: <DashboardIcon />,
    label: 'Dashboard',
    to: '/manage/',
  },
  {
    icon: <WalletIcon />,
    label: 'Wallet',
    to: '/manage/wallet',
  },
  {
    icon: <AccountIcon />,
    label: 'Users',
    to: '/manage/users',
    permissions: [RolePermission.UserGetAll],
  },
  {
    icon: <CategoryIcon />,
    label: 'Categories',
    to: '/manage/categories',
    permissions: [RolePermission.CategoryGetAll],
  },
  {
    icon: <StoreIcon />,
    label: 'Stores',
    to: '/manage/stores',
    permissions: [RolePermission.StoreUpdate],
  },
  {
    icon: <EngineeringIcon />,
    label: 'Roles',
    to: '/manage/roles',
    permissions: [RolePermission.RoleUpdate],
  },
  {
    icon: <AddShoppingCartIcon />,
    label: 'Orders',
    to: '/manage/orders',
    permissions: [RolePermission.OrderGetAll],
  },
];
