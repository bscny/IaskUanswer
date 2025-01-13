<template>
    <div class="container">
        <NavBar />
        <TestResult v-if="renderFlag" :questions="questions" :total-score="totalScore" :score="score" :showDetails="showDetails" :QuizDate="Date" @toggle-details="toggleDetails" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TestResult from '@/components/QuizView/TestResult.vue';
import { 
    getAllQuestionsInRecord,
    GetSpecificRecord
 } from '@/service/QuizApi/QuizResultAPI.js';


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
            score: 0,
            showDetails: false,
            Date: '', // 初始化為空字符串

            renderFlag: false,
        };
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        },
        async fetchQuestions(recordId) {
            try {
                this.questions = await getAllQuestionsInRecord(recordId);
                this.score = this.questions.reduce((total, question) => total + (question.Is_correct ? question.Points : 0), 0);
                this.totalScore = this.questions.reduce((total, question) => total + question.Points , 0)
                this.renderFlag = true;
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        },
        async fetchRecordDate(recordId) {
            try {
                const record = await GetSpecificRecord(recordId);
                this.Date = record.Quiz_Date;
            } catch (error) {
                console.error("Failed to fetch record:", error);
            }
        }
    },
    async created() {
        const recordId = this.$route.query.recordId;
        await this.fetchQuestions(recordId);
        await this.fetchRecordDate(recordId); // 確保在創建時獲取 Quiz_Date
    }
}
</script>

<style scoped>

.result-page {
    margin: 20px;
}

.completion-time {
    margin-left: 20px;
    font-size: 16px;
    color: gray;
}

.question {
    margin-bottom: 1px;
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}
</style>