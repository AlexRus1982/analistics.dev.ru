<template>
    <div v-if="vueStore.loading == false" class="table">

        <sub-groups-table v-for="[key, group] in hubGroups" :groupId="group.groupId" />

    </div>
</template>

<style lang="scss" scoped>
    .table {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
</style>

<script>
    import SubGroupsTable from './SubGroupsTable.vue'

    export default {
        name: "HubSubTable",

        components: {
            'sub-groups-table'   : SubGroupsTable,
        },

        computed : {
            hubGroups(){
                const hubGroups = 
                    Array
                    .from(this.vueStore.groupsMap)
                    .filter(value => value[1].parentGroupId == "-1")
                    .sort((first, second) => first[1].groupOrder - second[1].groupOrder)
                return hubGroups
            },
        },

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },
    }
</script>