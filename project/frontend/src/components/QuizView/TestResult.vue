<template>
    <div class="result-page">
        <h1>Quiz Results</h1>
        <div class="score">
            <h2>Total Score: {{ totalScore }}</h2>
        </div>
        <div class="questions">
            <div v-for="(question, index) in questions" :key="index" class="question">
                <h3>Question {{ index + 1 }}: {{ question.text }}</h3>
                <p>Your Answer: <span :class="{ correct: question.isCorrect, incorrect: !question.isCorrect }">{{ question.userAnswer }}</span></p>
                <p>Correct Answer: {{ question.correctAnswer }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TestResult",
    props: {
        questions: {
            type: Array,
            required: true
        },
        totalScore: {
            type: Number,
            required: true
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