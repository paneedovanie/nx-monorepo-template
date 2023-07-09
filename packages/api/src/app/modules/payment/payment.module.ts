import { Module } from '@nestjs/common';
import { PaymentController } from './controllers';
import { PaymentService } from './services';
import { OrderService } from '../order';
import { StoreGateway, StoreService } from '../store';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, OrderService, StoreService, StoreGateway],
})
export class PaymentModule {}
