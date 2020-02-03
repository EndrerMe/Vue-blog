<template>
    <div class="header">
        <div class="headerContent">
            <button class="burgerButton" ref='burgerButton' @click='toggleSideMenu'>
                <img src="@/assets/burgerMenu/food.svg" alt="burger">
            </button>

            <div class="logo">
                <h1 class="logoTitle">
                    <router-link class="link" to="/main">Denzill</router-link>
                </h1>
            </div>

            <div class="social">
                <img src="@/assets/social/twitter.svg" alt="twitter">
                <img src="@/assets/social/facebook.svg" alt="facebook">
                <img src="@/assets/social/github.svg" alt="github">
                <img src="@/assets/social/linkedin.svg" alt="linkedin">
                <img src="@/assets/social/telegram.svg" alt="telegram">
            </div>
        </div>
        <sideMenu :isShowSideMenu='isShowSideMenu' class="sideMenu" ref='sideMenu'></sideMenu>
    </div>
</template>

<script>
import sideMenu from '@/components/sideMenu/sideMenu';

export default {
    name: 'headerComponent',
    components: {
        sideMenu
    },
    data() {
        return {
            isShowSideMenu: false,
        }
    },
    mounted () {
        this.$store.subscribe((mutation) => {
            if (mutation.type === 'toggleUserArea') {
                this.isShowSideMenu = false;
                this.$refs.burgerButton.classList.remove('activeMenuBtn');
                this.$refs.burgerButton.classList.add('notActiveMenuBtn');
            }
        })
    },
    methods: {
        toggleSideMenu() {
            this.isShowSideMenu = !this.isShowSideMenu;
            if (this.isShowSideMenu) {
                this.$refs.burgerButton.classList.remove('notActiveMenuBtn');
                this.$refs.burgerButton.classList.add('activeMenuBtn');
            }

            if (!this.isShowSideMenu) {
                this.$refs.burgerButton.classList.remove('activeMenuBtn');
                this.$refs.burgerButton.classList.add('notActiveMenuBtn');
            }
        }
    },
    watch: {
        $route() {
            this.isShowSideMenu = false;  
            this.$refs.burgerButton.classList.remove('activeMenuBtn');
            this.$refs.burgerButton.classList.add('notActiveMenuBtn');
        }
    }
}
</script>

<style scoped lang='scss'>
    .header {
        position: fixed;
        width: 100%;
        height: 60px;
        background-color: black;
        z-index: 50;

        .headerContent {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            height: 100%;

            .burgerButton {
                align-items: center;
                justify-content: center;
                border: none;
                outline: none;
                background: black;
                width: 75px;
                height: 100%;

                img {
                    width: 25px;
                }
            }

            .logo {
                margin-left: 75px;
                cursor: pointer;

                .logoTitle {
                    font-family: "ONNIC";

                    .link {
                        color: white;
                        text-decoration: none;
                    }
                }
            }

            .social {
                position: absolute;
                right: 45px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                height: 100%;
                width: 170px;

                img {
                    width: 20px;
                    cursor: pointer;
                    transition: .2s;
                }

                img:hover {
                    -webkit-filter: invert(50%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2);
                    filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(1600%) contrast(0.8);
                }
            }
        }
    }

        

    .activeMenuBtn {
        -webkit-animation: burgerActive .2s ;
        -moz-animation: burgerActive .2s ;
        -ms-animation: burgerActive .2s ;
        animation: burgerActive .2s ;
        width: 155px !important;
    }

    .notActiveMenuBtn {
        -webkit-animation: burgerNotActive .2s ;
        -moz-animation: burgerNotActive .2s ;
        -ms-animation: burgerNotActive .2s ;
        animation: burgerNotActive .2s ;
        width: 75px;
    }

    @keyframes burgerActive {
        from {
            width: 75px;
        }

        to {
            width: 155px;
        }
    }

    @keyframes burgerNotActive {
        from {
            width: 155px
        }

        to {
            width: 75px;
        }
    }
</style>