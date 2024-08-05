<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    workouts: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <RouterLink
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        v-for="(workout, index) in props.workouts"
        :key="index"
        :to="{
            name: 'workout-view',
            params: { id: workout.id },
        }"
    >
        <!-- Cardio Image -->
        <img
            v-if="workout.workout_type === 'cardio'"
            src="@/assets/images/running-light-green.png"
            class="h-24 w-auto"
            alt=""
        />
        <img
            v-else
            src="@/assets/images/dumbbell-light-green.png"
            class="h-24 w-auto"
            alt=""
        />
        <p
            class="mt-6 py-1 px-3 text-sx text-white bg-at-light-green shadow-md rounded-lg"
        >
            {{ workout.workout_type }}
        </p>
        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
            {{ workout.workout_name }}
        </h1>
    </RouterLink>
</template>
