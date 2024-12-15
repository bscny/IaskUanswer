import { createRouter, createWebHistory } from 'vue-router'
import UserLibrary from "@/views/LibraryPage/UserLibrary.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/UserLibrary',
            name: 'UserLibrary',
            component: UserLibrary
        },
    ],
})

export default router
