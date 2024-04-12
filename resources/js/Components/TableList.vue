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

        <div v-if="vueStore.loading == true" class="table_loader">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
            <div>Загрузка ...</div>
        </div>
        <table v-if="vueStore.loading == false">
            <tr style="position: sticky; top: 0px; z-index: 10;">
                <th class="name">Кампания</th>
                <th>Цена с НДС</th>
                <th>Показы</th>
                <th>Клики</th>
            </tr>
            <tr>
                <td class="name">
                    <div class="name_expander" @click="onAllExpanderClick">
                        <svg v-if="allExpander == false" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <svg v-if="allExpander == true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                    </div>
                    <div class="name_label">Всего</div>
                </td>
                <td>{{ allCoasts.toFixed(2) }}</td>
                <td>{{ allImpressions }}</td>
                <td>{{ allClicks }}</td>
            </tr>
            <!-- <tr v-if="allExpander == true" v-for="[key, campaign] of vueStore.campaignsMap">
                <td class="name">{{ campaign.CampaignName }}</td>
                <td>{{ campaign.Cost.toFixed(2) }}</td>
                <td>{{ campaign.Impressions }}</td>
                <td>{{ campaign.Clicks }}</td>
            </tr> -->
            <table-list-item :groupId="-1" :isExtended="allExpander == true" :innerLevel="0"/>
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

        .table_loader {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            svg {
                animation-name: apps-loader-rotation;
                animation-duration: 2s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
        }
    
        @keyframes apps-loader-rotation {
            0% {
                transform:rotate(0deg);
            }
            100% {
                transform:rotate(360deg);
            }
        }

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
                    font-size: 1.1rem;
                    &.name {
                        width: 75%;
                        text-align:left;
                    }
                    &:not(.name) {
                        width: 200px;
                        text-wrap: nowrap;
                    }
                }

                td {
                    padding: 10px;
                    &.name {
                        width: calc(100% - 22px);
                        display: flex;
                        flex-direction: row;
                        text-wrap: nowrap;

                        svg {
                            width: 16px;
                            height: 16px;
                            cursor: pointer;
                            margin-right: 5px;
                        }
                    }
                    &:not(.name) {
                        width: 200px;
                        text-align: right;
                    }
                }
            }
        }
    }

</style>

<script>
    import {ref} from 'vue'
    import TableListItem from './TableListItem.vue';

    export default {
        name: "TableList",

        components: {
            'table-list-item'   : TableListItem,
        },

        computed : {
            allClicks() {
                let allClicks = 0
                for(const [key, campaign] of this.vueStore.campaignsMap) {
                    allClicks += campaign.parentId != '-1' ? campaign.Clicks : 0;
                }
                return allClicks
            },
            
            allCoasts() {
                let allCoasts = 0.0
                for(const [key, campaign] of this.vueStore.campaignsMap) {
                    allCoasts += campaign.parentId != '-1' ? parseFloat(campaign.Cost) : 0;
                }
                return allCoasts
            },

            allImpressions() {
                let allImpressions = 0
                for(const [key, campaign] of this.vueStore.campaignsMap) {
                    allImpressions += campaign.parentId != '-1' ? campaign.Impressions : 0;
                }
                return allImpressions
            },

        },

        setup(){
            const vueStore = window._vueStore;
            const allExpander = ref(false)

            return {
                vueStore,
                allExpander,
            }
        },

        methods:{

            // showModalAddToGroup(campaignId){
            //     this.$refs.modalGroupDialog.showModal(campaignId)
            // },

            onPeriodChange(event) {
                console.log(event.target.value)
                window._vueStore.setup(event.target.value)
            },

            onAllExpanderClick() {
                this.allExpander = !this.allExpander
            }
        }
    }
</script>