import { Navigate, Outlet } from 'react-router-dom';

import { signInPath } from '@/constants/routes';
import { authStore as auth } from '@/stores/auth';

export function AuthedGuard() {
  const user = auth.use.username();

  if (!user) {
    return <Navigate to={signInPath} />;
  }

  return <Outlet />;
}
