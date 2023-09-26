import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from '.';

type Theme = 'light' | 'dark';

export interface UIState {
  theme: Theme;
  loading: boolean;
  sidebarMenuOpen: boolean;
  sidebarWorkspaceOpen: boolean;
  navigating: boolean;

  toggleTheme: () => void;
  toggleSidebarMenuOpen: () => void;
  toggleSidebarWorkspaceOpen: () => void;
  toggleLoading: () => void;
  setTheme: (value: Theme) => void;
  setSidebarMenuOpen: (value: boolean) => void;
  setSidebarWorkspaceOpen: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  isDarkTheme: () => boolean;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light' as const,
      loading: false,
      sidebarMenuOpen: false,
      sidebarWorkspaceOpen: false,
      navigating: false,

      isDarkTheme: () => get().theme === 'dark',

      toggleTheme: () => {
        const nextTheme = get().isDarkTheme() ? 'light' : 'dark';

        set({
          theme: nextTheme,
        });
      },

      toggleSidebarMenuOpen: () => {
        const nextValue = !get().sidebarMenuOpen;

        set({
          sidebarMenuOpen: nextValue,
        });
      },

      toggleLoading: () => {
        const nextValue = !get().loading;

        set({
          loading: nextValue,
        });
      },

      toggleSidebarWorkspaceOpen: () => {
        const nextValue = !get().sidebarWorkspaceOpen;

        set({
          sidebarWorkspaceOpen: nextValue,
        });
      },

      setLoading: (loading: boolean) => {
        set({
          loading,
        });
      },

      setSidebarMenuOpen: (sidebarMenuOpen: boolean) => {
        set({
          sidebarMenuOpen,
        });
      },

      setSidebarWorkspaceOpen: (sidebarWorkspaceOpen: boolean) => {
        set({
          sidebarWorkspaceOpen,
        });
      },

      setTheme: (value: Theme) => {
        set({
          theme: value,
        });
      },
    }),
    {
      name: 'ui-storage',
    },
  ),
);

export const uiStore = createSelectors(useUIStore);
