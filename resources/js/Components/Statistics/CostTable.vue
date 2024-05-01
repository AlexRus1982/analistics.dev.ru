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
        <div class="last_day_coast" style="margin-top: 10px;">Среднее значение трат за 10 дней = {{ last10DaysValue[0] }}</div>
        <div class="last_day_coast" style="margin-top: 10px;">Отклонение от среднего значения = {{ last10DaysValue[1] }}</div>

    </div>
</template>

<style lang="scss" scoped>
    @import "./CostTable.scss";
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
                const lastDayCoast = Array.from(this.vueStore.coastsAll.values()).pop();
                return String(lastDayCoast).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'
            },

            last10DaysValue() {
                const lastDayCoast = Array.from(this.vueStore.coastsAll.values()).pop();
                
                const last10DaysValues = Array.from(this.vueStore.coastsAll.values()).slice(-10)
                const last10DaysAvg = last10DaysValues.reduce((a, b) => a + b) / last10DaysValues.length;
                const last10DaysAvgStr = String(last10DaysAvg.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'

                const deltaCoast = (lastDayCoast - last10DaysAvg) / last10DaysAvg * 100
                const deltaCoastStr = String(deltaCoast.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %'

                return [last10DaysAvgStr, deltaCoastStr]
            },

            latsMonthValues() {
                const lastMonth = Array.from(this.vueStore.costsMap.values()).pop();
                
                const last10DaysValues = Array.from(this.vueStore.coastsAll.values()).slice(-10)
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