<template>
    <div class="BG">
        <div class="window">
            <p1 class="category">
                Question:
            </p1>

            <input class="body-input" type="text" v-model="body" />

            <p2 class="category">
                Answer:
            </p2>

            <input class="ans-input" type="text" v-model="ans" />

            <p3 class="category">
                Other Options:
            </p3>

            <input class="options-input" type="text" v-model="optionA" />
            <input class="options-input" type="text" v-model="optionB" />
            <input class="options-input" type="text" v-model="optionC" />

            <p4 class="category">
                points:
            </p4>

            <input class="points-input" type="number" v-model="points" />

            <button class="done-button" @click="CreationDone()">
                Create
            </button>

            <button class="cancel-button" @click="Cancel()">
                Cancel
            </button>
        </div>
    </div>
</template>

<script>
import { 
    createQuestion 
} from '@/service/LibraryApi/QuestionAPI';

export default {
    name: 'QuestionCreatePop',
    components: {},

    props: {
        quiz: Object,
        questions: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            body: "",
            ans: "",
            optionA: "",
            optionB: "",
            optionC: "",
            points: null,
        };
    },

    methods: {
        Cancel() {
            this.$emit("Cancel");
        },

        async  CreationDone() {
            if (this.body != "" && this.ans != "" && this.optionA != "" &&
                this.optionB != "" && this.optionC != "" && this.points != null) {
                // call backend API to insert new question
      
                // call backend API to retrieve the newly created record
                // fake data:
                let newRecord = {
                    Q_number: this.questions.length + 1,
                    Body: this.body, 
                    Points: this.points,
                    Answer: this.ans,
                    OptionA: this.optionA,
                    OptionB: this.optionB,
                    OptionC: this.optionC,
                    Quiz_id: this.quiz.Quiz_id
                }
                const response = await createQuestion(newRecord);
                console.log("Question created with ID:", response.SO_id);


                this.$emit("Created", newRecord);
            }else{
                this.$emit("Cancel");
            }
        }
    },
}
</script>

<style scoped>
.BG {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(255, 255, 255, 0.301);

    z-index: 100;
}

.window {
    position: fixed;
    top: 10vh;
    right: 10vw;
    bottom: 10vh;
    left: 10vw;

    background-color: rgb(43, 22, 77);
    color: white;

    z-index: 101;
}

.category {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
}

.body-input {
    display: block;
    margin: 1vh 1vw 5vh 1vw;

    width: 70vw;
    font-size: 2vw;
    padding: 0.5vh 0.5vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.body-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.ans-input {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
    width: 70vw;
    padding: 0.5vh 0.5vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ans-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.options-input {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
    padding: 0.5vh 0.5vw;
    width: 70vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.options-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.points-input {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
    padding: 0.5vh 0.5vw;
    width: 70vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.points-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.done-button {
    position: absolute;

    right: 1px;
    bottom: 1px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.done-button:hover {
    background-color: #288d2e;
}

.cancel-button {
    position: absolute;

    left: 1px;
    bottom: 1px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #32a9be;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.cancel-button:hover {
    background-color: #12a3bd;
}
</style>