import { Global, Module } from '@nestjs/common';
import { QrcodeController } from './controllers';

@Global()
@Module({
  controllers: [QrcodeController],
  providers: [],
  exports: [],
})
export class QrcodeModule {}
