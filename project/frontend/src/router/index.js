import { createRouter, createWebHistory } from 'vue-router'
import UserLibrary from "@/views/UserLibraryPages/UserLibrary.vue"
import HomePage from '@/views/Home/HomePage.vue'
import SignupPage from '@/views/Signup/SignupPage.vue'
import LoginPage from '@/views/Login/LoginPage.vue'
import EditQuiz from '@/views/UserLibraryPages/EditQuiz.vue'
import TakeQuiz from '@/views/QuizView/TakeQuiz.vue'
import ResultPage from '@/views/QuizView/ResultPage.vue'
import HistoryPage from '@/views/QuizView/HistoryPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
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
        {
            path: '/UserLibrary/EditQuiz',
            name: 'EditQuiz',
            component: EditQuiz
        },

        {
            path: '/TakeQuiz',
            name: 'TakeQuiz',
            component: TakeQuiz
        },
        {
            path: '/QuizView/ResultPage',
            name: 'ResultPage',
            component: ResultPage
        },
        {
            path: '/QuizView/HistoryPage',
            name: 'HistoryPage',
            component: HistoryPage
        }
    ],
})

export default router