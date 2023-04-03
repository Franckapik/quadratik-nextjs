import { create } from "zustand";

export const useBearStore = create((set) => ({
    scroll: 0,
    width: 0,
    height: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))