<template>
    <div v-if="currentRouteName == 'index'" class="tab_button active">Все</div>
    <div v-else class="tab_button" @click="setActiveTab('/')">Все</div>

    <div v-if="currentRouteName == 'cpc'"  class="tab_button active">CPC</div>
    <div v-else class="tab_button" @click="setActiveTab('/cpc')">CPC</div>

    <div v-if="currentRouteName == 'ctr'"  class="tab_button active">CTR</div>
    <div v-else class="tab_button" @click="setActiveTab('/ctr')">CTR</div>

    <div v-if="currentRouteName == 'statistics'"  class="tab_button active">Статистика</div>
    <div v-else class="tab_button" @click="setActiveTab('/statistics')">Статистика</div>

    <div v-if="currentRouteName == 'outsiders'"  class="tab_button active">Аутсайдеры</div>
    <div v-else class="tab_button" @click="setActiveTab('/outsiders')">Аутсайдеры</div>

    <div v-if="currentRouteName == 'constructor'" class="tab_button constructor active">
        <div>Конструктор</div>
        <div v-if="ungroupedCompaignsCount > 0" class="bubble">{{ ungroupedCompaignsCount }}</div>
    </div>
    <div v-if="currentRouteName != 'constructor'" class="tab_button constructor" @click="setActiveTab('/constructor')">
        <div>Конструктор</div>
        <div v-if="ungroupedCompaignsCount > 0" class="bubble">{{ ungroupedCompaignsCount }}</div>
    </div>

    <div v-if="currentRouteName == 'adimages'"  class="tab_button active">Картинки</div>
    <div v-else class="tab_button" @click="setActiveTab('/adimages')">Картинки</div>

</template>
    
<style lang="scss" scoped>
    @import "./rootView.scss";
</style>

<script>
    // import { useRoute } from 'vue-router';
    export default {
        name: "headerTabs",
        
        setup(){
            const vueStore = window._vueStore;
            // const route = useRoute()
            // const currentRouteName = computed(() => route.name)

            return {
                vueStore,
                // currentRouteName
            }
        },

        computed : {
            ungroupedCompaignsCount() {
                const array = Array
                        .from(this.vueStore.campaignsMap)
                        .filter(item => item[1].parentId == -1)
                return (array.length) ? array.length : 0
            },

            currentRouteName() {
                // console.debug(this.$route.name)
                return this.$route.name;
            },

        },

        methods:{
            setActiveTab(tabRoute) {
                this.$router.push(tabRoute)
            },
        },
    }
</script>