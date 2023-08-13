import { TokenUser } from '../interfaces';

export const checkUserPermission = (user: TokenUser, permissions: string[]) => {
  if (!user.roles.length) return false;

  for (const role of user.roles) {
    for (const permission of permissions) {
      if (role.permissions?.find((code) => permission === code)) {
        return true;
      }
    }
  }

  // for (const job of user.jobs) {
  //   for (const role of job.roles) {
  //     for (const permission of permissions) {
  //       if (role.permissions?.find((code) => permission === code)) {
  //         return true;
  //       }
  //     }
  //   }
  // }

  return false;
};
