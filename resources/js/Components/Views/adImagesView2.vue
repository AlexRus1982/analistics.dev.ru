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

            <div v-if="vueStore.loading == false" class="tabs_area_body_wrapper">
                <div class="tabs_area_body ad_images">

                    <!-- панель со списком -->
                    <div class="campaigns_list_wrapper">

                        <div class="campaigns_list_filter">
                            <input type="text" placeholder="Фильтр" @input="onChangeFilter($event)"/>
                        </div>

                        <div class="campaigns_list_item_header">
                            <div class="campaigns_list_item_header_label">
                                Компании ({{ getCampaignsCount }})
                            </div>

                            <div class="campaigns_list_item_header_count">
                                Кол-во ({{ getImagesCount }})
                            </div>
                        </div>

                        <div class="campaigns_list_scroller">
                            <div class="campaigns_list">
                                <div 
                                    v-for="item in getFilteredCampaigns" 
                                    class="campaigns_list_item"
                                    :class="activeItemId == item.Id ? 'active' : false"
                                    @click="onItemClick(item.Id)"
                                >
                                    <div class="campaigns_list_item_label">
                                        {{ item.Name }}
                                    </div>

                                    <div class="campaigns_list_item_count">
                                        {{ item.picturesNumber }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- панель с картинками кампании -->
                    <div class="campaigns_ad_images_list_wrapper">
                        <div v-if="loadingImages == true" class="images_pre_loader">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                            <div>Загрузка ...</div>
                        </div>
                        
                        <div v-if="loadingImages == false" class="campaign_info">
                            <label for="grouped" style="margin-right: auto;">Группировать</label>
                            <input 
                                type="checkbox"
                                name="grouped"
                                id="grouped"
                                style="cursor: pointer;"
                                :checked="activeImagesGroupedInput"
                                @input="onImagesGroupedInputChanged($event)"/>
                        </div>

                        <div v-if="loadingImages == false" class="campaign_info">
                            {{ activeCampaign?.Name }}<span v-if="activeCampaign" @click="onCampaignLinkCLicked(activeCampaign.Id)">(Перейти)</span>
                        </div>
                        <div v-if="loadingImages == false && activeImagesGroupedInput == false" class="ad_image_wrapper">
                            <img class="ad_list_image_item"
                                v-for="[adItem, adImage] in activeImages" 
                                :src= "adImage.PreviewUrl"
                                :alt="adImage.Name"
                                :title="adImage.Name"
                                @click="onNotGroupedImageClicked($event, adItem, adImage)"
                            >
                        </div>
                        <div v-if="loadingImages == false && activeImagesGroupedInput == true" class="ad_image_wrapper">
                            <div class="ad_list_wrapper" v-for="adImage in activeImagesGrouped">
                                <img class="ad_list_image_item"
                                    :src= "adImage.PreviewUrl"
                                    :alt="adImage.Name"
                                    :title="adImage.Name"
                                    @click="onImageClicked($event, adImage.AdImageHash)"
                                >
                                <div class="image_counter">
                                    {{ getActiveImagesCount(adImage.AdImageHash) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- панель с инфо о картинке -->
                    <div class="campaigns_ad_image_info_wrapper">
                        <div v-if="selectedImage" class="selected_image">
                            <div class="image_wrapper">
                                <img :src="selectedImage.OriginalUrl">
                                <div class="image_counter">
                                    {{ getActiveImagesCount(selectedImage.AdImageHash) }}
                                </div>
                            </div>
                            <div class="period_label">Данные за прошлые 10 дней</div>
                            <div class="info_header">
                                <div class="id">id</div>
                                <div class="impressions">Показов</div>
                                <div class="clicks">Кликов</div>
                                <div class="ctr">CTR</div>
                            </div>
                            <div v-for="ads of selectedImageAds" class="info_row">
                                <div class="id">{{ ads.Id }}</div>
                                <div class="impressions">{{ (ads.Impressions) ? ads.Impressions : '0' }}</div>
                                <div class="clicks">{{ (ads.Clicks) ? ads.Clicks : '0' }}</div>
                                <div class="ctr">{{ (ads.Ctr) ? ads.Ctr : '0.000 %' }}</div>
                            </div>
                        </div>

                        <div v-if="selectedImage && activeImagesGroupedInput == false" class="selected_image_check">
                            Пометить
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
    @import "./rootView.scss";
    
        .images_pre_loader {
            width: 100%;
            height: calc(100vh - 170px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 10000;

            svg {
                animation-name: apps-loader-rotation;
                animation-duration: 2s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
        }
    
        @keyframes apps-loader-rotation {
            0% {
                transform:rotate(0deg);
            }
            100% {
                transform:rotate(360deg);
            }
        }

    .tabs_area_body.ad_images{
        max-width: 1200px !important;
        display: grid;
        // flex-direction: row;
        grid-template-columns: minmax(200px, 400px) 450px 300px;

        .campaigns_list_wrapper {
            margin-right: 10px;

            .campaigns_list_filter {
                width: 100%;
                display: flex;
                margin: 10px 0;
                justify-content: center;
                
                input {
                    width: calc(100% - 55px);
                    height: 20px;
                    padding: 10px;
                    outline: none;
                }
            }

            .campaigns_list_item_header {
                display: flex;
                flex-direction: row;
                font-weight: 600;
                padding: 10px;

                .campaigns_list_item_header_label {
                    margin-left: 5px;
                }

                .campaigns_list_item_header_count {
                    margin-left: auto;
                    margin-right: 15px;
                }
            }

            .campaigns_list_scroller {
                height: calc(100vh - 170px);
                overflow-y: auto;
                width: 100%;

                .campaigns_list {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    overflow-x: hidden;
    
                    .campaigns_list_item {
                        display: flex;
                        text-wrap: nowrap;
                        text-overflow: ellipsis;
                        overflow-x: hidden;
                        transition: 0.3s;
                        padding: 10px 15px;
                        border: 2px solid #09F0;
                        border-radius: 5px;
                        
                        &:hover {
                            cursor: pointer;
                            border: 2px solid #09F7;
                        }

                        &.active {
                            box-shadow: inset 2px 0px 4px #09F7;
                            font-weight: 600;
                            background: #09F2;
                        }

                        .campaigns_list_item_label {
                            font-size: 1rem;
                        }

                        .campaigns_list_item_count {
                            margin-left: auto;
                            margin-right: 0px;
                        }
                    }
                }
            }
        }

        .campaigns_ad_images_list_wrapper {
            border-left: 1px solid #0004;
            border-right: 1px solid #0004;
            padding: 10px;
            
            .campaign_info {
                display: flex;
                align-items: center;
                font-weight: 600;
                height: 40px;

                span {
                    margin-left: 10px;
                    cursor: pointer;
                    color: #09F;
                }
            }

            .ad_image_wrapper {
                display: flex;
                align-content: flex-start;
                flex-wrap: wrap;
                width: 100%;
                height: calc(100vh - 125px);
                overflow-y: auto;
                gap: 5px;
                padding: 5px;

                img {
                    width: 75px;
                    height: 75px;
                    object-fit: contain;
                    border: 1px solid #0002;
                    transition: 0.3s;

                    &:hover:not(.active) {
                        cursor: pointer;
                        // box-shadow: 0px 0px 8px #F00;
                        transform: scale(1.1);
                        box-shadow: 0px 0px 16px #F00;
                        border: 1px solid #0000;
                    }

                    &.active {
                        box-shadow: 0px 0px 8px #09F;
                        border: 1px solid #09F;
                    }
                }

                .ad_list_wrapper {
                    position: relative;
                    
                    .image_counter {
                        position: absolute;
                        right: 5px;
                        bottom: 10px;
                        background: #FFF;
                        border: 1px solid #000;
                        padding: 2px 6px;
                        border-radius: 50%;
                        font-size: 12px;
                    }
                }

            }
        }

        .campaigns_ad_image_info_wrapper {
            width: calc(100% - 10px);
            padding-left: 10px;
            padding-top: 10px;
            overflow-x: hidden;

            .selected_image {
                .period_label {
                    margin: 10px 0px;
                }

                .id {
                    width: 200px;
                }

                .impressions {
                    width: 100px;
                }
                
                .clicks {
                    width: 100px;
                }

                .ctr {
                    width: 100px;
                }

                .info_header, .info_row {
                    display: flex;
                    flex-direction: row;
                    font-size: 0.75rem;
                }

                .info_header {
                    background: yellow;
                }


                img {
                    width: 100%;
                    object-fit: contain;
                }

            }

            .selected_image_check {
                margin: 10px 0px;
                padding: 10px 30px;
                background: #777;
                color: #FFF;
                width: fit-content;
                border-radius: 5px;
            }

            .image_wrapper {
                position: relative;
                
                .image_counter {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    right: 5px;
                    bottom: 10px;
                    background: #FFF;
                    border: 1px solid #000;
                    border-radius: 50%;
                    font-size: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }

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
            const filterValue = ref('')
            const activeItemId = ref(-1)
            const activeImages = ref([])
            const activeImagesGrouped = ref([])
            const activeImagesGroupedInput = ref(false)
            const activeCampaign = ref(null)
            const selectedImage = ref(null)
            const selectedImageNotGrouped = ref(null)
            const selectedImageGrouped = ref(null)
            const selectedImageAds = ref(null)
            const loadingImages = ref(false)
            const adsArray = null
            let filterTimeOut = null
            const vueStore = window._vueStore
            
            // const route = useRoute()
            // const currentPage = (route.query.page) ? route.query.page : 1
            // console.debug('page ===> ' + currentPage)

            // vueStore.loadAdImages(currentPage)
            
            // this.campaignsImages
            // this.adCampaignsMap

            return {
                adsArray,
                activeTab,
                filterValue,
                filterTimeOut,
                activeCampaign,
                activeItemId,
                loadingImages,
                activeImages,
                activeImagesGrouped,
                activeImagesGroupedInput,
                selectedImage,
                selectedImageNotGrouped,
                selectedImageGrouped,
                selectedImageAds,
                vueStore,
                // currentPage,
                // route,
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

            getFilteredCampaigns() {
                let arrayList = Array.from(this.vueStore.adCampaignsMap.values())
                arrayList = arrayList.filter(item => this.filterValue == '' || String(item.Name).toLowerCase().indexOf(this.filterValue) >= 0)
                // console.debug(arrayList)
                return arrayList
            },

            getCampaignsCount() {
                let arrayList = Array.from(this.vueStore.adCampaignsMap.values())
                arrayList = arrayList.filter(item => this.filterValue == '' || String(item.Name).toLowerCase().indexOf(this.filterValue) >= 0)
                return arrayList.length
            },

            getImagesCount() {
                let arrayList = Array.from(this.vueStore.adCampaignsMap.values())
                arrayList = arrayList.filter(item => this.filterValue == '' || String(item.Name).toLowerCase().indexOf(this.filterValue) >= 0)
                return arrayList.reduce((partialSum, a) => partialSum + a.picturesNumber, 0);
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

            onChangeFilter(event) {
                clearTimeout(this.filterTimeOut)
                this.filterTimeOut = setTimeout(() => {
                    // console.debug(event.target.value)
                    this.filterValue = String(event.target.value).toLowerCase()
                }, 500);
            },

            onItemClick(itemId) {
                console.debug(itemId)
                this.selectedImage = null
                this.selectedImageGrouped = null
                this.selectedImageNotGrouped = null
                this.activeItemId = itemId
                this.activeCampaign = this.vueStore.adCampaignsMap.get(`${itemId}`)

                const yandexDirectCampaignAdsPromise = (Id) => new Promise((resolve, reject) => {
                    fetch(`/yandex-direct-campaign-ads?Id=${Id}`)
                    .then(response => response.text())
                    .then(text => {
                        const adsArray = JSON.parse(text).result.Ads.filter(item=>item.State=="ON" && item.TextAd?.AdImageHash)
                        if (adsArray) {
                            const ads = this.vueStore.adCampaignsMap.get(`${Id}`)
                            ads['picturesNumber'] = adsArray.length
                        }

                        console.debug(adsArray)

                        const images = []
                        adsArray.forEach(adsItem => {
                            if(this.vueStore.adImagesMap.get(`${adsItem.TextAd?.AdImageHash}`))
                                images.push([adsItem, this.vueStore.adImagesMap.get(`${adsItem.TextAd.AdImageHash}`)])
                        });

                        const imagesMap = new Map()
                        images.forEach(([adsItem, image]) => {
                            imagesMap.set(`${image.AdImageHash}`, image)
                        });

                        this.activeImages = images
                        // console.debug(images)
                        this.activeImagesGrouped = Array.from(imagesMap.values())
                        this.loadingImages = false
                        this.adsArray = adsArray
                        resolve(true)
                    })
                    .catch(error => {
                        console.log("request failed", error)
                        this.loadingImages = false
                        this.activeImages = []
                    })
                })
                this.loadingImages = true
                yandexDirectCampaignAdsPromise(itemId)
            },

            getActiveImagesCount(imageHash) {
                // console.debug(this.activeImages)
                const count = this.activeImages.filter(item => item[0].TextAd.AdImageHash == imageHash).length
                return count
            },

            onCampaignLinkCLicked(campaignId) {
                window.open(`https://direct.yandex.ru/dna/campaigns-edit?ulogin=artfabric-int&campaigns-ids=${campaignId}`, '_blank').focus()
            },

            onImagesGroupedInputChanged(event) {
                this.selectedImage = null
                this.selectedImageGrouped = null
                this.selectedImageNotGrouped = null
                this.activeImagesGroupedInput = event.target.checked
            },

            onImageClicked(event, imageHash) {
                console.debug(imageHash)
                const image = this.vueStore.adImagesMap.get(`${imageHash}`)
                if (image) {
                    this.selectedImage = image
                }

                const images = document.getElementsByClassName("ad_list_image_item");
                for (const image of images) {
                    image.classList.remove("active")
                }
                
                event.target.classList.toggle('active')

                const ads = this.adsArray.filter(ads => ads.TextAd.AdImageHash == imageHash)
                ads.forEach(item => {
                    const adsSummInfoObject = this.vueStore.adSummInfoMap.get(`${item.Id}`)
                    if (adsSummInfoObject) {
                        item['Cost'] = adsSummInfoObject.Cost
                        item['Clicks'] = adsSummInfoObject.Clicks
                        item['Impressions'] = adsSummInfoObject.Impressions
                        item['Ctr'] = adsSummInfoObject.Ctr
                    }
                });
                console.debug(ads)
                this.selectedImageAds = ads
            },

            onNotGroupedImageClicked(event, adItem, adImage) {
                console.debug(adItem, adImage)
                this.selectedImage = adImage

                const ads = this.adsArray.filter(ads => ads.Id == adItem.Id)
                ads.forEach(item => {
                    const adsSummInfoObject = this.vueStore.adSummInfoMap.get(`${item.Id}`)
                    if (adsSummInfoObject) {
                        item['Cost'] = adsSummInfoObject.Cost
                        item['Clicks'] = adsSummInfoObject.Clicks
                        item['Impressions'] = adsSummInfoObject.Impressions
                        item['Ctr'] = adsSummInfoObject.Ctr
                    }
                });
                console.debug(ads)
                this.selectedImageAds = ads

                const images = document.getElementsByClassName("ad_list_image_item");
                for (const image of images) {
                    image.classList.remove("active")
                }

                event.target.classList.toggle('active')
            },
        }
    }
</script>