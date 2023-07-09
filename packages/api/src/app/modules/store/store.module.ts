import { Module } from '@nestjs/common';
import { StoreController } from './controllers';
import { StoreService } from './services';
import { StoreGateway } from './gateways';

@Module({
  controllers: [StoreController],
  providers: [StoreService, StoreGateway],
})
export class StoreModule {}
