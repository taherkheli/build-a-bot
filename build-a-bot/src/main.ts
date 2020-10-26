import router from '@/router';
import store from '@/store/index';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).use(router).use(store).mount('#app');
