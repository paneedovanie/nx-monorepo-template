import { Module } from '@nestjs/common';
import { TagController } from './controllers';
import { TagService } from './services';
import { StoreService } from '../store';

@Module({
  controllers: [TagController],
  providers: [TagService, StoreService],
})
export class TagModule {}
