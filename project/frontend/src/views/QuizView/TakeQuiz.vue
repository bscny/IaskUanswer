<template>

    <div class="container" data-v-inspector="src/views/QuizView/TakeQuiz.vue:2:5">
        <QuizHeader :currentQuestionIndex="currentQuestionIndex" :questionCount="questionCount" @exit="backToLastPage()"
            data-v-inspector="src/views/QuizView/TakeQuiz.vue:3:9" />
        <QuizBody :body="currentBodyDescription" />
        <AnswnerOption :options="currentOptions" @answerSelected="handleAnswer($event)" />
    </div>
    <SubmitPopup v-if="showSubmitPopup" @submitOption="handleSubmit($event)"/>

</template>

<script>
import QuizHeader from "@/components/TakeQuiz/QuizHeader.vue";
import QuizBody from "@/components/TakeQuiz/QuizBody.vue";
import AnswnerOption from "@/components/TakeQuiz/AnswnerOption.vue";
import { getTestSheetByQuizID_fake } from "@/service/QuizApi/TestSheetAPI";
import { useQuizStore } from "@/stores/Userlibrary/QuizQuestionStore";
import SubmitPopup from "@/components/TakeQuiz/SubmitPopup.vue";

export default {
    name: "TakeQuiz",

    components: {
        QuizHeader,
        QuizBody,
        AnswnerOption,
        SubmitPopup
    },

    data() {
        return {
            quizId: 0,
            currentQuestionIndex: 0,
            testSheet: [],
            questionCount: 0,
            lastPath: "/",
            showSubmitPopup: false
        };
    },

    async created() {
        try {
            this.quizId = useQuizStore().quiz.Quiz_id;
            this.currentQuestionIndex = 0;
            // TODO replace fake service
            this.testSheet = await getTestSheetByQuizID_fake(this.quizId);
            this.questionCount = this.testSheet.length;
            this.lastPath = this.$route.query.lastPath;
            console.log("lastpath=", this.lastPath);
            console.log("test sheet:", this.testSheet);
            console.log(this.currentOptions);
        } catch (e) {
            console.error(e);
            this.backToLastPage();
        }
    },

    methods: {

        handleAnswer(option) {

            // set the chosen answer
            this.testSheet[this.currentQuestionIndex]['answer'] = option

            // end of the quiz
            if (this.currentQuestionIndex + 1 === this.questionCount) {
                this.showSubmitPopup = true;
                return;
            }

            this.currentQuestionIndex++;


        },

        handleSubmit(option){
            
            // User wants to submit
            if(option){
                console.log("Submit")

                // TODO route to result page
            }
            
            this.showSubmitPopup = false;
        },
        submitQuiz() { },

        restartQuiz() {
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.quizCompleted = false;
        },

        backToLastPage() {
            try {
                this.$router.push(this.lastPath);
            } catch (e) {
                console.error(e);
                this.$router.push('/');
            }
        }
    },

    computed: {
        currentBodyDescription() {
            try {
                return this.testSheet[this.currentQuestionIndex].body;
            }
            catch (e) {
                console.error(e);
                return "Undefined";
            }
        },
        currentOptions() {
            if (this.questionCount === 0 || this.currentQuestionIndex >= this.questionCount) {
                return [];
            }

            try {
                const currentQuestion = this.testSheet[this.currentQuestionIndex];
                return Object.entries(currentQuestion)
                    .filter(([key, value]) => key.includes("option"))
                    .map(([key, value]) => value);
            } catch (e) {
                console.error(e);
                return [];
            }
        },

    },

    watch: {
        // Watch the testSheet and currentQuestionIndex to make sure currentOptions is recomputed
        testSheet: "currentOptions",
        currentQuestionIndex: "currentOptions"
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-self: space-between;
    background-color: bisque;
    width: 100vw;
    height: 100vh;
}
</style>
