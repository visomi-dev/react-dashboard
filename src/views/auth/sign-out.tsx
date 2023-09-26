import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { signInPath } from '@/constants/routes';

import { authStore as auth } from '@/stores/auth';

export function SignOut() {
  const signOut = auth.use.signOut();

  useEffect(() => {
    signOut();
  }, []);

  return <Navigate to={signInPath} />;
}
