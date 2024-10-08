import { useAxios } from "./main.service";
import type { AlbumModel, CreateAlbumModel } from "@/models/album.model";

export class AlbumService {
    static async getAllAlbums() {
        return await useAxios('/albums');
    }

    static async getAlbumById(id: number) {
        return await useAxios(`/albums/${id}`);
    }

    static async createAlbum(data: CreateAlbumModel) {
        return await useAxios('/albums', 'post', data);
    }

    static async updateAlbum(id: number, data: AlbumModel | undefined) {
        return await useAxios(`/albums/${id}`, 'put', data);
    }

    static async deleteAlbum(id: number) {
        return await useAxios(`/albums/${id}`, 'delete');
    }
}
