import { useTsQueryClient } from '@/core/plugins';
import { Store } from '@nx-monorepo-template/global';
import { ReactNode, createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

export const CartContext = createContext<{
  store?: Store;
  isFetchingStore: boolean;
  cart: Record<string, number>;
  length: number;
  add: (id: string) => void;
  minus: (id: string) => void;
  set: (id: string, value: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}>({
  isFetchingStore: false,
  cart: {},
  length: 0,
  add: (id: string) => {
    //
  },
  minus: (id: string) => {
    //
  },
  set: (id: string, value: number) => {
    //
  },
  remove: (id: string) => {
    //
  },
  clear: () => {
    //
  },
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const tsQueryClient = useTsQueryClient();
  const { storeId } = useParams();
  const [store, setStore] = useState<Store>();
  const [cart, setCart] = useState<Record<string, number>>({});

  const { isFetching: isFetchingStore } = tsQueryClient.store.get.useQuery(
    ['getStore', storeId],
    {
      params: { id: storeId ?? '' },
    },
    {
      enabled: !!storeId,
      onSuccess: (data) => {
        setStore(data.body);
      },
    }
  );

  const add = (id: string) => {
    let count = 1;
    if (cart[id] !== undefined) {
      count += cart[id];
    }
    setCart((cart) => ({
      ...cart,
      [id]: count,
    }));
  };
  const minus = (id: string) => {
    let count = -1;
    if (cart[id] !== undefined) {
      count += cart[id];
    }
    if (count === -1) return;
    setCart((cart) => {
      const temp = { ...cart };
      if (count === 0) delete temp[id];
      else temp[id] = count;
      return temp;
    });
  };
  const set = (id: string, value: number) => {
    setCart((cart) => ({
      ...cart,
      [id]: value,
    }));
  };
  const remove = (id: string) => {
    setCart((cart) => {
      const temp = { ...cart };
      delete temp[id];
      return temp;
    });
  };
  const clear = () => {
    setCart({});
  };

  return (
    <CartContext.Provider
      value={{
        store,
        isFetchingStore,
        cart,
        length: Object.keys(cart).length,
        add,
        minus,
        set,
        remove,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
