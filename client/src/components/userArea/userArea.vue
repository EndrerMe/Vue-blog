<template>
    <div class="userArea">
        
        <div class="profile">
            <img class="avatar" src="@/assets/images/userAvatar.png" alt="user avatar">
            <div class="userData">
                <h3>{{ userData.userName }}</h3>
                <p>{{ userData.userEmail }}</p>
            </div>
            <img class="setting" src="@/assets/icons/settings.svg" alt="settings">
        </div>

        <div class="bg-black" @click='closeUserArea'>

        </div>
    </div>
</template>

<script>
export default {
    name: 'userAreaComponent',
    data() {
        return {
            userData: null,
        }
    },
    beforeMount () {
        this.getUserData();
    },
    methods: {
        closeUserArea() {
            this.$emit('closeUserArea');
        },

        getUserData() {
            const data = JSON.parse(localStorage.getItem('userData'));
            if (!data) {
                return;
            }

            this.userData = data;
        }
    }
}
</script>

<style scoped lang='scss'>
    .userArea {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0; bottom: 0; left: 0; right: 0;
        z-index: 100;

        .profile {
            position: relative;
            display: flex;
            flex-direction: row;
            width: 500px;
            height: auto;
            padding: 25px 0px;
            background-color: white;
            z-index: 101;

            .avatar {
                width: 114px;
                margin-left: 25px;
            }

            .userData {
            }

            .setting {
                position: absolute;
                width: 25px;
                top: 10px;
                right: 10px;
                cursor: pointer;
            }
        }

        .bg-black {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: .6);
        }
    }
</style>