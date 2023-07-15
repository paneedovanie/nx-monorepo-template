import { apiBaseUrl } from '@/core/constant';
import { log } from '@/core/helpers';
import { useEffect, useRef } from 'react';
import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client';

export const useSocket = (
  namespace: string,
  cb: (socket: Socket) => void,
  options?: Partial<ManagerOptions & SocketOptions>
) => {
  const socketRef = useRef<Socket>();

  const connect = () => {
    socketRef.current = io(apiBaseUrl + `/${namespace}`, options);

    const onConnect = () => {
      log(`Connected to "${namespace}" namespace`);
    };

    const onDisconnect = () => {
      log(`Disconnected to "${namespace}" namespace`);
    };

    cb(socketRef.current);

    socketRef.current.on('connect', onConnect);
    socketRef.current.on('disconnect', onDisconnect);
  };

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.removeAllListeners();
      socketRef.current?.close();
    };
  }, []);

  return {
    isConnected: socketRef.current?.connected,
    connect,
  };
};
