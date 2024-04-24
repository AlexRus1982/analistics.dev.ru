<template>

    <div v-if="vueStore.loading == false" class="table">
        
        <div class="charts_table_wrapper">
            <div class="charts_table">
                <!-- <div class="chart_title">{{ getMonth(key) }}</div> -->
                <line-chart :title="getMonth(lastMonth[0])" :data="lastMonth[1]" suffix=" ₽" thousands=" "></line-chart>
            </div>
        </div>

        <div class="last_day_coast">Траты за вчерашний день = {{ lastDayValue }}</div>
    </div>
</template>

<style lang="scss" scoped>
    @import "./CostTable.scss";
</style>

<script>
    export default {
        name: "CostTableTelegram",

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

            lastMonth() {
                const lastMonthKey = Array.from(this.vueStore.costsMap.keys()).pop();
                const lastMonth = Array.from(this.vueStore.costsMap.values()).pop();
                console.debug(lastMonthKey, lastMonth)
                return [lastMonthKey, lastMonth]
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