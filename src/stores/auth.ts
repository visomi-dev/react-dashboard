import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { createSelectors } from '.';

export interface AuthState {
  token: string;
  username: string;
  signIn: (username: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: '',
      username: '',
      signIn: async (username: string, password: string) => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/sign-in`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          },
        );

        if (response.ok) {
          const { accessToken: token, user } = await response.json();

          set({ token, username: user.username });
        } else {
          set({ username: '' });

          throw new Error('Invalid credentials');
        }
      },
      getUser: async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/user`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${get().token}`,
            },
          },
        );

        if (response.ok) {
          const { accessToken: token, user } = await response.json();

          set({ token, username: user.username });
        } else {
          set({ username: '' });
        }
      },
      signOut: () => {
        set({ username: '' });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const authStore = createSelectors(useAuthStore);
