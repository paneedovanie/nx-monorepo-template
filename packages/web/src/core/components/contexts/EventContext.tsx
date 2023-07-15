import { apiBaseUrl } from '@/core/constant';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import { useAuthContext } from './AuthContext';
import { log } from '@/core/helpers';

export const EventContext = createContext<{
  socket?: Socket;
}>({});

export const EventContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const socketRef = useRef<Socket>();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (socketRef.current || !user?.id) {
      return;
    }
    socketRef.current = io(apiBaseUrl, {
      query: { userId: user?.id },
    })
      .on('connect', () => {
        log('connected', socketRef.current);
      })
      .on('disconnect', () => {
        log('disconnected');
      });
    setSocket(socketRef.current);

    return () => {
      socketRef.current?.removeAllListeners();
      socketRef.current?.close();
      setSocket(undefined);
    };
  }, [socketRef, user?.id]);

  return (
    <EventContext.Provider value={{ socket }}>{children}</EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
