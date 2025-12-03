import { create } from 'zustand';
import { userApi } from '../lib/userApi';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  error: null,
  setUser: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, error: null });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await userApi.getProfile();
        set({ user: response.data, isLoading: false });
      } catch (error) { 
        set({ isLoading: false, error: 'Failed to fetch user', token: null });
        localStorage.removeItem('token');
      }
    } else {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
