<template>
    <div class="fullArticle">
        <div class="atricle">
            <img src="@/assets/images/articleImage.jpg">
            <h2>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
            et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
            exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
            Quis autem vel eum iure reprehenderit qui in ea voluptate 
            velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fullArticle',
    data() {
        return {
            articleId: null,
        }
    },
    beforeCreate () {
        this.articleId = this.$route.params.id;
    },
    created () {
        window.scrollTo(0,0);
    }
}
</script>

<style scoped lang='scss'>
    .fullArticle {
        display: flex;
        justify-content: center;
        width: 100%;

        .atricle {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: 125px;
            width: 80%;

            img {
                width: 100%;
            }

            h2 {
                font-family: "BebasNeue Regular";
                margin-top: 25px;
            }

            p {
                margin-top: 15px;
            }
        }
    }
</style>