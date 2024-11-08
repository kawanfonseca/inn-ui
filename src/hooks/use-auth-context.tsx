import { Routes } from '@/constants';
import { Staff } from '@/services';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextData = {
  user: Staff | null;
  setUser: (value: Staff | null) => void;
  isMaster: boolean;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthContextProviderProps = React.PropsWithChildren<{}>;

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<Staff | null>(null);
  const [masterRoutes] = useState([Routes.Staff, Routes.AddStaff, Routes.EditStaff]);

  const getIsMaster = useCallback(() => {
    if (user !== null) {
      return user.roles.includes('MASTER');
    } else {
      return false;
    }
  }, [user]);

  useEffect(() => {
    if (user === null && router.pathname !== Routes.Login) {
      router.push(Routes.Login);
    } else if (
      (router.pathname === Routes.Login && user !== null) ||
      (!getIsMaster() && masterRoutes.includes(router.pathname as Routes))
    ) {
      router.push(Routes.Dashboard);
    }
  }, [getIsMaster, masterRoutes, router, user]);

  const value = useMemo(() => ({ user, setUser, isMaster: getIsMaster() }), [getIsMaster, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.displayName = 'AuthContext.Provider';

function useAuthContext() {
  const value = useContext(AuthContext);

  if (!value) throw new Error('AuthContext components must be within AuthContextProvider');

  return value;
}

export { AuthContextProvider, useAuthContext };
