<template>
    <div>
        <NavBar />
        <h1>Test Records</h1>
        <div v-for="record in records" :key="record.record_id">
            <TestRecord :record="record" @edit="editRecord" @delete="deleteRecord" />
        </div>
        <button @click="createRecord">Create New Record</button>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TestRecord from '@/components/QuizView/TestRecord.vue';

export default {
    name: "HistoryPage",
    components: {
        NavBar,
        TestRecord
    },
    data() {
        return {
            records: [
                { record_id: 1, quiz_name: "Quiz 1", total_points: 80, quiz_date: "2024-12-18T13:40:53" },
                { record_id: 2, quiz_name: "Quiz 2", total_points: 90, quiz_date: "2024-12-19T14:40:53" },
                { record_id: 3, quiz_name: "Quiz 3", total_points: 85, quiz_date: "2024-12-20T15:40:53" }
            ]
        };
    },
    methods: {
        createRecord() {
            const newRecord = {
                record_id: Date.now(),
                quiz_name: "New Quiz",
                total_points: 0,
                quiz_date: new Date().toISOString()
            };
            this.records.push(newRecord);
        },
        editRecord(record) {
            const updatedRecord = { ...record, total_points: record.total_points + 10 };
            const index = this.records.findIndex(r => r.record_id === record.record_id);
            if (index !== -1) {
                this.records.splice(index, 1, updatedRecord);
            }
        },
        deleteRecord(recordId) {
            const index = this.records.findIndex(r => r.record_id === recordId);
            if (index !== -1) {
                this.records.splice(index, 1);
            }
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 20px 0;
}

button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}
</style>