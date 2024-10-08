import type { ArtistModel } from "./artist.model";

export interface AlbumModel{
    albumId:number,
    albumImage:string,
    albumName:string,
    albumGenre:string,
    artist:ArtistModel
}


export interface CreateAlbumModel {
    albumImage: string;
    albumName: string;
    albumGenre: string;
    artistId: number;
  }
  