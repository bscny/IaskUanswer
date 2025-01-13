<template>
    <div class="container">
        <div class="flex-buttons-titles" v-if="!editMode">
            <button class="quiz-button" @click="TryQuiz">
                Try Quiz
            </button>
    
            <div class="quiz-name">
                {{ quiz.Quiz_name }}
            </div>
    
            <button class="edit-quiz-button" @click="EditQuiz()">
                Edit Quiz
            </button>
        </div>
    
        <div class="description" v-if="!editMode">
            Description: {{ quiz.Quiz_description }}
        </div>
    
        <ul class="question-flexbox" v-for="question in questions" :key="question.Q_number">
            <div class="question-params-flexbox">
                <div class="q-number">
                    {{ question.Q_number }}.
                </div>
    
                <div class="points-edit-fiexbox">
                    <div class="points">
                        {{ question.Points }} points
                    </div>
    
                    <button class="edit-question-button" v-if="editMode" @click="EditQuestion(question)">
                        edit
                    </button>
                </div>
            </div>
    
            <div class="body">
                {{ question.Body }}
            </div>
    
            <div class="option-grid" v-if="question.SO_id !== undefined">
                <div class="options so-answer">
                    {{ question.Answer }}
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
    
            <div class="option-grid" v-if="question.TF_id !== undefined">
                <div class="options-TF" v-if="question.Answer == true">
                    True
                </div>
                <div class="options-TF" v-else>
                    False
                </div>
            </div>
    
        </ul>
    
        <div class="create-question-flexbox" v-if="editMode">
            <button class="create-question-button" @click="Toggle()">
                Create Question
            </button>
    
            <div class="create-menu" v-if="showCreateMenu">
                <div class="list" @click="CreateQuestion('TF')">
                    create a true/false question
                </div>
    
                <div class="list" @click="CreateQuestion('SO')">
                    create a single open question
                </div>
            </div>
    
        </div>
    
        <div class="extra-space">
    
        </div>
    </div>
</template>

<script>

export default {
    name: "DisplayQuestion",
    components: {},

    props: {
        quiz: Object,
        questions: Array,
        editMode: Boolean,
    },

    data() {
        return {
            showCreateMenu: false,
        };
    },
    methods: {
        EditQuiz() {
            this.$emit("EditingQuiz");
        },
        TryQuiz() {
            this.$emit("TryingQuiz");
        },
        EditQuestion(question) {
            this.$emit("EditingQuestion", question);
        },

        Toggle(){
            this.showCreateMenu = !this.showCreateMenu;
        },

        CreateQuestion(type) {
            this.$emit("CreatingQuestion", type);  // type is a string with either TF or SO
        },
    },
}
</script>

<style scoped>
.container {
    display: flex;

    flex-direction: column;
    justify-content: start;
    align-items: center;

    height: 100%;
    width: 100%;
}

.flex-buttons-titles {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 0 0 2vh 0;
    width: 100%;
}

.quiz-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;

    font-size: 3vh;

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

    font-size: 3vh;

    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-quiz-button:hover {
    background-color: #c96f99;
}

.description {
    display: block;
    margin-bottom: 2vh;
    font-size: 2vw;
    text-decoration: underline;

    align-self: flex-start;
}

.question-flexbox {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-top: 5vh;
    width: 100%;

    border-top: solid;
    border-width: 2px;
    border-color: black;

    /* margin: 6vh 0 0 17vw; */
}

.question-params-flexbox {
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

.points-edit-fiexbox {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: end;
}

.points {
    font-size: 1.5vw;
}

.edit-question-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    margin-left: 1vw;
    background-color: #ce249b;
    color: white;
    border: none;
    border-radius: 5px;

    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-question-button:hover {
    background-color: #ce43a4;
}

.option-grid {
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 5vh 5vh;
    gap: 1vh 1vw;

    justify-items: center;
    align-items: center;

    width: 100%;
    margin: 4vh 0 2vh 0;
}

.options {
    font-size: 2vw;
}

.so-answer{
    color: #37b13f;
}
.options-TF {
    font-size: 2vw;
    grid-row: span 2;
    grid-column: span 2;
    color: #37b13f;
}

.create-question-flexbox {
    display: flex;

    flex-direction: column;
    justify-content: start;
    align-items: center;
    
    margin-top: 10vh;
    width: 50%;
}

.create-question-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: rgb(177, 187, 240);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2vw;

    cursor: pointer;
    transition: background-color 0.3s;
}

.create-question-button:hover {
    background-color: #ccc7eb;
}

.create-menu {
    display: flex;

    flex-direction: column;
    justify-content: start;
    align-items: center;

    padding: 0 1vw;
    background-color: rgb(87, 87, 87);
    border-radius: 5px;
}

.list {
    color: white;
    border: none;
    font-size: 1.5vw;
    padding: 1vh 0;

    width: 100%;

    cursor: pointer;
    transition: background-color 0.3s;
}

.list:hover {
    background-color: rgb(151, 151, 151);
}

.extra-space {
    margin-top: 10vh;
}
</style>