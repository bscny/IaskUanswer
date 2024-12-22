<template>
    <NavBar />
    <div style="display: flex;">
        <SideBar />
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