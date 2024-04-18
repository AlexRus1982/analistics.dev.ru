import './bootstrap';

import { reactive } from 'vue'
import { VueStore } from './vueStore'
window._vueStore = reactive(VueStore)
window._vueStore.setup()

import { createApp } from 'vue/dist/vue.esm-bundler';
import RootVue from './Components/RootVue.vue';

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp({
    components: {
        'root-vue' : RootVue,
    }
});

app.use(VueChartkick).mount('#app');