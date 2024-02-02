// searchResultsStore.js
import { Video } from "@prisma/client";
import { create } from "zustand";

type SearchResultsState = {
  searchResults: Video[];
  setSearchResults: (results: Video[]) => void;
};

export const useSearchResultsStore = create<SearchResultsState>((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));
