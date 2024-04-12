import './bootstrap';

import { reactive } from 'vue'
import { VueStore } from './vueStore'
window._vueStore = reactive(VueStore)
window._vueStore.setup()

import { createApp } from 'vue/dist/vue.esm-bundler';
import RootVue from './Components/RootVue.vue';
const app = createApp({
    components: {
        'root-vue' : RootVue,
    }
});

app.mount('#app');