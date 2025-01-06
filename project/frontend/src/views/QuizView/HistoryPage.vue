<template>
    <div>
        <NavBar />
        <h1>History Page</h1>
        <div v-if="records.length">
            <TestRecord
                v-for="record in records"
                :key="record.Record_id"
                :record="record"
                @view-details="viewDetails"
                @delete="deleteRecord"
            />
        </div>
        <div v-else>
            <p>No records found.</p>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TestRecord from '@/components/QuizView/TestRecord.vue';
import { generateFakeRecords } from '@/service/QuizApi/RecordApi.js';

export default {
    name: "HistoryPage",
    components: {
        NavBar,
        TestRecord
    },
    data() {
        return {
            records: []
        };
    },
    methods: {
        async fetchRecords() {
            try {
                this.records = await generateFakeRecords();
            } catch (error) {
                console.error("Failed to fetch records:", error);
                alert("Failed to fetch records. Please try again later.");
            }
        },
        viewDetails(recordId) {
            this.$router.push({ name: 'ResultPage', query: { recordId } });
        },
        deleteRecord(recordId) {
            const index = this.records.findIndex(r => r.Record_id === recordId);
            if (index !== -1) {
                this.records.splice(index, 1);
            }
        }
    },
    async created() {
        await this.fetchRecords();
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