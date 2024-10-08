<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { login } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const username = ref<string>('')
const password = ref<string>('')
const router = useRouter()
async function doLogin() {
    try {


        if (username.value == '') return
        if (password.value == '') return
        const rsp = await login(username.value, password.value)
        AuthService.saveAuth(rsp.data)
        router.push({
            path: '/reviews'
        })
    } catch (e) {
        alert(e)
    }

}

</script>

<template>

    <div class="login-form">
        <h1 class="h3 text-center">Praktikum - Sistemi e-poslovanja <br>Login</h1>
        <form v-on:submit.prevent="doLogin">
            <div class="mb-3">
                <label for="username" class="form-label"> Username</label>
                <input type="text" class="form-control" id="username" autocomplete="on" v-model="username">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" autocomplete="on" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<style scoped>
.login-form {
    max-width: 600px;
    margin: auto;
}

.login-form {
    background-color: #371a025b;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(50, 49, 49, 0.1);
}
</style>
