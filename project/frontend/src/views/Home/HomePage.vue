<template>
    <NavBar />

    <SideBar />

    <div class="body">
        <QuizGrid v-if="quizzes != null"    :quizzes="quizzes" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/Home/SideBar.vue';
import QuizGrid from '@/components/Home/QuizGrid.vue';

import {
    GetRandQuiz
} from "@/service/LibraryApi/QuizAPI";

export default {
    components: {
        NavBar, SideBar, QuizGrid
    },

    data(){
        return{
            quizzes: [],
        };
    },

    async beforeCreate() {
        const response = await GetRandQuiz(9);
        this.quizzes = response.quizzes;
    },
}
</script>

<style scoped>
.body {
    margin-top: 8vh;
    margin-left: 10.2vw;
}
</style>