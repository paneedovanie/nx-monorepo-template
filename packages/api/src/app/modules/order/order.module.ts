import { Module } from '@nestjs/common';
import { OrderController } from './controllers';
import { OrderService } from './services';
import { StoreGateway, StoreService } from '../store';

@Module({
  controllers: [OrderController],
  providers: [OrderService, StoreService, StoreGateway],
})
export class OrderModule {}
