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
                <h3>Question {{ question.Q_number }}: {{ question.Body }}</h3>
                <p>Option A: {{ question.OptionA }}</p>
                <p>Option B: {{ question.OptionB }}</p>
                <p>Option C: {{ question.OptionC }}</p>
                <p>Option D: {{ question.OptionD }}</p>
                <p>Get Points: {{ question.Is_correct ? `(${question.Points} / ${question.Points})` : `(0 / ${question.Points})` }}</p>
                <p>Your Answer: 
                    <span :class="{'correct-answer': question.Choosed_ans === question.Answer, 'incorrect-answer': question.Choosed_ans !== question.Answer}">
                        {{ question.Choosed_ans }}
                    </span>
                </p>
                <p v-if="!question.Is_correct">Correct Answer: <span class="correct-answer">{{ question.Answer }}</span></p>
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
}

.question {
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
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