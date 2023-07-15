import { Global, Module } from '@nestjs/common';
import { TransactionController } from './controllers';
import { TransactionService } from './services';

@Global()
@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
