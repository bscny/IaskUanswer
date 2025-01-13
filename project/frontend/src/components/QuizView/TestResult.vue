<template>
    <div class="result-page">
        <div class="header">
            <button class="history-button" @click="goToHistoryPage">Back</button>

            <h1 class="total-score">  {{ score }} / {{ totalScore }}</h1>
            <h5 class="quiz-date">Completed at: {{ QuizDate }}</h5>
        </div>
        <div class="radio-toolbar">
            <input type="radio" id="all" name="subscription-type" value="showAll" @click="showWrongOnly = false" checked>
            <label for="all">Show All</label>
            <input type="radio" id="wrong-only" name="subscription-type" value="showWrongOnly"
                @click="showWrongOnly = true">
            <label for="wrong-only">Show Wrong Only</label>
        </div>

        <div class="questions-grid">
            <div v-for="(question, index) in filteredQuestions" :key="index" class="question">
                <span class="question-title">
                    <h3>Question {{ question.Q_number }} </h3>
                    <h4>{{ question.Is_correct ? `(${question.Points} /
                        ${question.Points})` : `(0 / ${question.Points})` }}</h4>
                </span>
                <hr color="black">
                <h3>{{ question.Body }}</h3>
                <div v-if="question.OptionA != undefined" class="so-options">
                    <p
                        :class="{ 'correct-answer': question.Answer === question.OptionA, 'incorrect-answer': question.Choosed_ans === question.OptionA && !question.Is_correct }">
                        (A) {{ question.OptionA }}</p>
                    <p
                        :class="{ 'correct-answer': question.Answer === question.OptionB, 'incorrect-answer': question.Choosed_ans === question.OptionB && !question.Is_correct }">
                        (B) {{ question.OptionB }}</p>
                    <p
                        :class="{ 'correct-answer': question.Answer === question.OptionC, 'incorrect-answer': question.Choosed_ans === question.OptionC && !question.Is_correct }">
                        (C) {{ question.OptionC }}</p>
                    <p
                        :class="{ 'correct-answer': question.Answer === question.OptionD, 'incorrect-answer': question.Choosed_ans === question.OptionD && !question.Is_correct }">
                        (D) {{ question.OptionD }}</p>
                </div>
                <div v-else class="tf-options">
                    <p
                        :class="{ 'correct-answer': question.Answer == true, 'incorrect-answer': question.Is_correct == false && question.Answer == false }">
                        True
                    </p>

                    <p
                        :class="{ 'correct-answer': question.Answer == false, 'incorrect-answer': question.Is_correct == false && question.Answer == true }">
                        False
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TestResult",
    props: {
        totalScore:{
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        questions: {
            type: Array,
            required: true
        },
        QuizDate: {
            type: String,
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

        goToHistoryPage() {
            this.$router.push({ name: 'HistoryPage' });
        },

    }
}
</script>

<style scoped>
.header {
    margin: 10vh 2vw 5vh 2vw;
    
    left: 50%;
    font-size: 2vw;
    display: flex;
    justify-content: space-between;
}

.question-title{
    display: inline-flex;
    margin: 1vh 1vw 1vh 1vw;
}

.question-title > h4{
    margin-left: 1vw;
}
.questions-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 5%;
    margin-top: 3vh;
    padding: 1.5rem;
    border-radius: 1rem;
}

.question {
    border-radius: 1vw;
    border-style: dotted;
    padding: 1vw;
    text-align: center;
    font-size: 2vw;
}

.correct-answer {
    background-color: green;
    margin: 0.5vw;
}

.incorrect-answer {
    background-color: red;
    margin: 0.5vw;
}

.user-answer {
    color: blue;
}


button {
    background-color: #007bff;
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;

    font-size: 2vw;
}

.so-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 10%;
}

.tf-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 10%;
}

button:hover {
    background-color: #0056b3;
}

.back-button {
    background-color: #dc3545;
}

.history-button {
    background-color: #c0c0c0;
    padding: 1vh 1vw 1vh 1vw;
}

.history-button:hover {
    background-color: #838383;
}

.radio-toolbar {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.19);
    height: 10vh;
    width: 100%;
    font-size: 2vw;
    display: flex;
    overflow: hidden;
    border-radius: 1vw;
    border-style: solid;
}

.radio-toolbar label {
    width: 100%;
    display: inline-block;
    background-color: #FFFFFF;
    margin-left: -30px;
    padding: 10px 20px;
    font-size: 3vw;
    text-align: center;

}

.radio-toolbar label:hover {
    background-color: #B4B4B4;
}

.radio-toolbar input[type="radio"]:checked+label {
    background-color: #DAA521;
    color: white;
}

input[type="radio"] {
    visibility: hidden;
}
</style>