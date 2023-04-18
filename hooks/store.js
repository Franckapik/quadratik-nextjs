import { create } from "zustand";

const useBearStore = create((set) => ({
    scroll: 0,
    width: 0,
    height: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))

  const useProductStore = create((set) => ({
    price: 0,
    nomenclature : 0,
    valuesSelected : {},
    attributes : {}
  }))

  export {useBearStore, useProductStore};