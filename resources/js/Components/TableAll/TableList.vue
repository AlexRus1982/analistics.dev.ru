<template>
    <div class="table_list_body">

        <hub-table />
        <hub-sub-table />
        
    </div>

</template>

<style lang="scss" scoped>

    .table_list_body {
        width: 100%;
        max-width: 800px;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 75px;
    }

</style>

<script>
    import HubTable from './HubTable.vue';
    import HubSubTable from './HubSubTable.vue';

    export default {
        name: "TableList",

        components: {
            'hub-table'         : HubTable,
            'hub-sub-table'     : HubSubTable,
        },
    }
</script>