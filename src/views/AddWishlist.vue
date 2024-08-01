<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { fetchWrapper } from '@/helpers/fetch.helper';

const baseUrl = `${import.meta.env.VITE_API_URL}/wishlist`;

const authStore = useAuthStore();
const { id } = authStore.user;

const wishlistData = ref({
    user: id,
    name: '',
    description: '',
    category: '',
    isFavourite: false
})

const saveWishlist = async () => {
    await fetchWrapper.post(`${baseUrl}/addWishlist`, wishlistData.value);
}

</script>

<template>
    <div>
        <h3>Add wishlist</h3>
        <router-link to="/" custom v-slot="{ navigate }">
            <button @click="navigate" role="link">Back</button>
        </router-link>
        <form @submit.prevent="saveWishlist">
            <label for="wishlist-title">Title</label>
            <input v-model="wishlistData.name" type="text" id="wishlist-title" name="wishlist-title">
            <label for="wishlist-description">Description</label>
            <textarea v-model="wishlistData.description" type="textarea" id="wishlist-description"
                name="wishlist-description">
            </textarea>
            <label for="wishlist-category">Category</label>
            <input v-model="wishlistData.category" type="text" id="wishlist-category" name="wishlist-category">
            <fieldset class="form-group">
                <label class="paper-switch">
                    <input v-model="wishlistData.isFavourite" id="paperSwitch6" name="paperSwitch6" type="checkbox" />
                    <span class="paper-switch-slider round"></span>
                </label>
                <label for="paperSwitch6" class="paper-switch-label">
                    Favourite
                </label>
            </fieldset>
            <button type="submit">Add</button>
        </form>
        {{ wishlistData }}
    </div>
</template>

<style scoped>
input,
textarea {
    color: white;
}
</style>
