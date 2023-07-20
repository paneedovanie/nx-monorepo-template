import {
  Dashboard as DashboardIcon,
  Wallet as WalletIcon,
  AccountBox as AccountIcon,
  Category as CategoryIcon,
  Store as StoreIcon,
  Engineering as EngineeringIcon,
  AddShoppingCart as AddShoppingCartIcon,
  LocalOffer as LocalOfferIcon,
} from '@mui/icons-material';
import { RolePermission } from '@nx-monorepo-template/global';

export const sidebarItems = [
  {
    icon: <DashboardIcon color="inherit" />,
    label: 'Dashboard',
    to: '/manage',
  },
  {
    icon: <WalletIcon color="inherit" />,
    label: 'My Wallet',
    to: '/manage/wallet',
    permissions: [RolePermission.TransactionBalance],
  },
  {
    icon: <AccountIcon color="inherit" />,
    label: 'Users',
    to: '/manage/users',
    permissions: [RolePermission.UserGetAll],
  },
  {
    icon: <CategoryIcon color="inherit" />,
    label: 'Categories',
    to: '/manage/categories',
    permissions: [RolePermission.CategoryGetAllUnrestricted],
  },
  {
    icon: <LocalOfferIcon color="inherit" />,
    label: 'Tags',
    to: '/manage/tags',
    permissions: [RolePermission.TagGetAll],
  },
  {
    icon: <StoreIcon color="inherit" />,
    label: 'My Stores',
    to: '/manage/stores',
    permissions: [RolePermission.StoreCreate],
  },
  {
    icon: <EngineeringIcon color="inherit" />,
    label: 'Roles',
    to: '/manage/roles',
    permissions: [RolePermission.RoleUpdate],
  },
  {
    icon: <AddShoppingCartIcon color="inherit" />,
    label: 'My Orders',
    to: '/manage/orders',
    permissions: [RolePermission.OrderGetAll],
  },
];
