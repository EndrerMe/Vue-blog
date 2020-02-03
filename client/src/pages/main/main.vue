<template>
    <div class="main">
        <headerComponent></headerComponent>
        <router-view />
        <userAreaComponent v-show='isShowUserArea'
        @closeUserArea='closeUserArea'></userAreaComponent>
        <footerComponent></footerComponent>
    </div>
</template>

<script>
import headerComponent from '@/components/header/header';
import footerComponent from '@/components/footer/footer';
import userAreaComponent from '@/components/userArea/userArea'

export default {
    name: 'mainComponent',
    components: {
        headerComponent,
        footerComponent,
        userAreaComponent,
    },
    data() {
        return {
            isShowUserArea: false,
        }
    },
    mounted () {
        this.checkUserLogin();

        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'toggleUserArea') {
                this.isShowUserArea = state.userArea.isShowUserArea;
            }
        })
    },
    methods: {
        closeUserArea() {
            this.isShowUserArea = false;
        },
        
        checkUserLogin() {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                this.$router.push({ path: '/index' });
            }

            return;
        }
    },
}
</script>

<style scoped lang='scss'>
    .main {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100vw;
        min-height: 100vh;
        overflow: auto;
    }

    .main::-webkit-scrollbar {
        width: 5px;
    }
    
    .main::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    .main::-webkit-scrollbar-thumb {
        background-color: black;
        outline: 1px solid black;
    }
</style>