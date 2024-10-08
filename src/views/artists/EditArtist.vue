<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArtistService } from '@/services/artist.service';
import { useRoute, useRouter } from 'vue-router';
import type { ArtistModel } from '@/models/artist.model';

const route = useRoute();
const router = useRouter();

const artist = ref<ArtistModel | null>(null);
const artistId = Number(route.params.id);

onMounted(async () => {
  try {
    const response = await ArtistService.getArtistById(artistId);
    artist.value = response?.data;
  } catch (error) {
    console.error('Error fetching artist:', error);
  }
});

async function updateArtist() {
  if (artist.value) {
    await ArtistService.updateArtist(artistId, artist.value);
    router.push('/artists');
  }
}

</script>

<template>
  <div class="container mt-5" v-if="artist">
    <h1 class="h3">Edit Artist</h1>
    <RouterLink class="btn btn-primary mb-3 mt-2" to="/artists">
        <i class="fa-regular fa-circle-left"></i> Return To Artists
    </RouterLink>
    <form @submit.prevent="updateArtist" class="form-container">
      <div class="form-group mb-3">
        <label for="artistImage" class="form-label">Artist Image:</label>
        <input type="text" v-model="artist.artistImage" id="artistImage" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <label for="artistName" class="form-label">Artist Name:</label>
        <input type="text" v-model="artist.artistName" id="artistName" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <label for="artistGenre" class="form-label">Artist Genre:</label>
        <input type="text" v-model="artist.artistGenre" id="artistGenre" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <label for="artistBio" class="form-label">Artist Biography:</label>
        <textarea v-model="artist.artistBio" id="artistBio" class="form-control" rows="4" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">
        <i class="fa-solid fa-save"></i> Save Changes
      </button>
    </form>
  </div>
  <div v-else>
    Loading artist data...
  </div>
</template>

<style scoped>
.container {
  max-width: auto;
  margin: auto;
}
.form-container {
  background-color: #371a025b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);

}
</style>