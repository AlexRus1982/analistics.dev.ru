<template>
    <div class="work_area">
        <div class="tabs_area">
            <div class="tabs_area_header">
                <div 
                    class="tab_button" 
                    :class="activeTab == 0 ? 'active' : false" 
                    @click="onOtchetTabClick"
                >
                    Отчет
                </div>
                <div 
                    class="tab_button" 
                    :class="activeTab == 1 ? 'active' : false"
                    @click="onConstructTabClick"
                >
                    Конструктор
                </div>
            </div>
            <div class="tabs_area_body">
                <!-- Таблица -->
                <div 
                    class="tab_panel" 
                    :class="activeTab == 0 ? 'active' : false" 
                    @click="onOtchetTabClick"
                >
                    Отчет
                    {{ vueStore.arr[0] }}
                </div>

                <!-- Конструктор -->
                <div 
                    class="tab_panel constructor" 
                    :class="activeTab == 1 ? 'active' : false"
                    @click="onConstructTabClick"
                >
                    <!-- left -->
                    <div class="tab_panel_left">
                        <groups-list/>
                    </div>

                    <!-- right -->
                    <div class="tab_panel_right">
                        <campaign-list/>
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
    import GroupsList from './GroupsList.vue';
    import CampaignList from './CampaignList.vue';

    export default {
        name: "RootVue",
        
        components: {
            'groups-list'   : GroupsList,
            'campaign-list' : CampaignList,
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

            onOtchetTabClick(){
                this.activeTab = 0
            },
            
            onConstructTabClick(){
                this.activeTab = 1
            }

        }
    }
</script>