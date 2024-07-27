<script setup>
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const errorMessage = ref('')
</script>

<template>
    <div class="max-2-screen-sm mx-auto px-4 py-10">
        <form class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
            <h1 class="text-3xl text-at-light-green mb-4 text-center">
                Login
            </h1>
            <!-- Email input -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-at-light-green"
                    >Email</label
                >
                <input
                    type="text"
                    class="p-2 text-gray-500 focus:outline-none"
                    id="email"
                    v-model="email"
                    required
                />
            </div>
            <!-- Password input -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-at-light-green"
                    >Password</label
                >
                <input
                    type="text"
                    class="p-2 text-gray-500 focus:outline-none"
                    id="password"
                    v-model="password"
                    required
                />
            </div>
            <button
                type="submit"
                class="w-full mt-6 py-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
            >
                Login
            </button>
            <span class="text-sm mt-6 text-center"
                >Don't have an account?
                <RouterLink class="text-at-light-green" :to="{ name: 'register' }"
                    >Register</RouterLink
                ></span
            >
        </form>
    </div>
</template>