import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { parseDataForm } from '@nx-monorepo-template/global';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ParseBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // console.log('Before request execution');

    const request = context.switchToHttp().getRequest();
    // Modify the request or perform any necessary operations

    request.body = parseDataForm(request.body);

    return next.handle().pipe(
      tap(() => {
        // console.log('After request execution');
        // Modify the response or perform any necessary operations
      })
    );
  }
}
