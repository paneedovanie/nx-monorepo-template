import { useTsQueryClient } from '@/core/plugins';
import { NotificationsCount } from '@nx-monorepo-template/global';
import { ReactNode, createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';

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
  const tsQueryClient = useTsQueryClient();
  const { user } = useAuthContext();

  const { data, refetch } = tsQueryClient.notification.count.useQuery(
    ['notificationCount'],
    {},
    {
      refetchInterval: 5000,
      enabled: !!user,
    }
  );

  return (
    <NotificationContext.Provider
      value={{ ...defaultValue, ...data?.body, refetch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
