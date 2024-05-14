<template>
    <div class="work_area">
        <div class="tabs_area">

            <div class="tabs_area_header_wrapper">
                <div class="tabs_area_header">
                    <table-list-header/>
                    <header-tabs/>
                </div>
            </div>

            <preloader/>

            <div class="tabs_area_body_wrapper">
                <div class="tabs_area_body">
                    <!-- Картинки объявлений -->
                    <div v-if="vueStore.loading == false" class="tab_panel table active">
                        <div v-for="[key, campaign] in vueStore.campaignsImages" class="campaign_wrapper">
                            <div class="campaign_name">{{ getCampaign(key).Name }}</div>
                            <div class="ad_image_wrapper">
                                <img v-for="adImage in getCampaignImages(key)" :src= "adImage.PreviewUrl" :alt="adImage.Name" :title="adImage.Name">
                            </div>
                        </div>

                        <div class="page_paginate_wrapper">
                            <div v-for="n in allPages" class="page_paginate_item_wrapper">
                                <div v-if="n==currentPage" class="page_paginate_item active">{{ n }}</div>
                                <div v-else class="page_paginate_item" @click="goToPage(n)">{{ n }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
    @import "./rootView.scss";

    .tab_panel.table.active {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding-top: 20px;
    }

    .campaign_wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 800px;
        // box-shadow: 0px 0px 4px #0004;
        border-bottom: 1px solid #0004;

        .campaign_name {
            display: flex;
            width: 100%;
            justify-content: center;
        }

        .ad_image_wrapper {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            gap: 5px;

            img {
                width: 75px;
                height: 75px;
                object-fit:cover;
            }
        }
    }

    .page_paginate_wrapper {
        display: flex;
        flex-direction: row;
        gap: 10px;

        .page_paginate_item {
            padding: 5px;
            border: 1px solid #0004;
            
            &.active {
                font-weight: 600;
            }

            &:not(.active) {
                cursor: pointer;
            }
        }
    }
</style>

<script>
    import {ref} from 'vue'
    import { useRoute } from "vue-router";

    import TableListHeader from './tableListHeader.vue'
    import HeaderTabs from './headerTabs.vue'
    import Preloader from './preloader.vue'

    export default {
        name: "adImagesView",
        
        components: {
            'table-list-header' : TableListHeader,
            'header-tabs'       : HeaderTabs,
            'preloader'         : Preloader,
        },

        setup(){
            const activeTab = ref(0)
            const vueStore = window._vueStore;
            
            const route = useRoute()
            const currentPage = (route.query.page) ? route.query.page : 1
            console.debug('page ===> ' + currentPage)

            vueStore.loadAdImages(currentPage)
            
            // this.campaignsImages
            // this.adCampaignsMap

            return {
                activeTab,
                vueStore,
                currentPage,
                route,
            }
        },

        computed : {
            allPages() {
                const allPagesLength = Array.from(this.vueStore.adCampaignsMap.values()).length
                const itemsPerPage = 10
                const ceilPagesDiv = Math.ceil(allPagesLength / itemsPerPage)
                const allPages = (allPagesLength - ceilPagesDiv * itemsPerPage) > 0 ? ceilPagesDiv + 1 : ceilPagesDiv;
                console.debug(allPages)

                return allPages
            },

        },

        methods: {
            getCampaign(key) {
                const campaign = this.vueStore.adCampaignsMap.get(`${key}`)
                return campaign
            },

            getCampaignImages(key) {
                const campaignImages = this.vueStore.campaignsImages.get(`${key}`)
                // console.debug(campaignImages)
                return campaignImages
            },

            goToPage(pageNum) {
                console.debug(this.$route.path)
                window.location.href = `${this.$route.path}?page=${pageNum}`;

                // this.$router.push(`${this.$route.path}?page=${pageNum}`)
            },
        }
    }
</script>