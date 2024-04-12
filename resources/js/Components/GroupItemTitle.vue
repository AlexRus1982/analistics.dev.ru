<template>
    
    <div class="group_title">
        <div class="label" :title="itemData.groupName">{{ itemData.groupName }}</div>

        <div class="edit_group_name" title="Изменить имя группы" @click="editGroupNameOnClick(itemData.groupId)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
        </div>

        <div v-if="itemData.parentGroupId == '-1'" class="add_group_button" title="Добавить в группу" @click="addToGroupOnClick(itemData.groupId)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-database-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z"/>
                <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
            </svg>
        </div>
        
        <div v-else class="remove_from_group_button" title="Удалить из группы" @click="removeFromGroupOnClick(itemData.groupId)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-database-dash" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Z"/>
                <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
            </svg>
        </div>

        <div class="delete_group_name" title="Удалить группу" @click="removeGroupOnClick(itemData.groupId)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .group_title {
        display: flex;
        flex-direction: row;
        background-color: #59F;
        color: #FFF;
        padding: 10px;

        .label {
            cursor:default;
            display: flex;
            align-items: center;
            font-size: 1.2rem;
        }
    
        .edit_group_name {
            cursor: pointer;
            margin-left: auto;
            svg {
                width: 24px;
                height: 24px;
            }
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .delete_group_name {
            cursor: pointer;
            margin-left: 10px;
            svg {
                width: 24px;
                height: 24px;
            }
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .add_group_button, .remove_from_group_button {
            cursor: pointer;
            margin-left: 10px;
            svg {
                width: 24px;
                height: 24px;
            }
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>

<script>
    export default {
        name: "GroupItemTitle",

        props: ['itemData'],

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        methods:{
            editGroupNameOnClick(groupId) {
                const group = this.vueStore.groupsMap.get(`${groupId}`)
                const newGroupName = prompt('Новое имя группы', group.groupName)
                
                fetch(`/group-rename`, {
                    method: 'POST',
                    headers: {
                        'Accept'          : 'application/json',
                        'Content-Type'    : 'application/json'
                    },
                    body: JSON.stringify({
                        'groupId'         : groupId,
                        'groupName'       : newGroupName,
                    })
                })
                .then(response => response.json())
                .then(response => {
                    if (response.server_answer != 'error'){
                        group.groupName = newGroupName
                    }
                    console.debug(response);
                })
                .catch(error => console.log("request failed", error));
            },
            
            addToGroupOnClick(groupId) {
                console.debug(this.vueStore.groupsModalWindow)
                this.vueStore.groupsModalWindow.showGroupModal(`${groupId}`)
            },

            removeFromGroupOnClick(groupId) {
                if (confirm('Удалить из группы')) {
                    fetch(`/group-remove-from-group`, {
                        method  : 'POST',
                        headers : {
                            'Accept'          : 'application/json',
                            'Content-Type'    : 'application/json'
                        },
                        body    : JSON.stringify({
                            'groupId'         : groupId,
                        })
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.server_answer != 'error'){
                            const group = this.vueStore.groupsMap.get(`${groupId}`)
                            group.parentGroupId = '-1'
                        }
                        console.debug(response);
                    })
                    .catch(error => console.log("request failed", error));
                }
            },

            removeGroupOnClick(groupId) {
                if (!confirm('Удалить группу?')) return

                fetch(`/group-remove`, {
                    method: 'POST',
                    headers: {
                        'Accept'          : 'application/json',
                        'Content-Type'    : 'application/json'
                    },
                    body: JSON.stringify({
                        'groupId'         : groupId,
                    })
                })
                .then(response => response.json())
                .then(response => {
                    if (response.server_answer != 'error'){
                        const filteredCampaigns = Array.from(this.vueStore.campaignsMap).filter(value => value[1].parentId == groupId)
                        for (const campaign of filteredCampaigns) {
                            campaign[1].parentId = '-1'
                        }

                        const filteredGroups    = Array.from(this.vueStore.groupsMap).filter(item => item[1].parentGroupId == groupId)
                        for (const group of filteredGroups) {
                            group[1].parentGroupId = '-1'
                        }

                        this.vueStore.groupsMap.delete(`${groupId}`)
                    }
                    console.debug(response);
                })
                .catch(error => console.log("request failed", error));
            },
        }
    }
</script>