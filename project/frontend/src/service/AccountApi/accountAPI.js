import { reactive } from 'vue';
import apiClient from '@/service/ApiClient';

export const authState = reactive({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
});

//backend user format
// userI = {
//     Id : ,
//     Name : , 
//     Email : , 
//     Password : 
// } 
async function signup(userInfo) {
    try {
        // change userInfo to match backend
        userInfo = {
            Name : userInfo.username, 
            Email : userInfo.email, 
            Password : userInfo.password
        }        
        
        const response = await apiClient.post('/User/post-user/', userInfo);
        return response;
        
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}

async function login(userInfo){
    try {
        const response = await apiClient.post('/User/login', userInfo);
        
        return response;
        

    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}


async function logout() {
    authState.isAuthenticated = false;
    localStorage.removeItem('userdata');
}

export {
    signup,
    login,
    logout,
};



