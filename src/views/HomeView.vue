<script setup>
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router'

const authStore = useAuthStore();


const logout = () => {
  authStore.logout();
}

const { username, id } = authStore.user;
</script>

<template>
  <main>
    <button @click="logout">Log out</button>

    <button @click="router.push('/add-wishlist')">Add wishlist</button>
    <h2>{{ username }}</h2>
    <p>{{ id }}</p>
  </main>
</template>
