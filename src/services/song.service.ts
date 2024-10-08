import type { SongModel } from "@/models/song.model";
import { useAxios } from "./main.service";

export class SongService {
  static async getAllSongs(albumId: number) {
    return await useAxios(`/songs?albumId=${albumId}`);
  }


  static async getSongById(id: number) {
    return await useAxios(`/songs/${id}`);
}

static async updateSong(id: number, data: SongModel | undefined) {
    return await useAxios(`/songs/${id}`, 'put', data);
}

static async deleteSong(id: number) {
    return await useAxios(`/songs/${id}`, 'delete');
}

static async createSong(data: SongModel) {
    return await useAxios('/songs', 'post', data);
}
}


