<template>
    <div class="grid-container">
        <div v-for="quiz in quizzes" class="grid-item" @click="goToQuiz(quiz.id)">
            <div class="grid-item-title">{{ quiz.title }}</div>
            <div class="grid-item-description">{{ quiz.description }}</div>

        </div>

    </div>
</template>

<script>
import Api from "@/service/Api";

export default {
    name: "QuizGrid",
    beforeCreate() {
        Api.fake_getNQuizes("quizzes").then((response) => {
            this.quizzes = response.data.quizzes;
        });
    },
    methods: {
        goToQuiz(id) {
            console.log(`go to quiz ${id}`);
            // this.$router.push(`/quiz/${id}`);
        },
    },
    data() {
        return {
            quizzes: null
        }
    },
};
</script>

<style scoped>
.grid-container {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 5%;
    padding: 3rem;
    margin: auto;
    border-radius: 1rem;
    border-color: black;
    background-color: #f9f9f9;
}


.grid-item {
    background-color:rgb(57, 99, 109) ;
    color: rgb(0, 0, 0);
    height: 15rem;
    font-size: 1.2rem;
    padding: 1rem;

    border-radius: 12rem;
    text-align: center;
}

.grid-item-title {
    color: black;
    size: 1rem;
    font-size: 2rem;
    background-color: #89b5ce;
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 12rem;
    
}
.grid-item-description{
    color: black;
    size: 1rem;
    font-size: 1.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
}
.grid-item:hover {
    background-color: #6092a1;
}
</style>