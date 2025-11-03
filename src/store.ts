import { create } from 'zustand';
import type { Mode, Tile, Dataset } from "./types";

type ImageEntry = { src: string | null; objectUrl?: string | null; };

type State = {
  version: number;
  hasUploaded: boolean;
  dataset: Dataset | null;
  mode: Mode;
  tiles: Record<string, Tile>;
  title: string;

  images: Record<string, ImageEntry>;
}

type Actions = {
  setVersion: (version: number) => void;

  // Upload
  setDataset: (file: Dataset | null) => void;
  setHasUploaded: (uploaded: boolean) => void;
  resetDataset: () => void;

  // Mode
  toggleMode: () => void;

  // Tiles
  addTile: (type: Tile) => void;
  updateTile: (id: string, updater: (type: Tile) => Tile) => void;

  // Title
  setTitle: (title: string) => void;

  // Tab Data
  setImage: (id: string, src: string, objectUrl?: string) => void;
  clearImage: (id: string) => void;
}

export const resolveMode = (mode: Mode) => {
  if (mode !== 'system') return mode;
  const prefersDark = window.matchMedia?.('prefers-color-scheme: dark').matches;
  return prefersDark ? 'dark' : 'light';
}

export const useApp = create<State & Actions>()(
    (set, get) => ({
      version: 0,
      hasUploaded: false,
      dataset: null,
      mode: 'system',
      tiles: {},
      mosaic: null,
      title: '',

      images: {},

      setVersion: (version) => set({version}),

      setDataset: (file) => {
        if (file) set({dataset: file});
        if (file && !get().hasUploaded) set({hasUploaded: true});
      },
      setHasUploaded: (uploaded) => set({hasUploaded: uploaded}),
      resetDataset: () => set({hasUploaded: false}),

      toggleMode: () => {
        const current = get().mode;
        const concrete = resolveMode(current);
        const switched = concrete === 'dark' ? 'light' : 'dark';
        set({mode: switched});
      },

      addTile: (tile) => set((state) => ({tiles: {...state.tiles, [tile.id]: tile}})),
      updateTile: (id, updater) => 
        set((state) => ({tiles: {...state.tiles, [id]: updater(state.tiles[id])}})),

      setTitle: (title) => set({title: title}),

      setImage: (id, src, objectUrl) => set((state) => ({ images: { ...state.images, [id]: { src, objectUrl } } })),
      clearImage: (id) => set((state) => {
        const {[id]: _, ...rest} = state.images;
        return { images: rest };
      })
    }),

)
