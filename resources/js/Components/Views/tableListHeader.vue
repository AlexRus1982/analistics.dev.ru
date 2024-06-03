<template>
    <div class="table_list_header">
        <select name="period" id="peiod_select" @change="onPeriodChange($event)" v-model="vueStore.period">
            <option value="YESTERDAY">Вчера</option>
            <option value="LAST_WEEK">Неделя</option>
            <option value="THIS_MONTH">Месяц</option>
            <option value="LAST_MONTH">Пред. месяц</option>
        </select>
    </div>
</template>
    
<style lang="scss" scoped>
    @import "./rootView.scss";
</style>

<script>
    export default {
        name: "tableListHeader",
        
        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        methods:{
            onPeriodChange(event) {
                console.log(event.target.value)
                window._vueStore.setup(event.target.value)
            },
        },
    }
</script>