import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean, expiryMinutes?: number) => void;
};

const NUM_OF_MINS_IN_DAY = 1440;

const isSessionExpired = () => {
  const expiryTimestamp = localStorage.getItem("expiryTimestamp");
  if (!expiryTimestamp) {
    return true;
  }

  const now = new Date().getTime();
  return now > parseInt(expiryTimestamp);
};

// store that holds state and function to change state
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn:
    localStorage.getItem("isLoggedIn") === "true" && !isSessionExpired(),

  setIsLoggedIn: (loggedIn: boolean, expiryMinutes = NUM_OF_MINS_IN_DAY) => {
    set({ isLoggedIn: loggedIn });

    if (loggedIn) {
      const now = new Date().getTime();
      const expiryTime = now + expiryMinutes * 60 * 1000; // convert to ms

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("expiryTimestamp", expiryTime.toString());
    } else {
      // Clear localStorage if logging out
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("expiryTimestamp");
    }
  },
}));
