<template>
    <div class="index">
        <div class="loginOrRegist">
            <button @click='showRegist'>Registration</button>
            <button @click='showLogin'>Login</button>
        </div>
        <registComponent @goToLogin='goToLogin' v-show='auth.isShowRegist'></registComponent>
        <loginComponent v-show='auth.isShowLogin'></loginComponent>
        <div class="bg_close" v-show='isShowBgClose' @click='closeAll'></div>
    </div>
</template>

<script>
import registComponent from '@/components/regist/regist';
import loginComponent from '@/components/login/login';

export default {
    name: 'indexComponent',
    components: {
        registComponent,
        loginComponent,
    },
    mounted () {
        this.checkUserLogin();
    },
    data() {
        return {
            isShowBgClose: false,
            auth: {
                isShowRegist: false,
                isShowLogin: false,
            } 
        }
    },
    methods: {
        checkUserLogin() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return;
            }

            this.$router.push({ path: '/main/content' });
        },

        showRegist() {
            this.auth.isShowRegist = true;
            this.isShowBgClose = true;
        },

        showLogin() {
            this.auth.isShowLogin = true;
            this.isShowBgClose = true;
        },

        closeAll() {
            this.isShowBgClose = false;
            for (const key in this.auth) {
                this.auth[key] = false;
            }
        },

        goToLogin() {
            this.auth.isShowLogin = true;
        }
    }
}
</script>

<style scoped lang='scss'>
    .index {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .loginOrRegist {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 350px;

            button {
                font-family: "BebasNeue Regular";
                border: none;
                outline: none;
                background: transparent;
                font-size: 35px;
                cursor: pointer;
            }
        }

        .bg_close {
            position: absolute;
            width: 100vw;
            height: 100vh;
            background: transparent;
            z-index: 9;
        }
    }
</style>