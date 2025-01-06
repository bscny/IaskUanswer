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
                const question = questions.find(q => q.SO_id === determination.SO_id);
                if (question) {
                    question.isCorrect = determination.Is_correct === 1;
                    question.userAnswer = determination.Choosed_ans; // 使用 Choosed_ans
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
            Record_id: 1,
            Total_points: 10,
            Quiz_Date: "2024-12-18 13:40:53",
            User_id: 1,
            Quiz_id: 1
        };

        const soQuizDetermination = [
            { SO_id: 1, Record_id: 1, Is_correct: 1, Choosed_ans: "Paris" },
            { SO_id: 2, Record_id: 1, Is_correct: 0, Choosed_ans: "3" },
            { SO_id: 3, Record_id: 1, Is_correct: 0, Choosed_ans: "Atlantic Ocean" }
        ];

        const questions = [
            { SO_id: 1, Body: "What is the capital of France?", Answer: "Paris", Points: 5 },
            { SO_id: 2, Body: "What is 2 + 2?", Answer: "4", Points: 3 },
            { SO_id: 3, Body: "What is the largest ocean on Earth?", Answer: "Pacific Ocean", Points: 2 }
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