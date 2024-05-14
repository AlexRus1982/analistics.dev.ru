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
                    <!-- Аутсайдеры -->
                    <div v-if="vueStore.loading == false" class="tab_panel table active">
                        <out-siders/>
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
    import OutSiders from '../OutSiders.vue'
    import TableListHeader from './tableListHeader.vue'
    import HeaderTabs from './headerTabs.vue'
    import Preloader from './preloader.vue'

    export default {
        name: "outsidersView",
        
        components: {
            'out-siders'        : OutSiders,
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