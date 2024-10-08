<script setup lang="ts">
import type { ArtistModel } from '@/models/artist.model';
import { ArtistService } from '@/services/artist.service';
import { ref } from 'vue';

const artists = ref<ArtistModel[]>();
    ArtistService.getAllArtists()
  .then(rsp => {
    if (rsp && rsp.data) {
      artists.value = rsp.data;
    } else {
      console.error('Error: No data returned from the server.');
    }
  })
  .catch(error => {
    console.error('Error fetching artists:', error);
  });

const expandedBio = ref<number | null>(null);

function toggleBio(id: number) {
    expandedBio.value = expandedBio.value === id ? null : id;
}

async function deleteArtist(model: ArtistModel) {
    await ArtistService.deleteArtist(model.artistId);
    artists.value = artists.value?.filter(ar => ar.artistId !== model.artistId);
}
</script>

<template>
    <div v-if="artists">
        <h1 class="h3">Artists</h1>
        <RouterLink class="btn btn-success mb-3 mt-2" to="/artists/new">
            <i class="fa-solid fa-plus"></i> Add New Artist
        </RouterLink>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Artist Image</th>
                    <th scope="col">Artist Name</th>
                    <th scope="col">Artist Genre</th>
                    <th scope="col">Artist Biography</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ar in artists" :key="ar.artistId">
                    <th scope="row">{{ ar.artistId }}</th>
                    <td>
                        <img :src="ar.artistImage" alt="artist image" class="img-fluid rounded"
                            style="max-width: 70px;">
                    </td>
                    <td>{{ ar.artistName }}</td>
                    <td>{{ ar.artistGenre }}</td>
                    <td>
                        <div v-if="expandedBio !== ar.artistId">
                            {{ ar.artistBio.length > 100 ? ar.artistBio.slice(0, 100) + '...' : ar.artistBio }}
                            <a v-if="ar.artistBio.length > 100" href="#" @click.prevent="toggleBio(ar.artistId)">Read
                                more</a>
                        </div>
                        <div v-else>
                            {{ ar.artistBio }}
                            <a href="#" @click.prevent="toggleBio(ar.artistId)">Show less</a>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex gap-2">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/artists/${ar.artistId}`">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="deleteArtist(ar)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else> Getting all artists... Please wait...</div>
</template>
