<template>
    <div class="table_list_header">
        <label for="peiod_select">Период</label>

        <select name="period" id="peiod_select" @change="onPeriodChange($event)">
            <option value="YESTERDAY">Вчера</option>
            <option value="LAST_WEEK">Неделя</option>
            <option value="THIS_MONTH">Месяц</option>
        </select>
    </div>

    <div class="table_list_body">
        <table>
            <tr style="position: sticky; top: 0px;">
                <th class="name">Кампания</th>
                <th>Цена с НДС</th>
                <th>Показы</th>
                <th>Клики</th>
            </tr>
            <tr>
                <td class="name"><div>+</div>Всего</td>
                <td>{{ allCoasts.toFixed(2) }}</td>
                <td>{{ allImpressions }}</td>
                <td>{{ allClicks }}</td>
            </tr>
            <tr v-for="[key, campaign] of vueStore.campaignsMap">
                <td class="name">{{ campaign.CampaignName }}</td>
                <td>{{ campaign.Cost.toFixed(2) }}</td>
                <td>{{ campaign.Impressions }}</td>
                <td>{{ campaign.Clicks }}</td>
            </tr>
        </table>
    </div>

</template>

<style lang="scss" scoped>
    .table_list_header {
        width: calc(100% - 10px);
        height: 50px;
        margin: 5px 5px 5px 5px;
        // background-color: #59F;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        select {
            margin-left: 10px;
            font-size: 1.2rem;
            width: 150px;
            padding: 2px;
        }
    }

    .table_list_body {
        width: calc(100% - 30px);
        height: 100%;
        margin: 5px 5px 5px 5px;
        // padding: 10px;
        overflow-y: auto;
        box-shadow: inset 0px 0px 4px #0007;
        table, th, td {
            border: 1px solid #0001;
        }

        table {
            width: 100%;
            tr {
                &:hover {
                    background-color: #59F2;
                }
                &:first-child {
                    height: 50px;
                    background-color: #EEE;
                }
                th {
                    padding: 10px;
                    font-size: 1.4rem;
                    &.name {
                        width: 40%;
                        text-align:left;
                    }
                    &:not(.name) {
                        width: 20%;
                    }
                }

                td {
                    padding: 10px;
                    &.name {
                        width: calc(100% - 22px);
                        display: flex;
                        flex-direction: row;
                        text-wrap: nowrap;
                    }
                    &:not(.name) {
                        width: 20%;
                        text-align: center;
                    }
                }
            }
        }
    }

</style>

<script>
    export default {
        name: "TableList",

        // components: {
        //     'modal-group-dialog'   : ModalGroupDialog,
        // },

        computed : {
            allClicks() {
                let allClicks = 0
                for(const [key, campaign] of this.vueStore.campaignsMap) {
                    allClicks += campaign.Clicks;
                }
                return allClicks
            },
            
            allCoasts() {
                let allCoasts = 0.0
                for(const [key, campaign] of this.vueStore.campaignsMap) {
                    allCoasts += parseFloat(campaign.Cost);
                }
                return allCoasts
            },

            allImpressions() {
                let allImpressions = 0
                for(const [key, campaign] of this.vueStore.campaignsMap) {
                    allImpressions += campaign.Impressions;
                }
                return allImpressions
            },

        },

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        methods:{

            // showModalAddToGroup(campaignId){
            //     this.$refs.modalGroupDialog.showModal(campaignId)
            // },

            onPeriodChange(event) {
                console.log(event.target.value)
                window._vueStore.setup(event.target.value)
            }
        }
    }
</script>