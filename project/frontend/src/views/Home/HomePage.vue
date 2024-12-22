<template>
    <NavBar />

    <SideBar />

    <div class="body">
        <QuizGrid />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/Home/SideBar.vue';
import QuizGrid from '@/components/Home/QuizGrid.vue';
export default {
    components: {
        NavBar, SideBar, QuizGrid
    }
}
</script>

<style scoped>
.body {
    margin-top: 8vh;
    margin-left: 10.2vw;
}
</style>