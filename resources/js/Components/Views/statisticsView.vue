<template>
    <div class="work_area">
        <div class="tabs_area">

            <div class="tabs_area_header_wrapper">
                <div class="tabs_area_header">
                    <table-list-header/>
                    <header-tabs/>
                </div>
            </div>

            <div v-if="vueStore.loading == false" class="table_header_wrapper" style="position: relative; top: 0px; z-index: 0;">
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

            <preloader/>

            <div class="tabs_area_body_wrapper">
                <div class="tabs_area_body">
                    <!-- Таблица Статистика-->
                    <div v-if="vueStore.loading == false" class="tab_panel table active">
                        <cost-table/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
    @import "./rootView.scss";
</style>

<script>
    import {ref} from 'vue'
    import CostTable from '../Statistics/CostTable.vue';
    import TableListHeader from './tableListHeader.vue'
    import HeaderTabs from './headerTabs.vue'
    import Preloader from './preloader.vue'

    export default {
        name: "statisticsView",
        
        components: {
            'cost-table'        : CostTable,
            'table-list-header' : TableListHeader,
            'header-tabs'       : HeaderTabs,
            'preloader'         : Preloader,
        },

        setup(){
            const activeTab = ref(0)
            const vueStore = window._vueStore;

            return {
                activeTab,
                vueStore,
            }
        },
    }
</script>