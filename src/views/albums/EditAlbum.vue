<script setup lang="ts">
import type { AlbumModel } from '@/models/album.model';
import { AlbumService } from '@/services/album.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);

const albums = ref<AlbumModel | null>(null);

AlbumService.getAlbumById(id)
  .then(rsp => {
    if (rsp && rsp.data) {  
      albums.value = rsp.data;
    } else {
      console.error('Error: No album data returned.');
    }
  })
  .catch(error => {
    console.error('Error fetching album by ID:', error);
  });


function updateAlbum() {
    if (!albums.value) {
        console.error('No album data available to update');
        return;
    }


    AlbumService.updateAlbum(id, albums.value)
        .then(rsp => {
            router.push({
                path: '/albums'
            });
        })
        .catch(error => {
            console.error('Error updating album:', error);
        });
}
</script>


<template>
    <h1 class="h3">Edit Album</h1>
    <RouterLink class="btn btn-primary mb-3 mt-2" to="/albums">
        <i class="fa-regular fa-circle-left"></i> Return To Albums
    </RouterLink>
    <div v-if="albums" class="edit-album-form">
        <div class="mb-3">
            <label for="id" class="form-label">ID:</label>
            <input type="number" class="form-control" id="id" v-model="albums.albumId" disabled>
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Album Image:</label>
            <input type="text" class="form-control" id="image" v-model="albums.albumImage">
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Album Name:</label>
            <input type="text" class="form-control" id="name" v-model="albums.albumName">
        </div>
        <div class="mb-3">
            <label for="genre" class="form-label">Album Genre:</label>
            <input type="text" class="form-control" id="genre" v-model="albums.albumGenre">
        </div>
        <div class="mb-3">
            <label for="artist" class="form-label">Artist:</label>
            <input type="text" class="form-control" id="artist" v-model="albums.artist.artistName" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateAlbum">
            <i class="fa-solid fa-save"></i> Save Changes
        </button>
    </div>
</template>

<style scoped>
.edit-album-form {
    max-width: auto;
    margin: auto;
}

.edit-album-form {
    background-color: #371a025b;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);

}
</style>