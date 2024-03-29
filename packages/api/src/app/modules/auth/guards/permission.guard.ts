import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { TokenUser, checkUserPermission } from '@nx-monorepo-template/global';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    if (!permissions) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user as TokenUser;

    console.log(
      'checkUserPermission(user, permissions)',
      checkUserPermission(user, permissions)
    );

    return checkUserPermission(user, permissions);
  }
}
