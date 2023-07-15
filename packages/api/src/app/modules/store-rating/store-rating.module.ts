import { Global, Module } from '@nestjs/common';
import { StoreRatingController } from './controllers';
import { StoreRatingService } from './services';

@Global()
@Module({
  controllers: [StoreRatingController],
  providers: [StoreRatingService],
  exports: [StoreRatingService],
})
export class StoreRatingModule {}
