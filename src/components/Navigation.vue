<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { supabase } from '@/supabase/supabase'
import { computed } from 'vue'

import store from '@/stores/index'

const router = useRouter()

const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        router.push({ name: 'login' })
    } catch (error) {
        console.log(error.message)
    }
}

const user = computed(() => store.state.user)
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
                <RouterLink
                    v-if="user"
                    :to="{ name: 'home' }"
                    class="cursor-pointer"
                >
                    Home
                </RouterLink>
                <RouterLink
                    v-if="user"
                    :to="{ name: 'create' }"
                    class="cursor-pointer"
                >
                    Create
                </RouterLink>
                <RouterLink
                    v-if="!user"
                    :to="{ name: 'login' }"
                    class="cursor-pointer"
                >
                    Login
                </RouterLink>
                <li v-if="user" class="cursor-pointer" @click="logout">
                    Logout
                </li>
            </ul>
        </nav>
    </header>
</template>
