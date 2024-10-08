import { createRouter, createWebHistory } from 'vue-router'
import AlbumView from '@/views/albums/AlbumView.vue'
import ArtistView from '@/views/artists/ArtistView.vue'
import EditAlbum from '@/views/albums/EditAlbum.vue'
import SongView from '@/views/songs/SongView.vue'
import EditSong from '@/views/songs/EditSong.vue'
import AddNewSong from '@/views/songs/AddNewSong.vue'
import AddAlbum from '@/views/albums/AddAlbum.vue'
import EditArtist from '@/views/artists/EditArtist.vue'
import AddArtist from '@/views/artists/AddArtist.vue'
import LoginView from '@/views/LoginView.vue'
import ReviewView from '@/views/reviews/ReviewView.vue'
import AddReview from '@/views/reviews/AddReview.vue'
import EditReview from '@/views/reviews/EditReview.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/reviews',
      name: 'review',
      component: ReviewView
    },
    {
      path: '/reviews/new',
      name: 'new-review',
      component: AddReview
    },
    {
      path: '/reviews/edit/:id',
      name: 'edit-review',
      component: EditReview
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/albums',
      name: 'albums',
      component: AlbumView
    },
    {
      path: '/albums/:id',
      name: 'edit-albums',
      component: EditAlbum
    },
    {
      path: '/albums/new',
      name: 'new-album',
      component: AddAlbum
    },
    {
      path: '/artists',
      name: 'artists',
      component: ArtistView
    },
    {
      path: '/artists/:id',
      name: 'edit-artists',
      component: EditArtist
    },
    {
      path: '/artists/new',
      name: 'new-artist',
      component: AddArtist
    },
    {
      path: '/songs',
      name: 'songs',
      component: SongView,
  },
  {
    path:'/songs/:id',
    name:'edit-songs',
    component: EditSong
  },
  {
    path: '/songs/add',
    name: 'add-song',
    component: AddNewSong
  }
  ]
})

export default router
