import { Global, Module } from '@nestjs/common';
import { TagController } from './controllers';
import { TagService } from './services';

@Global()
@Module({
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
