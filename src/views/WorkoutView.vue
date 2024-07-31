<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { supabase } from '@/supabase/supabase'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const toast = useToast()
const route = useRoute()

const data = ref([])
const loading = ref(true)

const currentId = route.params.id

onMounted(async () => {
    try {
        const { data: workout, error } = await supabase
            .from('workouts')
            .select('*')
            .eq('id', currentId)

        if (error) throw error

        data.value = workout
        loading.value = false
    } catch (error) {
        toast.error(`${error.message}`, {
            timeout: 2500,
        })
    }
})
</script>

<template>
    <div>
        <div class="container px-4 mt-10 text-center" v-if="loading">
            <PulseLoader />
        </div>
    </div>
</template>
