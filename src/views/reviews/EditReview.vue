<script setup lang="ts">
import type { ReviewModel } from '@/models/review.model';
import { ReviewService } from '@/services/review.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const reviewId = Number.parseInt(route.params.id as string);

const review = ref<ReviewModel | null>(null);
const reviewText = ref('');
const rating = ref(0);

ReviewService.getReviewById(reviewId)
  .then(rsp => {
    if (rsp && rsp.data) {  
      review.value = rsp.data;
      //@ts-ignore
      reviewText.value = review.value.reviewText;
      //@ts-ignore
      rating.value = review.value.rating;
    } else {
      console.error('Error: No review data returned.');
    }
  })
  .catch(error => {
    console.error('Error fetching review by ID:', error);
  });

function updateReview() {
  if (!review.value) {
    console.error('No review data available to update');
    return;
  }

  ReviewService.updateReview(reviewId, {
    ...review.value,
    reviewText: reviewText.value,
    rating: rating.value,
  })
    .then(() => {
      router.push({
        path: '/reviews'
      });
    })
    .catch(error => {
      console.error('Error updating review:', error);
    });
}

function deleteReview() {
  if (!review.value) {
    console.error('No review data available to delete');
    return;
  }

  ReviewService.deleteReview(reviewId)
    .then(() => {
      router.push({
        path: '/reviews'
      });
    })
    .catch(error => {
      console.error('Error deleting review:', error);
    });
}
</script>

<template>
  <div class="edit-review-form">
    <h1 class="h3">Edit Review</h1>
    <RouterLink class="btn btn-primary mb-3 mt-2" to="/reviews">
      <i class="fa-regular fa-circle-left"></i> Return To Reviews
    </RouterLink>
    <div v-if="review" class="form-container">
      <div class="mb-3">
        <label for="reviewText" class="form-label">Review Text</label>
        <textarea id="reviewText" class="form-control" v-model="reviewText" required rows="4"></textarea>
      </div>
      <div class="mb-3">
        <label for="rating" class="form-label">Rating (1-10)</label>
        <input type="number" id="rating" class="form-control" v-model.number="rating" min="1" max="10" required>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <button type="button" class="btn btn-success" @click="updateReview">
          <i class="fa-solid fa-save"></i> Save Changes
        </button>
        <button type="button" class="btn btn-danger" @click="deleteReview">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-review-form {
  background-color: #371a025b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);
  max-width: 600px;
  margin: auto;
}

.form-container {
  max-width: 600px;
}
</style>
