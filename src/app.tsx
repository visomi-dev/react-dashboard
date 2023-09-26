import { Route, Routes } from 'react-router-dom';

import { dashboardPath, signInPath, signOutPath } from './constants/routes';

import { Layout } from './components/layout';

import { AuthedGuard } from './guards/authed';
import { AnonymousGuard } from './guards/anonymous';

import { Home } from './views/home';
import { SignIn } from './views/auth/sign-in';
import { SignOut } from './views/auth/sign-out';
import { NotFound } from './views/not-found';
import { Dashboard } from './views/dashboard';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route element={<AnonymousGuard />}>
          <Route path={signInPath} element={<SignIn />} />
        </Route>

        <Route element={<AuthedGuard />}>
          <Route path={dashboardPath} element={<Dashboard />} />
          <Route path={signOutPath} element={<SignOut />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
