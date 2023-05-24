import { Module } from '@nestjs/common';
import { StoreController } from './controllers';
import { StoreService } from './services';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
