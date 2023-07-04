import { Module } from '@nestjs/common';
import { StatisticController } from './controllers';
import { StatisticService } from './services';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
