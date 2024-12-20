<template>
    <div class="empty"></div>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="account">Account</label>
                <input type="text" id="account" v-model="form.account" placeholder="Enter Username / Email" required />
                <span v-if="errors.account" class="error">{{ errors.account }}</span>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="form.password" placeholder="Enter your password"
                    required />
                <span v-if="errors.password" class="error">{{ errors.password }}</span>
            </div>

            <button type="submit" :disabled="isSubmitting">Login</button>
        </form>
    </div>

</template>

<script>
import {login} from '@/service/auth';
export default {
    name: "Login",
    data() {
        return {
            form: {
                account: "",
                password: "",
            },
            errors: {
                account: null,
                password: null,
            },
            userInfo: {
                id: null
            },

            isSubmitting: false // In canse of multiple submittion.

        };
    },
    methods: {
        validateForm() {
            let valid = true;
            // Clear previous errors
            this.errors = { account: null, password: null };
            return valid;
        },

        async submitForm() {

            if (!this.validateForm()) return;

            this.isSubmitting = true;
            try {

                const response = await login(this.form);
                console.log(response)
                if(response.status === 200){
                    alert("Login successful!\n");
                    this.$router.push("/");
                }

                // Reset the form
                this.form.account = "";
                this.form.password = "";


            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } finally {
                this.isSubmitting = false;
            }
        }
    },
};
</script>

<style scoped>
.login-form {
    position: absolute;
    top: 25%;
    left: 33%;
    width: 34%;
    height: 40%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #f9f9f9;
}

.empty {
    display: inline-block;

    width: 33%;
    height: 40vw;
}

.login-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 25px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    margin-top: 20px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    font-size: 0.9em;
}
</style>