<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import WorkoutInfo from '@/components/WorkoutInfo.vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/supabase/supabase'
import { useToast } from 'vue-toastification'
import { onMounted, ref } from 'vue'

const toast = useToast()
const route = useRoute()
const router = useRouter()

const data = ref([])
const loading = ref(true)

const currentId = route.params.id

const deleteExercise = (index) => {
    if (data.value.exercises.lenght > 1) {
        data.value.exercises.splice(index, 1)
    } else {
        toast.warning('Exercise cannot be deleted', { timeout: 2500 })
    }
}

const getData = async () => {
    try {
        const { data: workout, error } = await supabase
            .from('workouts')
            .select('*')
            .eq('id', currentId)
            .single()

        if (error) throw error

        data.value = workout
        loading.value = false
    } catch (error) {
        if (error.code === 'PGRST116') return router.push({ name: 'not-found' })
        toast.error(`${error.message}`, { timeout: 2500 })
    }
}

onMounted(() => {
    getData()
})
</script>

<template>
    <div>
        <div class="container px-4 mt-10 text-center" v-if="loading">
            <PulseLoader />
        </div>
        <div v-else class="max-w-screen-sm mx-auto px-4 py-10">
            <WorkoutInfo
                :workout="data"
                @deleteExercise="deleteExercise"
                @getData="getData"
            />
        </div>
    </div>
</template>
