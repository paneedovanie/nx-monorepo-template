import { useTsQueryClient } from '@/core';
import { RolePermission, TokenUser } from '@nx-monorepo-template/global';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export const AuthContext = createContext<{
  user?: TokenUser;
  token?: string;
  isFetching: boolean;
  setUser: Dispatch<SetStateAction<TokenUser | undefined>>;
  setToken: (token: string) => void;
  getToken: () => void;
  clear: () => void;
  checkPermission: (permissions?: RolePermission[]) => boolean;
  verify: () => void;
}>({
  isFetching: false,
  setUser: () => {
    // void
  },
  setToken: () => {
    // void
  },
  getToken: () => {
    // void
  },
  clear: () => {
    // void
  },
  checkPermission: () => {
    return true;
  },
  verify: () => {
    // void
  },
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TokenUser>();
  const [token, setBaseToken] = useState<string | undefined>(
    localStorage.getItem('token') ?? undefined
  );
  const tsQueryClient = useTsQueryClient();
  const permissionsMap = useMemo<Map<RolePermission, boolean>>(() => {
    const mapper = new Map<RolePermission, boolean>();
    for (const { permissions } of user?.roles ?? []) {
      for (const permission of permissions) {
        mapper.set(permission as RolePermission, true);
      }
    }
    return mapper;
  }, [user]);

  const setToken = (token: string) => {
    setBaseToken(token);
    localStorage.setItem('token', token);
  };
  const getToken = () => localStorage.getItem('token');

  const { isFetching, refetch } = tsQueryClient.auth.verify.useQuery(
    ['verifyUser'],
    {},
    {
      onSuccess: (v) => setUser(v.body),
      onError: () => {
        clear();
      },
      enabled: !!token,
    }
  );

  const clear = () => {
    setUser(undefined);
    localStorage.removeItem('token');
  };

  const checkPermission = (permissions?: RolePermission[]) => {
    if (!permissions) return true;
    for (const permission of permissions) {
      if (permissionsMap.get(permission)) {
        return true;
      }
    }
    return false;
  };

  const verify = () => {
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isFetching,
        setUser,
        setToken,
        getToken,
        clear,
        checkPermission,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
