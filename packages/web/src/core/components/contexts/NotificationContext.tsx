import { Event, NotificationsCount } from '@nx-monorepo-template/global';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuthContext } from './AuthContext';
import { useEventContext } from './EventContext';

const defaultValue = {
  all: 0,
  account: 0,
  order: 0,
  storeOrder: 0,
  wallet: 0,
  items: [],
  refetch: () => {
    return;
  },
};

export const NotificationContext = createContext<
  NotificationsCount & { refetch: () => void }
>(defaultValue);

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { socket } = useEventContext();
  const [data, setData] = useState(defaultValue);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.id) {
      socket?.on('connect', () => {
        socket?.on(Event.NotificationStatus, setData);
        socket?.emit(Event.NotificationStatus, user.id);
      });
    }
  }, [socket, socket?.connected, user?.id]);

  return (
    <NotificationContext.Provider value={{ ...defaultValue, ...data }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
