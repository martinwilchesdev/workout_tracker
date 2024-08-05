<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import WorkoutCard from '@/components/WorkoutCard.vue'
import { supabase } from '@/supabase/supabase'
import { onMounted, ref } from 'vue'
import store from '@/stores/index'

const data = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        const { data: workouts, error } = await supabase
            .from('workouts')
            .select('*')

        if (error) throw error

        data.value = workouts
        loading.value = false
    } catch (error) {
        console.warn(error)
    }
})
</script>

<template>
    <div>
        <div class="container px-4 mt-10 text-center" v-if="loading">
            <PulseLoader />
        </div>
        <div class="container mt-10 px-4" v-else>
            <div
                v-if="data.length === 0"
                class="w-full flex flex-col items-center justify-center mt-5 sm:text-2xl"
            >
                <h1>Looks empty here...</h1>
                <RouterLink
                    class="mt-3 p-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
                    :to="{ name: 'create' }"
                    v-if="store.state.user"
                    >Create Workout</RouterLink
                >
            </div>
            <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
                <WorkoutCard :workouts="data" />
            </div>
        </div>
    </div>
</template>
