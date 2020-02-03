<template>
    <div class="sideMenu" ref=sideMenu>
        <ul class="menuList">
            <li v-for='(item, index) of menuItems' :key='index' class="menuEl" :class="item.isShowChildren ? 'activeChildren' : 'notActiveChildren'">
                <div class="content" @click='toggleChildren(item)'>
                    <span>{{ item.name }}</span>
                    <img class="arrowBottom" v-if='item.children && !item.isShowChildren' src="@/assets/burgerMenu/arrow.svg">
                    <img class="arrowTop" v-if='item.children && item.isShowChildren' src="@/assets/burgerMenu/arrow.svg">
                </div>
                <div class="menuElChildren" v-show='item.isShowChildren'>
                    <ul v-for='(chilEl, index) of item.children' :key='index' class="chilElements">
                        <li class="chilEl">
                            <span>{{ chilEl.name }}</span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <ul class="userSetings">
            <li>
                <span class="link" @click='toggleUserAreaPopup()'>Personal Area</span>
            </li>
            <li>
                <span class="link" @click='logout()'>Logout</span>
            </li>
        </ul>

    </div>
</template>

<script>
// Vendors
import { mapActions } from "vuex";

export default {
    name: 'sideMenu',
    props: {
        isShowSideMenu: { type: Boolean },
    },
    data() {
        return {
            currentUser: null,
            menuItems: [
                {
                    name: 'test'
                },
                {
                    name: 'test',
                    isShowChildren: false,
                    children: [
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                    ]
                },
                {
                    name: 'test'
                },
                {
                    name: 'test',
                    isShowChildren: false,
                    children: [
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                    ]
                },
                {
                    name: 'test'
                },
                {
                    name: 'test'
                },
                {
                    name: 'test',
                    isShowChildren: false,
                    children: [
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                        {
                            name: 'test'
                        },
                    ]
                },
                {
                    name: 'test'
                },
            ]
        }
    },
    mounted () {
        this.currentUser = JSON.parse(localStorage.getItem('userData'));
    },
    methods: {
        ...mapActions(["toggleUserArea"]),

        toggleUserAreaPopup() {
            this.toggleUserArea(true)
        },

        toggleChildren(item) {
            item.isShowChildren = !item.isShowChildren;
        },

        logout() {
            localStorage.removeItem('userData');
            this.$router.push({ path: '/index' });
        }
    },
    watch: {
        isShowSideMenu: function(newVal) {
            if (newVal) {
                this.$refs.sideMenu.classList.remove('notActiveMenu')
                this.$refs.sideMenu.classList.add('activeMenu');
                return;
            }

            this.$refs.sideMenu.classList.remove('activeMenu')
            this.$refs.sideMenu.classList.add('notActiveMenu');
        }
    }
}
</script>

<style scoped lang='scss'>
    .sideMenu {
        position: absolute;
        margin-left: -255px;
        width: 155px;
        height: calc(100vh - 60px);
        background: #f5f5f5;

        ul {
            width: 100%;   
            list-style: none;
            padding: 0;
        }

        .menuList {
            margin-top: 35px;         

            span {
                margin-left: 25px;
            }

            .menuEl {
                display: flex;
                flex-direction: column;
                font-size: 20px;
                font-family: "BebasNeue Regular";
                width: 100%;
                height: 30px;
                overflow: hidden;

                .content {
                    position: relative;
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    cursor: pointer;

                    img {
                        position: absolute;
                        width: 15px;
                        right: 10px;
                    }

                    .arrowTop {
                        transform: rotate(180deg);
                    }
                }

                .menuElChildren {
                    overflow: auto;

                    .chilElements {
                        padding-left: 15px;
                    }
                }
            }

            .activeChildren {
                -webkit-animation: acriveChildren .2s ;
                -moz-animation: acriveChildren .2s ;
                -ms-animation: acriveChildren .2s ;
                animation: acriveChildren .2s ;
                height: 150px;
            }

            .notActiveChildren {
                -webkit-animation: notActiveChildren .2s ;
                -moz-animation: notActiveChildren .2s ;
                -ms-animation: notActiveChildren .2s ;
                animation: notActiveChildren .2s ;
                height: 30px;
            }
        }

        .userSetings {
            position: absolute;
            bottom: 45px;

            li {
                font-family: "BebasNeue Regular";
                position: relative;
                display: flex;
                justify-content: center;
                cursor: pointer;
                width: 100%;

                .link {
                    color: black;
                    font-size: 15px;
                    text-decoration: none;
                }
            }
        }
    }

    .activeMenu {
        margin-left: 0;
        -webkit-animation: activeMenu .2s ;
        -moz-animation: activeMenu .2s ;
        -ms-animation: activeMenu .2s ;
        animation: activeMenu .2s ;
    }

    .notActiveMenu {
        margin-left: -155px;
        -webkit-animation: notActiveMenu .2s ;
        -moz-animation: notActiveMenu .2s ;
        -ms-animation: notActiveMenu .2s ;
        animation: notActiveMenu .2s ;
    }

    @keyframes notActiveMenu {
        from {
            margin-left: 0;
        }

        to {
            margin-left: -155px;
        }
    }

    @keyframes activeMenu {
        from {
            margin-left: -155px;
        }

        to {
            margin-left: 0;
        }
    }

    @keyframes acriveChildren {
        from {
            height: 30px;
        }

        to {
            height: 155px;
        }
    }

    @keyframes notActiveChildren {
        from {
            height: 150px;
        }

        to {
            height: 30px;
        }
    }

    .menuElChildren::-webkit-scrollbar {
        width: 5px;
    }
    
    .menuElChildren::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    .menuElChildren::-webkit-scrollbar-thumb {
        background-color: black;
        outline: 1px solid black;
    }
</style>