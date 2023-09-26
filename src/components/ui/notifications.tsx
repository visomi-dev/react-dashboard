import { notificationsStore as notifications } from '@/stores/notifications';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function Notifications() {
  const list = notifications.use.list();
  const remove = notifications.use.delete();

  return (
    <div className="fixed bottom-16 right-0 z-20 flex w-full items-center md:absolute md:bottom-auto md:top-0 md:w-fit">
      <ul
        className={clsx('w-full space-y-2 md:w-fit', {
          'p-4': list.length,
        })}
      >
        {list.map((notification) => (
          <li
            className="pointer-events-auto flex w-full items-start gap-2 rounded-lg bg-white p-2 pl-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-black dark:ring-white md:w-fit"
            key={notification.timestamp}
          >
            {notification.icon && (
              <notification.icon className="w-8 flex-shrink-0 p-0.5" />
            )}

            <div className="flex w-0 flex-1 flex-col flex-wrap gap-2 pt-0.5 md:w-fit md:max-w-xs">
              <p className="flex-wrap text-lg font-semibold">
                {notification.title}
              </p>

              {notification.description && (
                <p className="mt-1 text-sm">{notification.description}</p>
              )}

              {notification.actions && (
                <div className="flex gap-2">
                  {notification.actions.map((action) => (
                    <Button
                      type="button"
                      variant={action.variant}
                      onClick={action.callback}
                      key={action.label}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-shrink-0">
              {notification.canClose && (
                <button
                  type="button"
                  className="h-8 w-8 rounded-lg p-1"
                  onClick={() => {
                    remove(notification.timestamp);
                  }}
                >
                  <span className="sr-only">Close Notification</span>

                  <XMarkIcon className="w-6" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
