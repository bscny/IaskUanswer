import { createRouter, createWebHistory } from 'vue-router'
import UserLibrary from "@/views/UserLibraryPages/UserLibrary.vue"
import EditQuiz from '@/views/UserLibraryPages/EditQuiz.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
    ],
})

export default router
