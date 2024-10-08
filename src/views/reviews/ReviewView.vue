<script setup lang="ts">
import type { AlbumModel } from '@/models/album.model';
import type { ReviewModel } from '@/models/review.model';
import { AlbumService } from '@/services/album.service';
import { ReviewService } from '@/services/review.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const albums = ref<AlbumModel[]>([]);
const reviews = ref<Record<number, ReviewModel[]>>({});

AlbumService.getAllAlbums().then(rsp => {
  albums.value = rsp?.data;
  albums.value.forEach(album => {
    ReviewService.getReviewsByAlbumId(album.albumId).then(res => {
      reviews.value[album.albumId] = res?.data;
    }).catch(error => {
      console.error(`Error fetching reviews for album ${album.albumId}:`, error);
    });
  });
});

</script>

<template>
    <div v-if="albums.length" class="container mt-4">
      <h1 class="h3 mb-4">Albums</h1>
      <div class="row">
        <div v-for="album in albums" :key="album.albumId" class="col-md-4 mb-4">
          <div class="card album-card">
            <img :src="album.albumImage" alt="Album Image" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ album.albumName }}</h5>
              <p class="card-text">{{ album.albumGenre }}</p>
              <RouterLink :to="{ path: '/reviews/new', query: { albumId: album.albumId } }" class="btn btn-success mb-2">
                <i class="fa-solid fa-plus"></i> Post a Review
              </RouterLink>
              <div class="reviews-section mt-3">
                <h6>Reviews</h6>
                <div v-if="reviews[album.albumId] && reviews[album.albumId].length">
                  <ul class="list-group">
                    <li v-for="review in reviews[album.albumId]" :key="review.reviewId" class="list-group-item d-flex justify-content-between align-items-start">
                      <div>
                        <strong>{{ review.user.username }}</strong>: {{ review.reviewText }} - Rating: {{ review.rating }}/10
                      </div>
                      <RouterLink :to="{ name: 'edit-review', params: { id: review.reviewId } }" class="btn btn-primary btn-sm">
                            <i class="fa-regular fa-pen-to-square"></i> Edit
                        </RouterLink>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>No reviews available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else> Getting all albums... Please wait...</div>
  </template>
  

<style scoped>
.album-card {
  background: #061930;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.album-card img {
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.reviews-section {
  border-top: 1px solid #dee2e6;
  padding-top: 15px;
}
</style>


