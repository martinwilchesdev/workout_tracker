<script setup>
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
import { uid } from 'uid'

const toast = useToast()

const exercises = ref([])
const workoutName = ref('')
const workoutType = ref('select-workout')

const onAddExercise = () => {
    if (workoutType.value === 'strength') {
        exercises.value.push({
            id: uid(),
            exercise: '',
            sets: '',
            reps: '',
            weight: '',
        })

        return
    }

    exercises.value.push({
        id: uid(),
        cardioType: '',
        distance: '',
        duration: '',
        pace: '',
    })
}

const onDeleteExercise = (id) => {
    if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter((exercise) => exercise.id !== id)
        return
    }

    toast.warning('Exercise cannot be deleted', { timeout: 2500 })
}

const onChangeWorkout = () => {
    exercises.value = []
    onAddExercise()
}
</script>

<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
            <form @submit.prevent="" class="flex flex-col gap-y-5 w-full">
                <h1 class="text-2xl text-at-light-green">Record Workout</h1>
                <!-- Workout name -->
                <div class="flex flex-col">
                    <label
                        for="workout-name"
                        class="mb-1 text-sm text-at-light-green"
                        >Workout Name</label
                    >
                    <input
                        type="text"
                        class="p-2 text-gray-500 focus:outline-none"
                        id="workout-name"
                        v-model.trim="workoutName"
                        required
                    />
                </div>
                <!-- Workout type -->
                <div class="flex flex-col">
                    <label
                        for="workout-type"
                        class="mb-1 text-sm text-at-light-green"
                        >Workout Type</label
                    >
                    <select
                        id="workout-type"
                        class="p-2 text-gray-500 focus:outline-none"
                        v-model="workoutType"
                        @change="onChangeWorkout"
                        required
                    >
                        <option value="select-workout">Select Workout</option>
                        <option value="strength">Strength Training</option>
                        <option value="cardio">Cardio</option>
                    </select>
                </div>
                <!-- Strenth Training inputs -->
                <div
                    v-if="workoutType === 'strength'"
                    class="flex flex-col gap-y-4"
                >
                    <div
                        class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
                        v-for="(item, index) in exercises"
                        :key="index"
                    >
                        <div class="flex flex-col md:w-1/3">
                            <label
                                for="exercise-name"
                                class="mb-1 text-sm text-at-light-green"
                                >Exercise</label
                            >
                            <input
                                type="text"
                                id="exercise-name"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.exercise"
                                required
                            />
                        </div>

                        <div class="flex flex-col flex-1">
                            <label
                                for="sets"
                                class="mb-1 text-sm text-at-light-green"
                                >Sets</label
                            >
                            <input
                                type="text"
                                id="sets"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.set"
                                required
                            />
                        </div>

                        <div class="flex flex-col flex-1">
                            <label
                                for="sets"
                                class="mb-1 text-sm text-at-light-green"
                                >Reps</label
                            >
                            <input
                                type="text"
                                id="reps"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.reps"
                                required
                            />
                        </div>

                        <div class="flex flex-col flex-1">
                            <label
                                for="weight"
                                class="mb-1 text-sm text-at-light-green"
                                >Weight (LB's)</label
                            >
                            <input
                                type="text"
                                id="weight"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.weight"
                                required
                            />
                        </div>
                        <img
                            src="@/assets/images/trash-light-green.png"
                            class="h-4 w-auto absolute -left-5 cursor-pointer"
                            alt="Delete"
                            @click="onDeleteExercise(item.id)"
                        />
                    </div>
                    <button
                        type="button"
                        class="py-1 px-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
                        @click="onAddExercise"
                    >
                        Add Exercise
                    </button>
                </div>
                <!-- Cardio Exercises -->
                <div
                    v-if="workoutType === 'cardio'"
                    class="flex flex-col gap-y-4"
                >
                    <div
                        class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
                        v-for="(item, index) in exercises"
                        :key="index"
                    >
                        <div class="flex flex-col md:w-1/3">
                            <label
                                for="cardio-type"
                                class="mb-1 text-sm text-at-light-green"
                                >Exercise</label
                            >
                            <select
                                id="cadio-type"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.cardioType"
                            >
                                <option value="#">Select Type</option>
                                <option value="run">Run</option>
                                <option value="walk">Walk</option>
                            </select>
                        </div>

                        <div class="flex flex-col flex-1">
                            <label
                                for="sets"
                                class="mb-1 text-sm text-at-light-green"
                                >Distance</label
                            >
                            <input
                                type="text"
                                id="distance"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.distance"
                                required
                            />
                        </div>

                        <div class="flex flex-col flex-1">
                            <label
                                for="sets"
                                class="mb-1 text-sm text-at-light-green"
                                >Duration</label
                            >
                            <input
                                type="text"
                                id="duration"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.duration"
                                required
                            />
                        </div>

                        <div class="flex flex-col flex-1">
                            <label
                                for="pace"
                                class="mb-1 text-sm text-at-light-green"
                                >Pace</label
                            >
                            <input
                                type="text"
                                id="pace"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.pace"
                                required
                            />
                        </div>
                        <img
                            src="@/assets/images/trash-light-green.png"
                            class="h-4 w-auto absolute -left-5 cursor-pointer"
                            alt="Delete"
                            @click="onDeleteExercise(item.id)"
                        />
                    </div>
                    <button
                        type="button"
                        class="py-1 px-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
                        @click="onAddExercise"
                    >
                        Add Exercise
                    </button>
                </div>
                <button
                    type="submit"
                    class="py-1 px-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
                >
                    Record Workout
                </button>
            </form>
        </div>
    </div>
</template>
