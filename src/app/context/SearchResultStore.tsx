// searchResultsStore.js
import { create } from "zustand";

type SearchResultsState = {
  searchResults: string[];
  setSearchResults: (results: string[]) => void;
};

export const useSearchResultsStore = create<SearchResultsState>((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));
