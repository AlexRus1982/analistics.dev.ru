<template>
    <div class="group_item">
        
        <group-item-title :itemData="itemData"/>

        <div class="group_childs">
            
            <div v-if="campaignsMapArray.length > 0" class="items_children">
                <div class="title">Кампании</div>
                <div class="expander" :class="{expanded: itemData.campaignsExtednded}" @click="itemsChildrenExpanderOnClick">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                </div>
            </div>
            <Transition name="scaler">
                <div v-if="itemData.campaignsExtednded == true && campaignsMapArray.length > 0" class="items_children_list">
                    <div v-for = "campaign of campaignsMapArray" class="campaign_name">
                        <div class="campaign_label">{{ campaign[1].CampaignName }}</div>
                        <div class="campaign_icons">
                            <div class="remove_from_group" title="Удалить из группы" @click="removeFromGroupOnClick(campaign[1].CampaignId)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-dash" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Z"/>
                                    <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
            
            <div v-if="groupsMapArray.length > 0" class="groups_children">
                <div class="title">Подгруппы</div>
                <div class="expander" :class="{expanded: itemData.groupsExtended}" @click="groupsChildrenExpanderOnClick">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                </div>
            </div>
            <Transition name="scaler">
                <div v-if="itemData.groupsExtended == true && groupsMapArray.length > 0" class="groups_children_list">
                    <GroupItem v-for = "item of groupsMapArray" :itemData = "item[1]" />
                </div>
            </Transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .scaler-enter-active {
        animation: scaler-in 0.3s;
    }
    .scaler-leave-active {
        animation: scaler-in 0.3s reverse;
    }
    @keyframes scaler-in {
        0% {
            // transform: scaleY(0);
            transform: translateX(600px);
            opacity: 0.0;
            // max-height: 0px;
        }
        100% {
            // transform: scaleY(1.0);
            transform: translateX(0px);
            // max-height: fit-content;
            opacity: 1.0;
        }
    }

    .group_item {
        width: 98%;
        height: fit-content;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        padding: 2px;
        border: 1px solid #CCC;
        box-shadow: 4px 4px 4px #CCC;
        transition: 0.3s;
        // overflow-x: hidden;

        &:last-child {
            margin-bottom: 10px;
        }

        // &:hover {
        //     box-shadow: 0px 0px 8px #59F;
        //     transform: scale(0.99);
        // }

        .group_childs {
            background-color: #FFF;
            color: #000;

            .groups_children {
                border-top: 1px solid #CCC;
            }

            .items_children, .groups_children {
                padding: 10px;
                display: flex;
                flex-direction: row;

                .title {
                    display: flex;
                    align-items: center;
                }

                .expander {
                    display: flex;
                    align-items: center;
                    margin-left: auto;
                    cursor: pointer;
                    transition: 0.3s;
                    transform: rotateZ(90deg);

                    svg {
                        width: 16px;
                        height: 16px;
                    }

                    &.expanded {
                        transform: rotateZ(-90deg);
                    }

                    &:hover{
                        filter: drop-shadow(0px 0px 1px #59F);
                    }
                }
            }

            // .items_children {
            //     border-bottom: 1px solid #CCC;
            // }

            .items_children_list, .groups_children_list {
                border-left: 5px solid #59F;
                padding: 5px 1px 1px 5px;
                display: flex;
                flex-direction: column;
                gap: 5px;
                overflow-y: hidden;
            }

            .items_children_list {
                border-top: 1px solid #CCC;

                .campaign_name {
                    padding: 5px 0px;
                    display: flex;
                    flex-direction: row;

                    .campaign_icons {
                        margin-left: auto;
                        cursor: pointer;
                        margin-right: 8px;
                    }
                }
            }

            .groups_children_list {
                border-top: 1px solid #CCC;
                overflow-x: hidden;
            }
        }
    }
</style>

<script>
    import {ref} from 'vue'
    import GroupItemTitle from './GroupItemTitle.vue'

    export default {
        name: "GroupItem",

        components: {
            'group-item-title'  : GroupItemTitle,
        },

        props: ['itemData'],

        computed : {
            campaignsMapArray() {
                return Array.from(this.vueStore.campaignsMap).filter(value => value[1].parentId == this.itemData.groupId)
            },

            groupsMapArray() {
                return Array.from(this.vueStore.groupsMap).filter(item => item[1].parentGroupId == this.itemData.groupId)
            },
        },

        setup(){
            const vueStore = window._vueStore;
            const itemsChildrenExpander = ref(true)
            const groupsChildrenExpander = ref(true)

            return {
                vueStore,
                itemsChildrenExpander,
                groupsChildrenExpander,
            }
        },

        methods:{
            itemsChildrenExpanderOnClick(event) {
                this.itemData.campaignsExtednded = !this.itemData.campaignsExtednded
                console.debug(this.itemData.campaignsExtednded)
            },

            groupsChildrenExpanderOnClick(event) {
                this.itemData.groupsExtended = !this.itemData.groupsExtended
                console.debug(this.itemData.groupsExtended)
            },

            removeFromGroupOnClick(campaignId) {
                if (confirm('Удалить из группы?')) {
                    fetch(`/campaign-remove-from-group`, {
                        method: 'POST',
                        headers: {
                            'Accept'       : 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify({
                            'campaignId'   : campaignId,
                        })
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.server_answer != 'error'){
                            const campaign = this.vueStore.campaignsMap.get(`${campaignId}`)
                            campaign.parentId = "-1"
                        }
                        console.debug(response);
                    })
                    .catch(error => console.log("request failed", error));
                }
            },
        }
    }
</script>