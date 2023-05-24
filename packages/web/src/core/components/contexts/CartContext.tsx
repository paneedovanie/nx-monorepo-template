import { ReactNode, createContext, useContext, useState } from 'react';

export const CartContext = createContext<{
  cart: Record<string, number>;
  length: number;
  add: (id: string) => void;
  minus: (id: string) => void;
  set: (id: string, value: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}>({
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
  const [cart, setCart] = useState<Record<string, number>>({});
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
