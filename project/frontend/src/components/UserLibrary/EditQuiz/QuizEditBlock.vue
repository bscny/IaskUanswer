<template>
    <div class="quiz-attribute-flexbox">
        <button class="delete-button" @click="DeleteQuiz()">
            Delete
        </button>

        <div class="quiz-name-flexbox">
            <div class="quiz-name">
                Quiz Name:
                <input class="quiz-name-box" type="text" v-model="originalName">
            </div>

            <div v-if="originalIsPublic">
                <button class="public-private-button" @click="ToggleIsPublic()">
                    Set to Private
                </button>
            </div>
            <div v-else>
                <button class="public-private-button" @click="ToggleIsPublic()">
                    Set to Public
                </button>
            </div>
        </div>

        <button class="done-button" @click="EditionDone()">
            Done
        </button>
    </div>

    <div class="description">
        Description:
        <input class="quiz-description-box" type="text" v-model="originalDescription">
    </div>
</template>

<script>

import { 
    deleteQuiz,
    updateQuiz

} from '@/service/LibraryApi/QuizAPI.js';
export default {
    name: "QuizEditBlock",
    components: {},

    props: {
        quiz: Object,
    },

    data() {
        return {
            originalName: this.quiz.Quiz_name,
            originalIsPublic: this.quiz.Is_public,
            originalDescription: this.quiz.Quiz_description,
        };
    },

    methods: {
        ToggleIsPublic(){
            this.originalIsPublic = !this.originalIsPublic;
        },

        async DeleteQuiz(){
            // call backend API to delete quiz
            try {
                await deleteQuiz(this.quiz.Quiz_id);
                this.$emit("Deleted");
            } catch (error) {
                console.error("Failed to delete quiz:", error);
            }
        },

        async EditionDone(){
            if (this.originalName != "" && 
                (this.quiz.Quiz_name != this.originalName || 
                this.quiz.Is_public != this.originalIsPublic || 
                this.quiz.Quiz_description != this.originalDescription)) {
                try {
                    const quizData = {
                        Quiz_name: this.originalName,
                        Is_public: this.originalIsPublic,
                        Folder_id: this.quiz.Folder_id,
                        Quiz_description: this.originalDescription,
                    };
                    await updateQuiz(this.quiz.Quiz_id, quizData);
                    this.$emit("edited");
                } catch (error) {
                    console.error("Failed to update quiz:", error);
                }
            } else {
                this.$emit("edited");
            }
        },
    },
}
</script>

<style scoped>
.quiz-attribute-flexbox {
    position: static;
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin-bottom: 2vh;
}

.delete-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #fc2c2c;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2vw;

    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #f70e0e;
}

.quiz-name-flexbox {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.quiz-name {
    font-size: 2vw;
}

.quiz-name-box {
    padding: 0.5vh 1vw;
    margin: 0 1.5vw;
    font-size: 2vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.quiz-name-box:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.done-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2vw;

    cursor: pointer;
    transition: background-color 0.3s;
}

.done-button:hover {
    background-color: #288d2e;
}

.public-private-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #20acd6;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2vw;

    cursor: pointer;
    transition: background-color 0.3s;
}

.public-private-button:hover {
    background-color: #0397c4;
}

.description {
    display: block;
    margin-bottom: 4vh;
    font-size: 2vw;
}

.quiz-description-box {
    padding: 0.5vh 1vw;
    margin: 0 1.5vw;
    font-size: 2vw;
    width: 75vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.quiz-description-box:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>