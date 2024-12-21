import axios from "axios";

export default {
    async signup(data) {
        return axios.post("/Signup", data);
    },

    async login(data) {
        return axios.post("/Login", data);


    },

    // for testing
    async fake_login(data) {
        const fakeData = {
            id: 1,
            account: data.account,
            password: data.password,
            username: 'Fake User'
        };

        const fakeAxiosResponse = {
            data: fakeData,
            status: 200,
            statusText: 'OK',
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(fakeAxiosResponse), 500); // Simulate async delay
        });
    },

    async fake_signup(data) {
        const fakeData = {
            id: 1,
            account: data.account,
            password: data.password,
            username: data.username
        };

        const fakeAxiosResponse = {
            data: fakeData,
            status: 200,
            statusText: 'OK',
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(fakeAxiosResponse), 500); // Simulate async delay
        });
    }
}