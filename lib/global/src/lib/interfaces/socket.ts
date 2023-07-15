import { Socket } from 'socket.io-client';

export interface SocketExtended extends Socket {
  handshake: {
    query: Record<string, any>;
  };
}
