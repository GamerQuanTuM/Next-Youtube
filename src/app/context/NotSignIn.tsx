// searchResultsStore.js
import { create } from "zustand";

type NotSignInModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useNotSignInModal = create<NotSignInModalState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
