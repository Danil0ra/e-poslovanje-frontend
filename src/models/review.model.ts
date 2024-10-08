import type { AlbumModel } from "./album.model";
import type { UserModel } from "./user.model";

export interface ReviewModel {
    reviewId: number;
    rating: number;
    reviewText: string;
    moderationStatus: string;
    albumId:number;
    user: UserModel;
}
