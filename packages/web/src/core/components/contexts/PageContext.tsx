import { createContext, ReactNode, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTsQueryClient } from '@/core/plugins';
import { UseQueryResult } from '@ts-rest/react-query';
import { contract } from '@nx-monorepo-template/global';

interface PageContextValue {
  storeQueryResult: UseQueryResult<typeof contract.store.get>;
  orderQueryResult: UseQueryResult<typeof contract.order.get>;
}

export const PageContext = createContext<PageContextValue>(
  {} as PageContextValue
);

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const { storeId, orderId } = useParams();
  const tsQueryClient = useTsQueryClient();

  const storeQueryResult = tsQueryClient.store.get.useQuery(
    ['getStore', storeId],
    {
      params: {
        id: storeId ?? '',
      },
    },
    {
      enabled: !!storeId,
    }
  );

  const orderQueryResult = tsQueryClient.order.get.useQuery(
    ['getOrder', orderId],
    {
      params: {
        id: orderId ?? '',
      },
    },
    {
      enabled: !!orderId,
    }
  );

  return (
    <PageContext.Provider value={{ storeQueryResult, orderQueryResult }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
