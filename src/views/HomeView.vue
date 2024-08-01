<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { fetchWrapper } from '@/helpers/fetch.helper';
import router from '@/router'

const baseUrl = `${import.meta.env.VITE_API_URL}/wishlist`;

const authStore = useAuthStore();

const wishlists = ref([]);


const logout = () => {
  authStore.logout();
}

const { username, id } = authStore.user;

const getWishlists = async () => {
  const response = await fetchWrapper.get(`${baseUrl}/user/${id}`);
  wishlists.value = response.data;
}

onMounted(() => {
  getWishlists();
})


</script>

<template>
  <main>
    <button @click="logout">Log out</button>

    <button @click="router.push('/add-wishlist')">Add wishlist</button>
    <h2>{{ username }}</h2>
    <p v-for="wishlist in wishlists" :key="wishlist.id">{{ wishlist.name }}</p>
  </main>
</template>
