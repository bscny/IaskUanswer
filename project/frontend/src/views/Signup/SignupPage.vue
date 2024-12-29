<template>

    <div>
        <NavBar/>
        <Signup/>
    </div>
    <div>
        
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Signup from '@/components/SignView/Signup.vue';

import {
    signup
} from '@/service/AccountApi/accountAPI';

export default{

    name: 'SignupPage',
    components:{
        NavBar, Signup
    }
}
</script>