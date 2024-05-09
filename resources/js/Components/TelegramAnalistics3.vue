<template>
    <div class="work_area">
        <div class="tabs_area">
            <div class="tabs_area_body_wrapper">
                <div class="tabs_area_body">
                    <!-- Таблица Статистика Дельта-->
                    <div v-if="vueStore.loading == false">
                        <cost-table-delta-telegram/>
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
    import CostTableDeltaTelegram from './Statistics/CostTableDeltaTelegram.vue';

    export default {
        name: "TelegramAnalistics3",
        
        components: {
            'table-list-all'            : TableListTelegram,
            'cost-table-telegram'       : CostTableTelegram,
            'cost-table-delta-telegram' : CostTableDeltaTelegram,
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