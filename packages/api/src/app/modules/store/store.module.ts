import { Module } from '@nestjs/common';
import { StoreController } from './controllers';
import { StoreService } from './services';
import { StoreGateway } from './gateways';
import { CategoryService } from '../category';

@Module({
  controllers: [StoreController],
  providers: [StoreService, StoreGateway, CategoryService],
})
export class StoreModule {}
