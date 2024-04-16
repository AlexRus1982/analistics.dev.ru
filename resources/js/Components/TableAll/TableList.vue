<template>
    <div class="table_list_body">

        <hub-table />
        <hub-sub-table />
        
    </div>

</template>

<style lang="scss" scoped>

    .table_list_body {
        width: 100%;
        max-width: 800px;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 75px;
    }

</style>

<script>
    import {ref} from 'vue'
    import HubTable from './HubTable.vue';
    import HubSubTable from './HubSubTable.vue';

    export default {
        name: "TableList",

        components: {
            'hub-table'         : HubTable,
            'hub-sub-table'     : HubSubTable,
        },

        computed : {
            allClicks() {
                return String(this.vueStore.allClicksValue).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
            },
            
            allCoasts() {
                return String(this.vueStore.allCostValue.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'
            },

            allImpressions() {
                return String(this.vueStore.allImpressionsValue).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
            },

        },

        setup(){
            const vueStore = window._vueStore;
            const allExpander = ref(false)

            return {
                vueStore,
                allExpander,
            }
        },

        methods:{
            onAllExpanderClick() {
                this.allExpander = !this.allExpander
            }
        }
    }
</script>