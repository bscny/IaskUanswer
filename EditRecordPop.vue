<template>
    <div class="popup">
        <h2>Edit Record</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="quiz_date">Quiz Date:</label>
                <input type="datetime-local" id="quiz_date" v-model="quiz_date" required />
            </div>
            <div>
                <label for="total_points">Total Points:</label>
                <input type="number" id="total_points" v-model="total_points" required />
            </div>
            <button type="submit">Save</button>
            <button type="button" @click="$emit('cancel')">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditRecordPop",
    props: {
        record: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            total_points: this.record.total_points,
            quiz_date: this.record.quiz_date
        };
    },
    methods: {
        submitForm() {
            const updatedRecord = {
                ...this.record,
                total_points: this.total_points,
                quiz_date: this.quiz_date
            };
            this.$emit('save', updatedRecord);
        }
    }
};
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