<template>
    <div class="container">
        <div class="description">{{ body }}</div>
        
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

.description{
    text-align: center;
    padding: 3vh 3vw 3vh 3vw;
    font-size: 48px;
}
</style>