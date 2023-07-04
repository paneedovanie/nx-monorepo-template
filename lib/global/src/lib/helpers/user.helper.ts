import { TokenUser } from '../interfaces';

export const checkUserPermission = (user: TokenUser, permissions: string[]) => {
  const rolePermissions = user.roles[0]?.permissions;
  if (!rolePermissions) return false;

  for (const permission of permissions) {
    return !!rolePermissions.find((code) => permission === code);
  }

  return false;
};
