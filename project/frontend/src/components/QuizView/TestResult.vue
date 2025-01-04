<template>
    <div class="result-page">
        <div class="score">
            <h1>Total Score: {{ totalScore }}</h1>
        </div>
        <div class="button-container">
            <button class="toggle-details-button" @click="$emit('toggle-details')">{{ showDetails ? 'Hide Details' : 'Show Details' }}</button>
            <button class="back-button" @click="goToUserLibrary">Back to User Library</button>
        </div>
        <div v-if="showDetails" class="questions">
            <div v-for="(question, index) in questions" :key="index" class="question">
                <h3>Question {{ index + 1 }}: {{ question.Body }}</h3>
                <p>Your Answer: <span :class="{ correct: question.isCorrect, incorrect: !question.isCorrect }">{{ question.userAnswer }}</span></p>
                <p>Correct Answer: {{ question.Answer }}</p>
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
        },
        showDetails: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        goToUserLibrary() {
            this.$router.push({ name: 'UserLibrary' });
        }
    }
}
</script>

<style scoped>
.result-page {
    margin: 20px;
    text-align: center;
    position: relative; /* Add relative positioning to the container */
}

.score {
    margin: 40px 0; /* Adjust the margin to move the Total Score down */
    margin-top: 100px; /* Adjust the top value to move the Total Score vertically */
    left: 50%;
}

.question {
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}

.button-container {
    display: flex;
    justify-content: center; /* Center the buttons */
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

.toggle-details-button {
    /* Custom styles for the toggle details button */
    margin-right: 50px; /* Example: Add margin to the right */
    background-color: #28a745; /* Example: Change background color */
}

.back-button {
    /* Custom styles for the back button */
    background-color: #dc3545; 
}
</style>