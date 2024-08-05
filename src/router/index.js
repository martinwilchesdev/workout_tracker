import store from '@/stores/index'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CreateView from '@/views/CreateView.vue'
import WorkoutView from '@/views/WorkoutView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import { createRouter, createWebHistory } from 'vue-router'

import { supabase } from '@/supabase/supabase'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home',
                auth: false,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                title: 'Login',
                auth: false,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: {
                title: 'Register',
                auth: false,
            },
        },
        {
            path: '/create',
            name: 'create',
            component: CreateView,
            meta: {
                title: 'Create',
                auth: true,
            },
        },
        {
            path: '/:id',
            name: 'workout-view',
            component: WorkoutView,
            meta: {
                title: 'Workout View',
                auth: true,
            },
        },
        {
            path: '/:catchAll(.*)*',
            name: 'not-found',
            component: NotFoundView,
            meta: {
                title: 'Not Found',
                auth: true
            }
        },
    ],
})

router.beforeEach((to, from) => {
    document.title = `${to.meta.title} | Workout Tracker`
})

router.beforeEach(async (to, from) => {
    const user = await supabase.auth.getUser()

    if (to.matched.some((res) => res.meta.auth)) {
        if (user.data.user) {
            return
        }

        return { name: 'login' }
    }

    return
})

export default router
