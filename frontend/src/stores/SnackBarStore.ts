import { create } from "zustand";

type Severity = "success" | "error";

type SnackbarStore = {
  message: string | null;
  severity: Severity;
  isOpen: boolean;
  setMessage: (msg: string | null) => void;
  setIsOpen: (open: boolean) => void;
  setSeverity: (severity: Severity) => void;
};

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  message: null,
  isOpen: false,
  severity: "error",
  setMessage: (message) => set({ message }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setSeverity: (severity: Severity) => set({ severity }),
}));
