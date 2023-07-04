import { Module } from '@nestjs/common';
import { OrderController } from './controllers';
import { OrderService } from './services';
import { StoreService } from '../store';

@Module({
  controllers: [OrderController],
  providers: [OrderService, StoreService],
})
export class OrderModule {}
