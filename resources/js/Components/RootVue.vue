<template>
    <div class="work_area">
        <div class="tabs_area">
            <div class="tabs_area_header_wrapper">
                <div class="tabs_area_header">

                    <div class="table_list_header">
                        <select name="period" id="peiod_select" @change="onPeriodChange($event)">
                            <option value="YESTERDAY">Вчера</option>
                            <option value="LAST_WEEK">Неделя</option>
                            <option value="THIS_MONTH">Месяц</option>
                            <option value="LAST_MONTH">Предыдущий месяц</option>
                        </select>
                    </div>

                    <div class="tab_button" :class="activeTab == 0 ? 'active' : false" @click="setActiveTab(0)">Все</div>
                    <div class="tab_button" :class="activeTab == 1 ? 'active' : false" @click="setActiveTab(1)">CPC</div>
                    <div class="tab_button" :class="activeTab == 2 ? 'active' : false" @click="setActiveTab(2)">CTR</div>
                    <div class="tab_button" :class="activeTab == 3 ? 'active' : false" @click="setActiveTab(3)">Статистика</div>
                    <div class="tab_button" :class="activeTab == 5 ? 'active' : false" @click="setActiveTab(5)">Аутсайдеры</div>
                    
                    <div class="tab_button constructor" :class="activeTab == 4 ? 'active' : false" @click="setActiveTab(4)">
                        <div>Конструктор</div>
                        <div v-if="ungroupedCompaignsCount > 0" class="bubble">{{ ungroupedCompaignsCount }}</div>
                    </div>
                </div>
            </div>

            <div v-if="vueStore.loading == false && activeTab == 0" class="table_header_wrapper">
                <div class="table_header">
                    <div class="table_header_item">Категория</div>
                    <div class="table_header_item">Расход с НДС</div>
                    <div class="table_header_item">Показов</div>
                    <div class="table_header_item">Кликов</div>
                </div>
            </div>

            <div v-if="vueStore.loading == false && activeTab == 1" class="table_header_wrapper">
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
            </div>

            <div v-if="vueStore.loading == true" class="pre_loader">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
                <div>Загрузка ...</div>
            </div>

            <div class="tabs_area_body_wrapper">
                <div class="tabs_area_body">
                    <!-- Таблица Все-->
                    <div v-if="vueStore.loading == false && activeTab == 0" class="tab_panel table" :class="activeTab == 0 ? 'active' : false" >
                        <table-list-all/>
                    </div>

                    <!-- Таблица CPC-->
                    <div v-if="vueStore.loading == false && activeTab == 1" class="tab_panel table" :class="activeTab == 1 ? 'active' : false" >
                        <table-list-cpc/>
                    </div>

                    <!-- Таблица CTR-->
                    <div v-if="vueStore.loading == false && activeTab == 2" class="tab_panel table" :class="activeTab == 2 ? 'active' : false" >
                        <table-list-ctr/>
                    </div>

                    <!-- Таблица Статистика-->
                    <div v-if="vueStore.loading == false && activeTab == 3" class="tab_panel table" :class="activeTab == 3 ? 'active' : false" >
                        <cost-table/>
                    </div>

                    <!-- Конструктор -->
                    <div v-if="vueStore.loading == false && activeTab == 4" class="tab_panel constructor" :class="activeTab == 4 ? 'active' : false">
                        <!-- left -->
                        <div class="tab_panel_left"><groups-list/></div>
    
                        <!-- right -->
                        <div class="tab_panel_right"><campaign-list/></div>
                    </div>

                    <!-- Аутсайдеры -->
                    <div v-if="vueStore.loading == false && activeTab == 5" class="tab_panel table" :class="activeTab == 5 ? 'active' : false" >
                        <out-siders/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
    @import "./RootVue.scss";
</style>

<script>
    import {ref} from 'vue'
    import TableList from './TableAll/TableList.vue';
    import TableListCPC from './TableCPC/TableListCPC.vue';
    import TableListCTR from './TableCTR/TableListCTR.vue';
    import GroupsList from './GroupsList.vue';
    import CampaignList from './CampaignList.vue';
    import CostTable from './Statistics/CostTable.vue';
    import OutSiders from './OutSiders.vue';

    export default {
        name: "RootVue",
        
        components: {
            'table-list-all'    : TableList,
            'table-list-cpc'    : TableListCPC,
            'table-list-ctr'    : TableListCTR,
            'groups-list'       : GroupsList,
            'campaign-list'     : CampaignList,
            'cost-table'        : CostTable,
            'out-siders'        : OutSiders,
        },

        computed : {
            ungroupedCompaignsCount() {
                const array = Array
                        .from(this.vueStore.campaignsMap)
                        .filter(item => item[1].parentId == -1)
                return (array.length) ? array.length : 0
            },
        },

        setup(){
            const activeTab = ref(0)
            const vueStore = window._vueStore;

            return {
                activeTab,
                vueStore,
            }
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