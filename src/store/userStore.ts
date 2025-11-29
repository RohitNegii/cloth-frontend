import create from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  user: { name: string; email: string; phone: string } | null;
  token: string | null;
  login: (user: { name: string; email: string; phone: string }, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({ isLoggedIn: true, user, token });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ isLoggedIn: false, user: null, token: null });
  },
  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // You might want to fetch user data here using the token
        // For now, we'll just set the token and isLoggedIn status
        set({ isLoggedIn: true, token });
      }
    }
  },
}));

export default useUserStore;
