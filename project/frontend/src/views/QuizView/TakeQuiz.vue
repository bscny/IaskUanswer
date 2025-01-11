<template>
    <div class="container" data-v-inspector="src/views/QuizView/TakeQuiz.vue:2:5">
        <QuizHeader :currentQuestionIndex="currentQuestionIndex" :questionCount="questionCount" @exit="backToLastPage()"
            data-v-inspector="src/views/QuizView/TakeQuiz.vue:3:9" />
        <QuestionDashboard :questions="testSheet" :currentQuestionIndex="currentQuestionIndex"
            @navigateToQuestion="navigateToQuestion" />
        <QuizBody :body="currentBodyDescription" />
        <div class="submit-container">
            <button class="submit-button" @click="checkAndSubmit">Submit</button>
        </div>
        <AnswnerOption :options="currentOptions" :selectedOption="currentSelectedOption"
            @answerSelected="handleAnswer($event)" />
    </div>
    <SubmitPopup v-if="showSubmitPopup" @submitOption="handleSubmit($event)" />
</template>

<script>
import QuizHeader from "@/components/TakeQuiz/QuizHeader.vue";
import QuizBody from "@/components/TakeQuiz/QuizBody.vue";
import AnswnerOption from "@/components/TakeQuiz/AnswnerOption.vue";
import { getTestSheetByQuizID, submitTestSheet } from "@/service/QuizApi/TestSheetAPI";
import { useQuizStore } from "@/stores/Userlibrary/QuizQuestionStore";
import SubmitPopup from "@/components/TakeQuiz/SubmitPopup.vue";
import QuestionDashboard from "@/components/TakeQuiz/QuestionDashboard.vue";

export default {
    name: "TakeQuiz",

    components: {
        QuizHeader,
        QuizBody,
        AnswnerOption,
        SubmitPopup,
        QuestionDashboard
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
            showSubmitPopup: false,
            incompleteQuestions: []
        };
    },

    async created() {
        try {
            this.quizID = useQuizStore().quiz.Quiz_id;
            this.userID = this.$route.query.userID;
            this.currentQuestionIndex = 0;

            this.testSheet = await getTestSheetByQuizID(this.quizID);
            console.log('testsheet:', this.testSheet)
            this.answerSheet = this.testSheet.map(v => ({
                SO_id: v.SO_id,
                Q_number: v.Q_number,
                Points: v.Points,
                Choosed_ans: ''
            }));

            this.questionCount = this.testSheet.length;
            this.lastPath = this.$route.query.lastPath;
        } catch (e) {
            this.backToLastPage();
        }
    },

    methods: {
        handleAnswer(option) {
            // set the chosen answer
            this.answerSheet[this.currentQuestionIndex].Choosed_ans = option;

            // move to the next question if not the last one
            if (this.currentQuestionIndex + 1 < this.questionCount) {
                this.currentQuestionIndex++;
            }
        },

        async handleSubmit(doSubmit) {
            // User wants to submit
            if (doSubmit) {
                try {
                    const recordID = await submitTestSheet({
                        User_id: this.userID,
                        Quiz_id: this.quizID,
                        Answer_sheet: this.answerSheet
                    });



                    this.$router.push({
                        name: 'ResultPage',
                        query: {
                            recordId: recordID
                        }
                    })

                } catch (e) {
                    console.error(e);
                }
            }

            this.showSubmitPopup = false;
        },

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
        },

        navigateToQuestion(index) {
            this.currentQuestionIndex = index;
        },

        checkAndSubmit() {
            this.incompleteQuestions = this.answerSheet
                .filter(q => !q.Choosed_ans)
                .map(q => q.Q_number);

            if (this.incompleteQuestions.length > 0) {
                alert(`Please complete the following questions before submitting: ${this.incompleteQuestions.join(', ')}`);
            } else {
                this.showSubmitPopup = true;
            }
        }
    },

    computed: {
        currentBodyDescription() {
            try {
                return this.testSheet[this.currentQuestionIndex].Body;
            } catch (e) {
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
                    .filter(([key, value]) => key.includes("Option"))
                    .map(([key, value]) => value);
            } catch (e) {
                console.error(e);
                return [];
            }
        },
        currentSelectedOption() {
            return this.answerSheet[this.currentQuestionIndex].Choosed_ans;
        }
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

.submit-container {
    margin: 20px;
    align-self: flex-start;
}

.submit-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.5em;
}

.submit-button:hover {
    background-color: #218838;
}
</style>