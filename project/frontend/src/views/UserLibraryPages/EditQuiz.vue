<template>
    <NavBar />

    <div class="header">
        <QuizEditBlock v-if="quizStore.quiz != undefined"   :quiz="quizStore.quiz"
                                                            @Edited="Done($event)"
                                                            @Deleted="DeleteQuiz($event)"
                                                            @Cancel="Cancel()" />
    </div>

    <div class="display-area">
        <DisplayQuestion v-if="quizStore.quiz != undefined" :quiz="quizStore.quiz"
                                                            :questions="questionsStore.questions"
                                                            :editMode="true"
                                                            @EditingQuestion="SetEditQuestion($event)"
                                                            @CreatingQuestion="SetCreateQuestion($event)" />
    </div>

    <div v-if="canCreateQuestion">
        <QuestionCreatePop  :quiz="quizStore.quiz"
                            :questions="questionsStore.questions"
                            :createType="createType"
                            @Cancel="CancelQuestionAction()"
                            @Created="QuestionCreated($event)" />
    </div>

    <div v-if="canEditQuestion">
        <QuestionEditPop    :question="curLookingQuestion"
                            @Cancel="CancelQuestionAction()"
                            @Edited="QuestionEdited($event)"
                            @Deleted="QuestionDeleted($event)" />
    </div>

</template>

<script>
import NavBar from "@/components/NavBar.vue";
import QuizEditBlock from "@/components/UserLibrary/EditQuiz/QuizEditBlock.vue";
import DisplayQuestion from "@/components/UserLibrary/DisplayQuestion.vue";
import QuestionCreatePop from "@/components/UserLibrary/EditQuiz/QuestionCreatePop.vue";
import QuestionEditPop from "@/components/UserLibrary/EditQuiz/QuestionEditPop.vue";

import {
    useQuizStore,
    useQuestionsStore,
} from "@/stores/Userlibrary/QuizQuestionStore.js";

import {
    getQuestionsByQuiz,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    CreateTFQuestion
} from "@/service/LibraryApi/QuestionAPI.js"

import {
    updateQuiz,
    deleteQuiz
} from "@/service/LibraryApi/QuizAPI.js"

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
            createType: null,
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

        async Done(quizData) {
            // dont need to store the data back to the store because router.push reload the UserLibrary page
            // which means we only CRUD the data from UserLibrary without storing it back

            // update backend quiz
            await updateQuiz(quizData);

            this.$router.push({
                name: 'UserLibrary'
            });
        },

        async DeleteQuiz(Quiz_id) {
            await deleteQuiz(Quiz_id);

            this.$router.push({
                name: 'UserLibrary'
            });
        },

        SetEditQuestion(question) {
            this.curLookingQuestion = question;

            this.canEditQuestion = true;
        },

        SetCreateQuestion(type) {
            this.canCreateQuestion = true;
            this.createType = type; // a string of TF or SO
        },

        CancelQuestionAction() {
            this.canCreateQuestion = false;
            this.canEditQuestion = false;
        },

        async QuestionCreated(newQuestion) {
            if(this.createType == "SO"){
                await createQuestion(newQuestion);
                // for site rendering assign newly pushed question its So_id
                // this.questionsStore.questions.push(newQuestion);
            }else if(this.createType == "TF"){
                await CreateTFQuestion(newQuestion);
            }
            
            await this.FetchQuestion();
            this.canCreateQuestion = false;
            alert("Question Created!");
        },

        async QuestionEdited(editedQuestion) {
            // for site rendering
            for (let i = 0; i < this.questionsStore.questions.length; i++) {
                if (this.questionsStore.questions[i].Q_number == editedQuestion.Q_number) {
                    this.questionsStore.questions[i] = editedQuestion;
                }
            }
            alert("Change Saved!");

            // update question in mysql
            await updateQuestion(editedQuestion);

            this.canEditQuestion = false;
        },

        async QuestionDeleted(deletedQuestionID) {
            // for site rendering
            for (let i = 0; i < this.questionsStore.questions.length; i++) {
                if (this.questionsStore.questions[i].SO_id == deletedQuestionID) {
                    this.questionsStore.questions.splice(i, 1);
                }
            }
            alert("Deleted!!");

            // delete from backend
            await deleteQuestion(deletedQuestionID);

            this.canEditQuestion = false;
        },

        async FetchQuestion() {
            try {
                const questions = await getQuestionsByQuiz(this.quizStore.quiz.Quiz_id);
                this.questionsStore.questions = questions;
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        },
    },

    async created() {
        if (this.quizStore.quiz == undefined) {
            this.$router.push({
                name: "UserLibrary"
            });

            return;
        }
    },
}
</script>

<style scoped>
.header {
    display: block;
    margin: 10vh 5vw 5vh 5vw;
}

.display-area {
    display: block;
    margin: 0 5vw 5vh 5vw;
}
</style>