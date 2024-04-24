<template>
    <div class="table_list_body">

        <hub-table />
        
        <div class="table_header_wrapper" style="position: relative; top: 0px; z-index: 0; margin-top: 30px;">
            <div class="table_header">
                <div class="table_header_item">Категория</div>
                <div class="table_header_item">Расход с НДС</div>
                <div class="table_header_item">Показов</div>
                <div class="table_header_item">Кликов</div>
            </div>
        </div>

        <hub-sub-table />
        
    </div>

</template>

<style lang="scss">

    .table_list_body {
        width: 100%;
        max-width: 800px;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 75px;
    }

    .table_header_wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 10000;
        position: sticky;
        margin-top: 75px;
        top: 51px;

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
    }

    .table_row .table_row_item .group_expander {
        display: none;
    }

</style>

<script>
    import HubTable from './HubTable.vue';
    import HubSubTableTelegram from './HubSubTableTelegram.vue';

    export default {
        name: "TableListTelegram",

        components: {
            'hub-table'         : HubTable,
            'hub-sub-table'     : HubSubTableTelegram,
        },
    }
</script>