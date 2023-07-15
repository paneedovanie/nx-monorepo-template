import { Global, Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
