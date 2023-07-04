import { Module } from '@nestjs/common';
import { PaymentController } from './controllers';
import { PaymentService } from './services';
import { OrderService } from '../order';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, OrderService],
})
export class PaymentModule {}
