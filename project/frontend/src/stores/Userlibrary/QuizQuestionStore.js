import { defineStore } from "pinia";

const useQuizStore = defineStore('QuizStore', {
    state: () => ({
        quiz: null,
    }),

    actions: {
        SetQuiz(quiz){
            this.quiz = quiz;
        }
    }
});

const useQuestionsStore = defineStore('QuestionStore', {
    state: () => ({
        questions: null,
    }),

    actions: {
        SetQuestions(questions){
            this.questions = questions;
        }
    }
});

export{
    useQuizStore,
    useQuestionsStore,
};