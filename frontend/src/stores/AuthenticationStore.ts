import {create} from 'zustand';

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

// store that holds state and function to change state
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));
