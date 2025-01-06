<template>
    <div>
        <NavBar />
        <h1>Test Records</h1>
        <div v-for="record in records" :key="record.Record_id">
            <TestRecord :record="record" @edit="openEditPopup" @delete="deleteRecord" />
        </div>
        <button @click="showCreatePopup = true">Create New Record</button>
        <CreateRecordPop v-if="showCreatePopup" @create="createRecord" @cancel="showCreatePopup = false" />
        <EditRecordPop v-if="showEditPopup" :record="currentRecord" @save="editRecord" @cancel="showEditPopup = false" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TestRecord from '@/components/QuizView/TestRecord.vue';
import CreateRecordPop from '@/components/QuizView/CreateRecordPop.vue';
import EditRecordPop from '@/components/QuizView/EditRecordPop.vue';

export default {
    name: "HistoryPage",
    components: {
        NavBar,
        TestRecord,
        CreateRecordPop,
        EditRecordPop
    },
    data() {
        return {
            records: [],
            showCreatePopup: false,
            showEditPopup: false,
            currentRecord: null
        };
    },
    methods: {
        createRecord(newRecord) {
            newRecord.Record_id = Date.now(); // Simulate auto-increment ID
            this.records.push(newRecord);
            this.saveRecords();
            this.showCreatePopup = false;
        },
        openEditPopup(record) {
            this.currentRecord = record;
            this.showEditPopup = true;
        },
        editRecord(updatedRecord) {
            const index = this.records.findIndex(r => r.Record_id === updatedRecord.Record_id);
            if (index !== -1) {
                this.records.splice(index, 1, updatedRecord);
                this.saveRecords();
            }
            this.showEditPopup = false;
        },
        deleteRecord(recordId) {
            const index = this.records.findIndex(r => r.Record_id === recordId);
            if (index !== -1) {
                this.records.splice(index, 1);
                this.saveRecords();
            }
        },
        saveRecords() {
            localStorage.setItem('records', JSON.stringify(this.records));
        },
        loadRecords() {
            const records = localStorage.getItem('records');
            if (records) {
                this.records = JSON.parse(records);
            } else {
                this.records = [
                    { Record_id: 1, Quiz_name: "Quiz 1", Total_points: 80, Quiz_Date: "2023-10-01" },
                    { Record_id: 2, Quiz_name: "Quiz 2", Total_points: 90, Quiz_Date: "2023-10-02" }
                ];
            }
        }
    },
    created() {
        this.loadRecords();
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