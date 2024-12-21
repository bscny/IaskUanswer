<template>
    <nav class="navbar">
        <div class="logo">
            logo
        </div>

        <div class="title">
            title
        </div>

        <div class="sign-in-up-button">
            sign in/up
        </div>
    </nav>
</template>

<script>
export default{
    name: "NavBar",

    data(){

    },

    methods: {

    },

    computed: {

    },

    mounted(){

    },

    created(){

    },

}
</script>

<style scoped>
.navbar{
    position: fixed;
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    top: 0;
    left: 0;
    right: 0;
    height: 8vh;
    background-color: rgba(0, 0, 0, 0.719);

    z-index: 10000;
}

.logo {
    display: inline;

    padding: 0 0 0 1.5vw;
    font-size: 1vw;
}

.title {
    display: inline;

    font-size: 1vw;
}

.sign-in-up-button {
    display: inline;

    padding: 0 1.5vw 0 0;
    font-size: 1vw;
}
</style>