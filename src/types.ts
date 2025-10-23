export type Mode = 'light' | 'dark' | 'system';

export type TileData = 'md' | 'chart' | 'table' | 'image';
export type Tile =
  | { id: string; kind: 'markdown'; title?: string; config: { text: string } }
  | {
      id: string; kind: 'chart'; title?: string; config: {
        x?: string; y?: string; group?: string; type?: 'line'|'bar'|'scatter'|'pie'|'area'
      }
    }
  | { id: string; kind: 'table'; title?: string; config: {
        pageSize: number; sortBy?: string; sortDirection?: 'asc'|'desc';
      }
    }
  | { id: string; kind: 'image'; title?: string; config: { url: string } };

export type Row = Record<string, string | number | null>;
export type Dataset = { name?: string; rows: Row[] };
