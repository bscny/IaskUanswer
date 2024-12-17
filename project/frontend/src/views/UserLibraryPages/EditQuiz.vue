<template>
    <NavBar />

    <div class="header">
        <QuizEditBlock  :quiz="quizStore.quiz"
                        @Edited="Done()"
                        @Deleted="Done()" />
    </div>
    
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import QuizEditBlock from "@/components/UserLibrary/QuizEditBlock.vue";

import { 
    useQuizStore,
    useQuestionsStore,
} from "@/stores/Userlibrary/QuizQuestionStore.js";

export default {
    name: "EditQuiz",
    components: {
        NavBar,
        QuizEditBlock,
    },

    data() {
        return {
            // pinia store share variables
            quizStore: useQuizStore(),
            questionsStore: useQuestionsStore(),
        };
    },

    methods: {
        Cancel() {
            this.$router.push({
                name: 'UserLibrary'
            });
        },

        Done(){
            // dont need to store the data back to the store because router.push reload the UserLibrary page
            this.$router.push({
                name: 'UserLibrary'
            });
        }
    },

}
</script>

<style scoped>
.header{
    margin: 10vh 5vw 5vh 5vw;
}
</style>