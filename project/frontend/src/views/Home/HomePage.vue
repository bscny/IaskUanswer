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
    GetRandQuizes,
} from "@/service/AccountApi/accountAPI";

export default {
    components: {
        NavBar, SideBar, QuizGrid
    },

    data(){
        return{
            quizzes: null,
        };
    },

    async beforeCreate() {
        this.quizzes = await GetRandQuizes();
    },
}
</script>

<style scoped>
.body {
    margin-top: 8vh;
    margin-left: 10.2vw;
}
</style>