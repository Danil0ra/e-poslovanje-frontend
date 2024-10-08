import type { ReviewModel } from "@/models/review.model";
import { useAxios } from "./main.service";

export class ReviewService {
    static async getAllReviews() {
      return await useAxios('/reviews');
    }

    static async getReviewById(id: number) {
      return await useAxios(`/reviews/${id}`);
    }
    
    static async getReviewsByAlbumId(albumId: number) {
        return await useAxios(`/reviews?albumId=${albumId}`);
    }
  
    static async createReview(data: ReviewModel) {
      return await useAxios('/reviews', 'post', data);
    }
  
    static async updateReview(id: number, data: ReviewModel) {
      return await useAxios(`/reviews/${id}`, 'put', data);
    }

    static async deleteReview(id: number) {
      return await useAxios(`/reviews/${id}`, 'delete');
    }
  }
  