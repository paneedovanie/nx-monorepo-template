import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const allowUnauthorize = this.reflector.get(
      'ALLOW_UNAUTHORIZE',
      context.getHandler()
    );

    const request = context.switchToHttp().getRequest();
    if (allowUnauthorize && !request.headers.authorization) {
      return true;
    }
    // Add your custom logic before calling the parent canActivate() method
    // For example, you can perform additional checks or validations
    // You can access the request using context.switchToHttp().getRequest()

    return super.canActivate(context);
  }
}
