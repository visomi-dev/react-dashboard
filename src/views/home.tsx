import { Navigate } from 'react-router-dom';

import { dashboardPath, signInPath } from '@/constants/routes';

import { authStore as auth } from '@/stores/auth';

export function Home() {
  const user = auth.use.username();

  if (user) {
    return <Navigate to={dashboardPath} />;
  }

  return <Navigate to={signInPath} />;
}
