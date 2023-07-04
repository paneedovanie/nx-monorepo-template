import {
  RolePermission,
  checkUserPermission,
} from '@nx-monorepo-template/global';
import { useAuthContext } from '../contexts';

export const Allow = ({
  permissions,
  children,
}: {
  permissions: RolePermission[];
  children: JSX.Element;
}) => {
  const { user } = useAuthContext();

  if (user && checkUserPermission(user, permissions)) {
    return children;
  }

  return null;
};
