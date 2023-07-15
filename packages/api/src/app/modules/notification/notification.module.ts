import { Global, Module } from '@nestjs/common';
import { NotificationController } from './controllers';
import { NotificationService } from './services';

@Global()
@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
