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
                    <!-- Конструктор -->
                    <div v-if="vueStore.loading == false" class="tab_panel constructor active">
                        <!-- left -->
                        <div class="tab_panel_left"><groups-list/></div>
    
                        <!-- right -->
                        <div class="tab_panel_right"><campaign-list/></div>
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
    import GroupsList from '../GroupsList.vue'
    import CampaignList from '../CampaignList.vue'
    import TableListHeader from './tableListHeader.vue'
    import HeaderTabs from './headerTabs.vue'
    import Preloader from './preloader.vue'

    export default {
        name: "outsidersView",
        
        components: {
            'groups-list'       : GroupsList,
            'campaign-list'     : CampaignList,
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