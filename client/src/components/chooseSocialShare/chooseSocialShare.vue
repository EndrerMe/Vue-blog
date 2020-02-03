<template>
    <div class="chooseSocialShare">
        
        <div class="popup">
            <h3>Choose Social For Sharing:</h3>
            <social-sharing url="http://localhost:8080/main/content"
                class="socialSharing"
                :title="currentArticle.title"
                :description="currentArticle.description"
                inline-template>

                <div class="container">
                    <network class="network" network="twitter">
                        <img src="@/assets/social/twitter.svg" alt="twitter" 
                        :style='{width: "25px", height: "25px", filter: "brightness(0%)", cursor: "pointer"}'>
                    </network>
                    <network class="network" network="facebook">
                        <img src="@/assets/social/facebook.svg" alt="facebook" 
                        :style='{width: "25px", height: "25px", filter: "brightness(0%)", cursor: "pointer"}'>
                    </network>
                    <network class="network" network="linkedin">
                        <img src="@/assets/social/linkedin.svg" alt="linkedin" 
                        :style='{width: "25px", height: "25px", filter: "brightness(0%)", cursor: "pointer"}'>
                    </network>
                    <network class="network" network="telegram">
                        <img src="@/assets/social/telegram.svg" alt="telegram" 
                        :style='{width: "25px", height: "25px", filter: "brightness(0%)", cursor: "pointer"}'>
                    </network>
                </div>
            </social-sharing>
        </div>

        <div class="bg-black" @click='closeSocialComponent'></div>
    </div>
</template>

<script>
export default {
    props: ['currentArticle'],
    name: 'socialShareComponent',
    mounted () {
      console.log(this.currentArticle)  
    },
    methods: {
        closeSocialComponent() {
            this.$emit('closeSocialComponent')
        }
    }
}
</script>

<style scoped lang='scss'>
    .chooseSocialShare {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0; bottom: 0; left: 0; right: 0;
        z-index: 100;

        .popup {
            position: relative;
            display: flex;
            flex-direction: column;
            text-align: center;
            width: 500px;
            height: auto;
            padding: 25px 0px;
            background-color: white;
            z-index: 101;

            h3 {
                font-family: "BebasNeue Regular";
            }

            .container {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
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