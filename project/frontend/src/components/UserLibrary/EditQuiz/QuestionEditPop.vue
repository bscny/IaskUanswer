<template>
    <div class="BG">
        <div class="window" v-if="question.SO_id != undefined">
            <p1 class="category">
                Question:
            </p1>

            <input class="body-input" type="text" v-model="body" />

            <p2 class="category">
                Answer:
            </p2>

            <input class="ans-input" type="text" v-model="ans" />

            <p3 class="category">
                Other Options:
            </p3>

            <input class="options-input" type="text" v-model="optionA" />
            <input class="options-input" type="text" v-model="optionB" />
            <input class="options-input" type="text" v-model="optionC" />

            <p4 class="category">
                points:
            </p4>

            <input class="points-input" type="number" v-model="points" />

            <button class="done-button" @click="EditionDone()">
                Save Changes
            </button>

            <button class="delete-button" @click="Delete()">
                Delete it
            </button>

            <button class="cancel-button" @click="Cancel()">
                Cancel
            </button>
        </div>
        <div class="window" v-else-if="question.TF_id != undefined">
            <p1 class="category">
                Question:
            </p1>

            <input class="body-input" type="text" v-model="body" />

            <p2 class="category">
                Answer:
            </p2>

            <div class="TF-select-flexbox">
                <button class="TF-button" :class="{'selected': ansTF == true}" @click="SetAnsTF()">
                    True
                </button>

                <button class="TF-button" :class="{'selected': ansTF == false}" @click="ResetAnsTF()">
                    False
                </button>
            </div>

            <p4 class="category">
                points:
            </p4>

            <input class="points-input" type="number" v-model="points" />

            <button class="done-button" @click="EditionDone()">
                Save Changes
            </button>

            <button class="delete-button" @click="Delete()">
                Delete it
            </button>

            <button class="cancel-button" @click="Cancel()">
                Cancel
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'QuestionEditPop',
    components: {},

    props: {
        question: Object,
    },

    data() {
        return {
            body: this.question.Body,
            ans: this.question.Answer,
            optionA: this.question.OptionA,
            optionB: this.question.OptionB,
            optionC: this.question.OptionC,
            points: this.question.Points,

            ansTF: this.question.Answer,
        };
    },

    methods: {
        Cancel() {
            this.$emit("Cancel");
        },

        SetAnsTF(){
            this.ansTF = true;
        },

        ResetAnsTF(){
            this.ansTF = false;
        },

        checkSameOption(){
            return (this.optionA == this.optionB || this.optionA == this.optionC || this.optionA == this.ans
                || this.optionB == this.optionC || this.optionB == this.ans || this.optionC == this.ans
            );
        },

        checkValidPoint(){
            if(this.points <= 0){
                return false;
            }
        },

        EditionDone() {
            if (this.question.SO_id != undefined){
                if (this.checkSameOption() == true){
                    alert("Cant have same options!");
                    return;
                }

                if (this.checkValidPoint() == false){
                    alert("Cant have minus point!");
                    return;
                }

                if (this.body != "" && this.ans != "" && this.optionA != "" &&
                    this.optionB != "" && this.optionC != "" && this.points != null  
                    &&
                    !(this.body == this.question.Body && this.ans == this.question.Answer && this.optionA == this.question.OptionA &&
                    this.optionB == this.question.OptionB && this.optionC == this.question.OptionC && this.points == this.question.Points)) {
    
                    let newRecord = {
                        SO_id: this.question.SO_id,
                        Q_number: this.question.Q_number,
                        Body: this.body, 
                        Points: this.points,
                        Answer: this.ans,
                        OptionA: this.optionA,
                        OptionB: this.optionB,
                        OptionC: this.optionC,
                        Quiz_id: this.question.Quiz_id
                    }
    
                    this.$emit("Edited", newRecord);
                }else{
                    this.$emit("Cancel");
                }
            } else if (this.question.TF_id != undefined){
                if (this.checkValidPoint() == false){
                    alert("Cant have minus point!");
                    return;
                }

                if ((this.body != "" && this.points != null)
                    &&
                    !(this.body == this.question.body && this.ansTF == this.question.Answer && this.points == this.question.Points)) {
                    let newRecord = {
                        TF_id: this.question.TF_id,
                        Q_number: this.question.Q_number,
                        Body: this.body, 
                        Points: this.points,
                        Answer: this.ans,
                        Quiz_id: this.question.Quiz_id
                    }
                    
                    this.$emit("Edited", newRecord)
                }else{
                    this.$emit("Cancel");
                }
            }
        },

        Delete(){
            this.$emit("Deleted", this.question);
        }
    },
}
</script>

<style scoped>
.BG {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(255, 255, 255, 0.301);

    z-index: 100;
}

.window {
    position: fixed;
    top: 10vh;
    right: 10vw;
    bottom: 10vh;
    left: 10vw;

    background-color: rgb(43, 22, 77);
    color: white;

    z-index: 101;
}

.category {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
}

.body-input {
    display: block;
    margin: 1vh 1vw 5vh 1vw;

    width: 70vw;
    font-size: 2vw;
    padding: 0.5vh 0.5vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.body-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.ans-input {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
    width: 70vw;
    padding: 0.5vh 0.5vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ans-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.options-input {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
    padding: 0.5vh 0.5vw;
    width: 70vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.options-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.points-input {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
    padding: 0.5vh 0.5vw;
    width: 70vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.points-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.TF-select-flexbox {
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 20%;
}

.TF-button {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #535353;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.TF-button:hover {
    background-color: #9c9c9c;
}

.TF-button.selected {
    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #02a51d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.TF-button.selected:hover {
    background-color: #2fad44;
}

.done-button {
    position: absolute;

    right: 1px;
    bottom: 1px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.done-button:hover {
    background-color: #288d2e;
}

.delete-button {
    position: absolute;

    right: 40vw;
    bottom: 1px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #db3232;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.delete-button:hover {
    background-color: #e21717;
}

.cancel-button {
    position: absolute;

    left: 1px;
    bottom: 1px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #3aabbe;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.cancel-button:hover {
    background-color: #0b9eb8;
}
</style>