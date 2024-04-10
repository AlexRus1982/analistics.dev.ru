<template>
    <modal-window ref="modalWindow">
        <template v-slot:title>
            <h3 class="modal-title">Добавить кампанию в группу</h3>
        </template>

        <template v-slot:body>
            <div v-for = "item of Array.from(vueStore.groupsMap)" class="group_name" @click="toggleGroup(item[1].groupId)">
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
</template>

<style scoped lang="scss">
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
    import ModalWindow from './ModalWindow.vue';

    export default {
        name: "ModalGroupDialog",

        components: {
            'modal-window'   : ModalWindow,
        },

        setup(){
            const vueStore = window._vueStore;
            const currentGroupId = -1;
            const currentCampaignId = -1;

            return {
                vueStore,
                currentGroupId,
                currentCampaignId,
            }
        },

        methods: {
            showModal: function (currentCampaignId = -1) {
                this.currentCampaignId = currentCampaignId
                this.$refs.modalWindow.showModal()
                this.currentGroupId = -1;
                for (const item of Array.from(this.vueStore.groupsMap)) {
                    item[1].chosen = false;
                }
            },

            closeModal: function () {
                this.$refs.modalWindow.closeModal()
            },

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
                console.debug(this.currentGroupId, this.currentCampaignId)
                this.closeModal()
                if (this.currentGroupId != -1 && this.currentCampaignId != -1) {
                    const campaign = this.vueStore.campaignsMap.get(`${this.currentCampaignId}`)
                    campaign.parentId = this.currentGroupId
                }
            },
        }
    }
</script>