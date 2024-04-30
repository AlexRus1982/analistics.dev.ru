<template>
    <div class="outsiders_wrapper">

        <div class="table_title">5 компаний с наименьшим количеством показов</div>
        <div class="table_header">
            <div class="table_header_item" style="width: 280px;">Категория</div>
            <div class="table_header_item">Показов</div>
            <div class="table_header_item">Кликов</div>
        </div>

        <div class="table_row campaigns" v-for="[key, campaign] of minImpressionsCompaigns">
            <div class="table_row_item">
                <div class="campaign_shift"></div>
                {{ campaign.CampaignName }}
            </div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: campaign.ImpressionsPerc + '%' }"></div>
                <div class="front_cell">{{ campaign.ImpressionsStr }}</div>
            </div>

            <div v-if="(100 * campaign.Clicks / campaign.Impressions)" class="table_row_item_bubble_wrapper">
                <div class="table_row_item_bubble">
                    {{ String((100 * campaign.Clicks / campaign.Impressions).toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}
                </div>
            </div>

            <div class="table_row_item">
                <div class="back_cell" :style="{ width: campaign.ClicksPerc + '%' }"></div>
                <div class="front_cell">{{ campaign.ClicksStr }}</div>
            </div>

        </div>

        <div class="table_title">5 компаний с наибольшей ценой за клик</div>
        <div class="table_header">
            <div class="table_header_item" style="width: 280px;">Категория</div>
            <div class="table_header_item">Расход с НДС</div>
            <div class="table_header_item">Кликов</div>
        </div>

        <div class="table_row campaigns" v-for="[key, campaign] of maxClickCoastCompaigns">
            <div class="table_row_item">
                <div class="campaign_shift"></div>
                {{ campaign.CampaignName }}
            </div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: campaign.CostPerc + '%' }"></div>
                <div class="front_cell">{{ campaign.CostStr }}</div>
            </div>

            <div class="table_row_item_bubble_wrapper">
                <div v-if="campaign.Clicks > 0" class="table_row_item_bubble">
                    {{ String((campaign.Cost / campaign.Clicks).toFixed(1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}
                </div>
                <div v-if="campaign.Clicks == 0" class="table_row_item_bubble">
                    {{ String((campaign.Cost).toFixed(1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}
                </div>
            </div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: campaign.ClicksPerc + '%' }"></div>
                <div class="front_cell">{{ campaign.ClicksStr }}</div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .outsiders_wrapper {
        padding-top: 50px;

        .table_title {
            width: 100%;
            max-width: 600px;
            margin-top: 25px;
            font-size: 1.3rem;
            font-weight: 600;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .table_header {
            display: flex;
            flex-direction: row;
            width: 800px;

            .table_header_item {
                width: 134px;
                height: 39px;
                border: none;
                display: flex;
                align-items: center;
                justify-content: end;
                background-color: #F1F2F2;
                border-bottom: 1px solid #A2A2A2;
                padding-left: 10px;
                padding-right: 10px;

                &:first-child {
                    width: 281px;
                    justify-content: left;
                }
            }

            .table_header_item {
                justify-content: center;

                &:first-child {
                    justify-content: center;
                }
            }
        }

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
                    // background-color: #FFAE;
                    background-color: #FFF;
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
    }
</style>

<script>
    export default {
        name: "OutSiders",

        // components: {
        //     'modal-group-dialog'   : ModalGroupDialog,
        // },

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        computed : {
            minImpressionsCompaigns() {
                const array = Array
                    .from(this.vueStore.campaignsMap)
                    .sort(([keyFirst, first], [keySecond, second]) => first.Impressions - second.Impressions)
                return array.slice(0, 5)
            },

            maxClickCoastCompaigns() {
                const array = Array
                    .from(this.vueStore.campaignsMap)
                    .sort(([keyFirst, first], [keySecond, second]) => {
                        const firstClickCoast = (first.Clicks > 0) ? first.Cost / first.Clicks : first.Cost
                        const secondClickCoast = (second.Clicks > 0) ? second.Cost / second.Clicks : second.Cost
                        return secondClickCoast - firstClickCoast
                    })
                return array.slice(0, 5)
            },
        },

        // methods:{

        //     showModalAddToGroup(campaignId){
        //         this.$refs.modalGroupDialog.showModal(campaignId)
        //     },
        // }
    }
</script>