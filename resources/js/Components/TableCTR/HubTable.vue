<template>

    <div v-if="vueStore.loading == false" class="table">
        <div class="table_row" v-for="[key, group] in hubGroups">
            <div class="table_row_item">
                {{ group.groupName }}
            </div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: group.ClicksPerc + '%' }"></div>
                <div class="front_cell">{{ group.ClicksStr }}</div>
            </div>
            <div v-if="(100 * group.Clicks / group.Impressions)" class="table_row_item_bubble_wrapper">
                <div class="table_row_item_bubble">
                    {{ String((100 * group.Clicks / group.Impressions).toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}
                </div>
            </div>
            <div class="table_row_item">
                <div class="back_cell" :style="{ width: group.ImpressionsPerc + '%' }"></div>
                <div class="front_cell">{{ group.ImpressionsStr }}</div>
            </div>
        </div>

        <div class="table_footer">
            <div class="table_footer_item">Итого</div>
            <div class="table_footer_item">{{ allClicks }}</div>
            <div v-if="(100 * vueStore.allClicksValue / vueStore.allImpressionsValue)" class="table_row_item_bubble_wrapper">
                <div class="table_row_item_bubble">
                    {{ String((100 * vueStore.allClicksValue / vueStore.allImpressionsValue).toFixed(3)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' %' }}
                </div>
            </div>
            <div class="table_footer_item">{{ allImpressions }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .table {
        margin-top: 10px;
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

            .table_row_item, .table_footer_item {
                width: 134px;
                height: 40px;
                border: none;
                display: flex;
                align-items: center;
                justify-content: left;
                background-color: #F1F2F2;
                padding-left: 10px;
                padding-right: 10px;

                &:first-child {
                    width: 278px;
                }

                &:last-child {
                    justify-content: end;
                }
            }

            .table_row_item {
                position: relative;

                &:nth-child(2) {
                    .back_cell {
                        background-color: #fbceb5;
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

    }
</style>

<script>
    export default {
        name: "HubTable",

        computed : {
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

            return {
                vueStore,
            }
        },
    }
</script>