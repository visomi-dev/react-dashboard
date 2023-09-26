import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { uiStore as ui } from '@/stores/ui';
import { authStore as auth } from '@/stores/auth';

import { Notifications } from '../ui/notifications';

import { SidebarMenu } from './sidebar-menu';
import { NavbarMenu } from './navbar-menu';
import { PageNavigationLoader } from './page-navigation-loader';

export function Layout({ children }: { children?: React.ReactNode }) {
  const setLoading = ui.use.setLoading();
  const token = auth.use.username();
  const user = auth.use.username();
  const getUser = auth.use.getUser();
  const signOut = auth.use.signOut();

  useEffect(() => {
    if (token) {
      setLoading(true);

      getUser();
    }

    return () => {
      signOut();
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {user && <SidebarMenu />}

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden md:p-0">
        <Notifications />

        <Outlet />

        {children}
      </main>

      {user && <NavbarMenu />}

      <PageNavigationLoader />
    </div>
  );
}
