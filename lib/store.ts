import { create } from "zustand";

type MyStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const useStore = create<MyStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useStore;
