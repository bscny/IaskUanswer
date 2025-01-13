<template>
    <NavBar />

    <SideBar />

    <div class="body">
        <QuizGrid v-if="quizzes != null" :quizzes="quizzes" @gridClick="tryQuiz($event)"/>
    </div>
    <GridToTakeQuizPopup v-if="showSubmitPopup" @submitOption="handleSubmit($event)" />

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/Home/SideBar.vue';
import QuizGrid from '@/components/Home/QuizGrid.vue';

import {
    GetRandQuiz
} from "@/service/LibraryApi/QuizAPI";
import GridToTakeQuizPopup from '@/components/Home/GridToTakeQuizPopup.vue';

export default {
    components: {
        NavBar, SideBar, QuizGrid, GridToTakeQuizPopup
    },

    data() {
        return {
            quizzes: [],
            showSubmitPopup: false,
            tringQuizID: -1
        };
    },

    async beforeCreate() {
        const response = await GetRandQuiz(9);
        console.log(response.quizzes)
        this.quizzes = response.quizzes;
    },

    methods: {
        tryQuiz(id){
            console.log("try")
            if(localStorage.getItem("userdata") === undefined){
                this.$router.push("/Login");
                return;
            }

            this.tringQuizID = id;
            this.showSubmitPopup = true;
        },
        handleSubmit(doSubmit) {
            if (doSubmit) {
                const userID = JSON.parse(localStorage.getItem("userdata")).user.UserId;

                this.$router.push({
                    name: "TakeQuiz",
                    query: {
                        lastPathName: this.$route.name,
                        userID: userID,
                        quizID: this.tringQuizID
                    }
                });
            }

            this.showSubmitPopup = false;

        }
    }
}
</script>

<style scoped>
.body {
    margin-top: 8vh;
    margin-left: 10.2vw;
}

/* Set global background color */
:global(body) {
    background-color: rgb(255, 221, 157);
}
</style>