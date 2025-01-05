<template>
    <div class="option-container">
        <button v-for="(option, i) in options" :key="i" @click="answerSelected(option)" class="option" :style="{ 'background-color': this.color[i]}">{{ option }}</button>
    </div>
</template>

<script>
export default {
    name: "AnswnerOption",
    data() {
        return {
            color: ['#ff6666', '#6666ff', '#ffff66', '#66ff66']
        }
    },

    props: {
        options: {
            type: Array,
            required: true,
            default: []
        }
    },

    methods: {
        
        answerSelected(option) {
            console.log("Option:", option);
            this.$emit("answerSelected", option)
        }
    }
}
</script>


<style scoped>
.option-container {
    width: inherit;
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1vw;
    padding: 1vh 1vw 1vh 1vw;
}

.option{
    width: 48vw;
    height: 15vh;
    font-size: 3vw;
    font-style: normal
}

.option:hover{
    transform: scale(1.01);
    background-color: #333;
}
</style>