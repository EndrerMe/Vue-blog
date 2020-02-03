<template>
    <div class="regist">
        <form id="registForm">
            <p class="registComplite" v-show='isRegistComplite'>
                You are registered!
            </p>

            <p class="registError" v-if='error'>
                {{ error }}
            </p>

            <p>
                <label for="userName">User Name:</label>
                <input v-model.trim='$v.userData.userName.$model'
                type="text" id="userName" :class="{'invalid': $v.userData.userName.$error, 'valid': !$v.userData.userName.$invalid}">
            </p>

            <p>
                <label for="email">Email:</label>
                <input v-model='$v.userData.userEmail.$model'
                type="email" id="email" :class="{'invalid': $v.userData.userEmail.$error, 'valid': !$v.userData.userEmail.$invalid}">
            </p>

            <p>
                <label for="password">Password:</label>
                <input v-model='$v.userData.userPassword.$model'
                type="password" id="password" :class="{'invalid': $v.userData.userPassword.$error, 'valid': !$v.userData.userPassword.$invalid}">
            </p>

            <p>
                <label for="repeatPassword">Repeat Password:</label>
                <input v-model='$v.userData.repeatPassword.$model'
                type="password" id="repeatPassword" :class="{'invalid': $v.userData.repeatPassword.$error, 'valid': !$v.userData.repeatPassword.$invalid}">
            </p>

            <button @click='regist'>Registration</button>
        </form>
    </div>
</template>

<script>
import authSerivce from '@/shared/services/auth.service';
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators';

export default {
    name: 'registComponent',
    data() {
        return {
            error: null,
            isRegistComplite: false,
            userData: {
                userName: null,
                userEmail: null,
                userPassword: null,
                repeatPassword: null,
            }
        }
    },
    validations: {
        userData: {
            userName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(10),
            },
            userEmail: {
                email,
                required,
            },
            userPassword: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(14),
            },
            repeatPassword: {
                required,
                sameAs: sameAs('userPassword')
            }
        }
    },
    methods: {
        regist(e) {
            e.preventDefault();
            if (this.$v.$invalid) {
                return
            }

            const user = {
                userName: this.userData.userName,
                userEmail: this.userData.userEmail,
                userPassword: this.userData.userPassword,
            }

            authSerivce.regist(user).then(() => {
                this.error = null;
                this.isRegistComplite = true;
            
                setTimeout(() => {
                    this.$emit('goToLogin')
                }, 1000)
            }).catch((err) => {
                this.error = err.response.data.error;
            });
        }
    }
}
</script>

<style scoped lang='scss'>
    .regist {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 600px;
        height: 600px;
        background-color: white;
        z-index: 10;

        #registForm {
            position: relative;
            font-family: "BebasNeue Regular";

            .registComplite {
                color: green;
            }

            .registError {
                color: red;
            }

            p {
                display: flex;
                flex-direction: column;

                label {
                    font-size: 22px;
                    margin-top: 5px;
                }

                input {
                    font-family: sans-serif;
                    outline: none;
                    border: none;
                    border-bottom: 1px solid black;
                    margin-top: 7px;
                    font-size: 20px;
                    width: 225px;
                    background-color: transparent !important;
                }
                
                .invalid {
                    border: none;
                    border-bottom: 2px solid red; 
                }

                .valid {
                    border: none;
                    border-bottom: 2px solid green; 
                }
            }

            button {
                position: absolute;
                border: none;
                outline: none;
                font-size: 22px;
                margin-top: 22px;
                font-family: "BebasNeue Regular";
                background: transparent;
                right: 0;
                cursor: pointer;
            }
        }
    }

</style>