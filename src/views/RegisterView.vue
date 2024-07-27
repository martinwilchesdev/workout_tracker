<script setup>
import { supabase } from '@/supabase/supabase'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const toast = useToast()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const register = async () => {
    if (password.value === confirmPassword.value) {
        try {
            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
            })

            if (error) throw error

            toast.success('User created successfully', { timeout: 2500 })
            router.push({ name: 'login' })
        } catch (error) {
            console.log(error)
            toast.error(error.message, { timeout: 2500 })
        }
        return
    } else {
        toast.error('Passwords do not match', { timeout: 2500 })
    }
}
</script>

<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <form
            class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
            @submit.prevent="register"
        >
            <h1 class="text-3xl text-at-light-green mb-4 text-center">
                Register
            </h1>
            <!-- Email input -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-at-light-green"
                    >Email</label
                >
                <input
                    type="email"
                    class="p-2 text-gray-500 focus:outline-none"
                    autocomplete="off"
                    id="email"
                    v-model.trim="email"
                    required
                />
            </div>
            <!-- Password input -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-at-light-green"
                    >Password</label
                >
                <input
                    type="password"
                    class="p-2 text-gray-500 focus:outline-none"
                    autocomplete="off"
                    id="password"
                    v-model.trim="password"
                    required
                />
            </div>
            <!-- Password input confirm -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-at-light-green"
                    >Confirm Password</label
                >
                <input
                    type="password"
                    class="p-2 text-gray-500 focus:outline-none"
                    autocomplete="off"
                    id="confirmPassword"
                    v-model.trim="confirmPassword"
                    required
                />
            </div>
            <button
                type="submit"
                class="w-full mt-6 py-2 text-sm bg-at-light-green text-white rounded-sm duration-200 border-solid border-2 border-transparent hover:bg-white hover:text-at-light-green hover:border-at-light-green"
            >
                Register
            </button>
            <span class="text-sm mt-6 text-center"
                >Already have an account?
                <RouterLink class="text-at-light-green" :to="{ name: 'login' }"
                    >Login</RouterLink
                ></span
            >
        </form>
    </div>
</template>
