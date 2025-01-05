<template>
    <div class="container">
        <div>{{ body }}</div>
        
    </div>
</template>

<script>
export default {
    name: "QuizHeader",
    props:{
        body:{
            type: String,
            require: true
        }
    }
}
</script>


<style scoped>

.container{
    display: flex;
    justify-self: space-between;
}   
</style>