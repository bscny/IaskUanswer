<template>
    <NavBar />

    <div class="header">
        <QuizEditBlock  :quiz="quizStore.quiz"
                        @Edited="Done()"
                        @Deleted="Done()" />
    </div>

    <div class="display-area">
        <DisplayQuestion    :quiz="quizStore.quiz"
                            :questions="questionsStore.questions"
                            :editMode="true"
                            @EditingQuestion="SetEditQuestion($event)"
                            @CreatingQuestion="SetCreateQuestion()" />
    </div>

    <div v-if="canCreateQuestion">
        <QuestionCreatePop  :quiz="quizStore.quiz"
                            :questions="questionsStore.questions"
                            @Cancel="CancelQuestionAction()"
                            @Created="QuestionCreated($event)" />
    </div>

    <div v-if="canEditQuestion">
        <QuestionEditPop    :quiz="quizStore.quiz"
                            :questions="questionsStore.questions"
                            :question="curLookingQuestion"
                            @Cancel="CancelQuestionAction()"
                            @Edited="QuestionEdited($event)" 
                            @Deleted="QuestionDeleted($event)" />
    </div>
    
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import QuizEditBlock from "@/components/UserLibrary/QuizEditBlock.vue";
import DisplayQuestion from "@/components/UserLibrary/DisplayQuestion.vue";
import QuestionCreatePop from "@/components/UserLibrary/QuestionCreatePop.vue";
import QuestionEditPop from "@/components/UserLibrary/QuestionEditPop.vue";

import { 
    useQuizStore,
    useQuestionsStore,
} from "@/stores/Userlibrary/QuizQuestionStore.js";

export default {
    name: "EditQuiz",
    components: {
        NavBar,
        QuizEditBlock,
        DisplayQuestion,
        QuestionCreatePop,
        QuestionEditPop,
    },

    data() {
        return {
            // variables for question controll
            canCreateQuestion: false,
            canEditQuestion: false,
            curLookingQuestion: null,

            // pinia store share variables
            quizStore: useQuizStore(),
            questionsStore: useQuestionsStore(),
        };
    },

    methods: {
        Cancel() {
            this.$router.push({
                name: 'UserLibrary'
            });
        },

        Done(){
            // dont need to store the data back to the store because router.push reload the UserLibrary page
            this.$router.push({
                name: 'UserLibrary'
            });
        },

        SetEditQuestion(question){
            this.curLookingQuestion = question;

            this.canEditQuestion = true;
        },

        SetCreateQuestion(){
            this.canCreateQuestion = true;
        },

        CancelQuestionAction(){
            this.canCreateQuestion = false;
            this.canEditQuestion = false;
        },

        QuestionCreated(newQuestion){
            this.questionsStore.questions.push(newQuestion);
            alert("Question Created!");

            this.canCreateQuestion = false; 
        },

        QuestionEdited(editedQuestion){
            for(let i = 0; i < this.questionsStore.questions.length; i ++){
                if(this.questionsStore.questions[i].Q_number == editedQuestion.Q_number){
                    this.questionsStore.questions[i] = editedQuestion;
                }
            }
            alert("Change Saved!");

            this.canEditQuestion = false; 
        },

        QuestionDeleted(deletedQuestionNumber){
            for(let i = 0; i < this.questionsStore.questions.length; i ++){
                if(this.questionsStore.questions[i].Q_number == deletedQuestionNumber){
                    this.questionsStore.questions.splice(i, 1);
                }
            }
            alert("Deleted!!");

            this.canEditQuestion = false; 
        }
    },

}
</script>

<style scoped>
.header{
    display: block;
    margin: 10vh 5vw 5vh 5vw;
}

.display-area {
    display: block;
    margin: 0 5vw 5vh 5vw;
}
</style>