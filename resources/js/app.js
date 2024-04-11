import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler';
import RootVue from './Components/RootVue.vue';
import { reactive } from 'vue'

const app = createApp({
    components: {
        'root-vue' : RootVue,
    }
});

/*
const globalObject = reactive({
    nested              : { count: 0 },
    arr                 : ['foo', 'bar'],
    mess                : '12334325345',
    groupsModalWindow   : null,
    campaignsMap        : new Map(),
    groupsMap           : new Map(),
})

globalObject.groupsMap.set('1', { 'groupId' : '1', 'groupName' : 'Группа №1', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('2', { 'groupId' : '2', 'groupName' : 'Группа №2', 'parentGroupId' : "1",  'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('3', { 'groupId' : '3', 'groupName' : 'Группа №3', 'parentGroupId' : "2",  'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('4', { 'groupId' : '4', 'groupName' : 'Группа №4', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('5', { 'groupId' : '5', 'groupName' : 'Группа №5', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('6', { 'groupId' : '6', 'groupName' : 'Группа №6', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
globalObject.groupsMap.set('7', { 'groupId' : '7', 'groupName' : 'Группа №7', 'parentGroupId' : "-1", 'chosen' : false, campaignsExtednded : true, groupsExtended : true, })
//*/

import { VueStore } from './vueStore'
window._vueStore = reactive(VueStore)
window._vueStore.setup()

app.mount('#app');