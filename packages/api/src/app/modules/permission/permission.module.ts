import { Global, Module } from '@nestjs/common';
import { PermissionController } from './controllers';
import { PermissionService } from './services';

@Global()
@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
