import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io-client';
import { StoreService } from '../services';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: '*',
  namespace: 'stores',
})
export class StoreGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly storeService: StoreService) {}

  async handleConnection(
    e: Socket & {
      handshake: {
        query: {
          storeId: string;
        };
      };
    }
  ) {
    const storeId = e.handshake.query.storeId;
    e.emit('status', await this.storeService.getStatus(storeId));
  }

  @SubscribeMessage('status')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
