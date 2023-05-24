import { Module } from '@nestjs/common';
import { PermissionController } from './controllers';
import { PermissionService } from './services';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
