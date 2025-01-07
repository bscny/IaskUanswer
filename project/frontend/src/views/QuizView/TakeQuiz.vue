<template>

    <div class="container" data-v-inspector="src/views/QuizView/TakeQuiz.vue:2:5">
        <QuizHeader :currentQuestionIndex="currentQuestionIndex" :questionCount="questionCount" @exit="backToLastPage()"
            data-v-inspector="src/views/QuizView/TakeQuiz.vue:3:9" />
        <QuizBody :body="currentBodyDescription" />
        <AnswnerOption :options="currentOptions" @answerSelected="handleAnswer($event)" />
    </div>
    <SubmitPopup v-if="showSubmitPopup" @submitOption="handleSubmit($event)" />

</template>

<script>
import QuizHeader from "@/components/TakeQuiz/QuizHeader.vue";
import QuizBody from "@/components/TakeQuiz/QuizBody.vue";
import AnswnerOption from "@/components/TakeQuiz/AnswnerOption.vue";
import { getTestSheetByQuizID_fake, submitTestSheet_fake } from "@/service/QuizApi/TestSheetAPI";
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
            quizID: undefined,
            userID: undefined,
            currentQuestionIndex: 0,
            testSheet: [],
            answerSheet: [],
            questionCount: 0,
            lastPath: "/",
            showSubmitPopup: false
        };
    },

    async created() {
        try {
            this.quizID = useQuizStore().quiz.Quiz_id;
            this.userID = this.$route.query.userID;
            this.currentQuestionIndex = 0;

            // TODO replace fake service
            this.testSheet = await getTestSheetByQuizID_fake(this.quizID);

            this.answerSheet.questions = []
            Object.entries(this.testSheet).forEach(([k, v]) => {
                // TODO generalize id usage
                let question = {}
                question.SO_id = v.so_id;
                question.Q_number = v.q_number;
                question.Points = v.points;
                question['Choosed_ans'] = '';

                this.answerSheet.push(question)
            })
            this.questionCount = this.testSheet.length;
            this.lastPath = this.$route.query.lastPath;
        } catch (e) {
            this.backToLastPage();
        }
    },

    methods: {

        handleAnswer(option) {

            // set the chosen answer
            this.answerSheet[this.currentQuestionIndex].answer = option
            // end of the quiz
            if (this.currentQuestionIndex + 1 === this.questionCount) {
                this.showSubmitPopup = true;
                return;
            }

            this.currentQuestionIndex++;


        },

        async handleSubmit(doSubmit) {

            // User wants to submit
            if (doSubmit) {

                try {
                    // TODO replace fake service
                    const response = await submitTestSheet_fake({
                        User_id: this.userID,
                        Quiz_id: this.quizID,
                        Answer_sheet: this.answerSheet
                    }
                    );

                    const recordId = response.data.recordID;
                    if (response.status == 200) {

                        
                        console.log("Submit Successfully. recordID=", recordId);

                        // Uncomment the following code when integrating.
                        // this.$router.push({
                        //     name : 'ResultPage',
                        //     query: {
                        //         recordId: recordId
                        //     }
                        // })
                    }
                }catch(e){
                    console.error(e);
                }
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
