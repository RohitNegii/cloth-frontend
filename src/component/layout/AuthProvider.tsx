'use client';

import { useEffect } from 'react';
import useUserStore from '@/store/userStore';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, fetchUser, user } = useUserStore();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  return <>{children}</>;
};

export default AuthProvider;
