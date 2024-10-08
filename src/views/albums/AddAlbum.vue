<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AlbumService } from '@/services/album.service';
import { ArtistService } from '@/services/artist.service';
import type { AlbumModel } from '@/models/album.model';
import type { ArtistModel } from '@/models/artist.model';
import { useRouter } from 'vue-router';

const router = useRouter();

const newAlbum = ref<AlbumModel>({
  albumId: 0,
  albumImage: '',
  albumName: '',
  albumGenre: '',
  artist: {
    artistId: 0,
    artistImage: '0',
    artistName: '',
    artistGenre: '',
    artistBio: ''
  }
});

const artists = ref<ArtistModel[]>([]);

onMounted(async () => {
  try {
    const response = await ArtistService.getAllArtists();
    artists.value = response?.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
  }
});

async function createAlbum() {
  if (newAlbum.value.artist.artistId === 0) {
    console.error('Please select a valid artist');
    return;
  }

  const album = {
    albumImage: newAlbum.value.albumImage,
    albumName: newAlbum.value.albumName,
    albumGenre: newAlbum.value.albumGenre,
    artistId: newAlbum.value.artist.artistId,
  };

  try {
    await AlbumService.createAlbum(album);
    router.push('/albums');
  } catch (error) {
    console.error('Error creating album:', error);
  }
}

</script>

<template>
  <div class="add-album-form">
    <h1 class="h3">Add New Album</h1>
    <RouterLink class="btn btn-primary mb-3 mt-2" to="/albums">
      <i class="fa-regular fa-circle-left"></i> Return To Albums
    </RouterLink>
    <form @submit.prevent="createAlbum">
      <div class="mb-3">
        <label for="albumImage" class="form-label">Album Image:</label>
        <input type="text" id="albumImage" v-model="newAlbum.albumImage" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="albumName" class="form-label">Album Name:</label>
        <input type="text" id="albumName" v-model="newAlbum.albumName" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="albumGenre" class="form-label">Album Genre:</label>
        <input type="text" id="albumGenre" v-model="newAlbum.albumGenre" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="artistId" class="form-label">Artist:</label>
        <select id="artistId" v-model="newAlbum.artist.artistId" class="form-control" required>
          <option disabled value="0">Select an Artist</option>
          <option v-for="artist in artists" :key="artist.artistId" :value="artist.artistId">
            {{ artist.artistName }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-success">
        <i class="fa-solid fa-save"></i> Create Album
      </button>
    </form>
  </div>
</template>

<style scoped>
.add-album-form {
  max-width: auto;
  margin: auto;
}

.add-album-form {
  background-color: #2e01012f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);

}
</style>
