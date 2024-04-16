<template>
    <div class="table_row">
        <div class="table_row_item">
            <div v-if="campaigns.length > 0" class="group_expander" @click="onExpanderClick(group.groupId)">
                <svg v-if="group.tableGroupsExtended == false" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <svg v-if="group.tableGroupsExtended == true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
            </div>
            <div class="name_label">{{ group.groupName }}</div>
        </div>
        <div class="table_row_item">
            <div class="back_cell" :style="{ width: group.CostPerc + '%' }"></div>
            <div class="front_cell">{{ group.CostStr }}</div>
        </div>

        <div v-if="groupCTR != ''" class="table_row_item_bubble_wrapper">
            <div class="table_row_item_bubble">
                {{ groupCTR }}
            </div>
        </div>

        <div class="table_row_item">
            <div class="back_cell" :style="{ width: group.ImpressionsPerc + '%' }"></div>
            <div class="front_cell">{{ group.ImpressionsStr }}</div>
        </div>
    </div>

    <div v-if="group.tableGroupsExtended" class="table_row campaigns" v-for="[key, campaign] of campaigns">
        <div class="table_row_item">
            <div class="campaign_shift"></div>
            {{ campaign.CampaignName }}
        </div>
        <div class="table_row_item">
            <div class="back_cell" :style="{ width: campaign.CostPerc + '%' }"></div>
            <div class="front_cell">{{ campaign.CostStr }}</div>
        </div>

        <div v-if="(campaign.Cost / campaign.Impressions)" class="table_row_item_bubble_wrapper">
            <div class="table_row_item_bubble">
                {{ String((campaign.Cost / campaign.Impressions).toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}
            </div>
        </div>

        <div class="table_row_item">
            <div class="back_cell" :style="{ width: campaign.ImpressionsPerc + '%' }"></div>
            <div class="front_cell">{{ campaign.ImpressionsStr }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .table_row {
        display: flex;
        flex-direction: row;
        position: relative;

        .table_row_item_bubble_wrapper {
            position: absolute;
            height: 40px;
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0px;
            left: 305px;
            z-index: 100;

            .table_row_item_bubble {
                // opacity: 0.85;
                width: fit-content;
                height: fit-content;
                font-size: 0.75rem;
                background-color: #DFDFDF;
                padding: 5px;
                border-radius: 20px;
            }
        }

        &.campaigns {
            font-size: 0.75rem;

            .table_row_item {
                background-color: #FFAE;
            }
        }
        
        .table_row_item {
            width: 134px;
            height: 39px;
            border: none;
            display: flex;
            align-items: center;
            justify-content: end;
            background-color: #F1F2F2;
            padding-left: 10px;
            padding-right: 10px;
            border-right: 1px solid #A2A2A2;
            border-bottom: 1px solid #A2A2A2;

            &:first-child {
                width: 278px;
                justify-content: left;
                border-left: 1px solid #A2A2A2;
            }

            .campaign_shift {
                height: 100%;
                width: 20px;
            }
        }

        .table_row_item {
            background-color: #FFF;
            position: relative;

            &:nth-child(2) {
                .back_cell {
                    background-color: #fbceb5;
                }
            }

            .group_expander {
                cursor: pointer;
                margin-right: 10px;
                svg {
                    width: 16px;
                    height: 16px;
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
                left: 10px;
                height: 100%;
                width: 100%;
                z-index: 2;
                align-items: center;
                justify-content: flex-start;
                text-wrap: nowrap;
            }

            &:last-child {
                .front_cell {
                    left: -10px;
                    justify-content: flex-end;
                }
            }
        }

    }
</style>

<script>
    export default {
        name: "SubGroupsItem",

        props: ['groupId'],

        computed : {
            group(){
                const group = this.vueStore.groupsMap.get(`${this.groupId}`)
                return group
            },

            groupCTR(){
                const group = this.vueStore.groupsMap.get(`${this.groupId}`)
                const ctr = group.Cost / group.Impressions
                
                return ctr ? String(ctr.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' : ''
            },

            campaigns(){
                const campaigns = 
                    Array
                    .from(this.vueStore.campaignsMap)
                    .filter(value => value[1].parentId == this.groupId)
                return campaigns
            },
        },

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        methods:{
            onExpanderClick(groupId) {
                const group = this.vueStore.groupsMap.get(`${groupId}`)
                group.tableGroupsExtended = !group.tableGroupsExtended
            }
        }
    }
</script>