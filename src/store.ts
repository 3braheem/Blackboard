import { create } from 'zustand';
import type { Mode, Tile, Dataset } from "./types";

export type MosaicTree = unknown;

type State = {
  hasUploaded: boolean;
  dataset: Dataset | null;
  mode: Mode;
  tiles: Record<string, Tile>;
  mosaic: MosaicTree | null;
}

type Actions = {
  // Upload
  setDataset: (file: Dataset | null) => void;
  resetDataset: () => void;

  // Mode
  toggleMode: () => void;

  // Tiles
  addTile: (type: Tile) => void;
  updateTile: (id: string, updater: (type: Tile) => Tile) => void;

  // Mosaic
  setMosaic: (tree: MosaicTree | null) => void;
}

export const resolveMode = (mode: Mode) => {
  if (mode !== 'system') return mode;
  const prefersDark = window.matchMedia?.('prefers-color-scheme: dark').matches;
  return prefersDark ? 'dark' : 'light';
}

export const useApp = create<State & Actions>()(
    (set, get) => ({
      hasUploaded: false,
      dataset: null,
      mode: 'system',
      tiles: {},
      mosaic: null,

      setDataset: (file) => {
        if (file) set({dataset: file});
        if (file && !get().hasUploaded) set({hasUploaded: true});
      },
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

      setMosaic: (tree) => set({mosaic: tree}),
    }),
)
