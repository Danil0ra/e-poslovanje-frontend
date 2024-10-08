<script setup lang="ts">
import type { AlbumModel } from '@/models/album.model';
import { AlbumService } from '@/services/album.service';
import { ref } from 'vue';

const albums = ref<AlbumModel[]>();
    AlbumService.getAllAlbums()
  .then(rsp => {
    if (rsp && rsp.data) {
      albums.value = rsp.data;
    } else {
      console.error('Error: No data returned from the server.');
    }
  })
  .catch(error => {
    console.error('Error fetching albums:', error);
  });


async function removeAlbum(model: AlbumModel) {
    await AlbumService.deleteAlbum(model.albumId);
    albums.value = albums.value?.filter(a => a.albumId !== model.albumId);
}

</script>

<template>
    <div v-if="albums">
        <h1 class="h3">Albums</h1>
        <RouterLink class="btn btn-success mb-3 mt-2" to="/albums/new">
            <i class="fa-solid fa-plus"></i> Add New Album
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Album Image</th>
                    <th scope="col">Album Name </th>
                    <th scope="col">Album Genre</th>
                    <th scope="col">Artist Name</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="a in albums ">
                    <th scope="row">{{ a.albumId }}</th>
                    <td>
                        <img :src="a.albumImage" alt="" style="max-width: 50px;">
                    </td>
                    <td>{{ a.albumName }}</td>
                    <td>{{ a.albumGenre }}</td>
                    <td>{{ a.artist.artistName }}</td>
                    <td>
                        <RouterLink class="btn btn-sm btn-primary me-2" :to="`/albums/${a.albumId}`">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger" @click="removeAlbum(a)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
    <div v-else> Getting all albums... Please wait...</div>
</template>
