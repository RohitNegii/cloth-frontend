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
  setUser: (user: User, token:string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  login: (phone: string, otp: string) => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
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
        const response:any = await userApi.getProfile();
        set({ user: response.data, isLoading: false });
      } catch (error) { 
        set({ isLoading: false, error: 'Failed to fetch user', token: null });
        localStorage.removeItem('token');
      }
    } else {
      set({ isLoading: false });
    }
  },
  login: async (phone, otp) => {
    set({ isLoading: true, error: null });
    try {
      const response:any = await userApi.verifyOtp(phone, otp);
      if (response.data && response.data.user && response.data.token) {
        get().setUser(response.data.user, response.data.token);
        set({ isLoading: false });
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during login.';
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  }
}));

export default useUserStore;
