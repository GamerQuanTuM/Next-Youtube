// searchResultsStore.js
import { create } from "zustand";

type VideoModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useVideoModal = create<VideoModalState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
