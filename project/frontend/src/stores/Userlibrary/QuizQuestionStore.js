import { defineStore } from "pinia";

const useQuizStore = defineStore('QuizStore', {
    state: () => ({
        quiz: null,
    }),

    actions: {
        
    }
});

const useQuestionsStore = defineStore('QuestionStore', {
    state: () => ({
        questions: null,
    }),

    actions: {
        
    }
});

export{
    useQuizStore,
    useQuestionsStore,
};