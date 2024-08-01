<script setup>
import { ref } from 'vue'

const props = defineProps({
    workout: {
        type: Object,
        default: () => {},
    },
})

const isEdit = ref(false)

const editExercise = () => {
    isEdit.value = !isEdit.value
}

const deleteExercise = () => {}
</script>

<template>
    <!-- General workout info -->
    <div
        class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative"
    >
        <div class="flex absolute left-2 top-2 gap-x-2">
            <div
                class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
                @click="editExercise"
            >
                <img
                    src="@/assets/images/pencil-light.png"
                    class="h-3.5 w-auto"
                    alt=""
                />
            </div>
            <div
                class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
                @click="editExercise"
            >
                <img
                    src="@/assets/images/trash-light.png"
                    class="h-3.5 w-auto"
                    alt=""
                />
            </div>
        </div>
        <img
            v-if="props.workout.workout_type === 'cardio'"
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

        <span
            class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md"
        >
            {{ props.workout.workout_type }}
        </span>

        <div class="w-full mt-6">
            <input
                v-if="isEdit"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="props.workout.workout_name"
                required
            />
            <h1 v-else class="text-at-light-green text-2xl text-center">{{ props.workout.workout_name }}</h1>
        </div>
    </div>
</template>
