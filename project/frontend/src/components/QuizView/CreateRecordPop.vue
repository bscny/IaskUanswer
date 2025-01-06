<template>
    <div class="popup-bg">
        <div class="popup-window">
            <h2>Create New Record</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="quiz_name">Quiz Name</label>
                    <input type="text" id="quiz_name" v-model="quiz_name" required />
                </div>
                <div class="form-group">
                    <label for="total_points">Total Points</label>
                    <input type="number" id="total_points" v-model="total_points" required />
                </div>
                <div class="form-group">
                    <label for="quiz_date">Quiz Date</label>
                    <input type="date" id="quiz_date" v-model="quiz_date" required />
                </div>
                <button type="submit">Create</button>
                <button type="button" @click="$emit('cancel')">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateRecordPop",
    data() {
        return {
            quiz_name: "",
            total_points: 0,
            quiz_date: new Date().toISOString().substr(0, 10)
        };
    },
    methods: {
        submitForm() {
            const newRecord = {
                quiz_name: this.quiz_name,
                total_points: this.total_points,
                quiz_date: this.quiz_date
            };
            this.$emit('create', newRecord);
        }
    }
}
</script>

<style scoped>
.popup-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-window {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

button:hover {
    background-color: #0056b3;
}
</style>