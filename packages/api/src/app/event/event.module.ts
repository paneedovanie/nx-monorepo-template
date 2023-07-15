import { Global, Module } from '@nestjs/common';
import { EventGateway } from './gateways';

@Global()
@Module({
  providers: [EventGateway],
  exports: [EventGateway],
})
export class EventModule {}
