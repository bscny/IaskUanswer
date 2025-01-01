<template>

    <div>
        <NavBar/>
        <Login @loginSuccess="handleLoginSuccess"/>
    </div>
    <div>
        
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Login from '@/components/SignView/Login.vue';
import { authState } from '@/service/AccountApi/accountAPI';


export default {
    name: 'LoginPage',
    components: {
        NavBar, Login
    },
    methods: {
        handleLoginSuccess(userData) {
            authState.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userdata', JSON.stringify(userData));
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>