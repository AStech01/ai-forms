// // src/store/auth.ts
// import { create } from 'zustand';
// import { setAuthToken, getCurrentUser, LoginResponse } from '../lib/api';
// import { User } from '../types/api';

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (data: LoginResponse) => void;
//   logout: () => void;
//   fetchUser: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   login: ({ token, user }: LoginResponse) => {
//     setAuthToken(token);
//     set({ user, token, isAuthenticated: true });
//     localStorage.setItem('token', token);
//   },
//   logout: () => {
//     setAuthToken(null);
//     set({ user: null, token: null, isAuthenticated: false });
//     localStorage.removeItem('token');
//   },
//   fetchUser: async () => {
//     try {
//       const user = await getCurrentUser();
//       set({ user, isAuthenticated: true });
//     } catch {
//       set({ user: null, isAuthenticated: false });
//       localStorage.removeItem('token');
//     }
//   },
// }));

import { create } from 'zustand';
import { setAuthToken, getCurrentUser, LoginResponse } from '../lib/api';
import { User } from '../types/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: ({ token, user }: LoginResponse) => {
    setAuthToken(token);
    set({ user, token, isAuthenticated: true });
    localStorage.setItem('token', token);
  },

  logout: () => {
    setAuthToken(null);
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
  },

  fetchUser: async () => {
    try {
      const user = await getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  },
}));
