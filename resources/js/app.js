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
        path            : "/telegram-analistics/1/",
        component       : () => import('./Components/TelegramAnalistics.vue'),
    },

    {
        path            : "/telegram-analistics/2/",
        component       : () => import('./Components/TelegramAnalistics2.vue'),
    },

    {
        path            : "/telegram-analistics/3/",
        component       : () => import('./Components/TelegramAnalistics3.vue'),
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