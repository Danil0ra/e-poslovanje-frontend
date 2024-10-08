<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthService } from './services/auth.service';
import router from './router';

const roouter = useRouter

function logout (){
  AuthService.clearAuth()
  router.push({
    path:'/login'
  })
}
</script>

<template> 
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/reviews">
          <i class="fa-solid fa-compact-disc"></i> PSEP
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText" v-if="AuthService.hasAuth()">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/reviews">Reviews</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/artists">Artists</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/albums">Albums</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/songs">Songs</RouterLink>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link" @click="logout">Logout</button>
            </li>
          </ul>
          <span class="navbar-text">
            <i class="fa-regular fa-user"></i> {{ AuthService.getUsername() }}
          </span>
        </div>
      </div>
    </nav>
    <RouterView :key="$route.path"/>
  </div>
</template>
