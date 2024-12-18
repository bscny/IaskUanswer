<template>
    <nav class="navbar">
        <div>
            <a href="/">
                <img src="@/assets/logo.png" class="logo">
            </a>
        </div>

        <div class="title">
            title
        </div>

        <div class="account-field">
            <a v-if="!isLogged" class="account-btn" href="/Signup">Signup</a>
            <a v-if="!isLogged" class="account-btn" href="/Login">Login</a>
            <a v-else class="account-btn" href="/"> Logout </a>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",

    data() {
        return {
        isLogged: false,
    };
    },

    methods: {

    },

    computed: {

    },

    mounted() {

    },

    created() {

    },

}
</script>

<style scoped>
.navbar {
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
    height: 8vh;
    width: auto;
}

.title {
    display: inline;

    font-size: 1vw;
}

.account-field {
    display: inline;

    padding: 0 1.5vw 0 0;
    font-size: 1vw;
}

a.account-btn, a.account-btn:visited {
  background-color: #999dfe;
  color: rgb(0, 0, 0);
  padding: 14px 25px;
  margin-left: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

a.account-btn:hover, a.account-btn:active {
  background-color: rgb(107, 84, 255);
}
</style>