import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CreateView from '@/views/CreateView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/create',
            name: 'create',
            component: CreateView
        }
    ],
})

export default router
