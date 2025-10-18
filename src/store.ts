import { create } from 'zustand';
import { persist } from 'zustand';
import { Mode, Tile, Dataset } from "./types";

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
  setMode: (type: Mode) => void;
  toggleMode: () => void;

  // Tiles
  setTile: (type: Tile) => void;
  updateTile: (id: string, updater: (type: Tile) => Tile) => void;

  // Mosaic
  setMosaic: (tree: MosaicTree | null) => void;
}

const resolveMode = (mode: Mode): 'light' | 'dark' => {
  if (mode !== 'system') return mode;
  const prefersDark = window.matchMedia?.('prefers-color-scheme: dark').matches;
  return prefersDark ? 'dark' : 'light';
}

export const useApp = create<State & Actions>()(
  persist(
    (set, get) => ({
      hasUploaded: false,
      dataset: null,
      mode: 'system',
      tiles: {},
      mosaic: null,

      setDataset: (file) => {
        if (file) set({dataset: file});
        if (file && !get().hasUploaded) set({hasUploaded: true});
      }
      resetDataset: () => set({hasUploaded: false});

      setMode: (type) => set({mode: type});
      toggleMode: () => {
        const current = get().mode;
        const conrete = resolveMode(current);
        const switched = concrete === 'dark' ? 'light' : 'dark';
        set({mode: switched});
      }
    })
  )
)
