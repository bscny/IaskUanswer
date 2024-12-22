<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
    <nav class="navbar">
        <span class="logo" @click="toHome">
            Kataohoot
        </span>

        <div class="title">
            資料庫系統期末專題
        </div>

        <div class="account-field">
            <button v-if="!authState.isAuthenticated" class="account-btn" @click=navSignup>Signup</button>
            <button v-if="!authState.isAuthenticated" class="account-btn" @click=navLogin>Login</button>
            <div v-if="authState.isAuthenticated" class="account-username"> {{ getLoggedUsername() }} </div>
            <button v-if="authState.isAuthenticated" class="account-btn" @click=logout> Logout </button>

        </div>
    </nav>
</template>

<script>
import { authState, logout } from '@/service/auth.js';

export default {
    name: "NavBar",
    setup() {
        return {
            authState,
            logout,
        }
    },
    beforeCreate() {
        console.log("nav beforeCraete");
        const userdata = localStorage.getItem("userdata");
        authState.isAuthenticated = (!userdata) ? false : true;
        
    },
    data() {
        return {

        };
    },

    methods: {
        navLogin() {
            this.$router.push("/Login");
        },
        navSignup() {
            this.$router.push("/Signup");
        },
        getLoggedUsername() {
            let userdata = localStorage.getItem("userdata");
            if (userdata) {
                return JSON.parse(userdata).username;
            }

            return "unknown";
        },
        toHome() {
            this.$router.push("/");
        },

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
    position: block;
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: 8vh;
    background-color: rgba(31, 26, 51, 0.719);

    z-index: 10000;
}


.logo {
    background-color: rgb(255, 172, 218);
    height: inherit;
    width: auto;
    font-size: 4vh;
    text-align: center;
    padding-left: 1vw;
    padding-right: 1vw;
    font-family: "Sofia", sans-serif;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}


.logo:hover {
    background-color: rgb(255, 132, 200)
}

.title {
    display: inline;
    font-family: DFKai-sb;
    font-size: 5vh;
    color:azure
}

.account-field {
    display: inline;
    padding : 1rem;
}

.account-btn {
    background-color: #999dfe;
    color: rgb(0, 0, 0);
    margin-left: 1vw;
    font-size: 4vh;
    width: 20vh;
    height: 8vh;
    text-align: center;
    text-decoration: none;
    display: inline-block;
}

.account-btn:hover {
    background-color: rgb(107, 84, 255);
}

.account-username {
    display: inline;
    color: rgb(65, 255, 81);
}
</style>