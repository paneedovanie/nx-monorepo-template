import { Module } from '@nestjs/common';
import { StoreRatingController } from './controllers';
import { StoreRatingService } from './services';

@Module({
  controllers: [StoreRatingController],
  providers: [StoreRatingService],
})
export class StoreRatingModule {}
