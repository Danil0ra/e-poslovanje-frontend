<script setup lang="ts">
import type { ReviewModel } from '@/models/review.model';
import type { AlbumModel } from '@/models/album.model';
import { ReviewService } from '@/services/review.service';
import { AlbumService } from '@/services/album.service';
import { AuthService } from '@/services/auth.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const albumId = new URLSearchParams(window.location.search).get('albumId');
const reviewText = ref('');
const rating = ref(0);

const username = AuthService.getUsername();

async function submitReview() {
  if (!albumId) return;

  try {
    await ReviewService.createReview({
        albumId: parseInt(albumId),
        reviewText: reviewText.value,
        rating: rating.value,
        user: { username },
        reviewId: 0,
        moderationStatus: ''
    });
    router.push('/reviews');
  } catch (error) {
    console.error('Error submitting review:', error);
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1 class="h3">Add Review</h1>
    <RouterLink class="btn btn-primary mb-3 mt-2" to="/reviews">
      <i class="fa-regular fa-circle-left"></i> Return To Reviews
    </RouterLink>
    <p class="text-muted">Logged in as: <strong>{{ username }}</strong></p>
    <form @submit.prevent="submitReview">
      <div class="mb-3">
        <label for="reviewText" class="form-label">Review Text</label>
        <textarea id="reviewText" class="form-control" v-model="reviewText" required rows="4"></textarea>
      </div>
      <div class="mb-3">
        <label for="rating" class="form-label">Rating (1-10)</label>
        <input type="number" id="rating" class="form-control" v-model.number="rating" min="1" max="10" required>
      </div>
      <button type="submit" class="btn btn-success">Submit Review</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: auto;
  margin: auto;
}

.container {
  background-color: #2e01012f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);
}

.text-muted {
  margin-bottom: 20px;
}
</style>
