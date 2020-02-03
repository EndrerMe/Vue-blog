<template>
    <div class="login">
        <form id="loginForm">
            <p v-if='error' class="loginError">
                {{ error }}
            </p>

            <p>
                <label for="userName">User Name:</label>
                <input v-model.trim='userData.userName'
                type="text" id="userName">
            </p>

            <p>
                <label for="password">Password:</label>
                <input v-model.trim='userData.userPassword'
                type="password" id="password">
            </p>

            <button @click='login'>Login</button>
        </form>
    </div>
</template>

<script>
import authSerivce from '@/shared/services/auth.service';
import * as jwt_decode from 'jwt-decode';

export default {
    name: 'loginComponent',
    data() {
        return {
            error: null,
            userData: {
                userName: null,
                userPassword: null,
            }
        }
    },
    methods: {
        login(e) {
            e.preventDefault();
            
            if (this.userData && this.userData.userPassword) {
                authSerivce.login(this.userData).then((res) => {
                    const decode = jwt_decode(res.data.token);
                    localStorage.setItem('userData', JSON.stringify(decode));
                    this.$router.push({ path: '/main/content' });
                }).catch((err) => {
                    this.error = err.response.data.error;
                })
            }
        }
    }
}
</script>

<style scoped lang='scss'>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 600px;
        height: 600px;
        background-color: white;
        z-index: 10;

        #loginForm {
            position: relative;
            font-family: "BebasNeue Regular";

            .loginError {
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
                }

                .invalid {
                    border: none;
                    border-bottom: 2px solid red;
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