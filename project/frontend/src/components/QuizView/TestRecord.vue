<template>
    <div class="test-record">
        <h3>{{ record.quiz_name }}</h3>
        <p>Total Points: {{ record.total_points }}</p>
        <p>Quiz Date: {{ record.quiz_date }}</p>
        <button @click="$emit('edit', record)">Edit</button>
        <button @click="$emit('delete', record.record_id)">Delete</button>
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>