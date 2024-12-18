import { createRouter, createWebHistory } from 'vue-router'
import UserLibrary from "@/views/UserLibraryPages/UserLibrary.vue"
import HomePage from '@/views/Home/HomePage.vue'
import SignupPage from '@/views/Signup/SignupPage.vue'
import LoginPage from '@/views/Login/LoginPage.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/Signup',
            name: 'Signup',
            component: SignupPage
        },
        {
            path: '/Login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/UserLibrary',
            name: 'UserLibrary',
            component: UserLibrary
        },
    ],
})

export default router
