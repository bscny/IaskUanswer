// auth.js
import { reactive } from 'vue';
import Api from './Api';

export const authState = reactive({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
});

export async function login(userInfo) {
    try {
        // For testing
        let response = await Api.fake_login(userInfo);
        
        if (response.status === 200) {
            authState.isAuthenticated = true;
            let item = {
                isAuthenticated: true,
                userID: response.data.id,
                username: response.data.username,
            }
            console.log(JSON.stringify(item))
            localStorage.setItem('userdata', JSON.stringify(item));

        }

        return response;
    } catch (error) {
        console.error(error);
    }
}
export async function logout() {
    authState.isAuthenticated = false;
    localStorage.removeItem('userdata');
}


