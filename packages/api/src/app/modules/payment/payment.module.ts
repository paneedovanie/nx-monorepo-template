import { Global, Module } from '@nestjs/common';
import { PaymentController } from './controllers';
import { PaymentService } from './services';

@Global()
@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
