<script setup>
import { RouterView } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
</script>

<template>
    <div class="min-h-full font-Poppins">
        <Navigation />
        <RouterView />
    </div>
</template>
