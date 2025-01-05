<template>
    <div class="quiz-header">
        <button @click="exit" class="exit-button"> << Exit</button>
        <h2 class="progress">{{ currentQuestionIndex + 1 }} / {{ questionCount }}</h2>
    </div>
</template>

<script>
export default {
    name: "QuizHeader",
    props: {
        currentQuestionIndex: {
            type: Number,
            required: true,
        },
        questionCount: {
            type: Number,
            required: true,
        },
    },
    methods:{
        exit(){
            this.$emit("exit");
        },

    }
};
</script>

<style scoped>
.quiz-header {
    display: flex;
    justify-content: space-between;
    padding-left: 5vw;
    padding-right: 5vw;
    padding-top: 5vh;
}

.exit-button {
  background-color: #dc3545;
  color: #fff;
  font-size: 2vw;
  font-weight: bold;
  width: 10vw;
  height: 5vh;
  border: none;
  border-radius: 1vw; 
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  text-transform: uppercase;
}

.exit-button:hover {
  background-color: #c82333;
  box-shadow: 0 0.5vw 1vw rgba(220, 53, 69, 0.4);
}

.exit-button:active {
  background-color: #a71d2a; 
  transform: scale(0.97); 
  box-shadow: 0 0.5vw 1vw rgba(220, 53, 69, 0.3);
}

.exit-button:disabled {
  background-color: #f5c6cb; 
  color: #a71d2a;
  cursor: not-allowed; 
  box-shadow: none;
}

.exit-button:focus {
  outline: none; 
  box-shadow: 0 0 0 0.1vw rgba(220, 53, 69, 0.5); 
}
.progress{
    font-size: 3vw;
}
</style>