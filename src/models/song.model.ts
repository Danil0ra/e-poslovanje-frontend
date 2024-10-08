import type { AlbumModel } from "./album.model";
export interface SongModel {
    songId: number;
    name: string;
    album:AlbumModel
}