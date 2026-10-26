import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  token: string | null;
  role: 'boa' | 'owner' | 'tenant' | null;
  language: 'en' | 'ar';
  login: (role: AppState['role'], token: string) => void;
  logout: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      language: 'en',
      login: (role, token) => set({ role, token }),
      logout: () => set({ role: null, token: null }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'jidar-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
