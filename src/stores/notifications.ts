import { create } from 'zustand';

import { Notification } from '@/entities/notifications';

import { createSelectors } from '.';

export interface NotificationsState {
  list: Notification[];
  add: (notification: Notification) => void;
  delete: (timestamp: number) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  list: [],
  add: ({
    timestamp = new Date().getTime(),
    canClose = true,
    duration,
    ...notification
  }: Partial<Notification> & Pick<Notification, 'title'>) => {
    set((state) => ({
      list: [
        ...state.list,
        {
          timestamp,
          canClose,
          ...notification,
        },
      ],
    }));

    if (duration) {
      setTimeout(() => {
        get().delete(timestamp);
      }, duration);
    }
  },

  delete: (timestamp: number) => {
    set((state) => {
      const itemIndex = state.list.findIndex(
        (notification) => notification.timestamp === timestamp,
      );

      if (itemIndex > 0) {
        state.list.splice(itemIndex, 1);
      }

      return {
        list: state.list,
      };
    });
  },
}));

export const notificationsStore = createSelectors(useNotificationsStore);
