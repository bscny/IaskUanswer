<template>
    <div class="flex-buttons">
        <button class="quiz-button">
            Try Quiz
        </button>

        <button class="edit-quiz-button" @click="EditSet()">
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
    },

    data() {
        return {
            questions: null,
        };
    },

    methods: {
        async FetchQuestion(){
            // get all question based on quiz id from backend API
            // fake data for SO question:
            let questions = [
                {
                    SO_id: 4,
                    Q_number: 4,
                    Body: "test question 4",
                    Points: 30,
                    Answer: "i'm gay",
                    OptionA: "nonohuang is gay",
                    OptionB: "JX is gay",
                    OptionC: "benny is not gay",
                    Quiz_id: this.quiz.Quiz_id
                },
                {
                    SO_id: 2,
                    Q_number: 2,
                    Body: "test question 2",
                    Points: 30,
                    Answer: "i'm loli con",
                    OptionA: "nonohuang is loli con",
                    OptionB: "JX is loli con",
                    OptionC: "benny is not loli con",
                    Quiz_id: this.quiz.Quiz_id
                },
            ];

            // fake data for TF question:
            let questions1 = [
                {
                    SO_id: 3,
                    Q_number: 3,
                    Body: "test question 3",
                    Points: 30,
                    Answer: "i'm a bitch",
                    OptionA: "nonohuang is a bitch",
                    OptionB: "JX is a bitch",
                    OptionC: "benny is not a bitch",
                    Quiz_id: this.quiz.Quiz_id
                },
                {
                    SO_id: 1,
                    Q_number: 1,
                    Body: "test question 1",
                    Points: 30,
                    Answer: "i'm obscene",
                    OptionA: "nonohuang is obscene",
                    OptionB: "JX is obscene",
                    OptionC: "benny is not obscene",
                    Quiz_id: this.quiz.Quiz_id
                },
            ];

            // fill in blank... you are hard to deal with.....
            
            // re-structure each question
            questions = [...questions, ...questions1];
            questions.sort(function(a, b){
                return a.Q_number - b.Q_number;
            });
            
            this.questions = questions;
        },
        
    },

    watch: {
        async quiz(){
            await this.FetchQuestion();
        }
    },

    async created(){
        await this.FetchQuestion();
    }
}
</script>

<style scoped>
.flex-buttons {
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