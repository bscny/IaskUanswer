import { defineStore } from "pinia";

const useQuizStore = defineStore('QuizStore', {
    state: () => ({
        quizID: null,
    }),

    actions: {
        SetQuiz(quizID){
            this.quizID = quizID;
        }
    }
});

export{
    useQuizStore,
};