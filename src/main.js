import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './Store';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(store)
app.use(BootstrapVue3);
app.use(router);
app.mount('#app');




