import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketExtended, Event } from '@nx-monorepo-template/global';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: '*',
})
export abstract class BaseGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  protected server: Server;

  public async handleConnection(client: SocketExtended) {
    console.log('connected', (await this.server.fetchSockets()).length);
  }

  public async handleDisconnect(client: SocketExtended) {
    console.log('connected', (await this.server.fetchSockets()).length);
  }

  get sockets() {
    return this.server.sockets.sockets as unknown as Map<
      string,
      SocketExtended
    >;
  }

  getSocket(userId: string): SocketExtended | undefined {
    return Array.from(this.sockets).find(
      ([, socket]) => socket.handshake.query.userId === userId
    )?.[1];
  }

  emitToUser(userId: string, event: Event, any) {
    this.sockets.forEach((socket) => {
      if (socket.handshake.query.userId === userId) {
        socket.emit(event, any);
      }
    });
  }

  emitToUsers(userIds: string[], event: Event, any) {
    this.sockets.forEach((socket) => {
      if (userIds.includes(socket.handshake.query.userId)) {
        socket.emit(event, any);
      }
    });
  }
}
