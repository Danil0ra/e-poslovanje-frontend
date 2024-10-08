<script setup lang="ts">
import { ref } from 'vue';
import { AlbumService } from '@/services/album.service';
import { SongService } from '@/services/song.service';
import type { AlbumModel } from '@/models/album.model';
import type { SongModel } from '@/models/song.model';

const albums = ref<AlbumModel[]>([]);
const openAlbumId = ref<number | null>(null);
const songs = ref<{ [key: number]: SongModel[] }>({});

AlbumService.getAllAlbums().then(rsp => {
  albums.value = rsp.data;
});

const transformSongsData = (songData: SongModel[]) => {
  const songMap: { [key: number]: SongModel[] } = {};
  songData.forEach(song => {
    const albumId = song.album.albumId;
    if (!songMap[albumId]) {
      songMap[albumId] = [];
    }
    songMap[albumId].push(song);
  });
  return songMap;
};

const toggleSongs = async (albumId: number) => {
  if (openAlbumId.value === albumId) {
    openAlbumId.value = null;
  } else {
    openAlbumId.value = albumId;
    if (!songs.value[albumId]) {
      const response = await SongService.getAllSongs(albumId);
      songs.value = transformSongsData(response.data);
    }
  }
};
</script>

<template>
  <div v-if="albums.length">
    <h1 class="h3 mb-3">Songs</h1>
    <div v-for="album in albums" :key="album.albumId">
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center mb-2" :id="'heading' + album.albumId">
          <h5 class="mb-0">
            <button class="btn btn" type="button" @click="toggleSongs(album.albumId)"
              :aria-expanded="openAlbumId === album.albumId ? 'true' : 'false'"
              :aria-controls="'collapse' + album.albumId">
              <img :src="album.albumImage" alt="album image" style="max-width: 100px;">
              {{ album.albumName }}
            </button>
          </h5>
          <RouterLink :to="`/songs/add?albumId=${album.albumId}`" class="btn btn-primary ">
            <i class="fa-solid fa-plus"></i> Add New Song
          </RouterLink>
        </div>
        <div :id="'collapse' + album.albumId" class="collapse" :class="{ show: openAlbumId === album.albumId }"
          :aria-labelledby="'heading' + album.albumId">
          <div class="card-body">
            <ul v-if="songs[album.albumId] && songs[album.albumId].length">
              <li v-for="song in songs[album.albumId]" :key="song.songId"
                class="d-flex justify-content-between align-items-center mb-2">
                {{ song.name }}
                <RouterLink :to="`/songs/${song.songId}`" class="btn btn-sm btn-primary ms-2">
                  Edit
                </RouterLink>
              </li>
            </ul>
            <div v-else>
              Loading songs...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Getting all albums... Please wait...
  </div>
</template>
