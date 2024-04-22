<template>

    <div v-if="vueStore.loading == false" class="table">
        
        <div class="table_row" v-for="item in statistics.campaignsTypesList">
            <div class="table_row_item">{{ getCampaignType(item.Type) }}</div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: item.CostPerc + '%' }"></div>
                <div class="front_cell">{{ String(item.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}</div>
            </div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: item.ImpressionsPerc + '%' }"></div>
                <div class="front_cell">{{ String(item.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            </div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: item.ClicksPerc + '%' }"></div>
                <div class="front_cell">{{ String(item.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            </div>

            <div class="table_row_item">{{ String(item.Count).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_row_item">{{ String(item.CPC.toFixed(1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}</div>
            <div class="table_row_item">{{ String(item.CTR.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}</div>
        </div>

        <div class="table_footer">
            <div class="table_footer_item">Итого</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.Count).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.CPC.toFixed(1)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽' }}</div>
            <div class="table_footer_item">{{ String(statistics.campaignsTypesResult.CTR.toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}</div>
        </div>

        <div class="charts_title">Общая динамика трат по месяцам:</div>

        <div class="charts_table_wrapper">
            <div class="charts_table" v-for="[key, coastsValues] of vueStore.costsMap">
                <!-- <div class="chart_title">{{ getMonth(key) }}</div> -->
                <line-chart :title="getMonth(key)" :data="coastsValues" suffix=" ₽" thousands=" "></line-chart>
            </div>
        </div>

        <div class="last_day_coast">Траты за вчерашний день = {{ lastDayValue }}</div>

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
                position: relative;
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
                    width: 177px;

                }

                &:nth-child(2) {
                    .back_cell {
                        background-color: #fbceb57F;
                    }
                }
                
                &:last-child {
                    justify-content: end;
                }

                &:nth-last-child(3) {
                    margin-left: 10px;
                    border-left: 1px solid #A2A2A2;
                }

                .back_cell {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    height: 100%;
                    width: 75%;
                    background-color: #b5fbdd7F;
                    z-index: 1;
                }

                .front_cell {
                    position: absolute;
                    display: flex;
                    top: 0px;
                    // left: 10px;
                    height: 100%;
                    width: 100%;
                    z-index: 2;
                    align-items: center;
                    justify-content: flex-start;
                    text-wrap: nowrap;
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
            font-size: 1.3rem;
            font-weight: 600;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }


        .charts_table_wrapper {
            width: 100%;
            max-width: 800px;

            .charts_table {
                margin-bottom: 40px;
                width: 100%;
                max-width: 800px;
    
                &:last-child {
                    background-color: #fbceb54F;
                }
            }
        }

        .last_day_coast {
            font-size: 1.3rem;
            font-weight: 600;
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
                    }

                    campaignsStatisticObject.CPC = campaignsStatisticObject.Clicks ? campaignsStatisticObject.Cost / campaignsStatisticObject.Clicks : 0
                    campaignsStatisticObject.CTR = campaignsStatisticObject.Impressions != 0 ? 100 * campaignsStatisticObject.Clicks / campaignsStatisticObject.Impressions : 0

                    statistics.campaignsTypesList[`${campaignsType}`] = campaignsStatisticObject
                    statistics.campaignsTypesResult.Count += campaignsStatisticObject.Count
                    statistics.campaignsTypesResult.Cost += campaignsStatisticObject.Cost
                    statistics.campaignsTypesResult.Clicks += campaignsStatisticObject.Clicks
                    statistics.campaignsTypesResult.Impressions += campaignsStatisticObject.Impressions
                }

                statistics.campaignsTypesResult.CPC += statistics.campaignsTypesResult.Clicks ? statistics.campaignsTypesResult.Cost / statistics.campaignsTypesResult.Clicks : 0
                statistics.campaignsTypesResult.CTR += statistics.campaignsTypesResult.Impressions != 0 ? 100 * statistics.campaignsTypesResult.Clicks / statistics.campaignsTypesResult.Impressions : 0

                for(const campaignsType of uniqCampaignsTypes) {

                    const campaignsStatisticObject = statistics.campaignsTypesList[`${campaignsType}`]

                    campaignsStatisticObject.CostPerc           = Number(100 * campaignsStatisticObject.Cost / statistics.campaignsTypesResult.Cost);
                    campaignsStatisticObject.ImpressionsPerc    = Number(100 * campaignsStatisticObject.Impressions / statistics.campaignsTypesResult.Impressions);
                    campaignsStatisticObject.ClicksPerc         = Number(100 * campaignsStatisticObject.Clicks / statistics.campaignsTypesResult.Clicks);
                }

                return statistics
            },

            lastDayValue() {
                const lastMonth = Array.from(this.vueStore.costsMap.values()).pop();
                const lastDayCoast = Object.values(lastMonth).slice(-2, -1)[0];
                return String(lastDayCoast).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'
            },

        },

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        methods: {
            getMonth(numberOfMonth) {
                const monthArray = {
                    '01' : 'Январь',
                    '02' : 'Февраль',
                    '03' : 'Март',
                    '04' : 'Апрель',
                    '05' : 'Май',
                    '06' : 'Июнь',
                    '07' : 'Июль',
                    '08' : 'Август',
                    '09' : 'Сентябрь',
                    '10' : 'Октябрь',
                    '11' : 'Ноябрь',
                    '12' : 'Декабрь',
                }
                return `${numberOfMonth}` in monthArray ? monthArray[`${numberOfMonth}`] : ''
            },

            getCampaignType(campaignType) {
                const CampaignTypes = {
                    'TEXT_CAMPAIGN' : 'Текстово-графические объявления',
                    'UNIFIED_CAMPAIGN' : 'Единая перфоманс кампания',
                    'SMART_CAMPAIGN' : 'Смарт-баннеры',
                    'DYNAMIC_TEXT_CAMPAIGN' : 'Динамические объявления',
                    'MOBILE_APP_CAMPAIGN' : 'Реклама мобильных приложений',
                    'MCBANNER_CAMPAIGN' : 'Баннер на поиске',
                    'CPM_BANNER_CAMPAIGN' : 'Медийная кампания',
                    'CPM_DEALS_CAMPAIGN' : 'Медийная кампания со сделками',
                    'CPM_FRONTPAGE_CAMPAIGN' : 'Медийная кампания на Главной',
                    'CPM_PRICE' : 'Кампания с фиксированным СРМ',
                }
                return `${campaignType}` in CampaignTypes ? CampaignTypes[`${campaignType}`] : ''
            }
        }
    }
</script>