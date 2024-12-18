import { createRouter, createWebHistory } from 'vue-router'
import UserLibrary from "@/views/UserLibraryPages/UserLibrary.vue"
import HomePage from '@/views/Home/HomePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/UserLibrary',
            name: 'UserLibrary',
            component: UserLibrary
        },
    ],
})

export default router
