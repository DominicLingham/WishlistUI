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
                <button @click="logPassword">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')

const logPassword = () => {
    const userPassword = password.value
    const userUsername = username.value

    console.log(`username: ${userUsername}, password: ${userPassword}`)
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
