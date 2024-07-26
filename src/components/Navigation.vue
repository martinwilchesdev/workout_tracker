<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="bg-at-light-green text-white">
        <nav
            class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row"
        >
            <div class="flex items-center gap-x-4">
                <img
                    class="w-14"
                    src="@/assets/images/dumbbell-light.png"
                    alt=""
                />
                <h1 class="text-xl">Active Tracker</h1>
            </div>
            <ul class="flex flex-1 gap-x-10 justify-end">
                <RouterLink :to="{ name: 'home' }" class="cursor-pointer">
                    Home
                </RouterLink>
                <!-- <RouterLink :to="{ name: 'create' }" class="cursor-pointer">
                    Create
                </RouterLink>
                <RouterLink :to="{ name: 'login' }" class="cursor-pointer">
                    Login
                </RouterLink> -->
                <li class="cursor-pointer">Logout</li>
            </ul>
        </nav>
    </header>
</template>
