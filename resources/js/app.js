import './bootstrap';

import { reactive } from 'vue'
import { VueStore } from './vueStore'
window._vueStore = reactive(VueStore)
window._vueStore.setup()

import { createApp } from 'vue/dist/vue.esm-bundler';
import AppVue from './Components/app.vue';

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import { 
    createWebHistory, 
    createRouter,
}                               from "vue-router";

const routes = [
    {
        path            : "/",
        component       : () => import('./Components/RootVue.vue'),
    },

    {
        path            : "/telegram-analistics/",
        component       : () => import('./Components/TelegramAnalistics.vue'),
    },
];
  
const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp({
    components: {
        'app-vue' : AppVue,
    }
});

app
.use(router)
.use(VueChartkick)
.mount('#app');