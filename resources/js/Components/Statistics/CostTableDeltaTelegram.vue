<template>
    <div v-if="vueStore.loading == false && Math.abs(lastDayDelta) > 20" class="table" style="box-shadow:0px 0px 10px red inset; padding: 10px 0px; margin-bottom: 50px;">
        <line-chart :title="getMonth(lastMonth[0])" :data="latsMonthValues" suffix=" ₽" thousands=" "></line-chart>
        <div class="last_day_coast" style="margin: 10px 0px 0px 10px;">Траты за вчерашний день = {{ lastDayValue }}</div>
        <div class="last_day_coast" style="margin: 10px 0px 0px 10px;">Среднее значение трат за 10 дней = {{ last10DaysValue[0] }}</div>
        <div class="last_day_coast" style="margin: 10px 0px 0px 10px;">Отклонение от среднего значения = {{ last10DaysValue[1] }}</div>
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
                const lastDayCoast = Object.values(lastMonth).pop();
                return String(lastDayCoast).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'
            },

            lastMonth() {
                const lastMonthKey = Array.from(this.vueStore.costsMap.keys()).pop();
                const lastMonth = Array.from(this.vueStore.costsMap.values()).pop();
                console.debug(lastMonthKey, lastMonth)
                return [lastMonthKey, lastMonth]
            },

            last10DaysValue() {
                const lastMonth = Array.from(this.vueStore.costsMap.values()).pop();
                const lastDayCoast = Object.values(lastMonth).pop();
                
                const last10DaysValues = Object.values(lastMonth).slice(-10)
                const last10DaysAvg = last10DaysValues.reduce((a, b) => a + b) / last10DaysValues.length;
                const last10DaysAvgStr = String(last10DaysAvg.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'

                const deltaCoast = (lastDayCoast - last10DaysAvg) / last10DaysAvg * 100
                const deltaCoastStr = String(deltaCoast.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %'

                return [last10DaysAvgStr, deltaCoastStr]
            },

            lastDayDelta() {
                const lastMonth = Array.from(this.vueStore.costsMap.values()).pop();
                const lastDayCoast = Object.values(lastMonth).pop();
                
                const last10DaysValues = Object.values(lastMonth).slice(-10)
                const last10DaysAvg = last10DaysValues.reduce((a, b) => a + b) / last10DaysValues.length;
                
                return (lastDayCoast - last10DaysAvg) / last10DaysAvg * 100
            },

            latsMonthValues() {
                const lastMonth = Array.from(this.vueStore.costsMap.values()).pop();
                
                const last10DaysValues = Object.values(lastMonth).slice(-10)
                const last10DaysAvg = last10DaysValues.reduce((a, b) => a + b) / last10DaysValues.length;
                
                const lastMonthAvg = {}
                console.debug(Object.keys(lastMonth).slice(-10))
                for(const key of Object.keys(lastMonth).slice(-10)) {
                    lastMonthAvg[`${key}`] = last10DaysAvg
                }

                console.debug(lastMonth)
                return [
                    { 
                        name : 'Значения трат',
                        data : lastMonth,
                    },
                    { 
                        name : 'Среднее значение трат зв 10 дней',
                        data : lastMonthAvg,
                    },
                ]
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