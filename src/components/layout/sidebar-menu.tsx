import { useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeftOnRectangleIcon,
  ChartPieIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

import isotype from '/assets/images/isotype.svg';

import { MenuItem } from '@/entities/ui';

import { uiStore as ui } from '@/stores/ui';
import { authStore as auth } from '@/stores/auth';
import { signOutPath } from '@/constants/routes';
import { useClickOutside } from '@/hooks/tools';

export function SidebarMenu() {
  const location = useLocation();
  const element = useRef<HTMLElement>(null);

  const user = auth.use.username();

  const sidebarMenuOpen = ui.use.sidebarMenuOpen();
  const setSidebarMenuOpen = ui.use.setSidebarMenuOpen();

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

  const onClickOutside = () => {
    setSidebarMenuOpen(false);
  };

  useEffect(() => {
    return () => {
      setSidebarMenuOpen(false);
    };
  }, []);

  useClickOutside(element, onClickOutside);

  return (
    <div
      className={clsx('absolute md:relative', {
        'dark:bg-soft-gray inset-0 block h-screen w-screen bg-black bg-opacity-50 dark:bg-opacity-25 md:h-fit md:w-fit':
          sidebarMenuOpen,
      })}
    >
      <aside
        ref={element}
        className={clsx(
          'relative z-30 flex h-screen flex-col overflow-y-auto overflow-x-hidden border-r-black bg-white transition-all dark:border-r-white dark:bg-black md:w-fit md:max-w-[16rem] md:border-r',
          {
            'w-0': !sidebarMenuOpen,
            'w-4/5': sidebarMenuOpen,
          },
        )}
      >
        <img
          className="mx-auto w-32 p-4"
          src={isotype}
          alt="logo de la aplicación"
        />

        <div className="flex flex-1 flex-col justify-between">
          <nav className="flex flex-col gap-4 overflow-x-hidden p-4">
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item.link}
                  className={clsx('flex w-full items-center', item.extraClass)}
                >
                  <Link
                    to={`${item.link}?${
                      item.queryParams ? item.queryParams : ''
                    }`}
                    className={clsx(
                      'sidebar-menu-item flex w-full items-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black md:gap-2',
                      {
                        'sidebar-menu-item-active bg-primary !text-white':
                          location.pathname === item.link,
                      },
                    )}
                    onClick={onClickOutside}
                  >
                    <item.icon
                      className={clsx(
                        'w-8',
                        {
                          'mr-2': sidebarMenuOpen,
                        },
                        item.iconClass,
                      )}
                    />

                    <span
                      className={clsx('overflow-hidden transition-all', {
                        'h-0 md:h-fit': !sidebarMenuOpen,
                      })}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col p-4">
            <ul>
              <li
                className={clsx('flex items-center', {
                  'md:justify-center': sidebarMenuOpen,
                })}
              >
                <a className="flex items-center gap-2 p-2">
                  <UserIcon className="h-8 w-8" />

                  <div className="overflow-hidden">
                    <div className="font-bold">{user}</div>
                  </div>
                </a>
              </li>

              <li
                className={clsx('flex items-center', {
                  'md:justify-center': sidebarMenuOpen,
                })}
              >
                <Link
                  className="flex items-center gap-2 p-2"
                  to={signOutPath}
                  onClick={onClickOutside}
                >
                  <ArrowLeftOnRectangleIcon className="h-8 w-8" />

                  <span
                    className={clsx('overflow-hidden transition-all', {
                      'h-0 md:h-fit': !sidebarMenuOpen,
                    })}
                  >
                    Sign Out
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
