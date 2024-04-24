<template>
    <div class="work_area">
        <div class="tabs_area">
            <!-- <div v-if="vueStore.loading == true" class="pre_loader">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
                <div>Загрузка ...</div>
            </div> -->

            <!-- <div v-if="vueStore.loading == false && activeTab == 1" class="table_header_wrapper">
                <div class="table_header">
                    <div class="table_header_item" style="width: 280px;">Категория</div>
                    <div class="table_header_item">Расход с НДС</div>
                    <div class="table_header_item">Кликов</div>
                </div>
            </div>

            <div v-if="vueStore.loading == false && activeTab == 2" class="table_header_wrapper">
                <div class="table_header">
                    <div class="table_header_item" style="width: 280px;">Категория</div>
                    <div class="table_header_item">Показов</div>
                    <div class="table_header_item">Кликов</div>
                </div>
            </div>

            <div v-if="vueStore.loading == false && activeTab == 3" class="table_header_wrapper" style="position: relative; top: 0px; z-index: 0;">
                <div class="table_header">
                    <div class="table_header_item" style="width: 200px; padding-left: 5px; padding-right: 5px">Тип кампании</div>
                    <div class="table_header_item" style="width: 100px; padding-left: 5px; padding-right: 5px">Траты</div>
                    <div class="table_header_item" style="width: 100px; padding-left: 5px; padding-right: 5px">Показов</div>
                    <div class="table_header_item" style="width: 100px; padding-left: 5px; padding-right: 5px">Кликов</div>
                    <div class="table_header_item" style="width: 100px; padding-left: 5px; padding-right: 5px; margin-left: 10px;">Кол-во</div>
                    <div class="table_header_item" style="width: 100px; padding-left: 5px; padding-right: 5px">CPC</div>
                    <div class="table_header_item" style="width: 100px; padding-left: 5px; padding-right: 5px">CTR</div>
                </div>
            </div> -->

            <div class="tabs_area_body_wrapper">
                <div class="tabs_area_body">
                    <!-- Таблица Статистика-->
                    <div v-if="vueStore.loading == false">
                        <cost-table-telegram/>
                    </div>

                    <div v-if="vueStore.loading == false" class="block_title">Данные за вчерашний день - {{ yesterday }}</div>

                    <!-- Таблица Все-->
                    <div v-if="vueStore.loading == false">
                        <div class="table_header_wrapper" style="position: relative; top: 0px; z-index: 0;">
                            <div class="table_header">
                                <div class="table_header_item">Категория</div>
                                <div class="table_header_item">Расход с НДС</div>
                                <div class="table_header_item">Показов</div>
                                <div class="table_header_item">Кликов</div>
                            </div>
                        </div>
                        <table-list-all/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss">
    @import "./RootVue.scss";

    .block_title {
        font-size: 1.3rem;
        font-weight: 600;
        width: 100%;
        max-width: 800px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: -60px;
    }

    .tab_area {
        height: 0px;
    }

    .tabs_area_body_wrapper {
        min-height: 0px!important;
    }
</style>

<script>
    import {ref} from 'vue'
    import TableListTelegram from './TableAll/TableListTelegram.vue';
    import CostTableTelegram from './Statistics/CostTableTelegram.vue';

    export default {
        name: "TelegramAnalistics",
        
        components: {
            'table-list-all'        : TableListTelegram,
            'cost-table-telegram'   : CostTableTelegram,
        },

        setup(){
            const activeTab = ref(0)
            const vueStore = window._vueStore;

            return {
                activeTab,
                vueStore,
            }
        },

        computed : {
            yesterday : function() {
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                return yesterday.toLocaleString('ru', {
                    day     : 'numeric',
                    month   : 'long',
                    year    : 'numeric',
                });
            },
        },

        methods:{
            setActiveTab(tabNumber) {
                this.activeTab = tabNumber
            },

            onPeriodChange(event) {
                console.log(event.target.value)
                window._vueStore.setup(event.target.value)
            },
        }
    }
</script>