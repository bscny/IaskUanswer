<template>
    <div class="dashboard">
        <button @click="navigateToPreviousQuestion" :disabled="currentQuestionIndex === 0">Previous</button>
        <button v-for="(question, index) in questions" :key="index" @click="navigateToQuestion(index)" :class="{'current': index === currentQuestionIndex}">
            {{ index + 1 }}
        </button>
        <button @click="navigateToNextQuestion" :disabled="currentQuestionIndex === questions.length - 1">Next</button>
    </div>
</template>

<script>
export default {
    name: "QuestionDashboard",
    props: {
        questions: {
            type: Array,
            required: true
        },
        currentQuestionIndex: {
            type: Number,
            required: true
        }
    },
    methods: {
        navigateToQuestion(index) {
            this.$emit("navigateToQuestion", index);
        },
        navigateToPreviousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.$emit("navigateToQuestion", this.currentQuestionIndex - 1);
            }
        },
        navigateToNextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.$emit("navigateToQuestion", this.currentQuestionIndex + 1);
            }
        }
    }
}
</script>

<style scoped>
.dashboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
}

.dashboard button {
    margin: 5px;
    padding: 10px;
    font-size: 1.2em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dashboard button.current {
    background-color: #007bff;
    color: white;
}

.dashboard button:hover {
    background-color: #0056b3;
    color: white;
}

.dashboard button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>