import { Global, Module } from '@nestjs/common';
import { RoleController } from './controllers';
import { RoleService } from './services';

@Global()
@Module({
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
