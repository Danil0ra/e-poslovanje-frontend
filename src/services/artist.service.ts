import { useAxios } from "./main.service";
import type { ArtistModel } from "@/models/artist.model";

export class ArtistService{
    static async getAllArtists(){
        return await useAxios('/artists')
    }


static async getArtistById(id: number) {
    return await useAxios(`/artists/${id}`);
}

static async createArtist(data: ArtistModel) {
    return await useAxios('/artists', 'post', data);
}

static async updateArtist(id: number, data: ArtistModel | undefined) {
    return await useAxios(`/artists/${id}`, 'put', data);
}

static async deleteArtist(id: number) {
    return await useAxios(`/artists/${id}`, 'delete');
}
}