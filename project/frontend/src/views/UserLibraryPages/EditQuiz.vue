<template>
    <NavBar />
    
    <button @click="Cancel()">
        back
    </button>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

import { 
    useQuizStore,
    useQuestionsStore,
} from "@/stores/Userlibrary/QuizQuestionStore.js";

export default {
    name: "EditQuiz",
    components: {
        NavBar,
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
        }
    },

}
</script>

<style scoped>

</style>