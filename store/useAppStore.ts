'use client'
import { create } from 'zustand'

type Filters = {
  q: string;
  region: string;
  difficulty: string;
  season: string;
  priceCap: number;
  minAltitude: number;
  duration: number;
  sort: 'Recommended' | 'Price (Lowest)' | 'Rating (Highest)' | 'Altitude (High→Low)' | 'Duration (Short→Long)';
}
type AppState = {
  filters: Filters;
  compare: string[];
  setFilters: (partial: Partial<Filters>) => void;
  resetFilters: (defaults: Filters) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  filters: {
    q: '',
    region: 'All',
    difficulty: 'All',
    season: 'All',
    priceCap: 999999,
    minAltitude: 0,
    duration: 99,
    sort: 'Recommended'
  },
  compare: [],
  setFilters: (partial) => set(state => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: (defaults) => set(() => ({ filters: defaults })),
  toggleCompare: (id) => set(state => {
    const exists = state.compare.includes(id);
    const next = exists ? state.compare.filter(x => x !== id) : Array.from(new Set([...state.compare, id])).slice(0,3);
    return { compare: next };
  }),
  clearCompare: () => set({ compare: [] }),
}))
