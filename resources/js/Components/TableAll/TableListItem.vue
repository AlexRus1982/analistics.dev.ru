<template>
    <tr v-if="isExtended && group && parentExtended" class="group_title">
        <td class="name">
            <div v-for="i in innerLevel" class="level_tab">
                <div class="level_tab_line"></div>
            </div>
            <div v-if="groups.length > 0" class="name_expander" @click="onExpanderClick">
                <svg v-if="group.tableGroupsExtended == false" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <svg v-if="group.tableGroupsExtended == true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
            </div>
            <div class="group_label" :tree_level="group.groupLevel">{{ group.groupName }}</div>
        </td>
        <td class="values_cell">
            <div class="back_cell" :style="{ width: group.CostPerc + '%' }"></div>
            <div class="front_cell">{{ group.CostStr }}</div>
        </td>
        <td class="values_cell">
            <div class="back_cell" :style="{ width: group.ImpressionsPerc + '%' }"></div>
            <div class="front_cell">{{ group.ImpressionsStr }}</div>
        </td>
        <td class="values_cell">
            <div class="back_cell" :style="{ width: group.ClicksPerc + '%' }"></div>
            <div class="front_cell">{{ group.ClicksStr }}</div>
        </td>
    </tr>

    <TableListItem
        v-for="[key, childGroup] of groups"
        :groupId="childGroup.groupId"
        :isExtended="isExtended" 
        :innerLevel="innerLevel + 1"
    />
</template>

<style lang="scss" scoped>
    table, th, td {
        border: 1px solid #0001;
    }

    table {
        width: 100%;

        tr {
            &:hover {
                background-color: #59F2;
            }
            &:first-child {
                height: 50px;
                background-color: #EEE;
            }
            th {
                padding: 10px;
                font-size: 1.1rem;
                &.name {
                    width: 75%;
                    text-align:left;
                }
                &:not(.name) {
                    width: 200px;
                    text-wrap: nowrap;
                }
            }

            td {
                padding: 10px;
                &.name {
                    width: calc(100% - 22px);
                    display: flex;
                    flex-direction: row;
                    text-wrap: nowrap;

                    svg {
                        width: 16px;
                        height: 16px;
                        cursor: pointer;
                        margin-right: 5px;
                    }
                }
                &:not(.name) {
                    width: 200px;
                    min-width: 130px;
                    text-align: right;
                }
            }
        }
    }

    .group_title {
        background-color: #F950;
    }

    .level_tab {
        width: 16px;
        height: 16px;
        position: relative;
        margin-right: 5px;

        .level_tab_line {
            position: absolute;
            height: 44px;
            width: 16px;
            top:-12px;
            left: 6px;
            border-left: 3px solid #59F;
            z-index: 1;
        }

    }

    .values_cell {
        position: relative;

        .back_cell {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100%;
            width: 75%;
            background-color: #0F0;
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
</style>

<script>
    import { computed } from "vue";

    export default {
        name: "TableList",

        props: [
            'isExtended',
            'groupId',
            'innerLevel',
        ],

        computed : {
            test() {
                console.debug(this.props)
                return 0
            },
        },

        setup(props){
            // console.debug(props)
            const vueStore = window._vueStore;
            const allClicks = computed(() => {
                // console.debug(props)
                return 0
            });

            const parentExtended = computed(() => {
                if (props.groupId != -1) {
                    const _group = vueStore.groupsMap.get(`${props.groupId}`)
                    const parentGroup = vueStore.groupsMap.get(`${_group.parentGroupId}`)
                    return parentGroup ? parentGroup.tableGroupsExtended : true
                }
                return true
            });

            const campaigns = computed(() => {
                if (props.groupId != -1) {
                    return Array.from(vueStore.campaignsMap).filter(value => value[1].parentId == props.groupId)
                }
                return []
            });
            
            const group = computed(() => {
                if (props.groupId != -1) {
                    return vueStore.groupsMap.get(`${props.groupId}`)
                }
                return null
            });

            const groups = computed(() => {
                const _groups = 
                    Array
                    .from(vueStore.groupsMap)
                    .filter(value => value[1].parentGroupId == props.groupId)
                    .sort((first, second) => first[1].groupOrder - second[1].groupOrder)
                // console.debug(_groups)
                return _groups
            });

            return {
                vueStore,
                allClicks,
                campaigns,
                group,
                groups,
                parentExtended,
            }
        },

        methods:{
            onExpanderClick() {
                if (this.$props.groupId != -1) {
                    const group = this.vueStore.groupsMap.get(`${this.$props.groupId}`)
                    group.tableGroupsExtended = !group.tableGroupsExtended
                    // console.debug(group)
                }
            }
        }
    }
</script>