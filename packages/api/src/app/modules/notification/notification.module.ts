import { Module } from '@nestjs/common';
import { NotificationController } from './controllers';
import { NotificationService } from './services';
import { StoreService } from '../store';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, StoreService],
})
export class NotificationModule {}
