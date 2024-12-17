<template>
    <div class="flex-buttons-titles">
        <button class="quiz-button">
            Try Quiz
        </button>

        <div class="quiz-name">
            {{ quiz.Quiz_name }}
        </div>

        <button class="edit-quiz-button" @click="EditQuiz()">
            Edit Quiz
        </button>
    </div>

    <ul class="question-flexbox" v-for="question in questions" :key="question.Q_number">
        <div class="question-body">
            <div class="q-number">
                {{ question.Q_number }}.
            </div>

            <div class="body">
                {{ question.Body }}
            </div>

            <div class="points">
                {{ question.Points }} points
            </div>
        </div>

        <div class="SO-option-grid" v-if="question.SO_id !== undefined">
            <div class="options">
                Ans: {{ question.Answer }}
            </div>

            <div class="options">
                {{ question.OptionA }}
            </div>

            <div class="options">
                {{ question.OptionB }}
            </div>

            <div class="options">
                {{ question.OptionC }}
            </div>
        </div>

        <div class="TF-option-grid" v-if="question.TF_id !== undefined">
            <div>
                
            </div>
        </div>

    </ul>

    <div class="extra-space">

    </div>
</template>

<script>

export default {
    name: "DisplayQuestion",
    components: {},

    props:{
        quiz: Object,
        questions: Array,
    },

    data() {
        return {

        };
    },

    methods: {
        EditQuiz(){
            this.$emit("Editing");
        },
    },
}
</script>

<style scoped>
.flex-buttons-titles {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 0 0 5vh 0;
}

.quiz-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;

    cursor: pointer;
    transition: background-color 0.3s;
}

.quiz-name {
    font-size: 3.5vw;
    text-decoration: underline;
}

.quiz-button:hover {
    background-color: #288d2e;
}

.edit-quiz-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #cc3a46;
    color: white;
    border: none;
    border-radius: 5px;
    
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-quiz-button:hover {
    background-color: #c96f99;
}

.question-flexbox {
    display: flex;
    
    flex-direction: column;
    align-items: center;
    justify-content: start;

    border-top: solid;
    border-width: 2px;
    border-color: black;
    
    /* margin: 6vh 0 0 17vw; */
}

.question-body {
    display: flex;
    
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin: 2vh 0 0 0;
}

.q-number {
    font-size: 1.5vw;
}

.body {
    /* text-decoration: dashed; */
    font-size: 3vw;
}

.points {
    font-size: 1.5vw;
}

.SO-option-grid {
    display: grid;

    grid-template-columns: 1fr 1fr;

    width: 100%;
    margin: 4vh 0 2vh 0;
}

.options {
    font-size: 2vw;
    margin: auto;
    margin-top: 1.5vh;
}

.extra-space {
    margin-top: 10vh;
}
</style>