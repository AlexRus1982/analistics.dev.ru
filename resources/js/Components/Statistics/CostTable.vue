<template>

    <div v-if="vueStore.loading == false" class="table">
        
        <div class="table_row" v-for="item in statistics.campaignsTypesList">
            <div class="table_row_item">{{ item.Type }}</div>
            <div class="table_row_item">{{ String(item.Count).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_row_item">{{ String(item.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}</div>
            <div class="table_row_item">{{ String(item.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_row_item">{{ String(item.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_row_item">{{ String(item.CPC.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}</div>
            <div class="table_row_item">{{ String(item.CTR.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}</div>
        </div>

        <div class="table_footer">
            <div class="table_footer_item">Итого</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Count).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.CPC.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.CTR.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}</div>
        </div>

        <div class="charts_title">Общая динамика трат по месяцам:</div>

        <line-chart v-for="[key, coastsValues] of vueStore.costsMap" :data="coastsValues"></line-chart>

        <!-- <line-chart :data="{'Января' : 2, 'Февраля' : 4 }"></line-chart> -->
    </div>
</template>

<style lang="scss" scoped>
    .table {
        overflow-x: hidden;
        margin-top: 10px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        .table_row:first-child {
            
            .table_row_item {
                border-top: 1px solid #A2A2A2;
            }
        }

        .table_row, .table_footer {
            display: flex;
            flex-direction: row;
            position: relative;

            .table_row_item, .table_footer_item {
                font-size: 0.75rem;
                width: 89px;
                height: 40px;
                border: none;
                display: flex;
                align-items: center;
                justify-content: left;
                background-color: #F1F2F2;
                padding-left: 5px;
                padding-right: 5px;

                &:first-child {
                    width: 188px;
                }

                &:last-child {
                    justify-content: end;
                }
            }


            .table_row_item, .table_footer_item {
                background-color: #FFF;

                &:last-child {
                    .front_cell {
                        justify-content: flex-end;
                    }
                }
            }
        }

        .table_footer, .table_row {
            
            .table_footer_item, .table_row_item {
                border-right: 1px solid #A2A2A2;
                border-bottom: 1px solid #A2A2A2;

                &:first-child {
                    border-left: 1px solid #A2A2A2;
                }
            }
        }

        .table_footer {
            
            .table_footer_item {
                background: #C4C4C4;
                font-weight: 600;
            }
        }

        .charts_title {
            margin-top: 40px;
            padding: 10px;
            font-size: 1.4rem;
            font-weight: 600;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>

<script>
    export default {
        name: "CostTable",

        computed : {
            statistics() {
                const statistics = {
                    'campaignsTypesList'    : {},
                    'campaignsTypesResult'  : {
                        'Count'             : 0,
                        'Cost'              : 0,
                        'Clicks'            : 0,
                        'Impressions'       : 0,
                        'CPC'               : 0,
                        'CTR'               : 0,
                    },
                }

                const campaignsTypesAll = []
                for(const [key, campaign] of this.vueStore.campaignsMap) {
                    campaignsTypesAll.push(campaign.CampaignType)
                }

                const uniqCampaignsTypes = new Set(campaignsTypesAll)
                // console.debug(uniqCampaignsTypes)

                for(const campaignsType of uniqCampaignsTypes) {
                    //statistics.campaignsTypesList[`${campaignsType}`] = 
                    const campaignsStatisticObject = {
                        'Type'          : campaignsType,
                        'Count'         : 0,
                        'Cost'          : 0,
                        'Clicks'        : 0,
                        'Impressions'   : 0,
                        'CPC'           : 0,
                        'CTR'           : 0,
                    }

                    const campaigns = Array
                    .from(this.vueStore.campaignsMap)
                    .filter(value => value[1].CampaignType == campaignsType)

                    for(const [key, campaign] of campaigns) {
                        campaignsStatisticObject.Count++
                        campaignsStatisticObject.Cost += campaign.Cost
                        campaignsStatisticObject.Clicks += campaign.Clicks
                        campaignsStatisticObject.Impressions += campaign.Impressions
                        campaignsStatisticObject.CPC += campaign.CPC
                        campaignsStatisticObject.CTR += campaign.CTR
                        console.debug(campaign.CPC, campaign.CTR)
                    }

                    statistics.campaignsTypesList[`${campaignsType}`] = campaignsStatisticObject
                    statistics.campaignsTypesResult.Count += campaignsStatisticObject.Count
                    statistics.campaignsTypesResult.Cost += campaignsStatisticObject.Cost
                    statistics.campaignsTypesResult.Clicks += campaignsStatisticObject.Clicks
                    statistics.campaignsTypesResult.Impressions += campaignsStatisticObject.Impressions
                    statistics.campaignsTypesResult.CPC += campaignsStatisticObject.CPC
                    statistics.campaignsTypesResult.CTR += campaignsStatisticObject.CTR

                    console.debug(campaigns)
                }

                return statistics
            },

            hubGroups(){
                const hubGroups = 
                    Array
                    .from(this.vueStore.groupsMap)
                    .filter(value => value[1].parentGroupId == "-1")
                    .sort((first, second) => first[1].groupOrder - second[1].groupOrder)
                return hubGroups
            },

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

            // const campaignsTypesAll = []
            // for(const [key, campaign] of vueStore.campaignsMap) {
            //     campaignsTypesAll.push(campaign.CampaignType)
            // }

            // const uniqCampaignsTypes = new Set(campaignsTypesAll)
            // console.debug(uniqCampaignsTypes)

            return {
                vueStore,
            }
        },
    }
</script>