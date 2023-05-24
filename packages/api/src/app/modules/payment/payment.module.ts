import { Module } from '@nestjs/common';
import { PaymentController } from './controllers';
import { PaymentService } from './services';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
