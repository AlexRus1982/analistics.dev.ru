<template>
    <div class="hubs_groups">

        <div class="table_header">
            <div class="table_header_item">{{ group.groupName }}</div>
            <div class="table_header_item"></div>
            <div class="table_header_item"></div>
        </div>

        <sub-groups-item v-for="[key, subGroup] in subGroups" :groupId="subGroup.groupId" />

    </div>
</template>

<style lang="scss" scoped>
    .hubs_groups {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        .table_header, .table_row {
            display: flex;
            flex-direction: row;

            .table_header_item, .table_row_item {
                width: 134px;
                height: 39px;
                border: none;
                display: flex;
                align-items: center;
                justify-content: end;
                background-color: #F1F2F2;
                padding-left: 10px;
                padding-right: 10px;

                &:first-child {
                    width: 278px;
                    justify-content: left;
                }
            }

            .table_row_item {
                position: relative;

                &:nth-child(2) {
                    .back_cell {
                        background-color: #fbceb5;
                    }
                }

                .back_cell {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    height: 100%;
                    width: 75%;
                    background-color: #b5fbdd;
                    z-index: 1;
                }

                .front_cell {
                    position: absolute;
                    display: flex;
                    top: 0px;
                    right: 10px;
                    height: 100%;
                    width: 0%;
                    z-index: 2;
                    align-items: center;
                    justify-content: flex-end;
                    text-wrap: nowrap;
                }
            }

            .table_row_item {
                background-color: #FFF;
            }

            .table_header_item {
                justify-content: center;
                border-right: 1px solid #FFF0;

                &:first-child {
                    justify-content: left;
                    border-left: 1px solid #FFF0;
                }
            }
        }

        .table_header {

            .table_header_item {
                border-bottom: 1px solid #A2A2A2;
            }
        }

        .table_row {
            
            .table_row_item {
                border-right: 1px solid #A2A2A2;
                border-bottom: 1px solid #A2A2A2;

                &:first-child {
                    border-left: 1px solid #A2A2A2;
                }
            }
        }
    }
</style>

<script>
    import SubGroupsItem from './SubGroupsItem.vue'

    export default {
        name: "SubGroupsTable",

        props: ['groupId'],

        components: {
            'sub-groups-item'   : SubGroupsItem,
        },

        computed : {
            group(){
                const group = this.vueStore.groupsMap.get(`${this.groupId}`)
                // console.debug('===>', this.groupId, group)
                return group
            },

            subGroups(){
                const subGroups = 
                    Array
                    .from(this.vueStore.groupsMap)
                    .filter(value => value[1].parentGroupId == this.groupId)
                    .sort((first, second) => first[1].groupOrder - second[1].groupOrder)
                return subGroups
            },


        },

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        methods:{

        }
    }
</script>