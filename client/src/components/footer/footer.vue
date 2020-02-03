<template>
    <div class="footer">
        <div class="logo">
            <h2>
                <router-link class="link" to="/main">Denzill</router-link>
            </h2>
        </div>

        <div class="copyright">
            <span>Copyright © 2020 MIT by Ilya Verzun</span>
        </div>

        <div class="social">
            <img src="@/assets/social/twitter.svg" alt="twitter">
            <img src="@/assets/social/facebook.svg" alt="facebook">
            <img src="@/assets/social/github.svg" alt="github">
            <img src="@/assets/social/linkedin.svg" alt="linkedin">
            <img src="@/assets/social/telegram.svg" alt="telegram">
        </div>
    </div>
</template>

<script>
export default {
    name: 'footerComponent',
}
</script>

<style scoped lang='scss'>
    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        width: 100%;
        height: 100px;
        margin-top: 75px;
        background-color: black;
        z-index: 50;

        .logo,
        .copyright,
        .social {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 20%;
        }

        .logo {     
            h2 {
                font-family: "ONNIC";

                .link {
                    color: white;
                    text-decoration: none;
                }
            }
        }

        .copyright {
            span {
                color: white;
                font-size: 10px;
            }
        }

        .social {
            img {
                margin-left: 10px;
                width: 17px;
                transition: .2s;
                cursor: pointer;
            }

            img:hover {
                -webkit-filter: invert(50%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2);
                filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(1600%) contrast(0.8);
            }
        }
    }
</style>