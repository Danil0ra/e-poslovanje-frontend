<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SongService } from '@/services/song.service';
import { AlbumService } from '@/services/album.service';
import type { AlbumModel } from '@/models/album.model';
import { useRouter } from 'vue-router';

const router = useRouter();

const songs = ref({
  name: '',
  albumId: 0,
});

const albums = ref<AlbumModel[]>([]);

onMounted(async () => {
  try {
    // Fetch all albums for the dropdown
    const albumResponse = await AlbumService.getAllAlbums();
    albums.value = albumResponse?.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
});

async function addSong() {
  try {
    if (songs.value.albumId === 0) {
      console.error('Please select a valid album');
      return;
    }
    //@ts-ignore
    await SongService.createSong(songs.value);
    router.push('/songs');
  } catch (error) {
    console.error('Error adding song:', error);
  }
}
</script>

<template>
  <div class="add-song-form">
    <h1 class="h3">Add New Song</h1>
    <RouterLink class="btn btn-primary mb-3 mt-2" to="/songs">
        <i class="fa-regular fa-circle-left"></i> Return To Songs
    </RouterLink>
    <form @submit.prevent="addSong">
      <div class="mb-3">
        <label for="songName" class="form-label">Song Name</label>
        <input type="text" id="songName" v-model="songs.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="albumId" class="form-label">Album</label>
        <select id="albumId" v-model="songs.albumId" class="form-control" required>
          <option disabled value="0">Select an Album</option>
          <option v-for="album in albums" :key="album.albumId" :value="album.albumId">
            {{ album.albumName }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-success">
        <i class="fa-solid fa-save"></i> Add Song
      </button>
    </form>
  </div>
</template>

<style scoped>
.add-song-form {
  max-width: auto;
  margin: auto;
}
.add-song-form {
  background-color: #2e01012f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);
}
</style>
