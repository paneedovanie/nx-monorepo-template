import { Module } from '@nestjs/common';
import { TagController } from './controllers';
import { TagService } from './services';

@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
