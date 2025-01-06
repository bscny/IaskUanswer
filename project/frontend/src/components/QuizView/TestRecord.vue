<template>
    <div class="test-record">
        <h3>{{ record.Quiz_name }}</h3>
        <p>Total Points: {{ record.Total_points }}</p>
        <p>Quiz Date: {{ record.Quiz_Date }}</p>
        <button class="view-details-button" @click="$emit('view-details', record.Record_id)">View Details</button>
        <button class="delete-button" @click="$emit('delete', record.Record_id)">Delete</button>
    </div>
</template>

<script>
export default {
    name: "TestRecord",
    props: {
        record: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.test-record {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}

button {
    margin: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.view-details-button {
    background-color: #007bff;
    color: white;
}

.view-details-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #dc3545;
    color: white;
}

.delete-button:hover {
    background-color: #c82333;
}
</style>