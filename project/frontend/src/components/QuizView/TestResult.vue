<template>
    <div class="result-page">
        <div class="score">
            <h1>Total Score: {{ totalScore }}</h1>
        </div>
        <div class="button-container">
            <button class="back-button" @click="goToUserLibrary">Back to User Library</button>
            <button class="history-button" @click="goToHistoryPage">Back to History Page</button>
            <button class="show-wrong-button" @click="toggleShowWrongOnly">{{ showWrongOnly ? 'Show All' : 'Show Wrong Only' }}</button>
        </div>
        <div class="questions">
            <div v-for="(question, index) in filteredQuestions" :key="index" class="question">
                <p>Get Points: {{ question.Is_correct ? `(${question.Points} / ${question.Points})` : `(0 / ${question.Points})` }}</p>
                <h3>Question {{ question.Q_number }}: {{ question.Body }}</h3>
                <p :class="{'correct-answer': question.Answer === question.OptionA, 'incorrect-answer': question.Choosed_ans === question.OptionA && !question.Is_correct}">A: {{ question.OptionA }}</p>
                <p :class="{'correct-answer': question.Answer === question.OptionB, 'incorrect-answer': question.Choosed_ans === question.OptionB && !question.Is_correct}">B: {{ question.OptionB }}</p>
                <p :class="{'correct-answer': question.Answer === question.OptionC, 'incorrect-answer': question.Choosed_ans === question.OptionC && !question.Is_correct}">C: {{ question.OptionC }}</p>
                <p :class="{'correct-answer': question.Answer === question.OptionD, 'incorrect-answer': question.Choosed_ans === question.OptionD && !question.Is_correct}">D: {{ question.OptionD }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TestResult",
    props: {
        totalScore: {
            type: Number,
            required: true
        },
        questions: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showWrongOnly: false
        };
    },
    computed: {
        filteredQuestions() {
            if (this.showWrongOnly) {
                return this.questions.filter(question => !question.Is_correct);
            }
            return this.questions;
        }
    },
    methods: {
        goToUserLibrary() {
            this.$router.push({ name: 'UserLibrary' });
        },
        goToHistoryPage() {
            this.$router.push({ name: 'HistoryPage' });
        },
        toggleShowWrongOnly() {
            this.showWrongOnly = !this.showWrongOnly;
        }
    }
}
</script>

<style scoped>
.result-page {
    margin: 20px;
    text-align: center;
    position: relative;
}

.score {
    margin: 40px 0;
    margin-top: 100px;
    left: 50%;
    font-size: 25px;
}

.question {
    margin-bottom: 20px;
    text-align: center;
    font-size: 25px;
}

.correct-answer {
    color: green;
}

.incorrect-answer {
    color: red;
}

.user-answer {
    color: blue;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    min-width: 150px;
    margin-bottom: 55px;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}

.back-button {
    background-color: #dc3545;
}

.history-button {
    background-color: #ffc107;
}

.history-button:hover {
    background-color: #e0a800;
}

.show-wrong-button {
    background-color: #ff9800;
}

.show-wrong-button:hover {
    background-color: #e68900;
}
</style>