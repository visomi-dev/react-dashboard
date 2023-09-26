import { Navigate, Outlet } from 'react-router-dom';

import { dashboardPath } from '@/constants/routes';

import { authStore as auth } from '@/stores/auth';

export function AnonymousGuard() {
  const user = auth.use.username();

  if (user) {
    return <Navigate to={dashboardPath} />;
  }

  return <Outlet />;
}
