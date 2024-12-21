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
        }

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

.account-btn {
    background-color: #999dfe;
    color: rgb(0, 0, 0);
    padding: 14px 25px;
    margin-left: 10px;
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