import { Global, Module } from '@nestjs/common';
import { StoreController } from './controllers';
import { StoreService } from './services';

@Global()
@Module({
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
