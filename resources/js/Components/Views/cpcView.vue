<template>
    <div class="work_area">
        <div class="tabs_area">

            <div class="tabs_area_header_wrapper">
                <div class="tabs_area_header">
                    <table-list-header/>
                    <header-tabs/>
                </div>
            </div>

            <div v-if="vueStore.loading == false" class="table_header_wrapper">
                <div class="table_header">
                    <div class="table_header_item" style="width: 280px;">Категория</div>
                    <div class="table_header_item">Расход с НДС</div>
                    <div class="table_header_item">Кликов</div>
                </div>
            </div>


            <preloader/>

            <div class="tabs_area_body_wrapper">
                <div class="tabs_area_body">
                    <!-- Таблица CPC-->
                    <div v-if="vueStore.loading == false" class="tab_panel table active" >
                        <table-list-cpc/>
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
    import TableListCPC from '../TableCPC/TableListCPC.vue';
    import TableListHeader from './tableListHeader.vue'
    import HeaderTabs from './headerTabs.vue'
    import Preloader from './preloader.vue'

    export default {
        name: "cpcView",
        
        components: {
            'table-list-cpc'    : TableListCPC,
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