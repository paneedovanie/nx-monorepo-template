import { Global, Module } from '@nestjs/common';
import { StatisticController } from './controllers';
import { StatisticService } from './services';

@Global()
@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  exports: [StatisticService],
})
export class StatisticModule {}
