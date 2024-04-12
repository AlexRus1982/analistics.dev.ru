<template>
    <modal-window ref="modalWindow">
        <template v-slot:title>
            <h3 class="modal-title">Добавить группу в другую группу</h3>
        </template>

        <template v-slot:body>
            <div  v-for = "item of filteredHierarchyGroupArray" class="group_name" @click="toggleGroup(item[1].groupId)">
                <div class="group_label">{{ item[1].groupName }}</div>
                <div v-if="item[1].chosen" class="group_marker">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </div>
            </div>
        </template>
        
        <template v-slot:footer>
            <button @click="buttonAddClick">Добавить</button>
        </template>
    </modal-window>

    <div class="list_header">
        <div class="add_new_group" title="Создать новую группу" @click="addNewGroup">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </div>
    </div>
    <div class="list_body">
        <group-item v-for = "item of groupsMapArray" :itemData = "item[1]" />
    </div>
</template>

<style lang="scss" scoped>
    .list_header {
        display: flex;
        width: 100%;
        align-items: center;

        .add_new_group {
            cursor: pointer;
            color: #000;
            transition: 0.3s;
            
            svg {
                width: 24px;
                height: 24px;
            }

            &:hover {
                color: #59F;
            }
        }
    }

    .list_body {
        padding: 10px 0px 10px 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-content: flex-start;
        overflow-y: auto;
        width: calc(100% - 10px);
        height: 100%;
        box-shadow: inset 0px 0px 8px #0004;
    }

    .modal {
        &_content {
            .group_name {
                cursor: pointer;
                padding: 5px;
                transition: 0.3s;
                height: 38px;
                display: flex;
                flex-direction: row;
                align-items: center;

                &:hover {
                    background-color: #59F;
                    color: #FFF;
                }

                .group_label {
                    font-size: 1.1rem;
                }

                .group_marker {
                    margin-left: auto;
                }
            }
        }

        button {
            cursor: pointer;
            margin-left: auto;
            background-color: #0971c7;
            color: #fff;
            border: none;
            text-align: center;
            padding: 8px;
            font-size: 17px;
            font-weight: 500;
            border-radius: 8px;
            min-width: 150px;
        }
    }
</style>

<script>
    import {ref} from 'vue'
    import GroupItem from './GroupItem.vue';
    import ModalWindow from './ModalWindow.vue';

    export default {
        name: "GroupsList",

        components: {
            'group-item'    : GroupItem,
            'modal-window'  : ModalWindow,
        },

        computed : {
            groupsMapArray() {
                return Array.from(this.vueStore.groupsMap).filter(item => item[1].parentGroupId == "-1")
            },

            filteredHierarchyGroupArray() {
                const filteredValues = []
                const groupMap = this.vueStore.groupsMap;
                const subItem = groupMap.get(`${this.subGroupId}`)

                function findChildren(item) {
                    filteredValues.push(item.groupId)
                    const filteredChildrenArray = Array.from(groupMap).filter(value => value[1].parentGroupId == item.groupId)
                    for (const child of filteredChildrenArray){
                        const subChild = groupMap.get(`${child[1].groupId}`)
                        findChildren(subChild)
                    }
                }
                findChildren(subItem)

                return Array.from(this.vueStore.groupsMap).filter(value => ! filteredValues.includes(value[1].groupId))
            },
        },

        setup(){
            const vueStore = window._vueStore;
            const currentGroupId = -1;
            const subGroupId = ref(-1);

            return {
                vueStore,
                currentGroupId,
                subGroupId,
            }
        },

        mounted() {
            this.vueStore.groupsModalWindow = this
        },

        methods:{
            toggleGroup(groupId) {
                const group = this.vueStore.groupsMap.get(`${groupId}`)
                if (group) {
                    if (group.chosen) {
                        group.chosen = false;
                        this.currentGroupId = -1;
                    }
                    else {
                        for (const item of Array.from(this.vueStore.groupsMap)) {
                            item[1].chosen = false;
                        }
                        group.chosen = true;
                        this.currentGroupId = group.groupId;
                    }
                }
            },

            buttonAddClick() {
                console.debug(this.currentGroupId, this.subGroupId)
                this.$refs.modalWindow.show = false
                if (this.currentGroupId != -1 && this.subGroupId != -1) {
                    fetch(`/group-add-to-group`, {
                        method: 'POST',
                        headers: {
                            'Accept'          : 'application/json',
                            'Content-Type'    : 'application/json'
                        },
                        body: JSON.stringify({
                            'groupId'         : this.subGroupId,
                            'parentGroupId'   : this.currentGroupId,
                        })
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.server_answer != 'error'){
                            const group = this.vueStore.groupsMap.get(`${this.subGroupId}`)
                            group.parentGroupId = this.currentGroupId
                        }
                        console.debug(response);
                    })
                    .catch(error => console.log("request failed", error));
                }
            },

            showGroupModal(subGroupId) {
                for (const item of Array.from(this.vueStore.groupsMap)) {
                    item[1].chosen = false;
                }

                this.$refs.modalWindow.show = true
                this.subGroupId = subGroupId
                console.debug(subGroupId)
            },

            addNewGroup() {
                const newGroupName = prompt('Введите имя новой группы', '')

                fetch(`/group-add`, {
                    method: 'POST',
                    headers: {
                        'Accept'          : 'application/json',
                        'Content-Type'    : 'application/json'
                    },
                    body: JSON.stringify({
                        'groupName'       : newGroupName,
                    })
                })
                .then(response => response.json())
                .then(response => {
                    if (response.server_answer != 'error'){
                        this.vueStore.groupsMap.set(`${response.group_id}`, { 'groupId' : `${response.group_id}`, 'groupName' : `${response.groupName}`, 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
                    }
                    console.debug(response);
                })
                .catch(error => console.log("request failed", error));
            }
        },
    }
</script>