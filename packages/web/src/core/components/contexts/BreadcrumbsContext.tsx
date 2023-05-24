import { ReactNode, createContext, useContext, useState } from 'react';

export interface BreadcrumbsContextValue {
  items: BreadcrumbsItem[];
  firstItem: (item: BreadcrumbsItem) => void;
  append: (item: BreadcrumbsItem) => void;
  goTo: (index: number) => void;
}

export interface BreadcrumbsItem {
  label: string;
  to: string;
}

const defaultValue: BreadcrumbsContextValue = {
  items: [{ label: 'Dashboard', to: '/manage' }],
  firstItem: () => {
    // void
  },
  append: () => {
    // void
  },
  goTo: () => {
    //void
  },
};

export const BreadcrumbsContext =
  createContext<BreadcrumbsContextValue>(defaultValue);

export const BreadcrumbsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [items, setItems] = useState<BreadcrumbsItem[]>(defaultValue.items);

  const firstItem = (item: BreadcrumbsItem) => {
    setItems((v) => {
      const temp = [...v];
      temp.splice(1);
      return [...temp, item];
    });
  };

  const append = (item: BreadcrumbsItem) => {
    setItems((v) => [...v, item]);
  };

  const goTo = (index: number) => {
    if (index > -1) {
      setItems((v) => v.splice(index + 1));
    }
  };

  return (
    <BreadcrumbsContext.Provider value={{ items, firstItem, append, goTo }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbsContext = () => useContext(BreadcrumbsContext);
