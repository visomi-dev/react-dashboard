import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, ChartPieIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { MenuItem } from '@/entities/ui';

import { uiStore as ui } from '@/stores/ui';
import { authStore as auth } from '@/stores/auth';

export function NavbarMenu() {
  const location = useLocation();

  const user = auth.use.username();

  const toggleSidebarMenuOpen = ui.use.toggleSidebarMenuOpen();

  const items = useMemo<MenuItem[]>(() => {
    if (!user) {
      return [];
    }

    return [
      {
        label: 'Dashboard',
        icon: ChartPieIcon,
        link: '/dashboard',
      },
    ];
  }, [user]);

  return (
    <nav className="w-full overflow-x-auto md:hidden">
      <ul className="grid grid-cols-4 grid-rows-1 gap-4 p-2">
        {items.map((item) => (
          <li
            key={item.link}
            className="flex h-full flex-1 items-center justify-center"
          >
            <Link
              to={item.link}
              className={clsx(
                'navbar-menu-item flex items-center justify-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black',
                {
                  'bg-primary !text-white': location.pathname === item.link,
                },
              )}
            >
              <item.icon className="h-8 w-8" />
            </Link>
          </li>
        ))}

        <li className="col-start-4 flex h-full flex-1 items-center justify-center">
          <button
            className="flex items-center justify-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
            onClick={toggleSidebarMenuOpen}
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
