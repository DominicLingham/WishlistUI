<template>
    <div class="paper container-xs margin-bottom-large">
        <h1>Test Login</h1>
        <div class="column flex-center">
            <form @submit.prevent>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input v-model="username" class="input-block" type="text" id="username" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" class="input-block" type="password" id="password" />
                </div>
                <button @click="handleLogin">Login</button>
            </form>
            <RouterLink to="/register">Register for an account</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store';

const username = ref('')
const password = ref('')

const authStore = useAuthStore();

const handleLogin = () => {
    authStore.login(username.value, password.value);
}

</script>

<style scoped>
h1 {
    color: darkred;
}

label {
    color: darkred;
}

p {
    color: green;
}
</style>
