<template>
    <div class="content">
        <div class="articles">
            <input type="file" @change="handleFileUpload" ref="file">
            <button @click="submitFile">Submit</button>
            <img :src="imaga" alt="">
            <div class="article" v-for='(article, index) of articles' :key='index'>
                <img class="articleImage" src="@/assets/images/articleImage.jpg" alt="">
                <h3 class="articleTitle">{{ article.title }}</h3>
                <p class="articleDesc">{{ article.description }}</p>


                <div class="articleButtons">
                    <button class="readMore" @click='goToFullArticle(article.id)'>Read More</button>
                    
                    <div class="articleSocial">
                        <img v-if='article.isLike' src="@/assets/icons/heartFill.svg" @click='toggleLike(article)'>
                        <img v-else src="@/assets/icons/heart.svg" @click='toggleLike(article)'>
                        <img src="@/assets/icons/share.svg" alt="share" @click='shareArticle(article)'>
                    </div>
                </div>

            </div>

            <socialShareComponent @closeSocialComponent='closeSocialComponent'
            :currentArticle='currentArticle' v-if='isShowShareComponent'></socialShareComponent>
        </div>

        <paginationComponent></paginationComponent>

    </div>
</template>

<script>
import socialShareComponent from '@/components/chooseSocialShare/chooseSocialShare';
import paginationComponent from '@/components/pagination/pagination';
import articlesService from '@/shared/services/articles.service';

export default {
    name: 'contentComponent',
    components: {
        socialShareComponent,
        paginationComponent,
    },
    data() {
        return {
            isShowShareComponent: false,
            currentArticle: null,
            file: '',
            imaga: '',
            articles: [
                {
                    title: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                    id: 0,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Quis autem vel eum iure reprehenderit qui in ea voluptate 
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"Lorem ipsum dot, consectetur adipiscing elit,',
                    id: 1,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
                    quia voluptas sit aspernatur aut odit aut fugit, sed 
                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui 
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Quis autem vel eum iure reprehenderit qui in ea voluptate 
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"Lorelor sit amet, consectetur adipiscing elit,',
                    id: 2,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui 
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut 
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Quis autem vel eum iure reprehenderit qui in ea voluptate 
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"Lorem ipsum dolor sit ,',
                    id: 3,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    quia voluptas sit aspernatur aut odit aut fugit, sed 
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                    id: 4,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    quia voluptas sit aspernatur aut odit aut fugit, sed 
                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui 
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut 
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Quis autem vel eum iure reprehenderit qui in ea voluptate 
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"psum dolor sit amet, consectetur adipiscing elit,',
                    id: 5,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut 
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"Lorem ipsum dtur adipiscing elit,',
                    id: 6,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
                    quia voluptas sit aspernatur aut odit aut fugit, sed 
                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui 
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut 
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Quis autem vel eum iure reprehenderit qui in ea voluptate 
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"Lorem ipsmet, consectetur adipiscing elit,',
                    id: 7,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
                    quia voluptas sit aspernatur aut odit aut fugit, sed 
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    Quis autem vel eum iure reprehenderit qui in ea voluptate 
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
                {
                    title: '"Loreng elit,',
                    id: 8,
                    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    quia voluptas sit aspernatur aut odit aut fugit, sed 
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut 
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                    exercitationem ullam  suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
                    isLike: false
                },
            ]
        }
    },
    methods: {
        getArticles() {
            articlesService.getArticles('1').then((res) => {
                this.imaga = res.data;
            })
        },

        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },

        submitFile() {

            const formData = new FormData();
            formData.append('title', 'Awmda kawo aaajajjaja');
            // formData.append('image', this.file);
//             formData.append('title', 'Awmda kawo aaajajjaja');
//             formData.append('description', `awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa`);
//             formData.append('query', `aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa`)
//             const data = {
//                 'image': this.file,
//                 'title': 'Awmda kawo aaajajjaja',
//                 'description': `awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa
// aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa`,
//                 'query': `aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaa
// aaaaa aaaaaaaaaa aaa aaaaaaa aaaaaaaaa aaaaa a 
// aaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa awmdamwd[mawaaaaaaaaaaaaaaaaaaaaa`
//             }
            articlesService.testSave(formData).then((res) => {
                console.log(res)
            });
        },

        goToFullArticle(id) {
            this.$router.push({ path: `/main/fullArticle/${id}` });
            // articlesSerivce.testSave();
        },

        toggleLike(article) {
            article.isLike = !article.isLike;
        },

        shareArticle(article) {
            this.isShowShareComponent = true;
            this.currentArticle = article;

        },

        closeSocialComponent() {
            this.isShowShareComponent = false;
            this.currentArticle = null;
        }
    }
}
</script>

<style scoped lang='scss'>
    .content {
        width: 100%;
        height: 100%;
        top: 0;

        .articles {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 125px;
            width: 100%;

            .article {
                width: 65%;
                margin-top: 75px;

                .articleImage {
                    width: 100%;
                }

                .articleTitle {
                    font-family: "BebasNeue Regular";
                    margin-top: 25px;
                }

                .articleDesc {
                    margin-top: 15px;
                }

                .articleButtons {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .readMore {
                        background-color: black;
                        border: none;
                        outline: none;
                        color: white;
                        padding: 5px 10px;
                    }

                    .articleSocial {
                        margin-right: -15px;
                        img {
                            width: 25px;
                            cursor: pointer;
                            margin-right: 25px;
                        }
                    }
                }
            }
        }
    }
</style>