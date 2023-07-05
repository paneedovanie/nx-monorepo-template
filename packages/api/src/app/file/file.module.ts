import { Module, Global } from '@nestjs/common';
import { FileService } from './services';

@Global()
@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
