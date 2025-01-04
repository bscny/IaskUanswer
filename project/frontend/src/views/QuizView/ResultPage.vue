<template>
    <div>
        <NavBar />
        <TestResult :questions="questions" :totalScore="totalScore" :showDetails="showDetails" @toggle-details="toggleDetails" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TestResult from '@/components/QuizView/TestResult.vue';

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
        calculateTotalScore(questions, soQuizDetermination) {
            let totalScore = 0;
            soQuizDetermination.forEach(determination => {
                const question = questions.find(q => q.so_id === determination.so_id);
                if (question) {
                    question.isCorrect = determination.is_correct === 1;
                    if (question.isCorrect) {
                        totalScore += question.Points; // Add the points of the correct answer
                    }
                }
            });
            return totalScore;
        }
    },
    created() {
        // Fake data for demonstration
        const quizRecord = {
            record_id: 1,
            total_points: 10,
            quiz_date: "2024-12-18 13:40:53",
            user_id: 1,
            quiz_id: 1
        };

        const soQuizDetermination = [
            { so_id: 1, record_id: 1, is_correct: 1 },
            { so_id: 2, record_id: 1, is_correct: 0 },
            { so_id: 3, record_id: 1, is_correct: 0 }
        ];

        const questions = [
            { so_id: 1, Body: "What is the capital of France?", Answer: "Paris", userAnswer: "Paris", Points: 5 },
            { so_id: 2, Body: "What is 2 + 2?", Answer: "4", userAnswer: "3", Points: 3 },
            { so_id: 3, Body: "What is the largest ocean on Earth?", Answer: "Pacific Ocean", userAnswer: "Atlantic Ocean", Points: 2 }
        ];

        // Calculate total score based on fake data
        this.totalScore = this.calculateTotalScore(questions, soQuizDetermination);
        this.questions = questions;
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