<template>
    <div>
        <NavBar />
        <TestResult :questions="questions" :totalScore="totalScore" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TestResult from '@/components/QuizView/TestResult.vue';
//import { getQuizResults } from '@/service/LibraryApi/ResultAPI.js';

export default {
    name: "ResultPage",
    components: {
        NavBar,
        TestResult
    },
    data() {
        return {
            questions: [],
            totalScore: 0
        };
    },
    async created() {
        try {
            const quizId = this.$route.params.quizId;
            const results = await getQuizResults(quizId);
            this.questions = results.questions;
            this.totalScore = results.totalScore;
        } catch (error) {
            console.error("Failed to fetch quiz results:", error);
        }
    }
}
</script>

<style scoped>
.result-page {
    margin: 20px;
}

.score {
    margin-bottom: 20px;
}

.question {
    margin-bottom: 20px;
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}
</style>