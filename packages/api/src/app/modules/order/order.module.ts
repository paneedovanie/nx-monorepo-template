import { Global, Module } from '@nestjs/common';
import { OrderController } from './controllers';
import { OrderService } from './services';

@Global()
@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
