<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase/supabase'
import { RouterView } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

import store from '@/stores/index'

supabase.auth.onAuthStateChange((event, session) => {
    store.methods.setUser(session)
})
</script>

<template>
    <div class="min-h-full font-Poppins">
        <Navigation />
        <RouterView />
    </div>
</template>
