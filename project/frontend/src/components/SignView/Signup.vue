<template>
    <div class="empty"></div>
    <div class="signup-form">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="form.username" placeholder="Enter your username" required />
                <span v-if="errors.username" class="error">{{ errors.username }}</span>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required />
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="form.password" placeholder="Enter your password"
                    required />
                <span v-if="errors.password" class="error">{{ errors.password }}</span>
            </div>

            <button type="submit" :disabled="isSubmitting">Sign Up</button>
        </form>
    </div>

</template>

<script>
import {
    signup
} from '@/service/AccountApi/accountAPI';

export default {
    name: "Signup",
    data() {
        return {
            form: {
                username: "",
                email: "",
                password: "",
            },
            errors: {
                username: null,
                email: null,
                password: null,
            },

            isSubmitting: false // In case of multiple submittion.
        };
    },
    methods: {
        validateForm() {
            let valid = true;
            // Clear previous errors
            this.errors = { username: null, email: null, password: null };

            if (!this.form.username) {
                this.errors.username = "Username is required.";
                valid = false;
            } else if (!this.validUsername(this.form.username)) {
                this.errors.username = "Special character is not required."
                valid = false;
            }

            if (!this.form.email) {
                this.errors.email = "Email is required.";
                valid = false;
            } 
            else if (!this.validEmail(this.form.email)) {
                this.errors.email = "Invalid email format.";
                valid = false;
            }

            if (!this.form.password) {
                this.errors.password = "Password is required.";
                valid = false;
            }

            return valid;
        },
        validEmail(email) {
            return email.includes('@');
        },
        validUsername(username) {
            return !username.includes('@');
        },

        async submitForm() {
            if (!this.validateForm()) return;
            this.isSubmitting = true;

            try {
                // call backend API to register
                const response = await signup(this.form);
                if(response.status == 200){
                    alert("Signup successful!\n");
                    this.$router.push({
                        name: 'Home'
                    });
                }
                
                // Reset the form
                this.form.username = "";
                this.form.email = "";
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
        },
    },
};
</script>

<style scoped>
.signup-form {
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

.signup-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
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