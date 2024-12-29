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
        
        const response = await apiClient.post('/User/post-user', userInfo);
        return response;
        
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}

async function login(userInfo){
    try {
        const credentials = {
            Name: userInfo.account, 
            Email: userInfo.account, 
            Password: userInfo.password
        };     
        //console.log('Sending login request with credentials:', credentials);
        const response = await apiClient.post('/User/login', credentials);
        //console.log('Login response:', response);
        if (response.status === 200) {
            authState.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userdata', JSON.stringify(response.data));
        }
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



