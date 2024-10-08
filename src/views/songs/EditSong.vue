<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SongService } from '@/services/song.service';
import { AlbumService } from '@/services/album.service';
import type { SongModel } from '@/models/song.model';
import type { AlbumModel } from '@/models/album.model';
import { useRoute, useRouter } from 'vue-router';

const song = ref<SongModel | null>(null);
const albums = ref<AlbumModel[]>([]);
const route = useRoute();
const router = useRouter();

const songId = Number(route.params.id);

onMounted(async () => {
  try {
    const response = await SongService.getSongById(songId);
    if (response && response.data) {
      if (!response.data.album) {
        response.data.album = { albumId: 0 }; 
      }
      song.value = response.data;
    }
    // Fetching albums for dropdown
    const albumDropdown = await AlbumService.getAllAlbums();
    if (albumDropdown && albumDropdown.data) {
      albums.value = albumDropdown.data;
    }
  } catch (error) {
    console.error('Error fetching song or album data:', error);
  }
});

async function updateSong() {
  if (song.value) {
    await SongService.updateSong(songId, song.value);
    router.push('/songs'); 
  }
}

async function deleteSong() {
  await SongService.deleteSong(songId);
  router.push('/songs');
}
</script>

<template>
  <div v-if="song" class="edit-song-form">
    <h1 class="h3">Edit Song</h1>
    <RouterLink class="btn btn-primary mb-3 mt-2" to="/songs">
      <i class="fa-regular fa-circle-left"></i> Return To Songs
    </RouterLink>
    <form @submit.prevent="updateSong">
      <div class="mb-3">
        <label for="songName" class="form-label">Song Name</label>
        <input type="text" id="songName" v-model="song.name" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="albumId" class="form-label">Album</label>
        <select id="albumId" v-model="song.album.albumId" class="form-control" required>
          <option disabled value="0">Select an Album</option>
          <option v-for="album in albums" :key="album.albumId" :value="album.albumId">
            {{ album.albumName }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-success me-3">
        <i class="fa-solid fa-save"></i> Save Changes
      </button>
      <button type="button" class="btn btn-danger" @click="deleteSong">
        <i class="fa-solid fa-trash"></i>
      </button>
    </form>
  </div>
  <div v-else>
    Loading song details...
  </div>
</template>

<style scoped>
.edit-song-form {
  max-width: auto;
  margin: auto;
}
.edit-song-form {
  background-color: #371a025b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);
}
</style>
