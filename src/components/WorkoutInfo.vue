<script setup>
import { supabase } from '@/supabase/supabase'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
    workout: {
        type: Object,
        default: () => {},
    },
})
const emit = defineEmits(['deleteExercise', 'getData'])

const router = useRouter()
const toast = useToast()

const isEdit = ref(false)

const editExercise = () => {
    emit('getData')
    setTimeout(() => (isEdit.value = !isEdit.value), 200)
}

const deleteWorkout = async () => {
    try {
        const { error } = await supabase
            .from('workouts')
            .delete()
            .eq('id', props.workout.id)

        if (error) throw error

        toast.success('Workout deleted successfully', { timeout: 2500 })
        router.push({ name: 'home' })
    } catch (error) {
        toast.error(error.message, { timeout: 2500 })
    }
}

const updateWorkout = async () => {
    try {
        const { error } = await supabase
            .from('workouts')
            .update(props.workout)
            .eq('id', props.workout.id)

        if (error) throw error

        isEdit.value = false
        toast.success('Workout updated successfully', { timeout: 2500 })
    } catch (error) {
        toast.error(error.message)
    }
}

const handleDeleteExercise = async (index) => {
    emit('deleteExercise', index)
}
</script>

<template>
    <!-- General workout info -->
    <div
        class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative"
    >
        <div class="flex absolute left-2 top-2 gap-x-2">
            <div
                class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
                v-if="isEdit === false"
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
                v-if="isEdit === false"
                @click="deleteWorkout"
            >
                <img
                    src="@/assets/images/trash-light.png"
                    class="h-3.5 w-auto"
                    alt=""
                />
            </div>
        </div>
        <div class="flex absolute left-2 top-2 gap-x-2" v-if="isEdit">
            <div
                class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-red-500 text-white"
                @click="editExercise"
            >
                X
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
            <h1 v-else class="text-at-light-green text-2xl text-center">
                {{ props.workout.workout_name }}
            </h1>
        </div>
    </div>

    <!-- Exercises -->
    <div
        class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md"
    >
        <!-- Strength Training -->
        <div
            class="flex flex-col gap-y-4 w-full"
            v-if="props.workout.workout_type === 'strength'"
        >
            <div
                class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                v-for="(item, index) in props.workout.exercises"
                :key="index"
            >
                <div class="flex flex-2 flex-col md:w-1/3">
                    <label
                        for="exercise-name"
                        class="mb-1 text-sm text-at-light-green"
                        >Exercise</label
                    >
                    <input
                        type="text"
                        id="exercise-name"
                        autocomplete="off"
                        class="p-2 w-full text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.exercise"
                    />
                    <p v-else>{{ item.exercise }}</p>
                </div>
                <div class="flex flex-1 flex-col">
                    <label for="sets" class="mb-1 text-sm text-at-light-green"
                        >Sets</label
                    >
                    <input
                        type="text"
                        id="sets"
                        autocomplete="off"
                        class="p-2 w-full text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.sets"
                    />
                    <p v-else>{{ item.sets }}</p>
                </div>
                <div class="flex flex-1 flex-col">
                    <label for="reps" class="mb-1 text-sm text-at-light-green"
                        >Reps</label
                    >
                    <input
                        type="text"
                        id="reps"
                        autocomplete="off"
                        class="p-2 w-full text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.reps"
                    />
                    <p v-else>{{ item.reps }}</p>
                </div>
                <div class="flex flex-1 flex-col">
                    <label for="weight" class="mb-1 text-sm text-at-light-green"
                        >Weight (LB's)</label
                    >
                    <input
                        type="text"
                        id="weight"
                        autocomplete="off"
                        class="p-2 w-full text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.weight"
                    />
                    <p v-else>{{ item.weight }}</p>
                </div>
                <img
                    src="@/assets/images/trash-light-green.png"
                    class="absolute h-4 w-auto -left-5 cursor-pointer"
                    alt=""
                    @click="handleDeleteExercise(index)"
                    v-if="isEdit"
                />
            </div>
            <button
                type="button"
                class="w-full mt-6 py-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
                v-if="isEdit"
                @click="updateWorkout"
            >
                Save
            </button>
        </div>

        <!-- Cardio Training -->
        <div class="flex flex-col gap-y-4 w-full" v-else>
            <div
                class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                v-for="(item, index) in props.workout.exercises"
                :key="index"
            >
                <div class="flex flex-2 flex-col md:w-1/3">
                    <label
                        for="cardio-type"
                        class="mb-1 text-sm text-at-light-green"
                        >Cardio Type</label
                    >
                    <select
                        id="cardio-type"
                        class="p-2 text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.cardioType"
                    >
                        <option value="#">Select Type</option>
                        <option value="run">Run</option>
                        <option value="walk">Walk</option>
                    </select>
                    <p v-else>{{ item.cardioType }}</p>
                </div>
                <div class="flex flex-1 flex-col">
                    <label
                        for="distance"
                        class="mb-1 text-sm text-at-light-green"
                        >Distance</label
                    >
                    <input
                        type="text"
                        id="distance"
                        autocomplete="off"
                        class="p-2 w-full text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.distance"
                    />
                    <p v-else>{{ item.distance }}</p>
                </div>
                <div class="flex flex-1 flex-col">
                    <label
                        for="duration"
                        class="mb-1 text-sm text-at-light-green"
                        >Duration</label
                    >
                    <input
                        type="text"
                        id="duration"
                        autocomplete="off"
                        class="p-2 w-full text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.duration"
                    />
                    <p v-else>{{ item.duration }}</p>
                </div>
                <div class="flex flex-1 flex-col">
                    <label for="pace" class="mb-1 text-sm text-at-light-green"
                        >Pace</label
                    >
                    <input
                        type="text"
                        id="pace"
                        autocomplete="off"
                        class="p-2 w-full text-gray-500 focus:outline-none"
                        v-if="isEdit"
                        v-model="item.pace"
                    />
                    <p v-else>{{ item.pace }}</p>
                </div>
                <img
                    src="@/assets/images/trash-light-green.png"
                    class="absolute h-4 w-auto -left-5 cursor-pointer"
                    alt=""
                    @click="handleDeleteExercise(index)"
                    v-if="isEdit"
                />
            </div>
            <button
                type="button"
                class="w-full mt-6 py-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
                v-if="isEdit"
                @click="updateWorkout"
            >
                Save
            </button>
        </div>
    </div>
</template>
