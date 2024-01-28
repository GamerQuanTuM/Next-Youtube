import { create } from "zustand";

type OpenSidebar = {
  open: Boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useOpenSidebar = create<OpenSidebar>((set) => ({
  open: false,
  setOpen: (isOpen) => set({ open: isOpen }),
}));
