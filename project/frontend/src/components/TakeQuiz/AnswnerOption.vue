<template>
    <div class="option-container" v-if="options.length == 4">
        <button
            v-for="(option, i) in options"
            :key="i"
            @click="answerSelected(option)"
            class="option"
            :class="{ 'selected': selectedOption === option }"
            :style="{ 'background-color': color[i] }"
        >
            {{ option }}
        </button>
    </div>
    <div class="option-container" v-else-if="options.length == 2">
        <button
            @click="answerSelected(true)"
            class="tf-option"
            :class="{ 'selected': selectedOption === true }"
            :style="{ 'background-color': color[0] }"
        >
            True
        </button>

        <button
            @click="answerSelected(false)"
            class="tf-option"
            :class="{ 'selected': selectedOption === false }"
            :style="{ 'background-color': color[1] }"
        >
            False
        </button>
    </div>
</template>

<script>
export default {
    name: "AnswnerOption",
    props: {
        options: {
            type: Array,
            required: true,
            default: []
        },
        selectedOption: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            color: ['#ff6666', '#6666ff', '#ffff66', '#66ff66']
        }
    },
    methods: {
        answerSelected(option) {
            this.$emit("answerSelected", option);
        }
    }
}
</script>

<style scoped>
.option-container {
    width: inherit;
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 15vh 15vh;
    gap: 1vw;
    padding: 1vh 1vw 1vh 1vw;
}

.option {
    width: 48vw;
    height: 15vh;
    font-size: 3vw;
    font-style: normal;
    transition: transform 0.2s, border 0.2s;
}

.option:hover {
    transform: scale(1.01);
    background-color: #333;
}

.option.selected {
    border: 5px solid #000;
    transform: scale(1.02);
}

.tf-option {
    grid-row: span 2;

    font-size: 3vw;
    font-style: normal;
    transition: transform 0.2s, border 0.2s;
}

.tf-option:hover {
    transform: scale(1.01);
    background-color: #333;
}

.tf-option.selected {
    border: 5px solid #000;
    transform: scale(1.02);
}
</style>