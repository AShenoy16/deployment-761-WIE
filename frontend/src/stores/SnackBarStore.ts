import { create } from "zustand";

type SnackbarStore = {
  message: string | null;
  isOpen: boolean;
  setMessage: (msg: string | null) => void;
  setIsOpen: (open: boolean) => void;
};

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  message: null,
  isOpen: false,
  setMessage: (message) => set({ message }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
