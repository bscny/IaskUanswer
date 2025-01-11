<template>
    <div>
        <NavBar />
        <TestResult :questions="questions" :totalScore="totalScore" :showDetails="showDetails" @toggle-details="toggleDetails" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TestResult from '@/components/QuizView/TestResult.vue';
import { getAllQuestionsInRecord } from '@/service/QuizApi/QuizResultAPI.js';

export default {
    name: "ResultPage",
    components: {
        NavBar,
        TestResult
    },
    data() {
        return {
            questions: [],
            totalScore: 0,
            showDetails: false
        };
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        },
        async fetchQuestions(recordId) {
            try {
                this.questions = await getAllQuestionsInRecord(recordId);
                this.totalScore = this.questions.reduce((total, question) => total + (question.Is_correct ? question.Points : 0), 0);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        }
    },
    async created() {
        const recordId = this.$route.query.recordId;
        await this.fetchQuestions(recordId);
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