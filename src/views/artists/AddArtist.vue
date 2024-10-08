<script setup lang="ts">
import { ref } from 'vue';
import { ArtistService } from '@/services/artist.service';
import { useRouter } from 'vue-router';
import type { ArtistModel } from '@/models/artist.model';

const newArtist = ref<ArtistModel>({
    artistId: 0,
    artistImage: '',
    artistName: '',
    artistGenre: '',
    artistBio: ''
});

const router = useRouter();

async function createArtist() {
    try {
        await ArtistService.createArtist(newArtist.value);
        router.push('/artists');
    } catch (error) {
        console.error('Error creating artist:', error);
    }
}
</script>

<template>
    <div class="container mt-5">
        <h1 class="h3">Add New Artist</h1>
        <RouterLink class="btn btn-primary mb-3 mt-2" to="/artists">
            <i class="fa-regular fa-circle-left"></i> Return To Artists
        </RouterLink>
        <form @submit.prevent="createArtist" class="form-container">
            <div class="form-group mb-3">
                <label for="artistImage" class="form-label">Artist Image URL:</label>
                <input type="text" v-model="newArtist.artistImage" id="artistImage" class="form-control" required />
            </div>
            <div class="form-group mb-3">
                <label for="artistName" class="form-label">Artist Name:</label>
                <input type="text" v-model="newArtist.artistName" id="artistName" class="form-control" required />
            </div>
            <div class="form-group mb-3">
                <label for="artistGenre" class="form-label">Artist Genre:</label>
                <input type="text" v-model="newArtist.artistGenre" id="artistGenre" class="form-control" required />
            </div>
            <div class="form-group mb-3">
                <label for="artistBio" class="form-label">Artist Biography:</label>
                <textarea v-model="newArtist.artistBio" id="artistBio" class="form-control" rows="4"
                    required></textarea>
            </div>
            <button type="submit" class="btn btn-success">
                <i class="fa-solid fa-save"></i> Create Artist
            </button>
        </form>
    </div>
</template>

<style scoped>
.container {
    max-width: auto;
    margin: auto;
}

.form-container {
    background-color: #2e01012f;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);

}
</style>
