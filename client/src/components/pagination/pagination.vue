<template>
    <div class="pagination">
        <div class="main">
            <!-- <span class="pageNum" @click='changePage(pages.first - 1)'>{{ pages.first - 1 }}</span>
            <span class="pageNum" @click='changePage(pages.first)'>{{ pages.first }}</span>
            <span class="pageNum" @click='changePage(pages.first + 1)'>{{ pages.first + 1 }}</span>
            <span>...</span>
            <span class="pageNum" @click='changePage(pages.last - 1)'>{{ pages.last - 1 }}</span>
            <span class="pageNum" @click='changePage(pages.last)'>{{ pages.last }}</span>
            <span class="pageNum" @click='changePage(pages.last + 1)'>{{ pages.last + 1 }}</span> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'paginationComponent',
    data() {
        return {
            pagination: { 
                totalItems: 150,
                currentPage: 1,
                pageSize: 10,
                totalPages: 15,
                startPage: 1,
                endPage: 10,
                startIndex: 0,
                endIndex: 9,
                pages: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] 
            }
        }
    },
    mounted () {
        this.paginate(150, 2, 10, 15)
    },
    methods: {
        changePage(page) {
            console.log(page)
        },
        paginate(
            totalItems,
            currentPage = 1,
            pageSize = 10,
            maxPages = 10
        ) {
            // calculate total pages
            let totalPages = Math.ceil(totalItems / pageSize);

            // ensure current page isn't out of range
            if (currentPage < 1) {
                currentPage = 1;
            } else if (currentPage > totalPages) {
                currentPage = totalPages;
            }

            let startPage;
            let endPage;
            if (totalPages <= maxPages) {
                // total pages less than max so show all pages
                startPage = 1;
                endPage = totalPages;
            } else {
                // total pages more than max so calculate start and end pages
                let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
                let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
                if (currentPage <= maxPagesBeforeCurrentPage) {
                    // current page near the start
                    startPage = 1;
                    endPage = maxPages;
                } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                    // current page near the end
                    startPage = totalPages - maxPages + 1;
                    endPage = totalPages;
                } else {
                    // current page somewhere in the middle
                    startPage = currentPage - maxPagesBeforeCurrentPage;
                    endPage = currentPage + maxPagesAfterCurrentPage;
                }
            }

            // calculate start and end item indexes
            let startIndex = (currentPage - 1) * pageSize;
            let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

            // return object with all pager properties required by the view
            console.log({
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            })
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    }
}
</script>

<style scoped lang='scss'>
    .pagination {
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
        margin-top: 35px;

        .main {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 200px;

            span {
                font-family: "BebasNeue Regular";
                cursor: default;
            }

            .pageNum {
                cursor: pointer;
                color: black;
                font-size: 16px;
            }
        }
    }
</style>