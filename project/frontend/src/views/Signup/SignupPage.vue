<template>

    <div>
        <NavBar/>
        <Signup @loginSuccess="handleLoginSuccess"/>
    </div>
    <div>
        
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Signup from '@/components/SignView/Signup.vue';
import { authState } from '@/service/AccountApi/accountAPI';

export default{

    name: 'SignupPage',
    components:{
        NavBar, Signup
    },

    methods: {
        handleLoginSuccess(userData) {
            authState.isAuthenticated = true;
            // in order to be consistant with backend code, add a message a front...
            let finalData = {
                message: "none",
                user: userData
            }
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userdata', JSON.stringify(finalData));
            this.$router.push({ name: 'Home' });
        }
    },
}
</script>