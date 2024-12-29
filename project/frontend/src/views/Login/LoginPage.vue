<template>

    <div>
        <NavBar/>
        <Login/>
    </div>
    <div>
        
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Login from '@/components/SignView/Login.vue';

import {
    login
} from '@/service/AccountApi/accountAPI';

export default{

    name: 'LoginPage',
    components:{
        NavBar, Login
    }
}
</script>