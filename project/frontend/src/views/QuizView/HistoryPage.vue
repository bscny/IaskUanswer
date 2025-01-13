<template>
    <div class="container">
        <NavBar />
        <h1 class="breadcrumb">History Page</h1>
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
import { getUserRecords, deleteRecordByRecordID } from '@/service/QuizApi/QuizRecordAPI.js';

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
            const userData = JSON.parse(localStorage.getItem('userdata'));
            const userId = userData.user.UserId;
            this.records = await getUserRecords(userId);
            
        },
        viewDetails(recordId) {
            this.$router.push({ name: 'ResultPage', query: { recordId} });
        },
        async deleteRecord(recordId) {
            try {
                await deleteRecordByRecordID(recordId);
                this.records = this.records.filter(record => record.Record_id !== recordId);
            } catch (error) {
                console.error("Failed to delete record:", error);
                alert("Failed to delete record. Please try again later.");
            }
        }
    },
    async created() {
        await this.fetchRecords();
    }
}
</script>

<style scoped>

.container{
    display: block;
}

.breadcrumb {
  --b: 5px;   /* the border thickness */
  --a: 35deg;  /* control the shape */
  --c: #64908A;
  margin-top: 10vh;
  line-height: 1.8; /* control the height */
  padding-inline: calc(var(--b) + .2em) calc(.5lh*tan(var(--a)) + var(--b)/cos(var(--a)));
  position: relative;
  width: fit-content;
}
.breadcrumb:before {
  content:"";
  position: absolute;
  inset: 0;
  background: var(--c);
  clip-path: polygon(0 0,calc(100% - .5lh*tan(var(--a))) 0,100% 50%,calc(100% - .5lh*tan(var(--a))) 100%,0 100%,0 0,var(--b) var(--b),var(--b) calc(100% - var(--b)),calc(100% - .5lh*tan(var(--a)) - var(--b)*(1/cos(var(--a)) - tan(var(--a)))) calc(100% - var(--b)),calc(100% - var(--b)/cos(var(--a))) 50%,calc(100% - .5lh*tan(var(--a)) - var(--b)*(1/cos(var(--a)) - tan(var(--a)))) var(--b),var(--b) var(--b));
}


</style>