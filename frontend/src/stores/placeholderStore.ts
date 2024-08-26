import { create } from "zustand";

type PlaceholderStore = {
  thing: string | null;
  setThing: (title: string) => void;
};

export const usePlaceholderStore = create<PlaceholderStore>((set) => ({
  thing: null,
  setThing: (thing) => set({ thing }),
}));
